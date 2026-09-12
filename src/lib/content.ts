import { createClient } from "@sanity/client";
import type { Book, MediaImage } from "../data/books";
import { books as localBooks } from "../data/books";
import type { GalleryItem } from "../data/gallery";
import { galleryItems as localGalleryItems } from "../data/gallery";
import type { Review } from "../data/reviews";
import { reviews as localReviews } from "../data/reviews";
import type { Citation } from "../data/citations";
import { citations as localCitations } from "../data/citations";
import type { Service } from "../data/services";
import { services as localServices } from "../data/services";

const API_VERSION = "2026-03-01";
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || "production";

export const isSanityConfigured = Boolean(
  projectId && projectId !== "YOUR_PROJECT_ID" && projectId !== "placeholder",
);

const client = isSanityConfigured
  ? createClient({
      projectId: projectId as string,
      dataset,
      apiVersion: API_VERSION,
      useCdn: true,
    })
  : null;

type UnknownRecord = Record<string, any>;

const mediaProjection = `{
  "src": image.asset->url,
  "width": image.asset->metadata.dimensions.width,
  "height": image.asset->metadata.dimensions.height,
  "alt": coalesce(alt, ""),
  "label": label
}`;

const booksQuery = `*[_type == "book" && defined(slug.current) && coalesce(published, true)] | order(coalesce(order, 100) asc, _createdAt asc) {
  "slug": slug.current,
  identity,
  publishing,
  narrative,
  media {
    "cover": cover ${mediaProjection},
    editions[] {
      id,
      label,
      "media": media ${mediaProjection},
      publishing,
      links { purchase[] },
      narrative
    },
    relatedGalleryIds
  },
  links { purchase[], playlists[], chapterOneHref },
  marketing {
    isLatest,
    featured {
      label,
      kicker,
      shortPitch,
      "media": {
        "type": media.type,
        "src": coalesce(media.src, media.image.image.asset->url),
        "width": media.image.image.asset->metadata.dimensions.width,
        "height": media.image.image.asset->metadata.dimensions.height,
        "poster": coalesce(media.poster.image.asset->url, media.image.image.asset->url),
        "alt": coalesce(media.image.alt, media.poster.alt, ""),
        "gallery": media.gallery[] ${mediaProjection}
      },
      stats[],
      spotlight[]
    }
  }
}`;

const servicesQuery = `*[_type == "service" && coalesce(published, true)] | order(coalesce(order, 100) asc, _createdAt asc) {
  name,
  eyebrow,
  price,
  accent,
  format,
  universe,
  focus,
  "gallery": gallery[] {
    "src": image.asset->url,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    "alt": coalesce(alt, ""),
    "label": label
  },
  tags,
  description
}`;

const galleryQuery = `*[_type == "galleryItem" && coalesce(published, true)] | order(coalesce(order, 100) asc, _createdAt asc) {
  "id": coalesce(id, _id),
  title,
  "image": image ${mediaProjection},
  "bookSlug": coalesce(book->slug.current, bookSlug),
  artist,
  date,
  description
}`;

const reviewsQuery = `*[_type == "review" && coalesce(published, true)] | order(coalesce(order, 100) asc, _createdAt asc) {
  "id": coalesce(id, _id),
  rating,
  text,
  excerpt,
  "bookSlug": coalesce(book->slug.current, bookSlug),
  "book": coalesce(bookLabel, book->identity.title, bookSlug),
  date,
  author,
  source,
  tag,
  accent,
  link,
  isbn
}`;

const citationsQuery = `*[_type == "citation" && coalesce(published, true)] | order(coalesce(order, 100) asc, quoteNumber asc) {
  quoteNumber,
  createdAt,
  quote,
  authorOfQuote,
  "bookTitle": coalesce(bookTitle, book->identity.title)
}`;

const fetchOrFallback = async <T>(
  query: string,
  fallback: T[],
  label: string,
): Promise<T[]> => {
  if (!client) {
    return fallback;
  }

  try {
    const result = await client.fetch<T[]>(query);
    return result.length > 0 ? result : fallback;
  } catch (error) {
    console.warn(`[sanity] Impossible de charger ${label}; fallback local utilisé.`, error);
    return fallback;
  }
};

const toMediaImage = (
  value: UnknownRecord | null | undefined,
  fallback?: MediaImage,
): MediaImage => ({
  src: value?.src || fallback?.src || "",
  alt: value?.alt || fallback?.alt || "",
  label: value?.label ?? fallback?.label,
  width: typeof value?.width === "number" ? value.width : fallback?.width,
  height: typeof value?.height === "number" ? value.height : fallback?.height,
});

