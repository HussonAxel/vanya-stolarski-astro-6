import type {
  Book,
  BookEdition,
  BookGalleryItem,
  ExternalLink,
  MediaImage,
} from "../data/books";
import { books } from "../data/books";
import type { GalleryItem } from "../data/gallery";

export type CTAViewModel = {
  id: string;
  label: string;
  href: string;
  kind: "primary" | "secondary" | "ghost";
  icon: "external" | "download" | "play";
  external?: boolean;
  download?: boolean;
};

export type BookEditionViewModel = {
  id: string;
  label: string;
  image: MediaImage;
  meta: {
    format?: string;
    price?: string;
    pages?: number;
    isbn?: string;
    releaseDate?: string;
    status?: string;
  };
  content: {
    hook?: string;
    description?: string;
  };
  ctas: CTAViewModel[];
};

export type GalleryItemViewModel = {
  id: string;
  title: string;
  image: string;
  alt: string;
  bookLabel: string;
  bookHref: string;
  artist: string;
  date: string;
  description: string;
};

export type BookPageModel = {
  book: Book;
  hero: {
    title: string;
    tome: string;
    series: string;
    genres: string[];
    hiddenGenresCount: number;
    editions: BookEditionViewModel[];
    initialEdition: BookEditionViewModel;
    ctas: CTAViewModel[];
  };
  content: {
    synopsis: string;
    quote: string;
    details: Array<{ label: string; value: string }>;
    format: string;
    genres: string[];
  };
  relatedGallery: GalleryItemViewModel[];
  relatedBooks: Book[];
};

export const getBookTitle = (book: Book) => book.identity.title;
export const getBookTome = (book: Book) => book.identity.tome;
export const getBookSeries = (book: Book) => book.identity.series;
export const getBookGenres = (book: Book) => book.identity.genres;
export const getBookAccent = (book: Book) => book.identity.accent;
export const getBookStatus = (book: Book) => book.publishing.status;
export const getBookReleaseDate = (book: Book) => book.publishing.releaseDate;
export const getBookFormat = (book: Book) => book.publishing.defaultFormat;
export const getBookPages = (book: Book) => book.publishing.pages;
export const getBookIsbn = (book: Book) => book.publishing.defaultIsbn;
export const getBookPrice = (book: Book) => book.publishing.defaultPrice;
export const getBookPriceOptions = (book: Book) => book.publishing.priceOptions ?? [];
export const getBookHook = (book: Book) => book.narrative.hook;
export const getBookShortDescription = (book: Book) => book.narrative.shortDescription;
export const getBookLongDescription = (book: Book) => book.narrative.longDescription;
export const getBookQuote = (book: Book) => book.narrative.quote;
export const getBookDetails = (book: Book) => book.narrative.details;
export const getBookChapterOneHref = (book: Book) => book.links.chapterOneHref;
export const getBookPurchaseLinks = (book: Book) => book.links.purchase ?? [];
export const getBookPlaylists = (book: Book) => book.links.playlists ?? [];
export const getFeaturedBlock = (book: Book) => book.marketing?.featured;

export const sortExternalLinks = (links: ExternalLink[] = []) =>
  [...links].sort((left, right) => {
    const leftScore = /sumup|boutique/i.test(left.label) ? 2 : 1;
    const rightScore = /sumup|boutique/i.test(right.label) ? 2 : 1;
    return rightScore - leftScore;
  });

export const getBookBySlug = (slug: string) =>
  books.find((book) => book.slug === slug);

export const getRelatedBooks = (book: Book, allBooks: Book[], limit = 2) =>
  allBooks.filter((entry) => entry.slug !== book.slug).slice(0, limit);

export const getBookHeroGenres = (book: Book, maxVisible: number) => {
  const genres = getBookGenres(book);
  return {
    genres: genres.slice(0, maxVisible),
    hiddenGenresCount: Math.max(genres.length - maxVisible, 0),
  };
};

export const toBookGalleryItems = (images: MediaImage[] = []): BookGalleryItem[] =>
  images.map((image) => ({
    src: image.src,
    alt: image.alt,
    label: image.label,
  }));

export const getBookCoverGalleryItems = (book: Book): BookGalleryItem[] => {
  if (book.media.editions.length > 0) {
    return book.media.editions.map((edition) => ({
      src: edition.media.src,
      alt: edition.media.alt,
      label: edition.media.label ?? edition.label,
    }));
  }

  return toBookGalleryItems([book.media.cover]);
};

export const getFeaturedGalleryItems = (book: Book): BookGalleryItem[] => {
  const featured = getFeaturedBlock(book);
  const featuredGallery = featured?.media.gallery;

  if (featuredGallery?.length) {
    return toBookGalleryItems(featuredGallery);
  }

  if (featured?.media.src) {
    return toBookGalleryItems([
      {
        src: featured.media.src,
        alt: featured.media.alt,
        label: "Edition principale",
      },
    ]);
  }

  return getBookCoverGalleryItems(book);
};

