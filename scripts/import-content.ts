import "dotenv/config";

import { createReadStream, existsSync } from "node:fs";
import { basename, join } from "node:path";
import { createClient } from "@sanity/client";
import { books } from "../src/data/books";
import { citations } from "../src/data/citations";
import { galleryItems } from "../src/data/gallery";
import { reviews } from "../src/data/reviews";
import { services } from "../src/data/services";

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error(
    "PUBLIC_SANITY_PROJECT_ID et SANITY_API_WRITE_TOKEN sont requis pour l’import.",
  );
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-03-01",
  useCdn: false,
});

type SanityDocument = Record<string, any> & {
  _id: string;
  _type: string;
};

const assetCache = new Map<string, Promise<string>>();

const localPathFromSrc = (src: string) => {
  if (!src.startsWith("/")) {
    throw new Error("L’importeur attend un média local, reçu: " + src);
  }

  const localPath = join(process.cwd(), "public", src.slice(1));
  if (!existsSync(localPath)) {
    throw new Error("Média introuvable: " + localPath);
  }

  return localPath;
};

const uploadImage = (src: string): Promise<string> => {
  const cachedAsset = assetCache.get(src);
  if (cachedAsset) {
    return cachedAsset;
  }

  const upload = (async () => {
    const localPath = localPathFromSrc(src);
    const asset = await client.assets.upload("image", createReadStream(localPath), {
      filename: basename(localPath),
    });
    console.log("Image importée:", src);
    return asset._id;
  })();

  assetCache.set(src, upload);
  return upload;
};

const imageField = async (src: string) => ({
  _type: "image",
  asset: {
    _type: "reference",
    _ref: await uploadImage(src),
  },
});

const mediaImage = async (value: { src: string; alt: string; label?: string }) => ({
  _type: "mediaImage",
  image: await imageField(value.src),
  alt: value.alt,
  ...(value.label ? { label: value.label } : {}),
});

const keyed = (value: Record<string, any>, key: string) => ({
  ...value,
  _key: key,
});

const externalLinks = (links: Array<{ label: string; href: string }> = []) =>
  links.map((link, index) => keyed(link, `link-${index + 1}`));

const bookId = (slug: string) => `book-${slug}`;
const bookBySlug = new Map(books.map((book) => [book.slug, book]));

const bookDocuments = async (): Promise<SanityDocument[]> =>
  Promise.all(
    books.map(async (book, index) => ({
      _id: bookId(book.slug),
      _type: "book",
      title: book.identity.title,
      slug: { _type: "slug", current: book.slug },
      identity: book.identity,
      publishing: book.publishing,
      narrative: book.narrative,
      media: {
        cover: await mediaImage(book.media.cover),
        editions: await Promise.all(
          book.media.editions.map(async (edition) =>
            keyed(
              {
                id: edition.id,
                label: edition.label,
                media: await mediaImage(edition.media),
                publishing: edition.publishing,
                links: edition.links
                  ? { purchase: externalLinks(edition.links.purchase) }
                  : undefined,
                narrative: edition.narrative,
              },
              `edition-${edition.id}`,
            ),
          ),
        ),
        relatedGalleryIds: book.media.relatedGalleryIds,
      },
      links: {
        purchase: externalLinks(book.links.purchase),
        playlists: externalLinks(book.links.playlists),
        chapterOneHref: book.links.chapterOneHref,
      },
      marketing: book.marketing
        ? {
            isLatest: book.marketing.isLatest,
            featured: book.marketing.featured
              ? {
                  label: book.marketing.featured.label,
                  kicker: book.marketing.featured.kicker,
                  shortPitch: book.marketing.featured.shortPitch,
                  media: {
                    type: book.marketing.featured.media.type,
                    src:
                      book.marketing.featured.media.type === "video"
                        ? book.marketing.featured.media.src
                        : undefined,
                    image:
                      book.marketing.featured.media.type === "image"
                        ? await mediaImage({
                            src: book.marketing.featured.media.src,
                            alt: book.marketing.featured.media.alt,
                          })
                        : undefined,
                    poster: book.marketing.featured.media.poster
                      ? await mediaImage({
                          src: book.marketing.featured.media.poster,
                          alt: book.marketing.featured.media.alt,
                        })
                      : undefined,
                    gallery: await Promise.all(
                      (book.marketing.featured.media.gallery || []).map((image, imageIndex) =>
                        mediaImage(image).then((value) => keyed(value, `featured-${imageIndex + 1}`)),
                      ),
                    ),
                  },
                  stats: book.marketing.featured.stats.map((stat, statIndex) =>
                    keyed(stat, `stat-${statIndex + 1}`),
                  ),
                  spotlight: book.marketing.featured.spotlight.map((item, itemIndex) =>
                    keyed(item, `spotlight-${itemIndex + 1}`),
                  ),
                }
              : undefined,
          }
        : undefined,
      order: index + 1,
      published: true,
    })),
  );

const serviceDocuments = async (): Promise<SanityDocument[]> =>
  Promise.all(
    services.map(async (service, index) => ({
      _id: `service-${service.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      _type: "service",
      ...service,
      gallery: await Promise.all(
        service.gallery.map(async (image, imageIndex) =>
          keyed(
            {
              image: await imageField(image.src),
              alt: image.alt,
              label: image.label,
            },
            `service-image-${imageIndex + 1}`,
          ),
        ),
      ),
      order: index + 1,
      published: true,
    })),
  );

const galleryDocuments = async (): Promise<SanityDocument[]> =>
  Promise.all(
    galleryItems.map(async (item, index) => ({
      _id: `gallery-${index + 1}`,
      _type: "galleryItem",
      title: item.title,
      image: await mediaImage({ src: item.image, alt: item.alt }),
      book: bookBySlug.has(item.bookSlug)
        ? { _type: "reference", _ref: bookId(item.bookSlug) }
        : undefined,
      bookSlug: item.bookSlug,
      artist: item.artist,
      date: item.date,
      description: item.description,
      order: index + 1,
      published: true,
    })),
  );

const reviewDocuments = (): SanityDocument[] =>
  reviews.map((review, index) => ({
    _id: `review-${review.id || index + 1}`,
    _type: "review",
    rating: review.rating,
    text: review.text,
    excerpt: review.excerpt,
    book: bookBySlug.has(review.bookSlug)
      ? { _type: "reference", _ref: bookId(review.bookSlug) }
      : undefined,
    bookLabel: review.book,
    bookSlug: review.bookSlug,
    date: review.date,
    author: review.author,
    source: review.source,
    tag: review.tag,
    accent: review.accent,
    link: review.link,
    isbn: review.isbn,
    order: index + 1,
    published: true,
  }));

const citationDocuments = (): SanityDocument[] =>
  citations.map((citation, index) => ({
    _id: `citation-${citation.quoteNumber || index + 1}`,
    _type: "citation",
    ...citation,
    order: index + 1,
    published: true,
  }));

const documents = [
  ...(await bookDocuments()),
  ...(await serviceDocuments()),
  ...(await galleryDocuments()),
  ...reviewDocuments(),
  ...citationDocuments(),
];

let transaction = client.transaction();
for (const document of documents) {
  transaction = transaction.createOrReplace(document);
}

await transaction.commit();
console.log(`${documents.length} documents importés dans ${projectId}/${dataset}.`);