const mapBook = (value: UnknownRecord): Book => {
  const localBook = localBooks.find((entry) => entry.slug === value.slug);
  const identity = value.identity || {};
  const publishing = value.publishing || {};
  const narrative = value.narrative || {};
  const media = value.media || {};
  const localMedia = localBook?.media;

  return {
    slug: value.slug || localBook?.slug || "",
    identity: {
      title: identity.title || localBook?.identity.title || "",
      subtitle: identity.subtitle,
      tome: identity.tome || localBook?.identity.tome || "",
      saga: identity.saga,
      series: identity.series || localBook?.identity.series || "",
      genres: identity.genres || localBook?.identity.genres || [],
      accent: identity.accent || localBook?.identity.accent || "#3d3834",
    },
    publishing: {
      status: publishing.status || localBook?.publishing.status || "",
      releaseDate: publishing.releaseDate || localBook?.publishing.releaseDate || "",
      defaultFormat: publishing.defaultFormat || localBook?.publishing.defaultFormat || "",
      defaultPrice: publishing.defaultPrice,
      defaultIsbn: publishing.defaultIsbn,
      pages: publishing.pages,
      priceOptions: publishing.priceOptions || [],
    },
    narrative: {
      hook: narrative.hook || localBook?.narrative.hook || "",
      shortDescription: narrative.shortDescription || localBook?.narrative.shortDescription || "",
      longDescription: narrative.longDescription || localBook?.narrative.longDescription || "",
      quote: narrative.quote || localBook?.narrative.quote || "",
      details: narrative.details || [],
    },
    media: {
      cover: toMediaImage(media.cover, localMedia?.cover),
      editions: (media.editions || []).map((edition: UnknownRecord) => ({
        id: edition.id || "edition",
        label: edition.label || "Édition",
        media: toMediaImage(edition.media),
        publishing: edition.publishing,
        links: edition.links,
        narrative: edition.narrative,
      })),
      relatedGalleryIds: media.relatedGalleryIds || localMedia?.relatedGalleryIds,
    },
    links: {
      purchase: value.links?.purchase || [],
      playlists: value.links?.playlists || [],
      chapterOneHref: value.links?.chapterOneHref,
    },
    marketing: value.marketing
      ? {
          isLatest: Boolean(value.marketing.isLatest),
          featured: value.marketing.featured
            ? {
                label: value.marketing.featured.label || "Nouveau roman",
                kicker: value.marketing.featured.kicker || "Lecture phare",
                shortPitch: value.marketing.featured.shortPitch || narrative.shortDescription || "",
                media: {
                  type: value.marketing.featured.media?.type === "video" ? "video" : "image",
                  src: value.marketing.featured.media?.src || "",
                  width: value.marketing.featured.media?.width,
                  height: value.marketing.featured.media?.height,
                  poster: value.marketing.featured.media?.poster,
                  alt: value.marketing.featured.media?.alt || "",
                  gallery: value.marketing.featured.media?.gallery || [],
                },
                stats: value.marketing.featured.stats || [],
                spotlight: value.marketing.featured.spotlight || [],
              }
            : undefined,
        }
      : undefined,
  };
};

export const getBooksContent = async (): Promise<Book[]> => {
  const result = await fetchOrFallback<UnknownRecord>(booksQuery, localBooks, "les livres");
  return result.map(mapBook);
};

export const getLatestBookContent = async (): Promise<Book> => {
  const allBooks = await getBooksContent();
  return allBooks.find((book) => book.marketing?.isLatest) || allBooks[0] || localBooks[0];
};

export const getBookBySlugContent = async (slug: string): Promise<Book | undefined> => {
  const allBooks = await getBooksContent();
  return allBooks.find((book) => book.slug === slug);
};

export const getServicesContent = async (): Promise<Service[]> => {
  const result = await fetchOrFallback<UnknownRecord>(servicesQuery, localServices, "les services");
  return result.map((value) => ({
    name: value.name || "",
    eyebrow: value.eyebrow || "",
    price: value.price || "",
    accent: value.accent || "#3a4d45",
    format: value.format || "",
    universe: value.universe || "",
    focus: value.focus || "",
    gallery: value.gallery || [],
    tags: value.tags || [],
    description: value.description || "",
  }));
};

export const getGalleryContent = async (): Promise<GalleryItem[]> => {
  const result = await fetchOrFallback<UnknownRecord>(galleryQuery, localGalleryItems, "la galerie");
  return result.map((value, index) => {
    const image = typeof value.image === "string"
      ? { src: value.image, alt: value.alt || "", width: value.width, height: value.height }
      : toMediaImage(value.image);
    return {
      id: value.id || `gallery-${index + 1}`,
      title: value.title || "Image de galerie",
      image: image.src,
      alt: image.alt,
      width: image.width,
      height: image.height,
      bookSlug: value.bookSlug || "",
      artist: value.artist || "",
      date: value.date || "",
      description: value.description || "",
    };
  });
};

export const getReviewsContent = async (): Promise<Review[]> => {
  const result = await fetchOrFallback<Review>(reviewsQuery, localReviews, "les avis");
  return result.map((value, index) => ({
    ...value,
    id: value.id || `review-${index + 1}`,
    rating: value.rating || 5,
    text: value.text || "",
    excerpt: value.excerpt || value.text || "",
    bookSlug: value.bookSlug || "",
    book: value.book || "",
    date: value.date || "",
    author: value.author || "",
    source: value.source || "",
    tag: value.tag || "Avis",
    accent: value.accent || "#3a4d45",
  }));
};

export const getCitationsContent = async (): Promise<Citation[]> => {
  const result = await fetchOrFallback<Citation>(citationsQuery, localCitations, "les citations");
  return result.map((value, index) => ({
    ...value,
    quoteNumber: value.quoteNumber || index + 1,
    createdAt: value.createdAt || "",
    quote: value.quote || "",
    authorOfQuote: value.authorOfQuote || "",
    bookTitle: value.bookTitle || "",
  }));
};