const getEditionValue = <T,>(
  edition: BookEdition,
  field: keyof NonNullable<BookEdition["publishing"]>,
  fallback: T,
) => (edition.publishing?.[field] as T | undefined) ?? fallback;

const buildEditionCtas = (book: Book, edition: BookEdition, active = false): CTAViewModel[] => {
  const purchaseLinks = sortExternalLinks(
    edition.links?.purchase ?? getBookPurchaseLinks(book),
  );
  const ctas: CTAViewModel[] = purchaseLinks.map((link, index) => ({
    id: `purchase-${edition.id}-${index}`,
    label: link.label,
    href: link.href,
    kind: index === 0 ? "primary" : "secondary",
    icon: "external",
    external: true,
  }));

  getBookPlaylists(book).forEach((playlist, index) => {
    ctas.push({
      id: `playlist-${edition.id}-${index}`,
      label: playlist.label,
      href: playlist.href,
      kind: "ghost",
      icon: "play",
      external: true,
    });
  });

  const chapterOneHref = getBookChapterOneHref(book);
  if (chapterOneHref) {
    ctas.push({
      id: `chapter-${edition.id}`,
      label: "Télécharger le 1er chapitre",
      href: chapterOneHref,
      kind: "secondary",
      icon: "download",
      download: true,
    });
  }

  return ctas;
};

export const buildEditionViewModel = (
  book: Book,
  edition: BookEdition,
): BookEditionViewModel => ({
  id: edition.id,
  label: edition.label,
  image: edition.media,
  meta: {
    format: getEditionValue(edition, "format", getBookFormat(book)),
    price: getEditionValue(edition, "price", getBookPrice(book)),
    pages: getEditionValue(edition, "pages", getBookPages(book)),
    isbn: getEditionValue(edition, "isbn", getBookIsbn(book)),
    releaseDate: getEditionValue(edition, "releaseDate", getBookReleaseDate(book)),
    status: getEditionValue(edition, "status", getBookStatus(book)),
  },
  content: {
    hook: edition.narrative?.hook ?? getBookHook(book),
    description:
      edition.narrative?.description ?? getBookShortDescription(book),
  },
  ctas: buildEditionCtas(book, edition),
});

export const getBookEditionViewModels = (book: Book): BookEditionViewModel[] => {
  const editions =
    book.media.editions.length > 0
      ? book.media.editions
      : [
          {
            id: "default",
            label: book.media.cover.label ?? "Couverture",
            media: book.media.cover,
          },
        ];

  return editions.map((edition) => buildEditionViewModel(book, edition));
};

export const getInitialEdition = (book: Book) => getBookEditionViewModels(book)[0];

export const getPrimaryBookCtas = (book: Book, activeEditionId?: string) => {
  const editions = getBookEditionViewModels(book);
  return (
    editions.find((edition) => edition.id === activeEditionId)?.ctas ??
    editions[0]?.ctas ??
    []
  );
};

export const getPrimaryStoreLink = (book: Book) =>
  sortExternalLinks(getBookPurchaseLinks(book))[0];

export const getBookRelatedGalleryItems = (
  book: Book,
  allGalleryItems: GalleryItem[],
): GalleryItemViewModel[] =>
  allGalleryItems
    .filter((item) => item.bookSlug === book.slug)
    .map((item) => ({
      id: item.id,
      title: item.title,
      image: item.image,
      alt: item.alt,
      bookLabel: getBookTitle(book),
      bookHref: `/livres/${book.slug}`,
      artist: item.artist,
      date: item.date,
      description: item.description,
    }));

export const buildBookPageModel = (
  book: Book,
  allBooks: Book[],
  allGalleryItems: GalleryItem[],
): BookPageModel => {
  const heroGenres = getBookHeroGenres(book, 4);
  const editions = getBookEditionViewModels(book);
  const initialEdition = editions[0];

  return {
    book,
    hero: {
      title: getBookTitle(book),
      tome: getBookTome(book),
      series: getBookSeries(book),
      genres: heroGenres.genres,
      hiddenGenresCount: heroGenres.hiddenGenresCount,
      editions,
      initialEdition,
      ctas: initialEdition?.ctas ?? [],
    },
    content: {
      synopsis: getBookLongDescription(book),
      quote: getBookQuote(book),
      details: getBookDetails(book),
      format: getBookFormat(book),
      genres: getBookGenres(book),
    },
    relatedGallery: getBookRelatedGalleryItems(book, allGalleryItems),
    relatedBooks: getRelatedBooks(book, allBooks),
  };
};

export const getBookStatusLabel = (status: string) => {
  if (status === "En ecriture") {
    return "En cours";
  }

  if (status === "Disponible") {
    return "Publié";
  }

  return status;
};
