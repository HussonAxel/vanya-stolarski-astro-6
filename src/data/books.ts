export interface PurchaseLink {
  label: string;
  href: string;
}

export interface BookEditionView {
  format?: string;
  price?: string;
  pages?: number;
  isbn?: string;
  releaseDate?: string;
  status?: string;
  hook?: string;
  description?: string;
  purchaseLinks?: PurchaseLink[];
}

export interface BookGalleryItem {
  src: string;
  alt: string;
  label?: string;
  edition?: BookEditionView;
}

export interface Book {
  slug: string;
  title: string;
  tome: string;
  series: string;
  pages: number;
  isbn: string;
  releaseDate: string;
  format: string;
  status: string;
  price: string;
  purchaseLinks?: PurchaseLink[];
  genres: string[];
  description: string;
  longDescription: string;
  cover: string;
  gallery?: BookGalleryItem[];
  accent: string;
  quote: string;
  hook: string;
  details: Array<{ label: string; value: string }>;
  isLatest?: boolean;
  featured?: {
    label: string;
    kicker: string;
    shortPitch: string;
    mediaType: "image" | "video";
    mediaSrc: string;
    mediaPoster?: string;
    mediaAlt: string;
    gallery?: BookGalleryItem[];
    stats: Array<{ label: string; value: string }>;
    spotlight: Array<{ label: string; value: string }>;
  };
}

export const books: Book[] = [
  {
    slug: "coeur-de-renard",
    title: "Coeur De Renard",
    tome: "Tome 1",
    series: "Chroniques du Verre",
    pages: 371,
    isbn: "979-10-978469-1-6",
    releaseDate: "Printemps 2027",
    format: "Broche + numerique",
    status: "Disponible bientot",
    price: "19,90 EUR",
    genres: [
      "Thriller Psychologique",
      "Romance sombre",
      "Historique",
      "Art",
      "Duologie",
    ],
    description:
      "Un roman tendu, sensuel et trouble ou une chasse a l'homme se transforme en pacte fragile.",
    longDescription:
      "Texte placeholder. Remplacez ce paragraphe par une presentation longue du livre, de ses themes et de ses enjeux emotionnels. Vous pouvez raconter le point de depart, le contexte historique et la promesse de lecture en plusieurs phrases.",
    cover: "/assets/covers/cdr-cover.webp",
    gallery: [
      {
        src: "/assets/covers/cdr-cover.webp",
        alt: "Couverture de Coeur De Renard",
        label: "Couverture",
      },
    ],
    accent: "#3a4d45",
    quote:
      "Placeholder citation. Ajoutez ici une phrase marquante extraite du livre ou de son univers.",
    hook: "Une fausse identite. Une dette. Une poursuite qui bascule dans l'obsession.",
    details: [
      { label: "Heroine", value: "Nom placeholder" },
      { label: "Hero", value: "Nom placeholder" },
      { label: "Cadre", value: "Europe, annees 1940" },
      { label: "Ambiance", value: "Velours, cendres et musees" },
    ],
  },
  {
    slug: "fous-papillons",
    title: "Fous-Papillons",
    tome: "Tome 1",
    series: "Les Nuits d'Opaline",
    pages: 412,
    isbn: "979-8287581428",
    releaseDate: "Ete 2027",
    format: "Broche + collector",
    status: "Precommande ouverte",
    price: "21,50 EUR",
    purchaseLinks: [
      {
        label: "Amazon",
        href: "https://www.amazon.fr/s?k=Fous-Papillons+Vanya+Stolarski",
      },
      {
        label: "Fnac",
        href: "https://www.fnac.com/SearchResult/ResultList.aspx?Search=Fous-Papillons+Vanya+Stolarski",
      },
    ],
    genres: [
      "Fantastique",
      "Historique",
      "Romance tragique",
      "Mariage arrange",
    ],
    description:
      "Un drame romantique et fantastique ou les alliances imposees cachent des forces plus anciennes.",
    longDescription:
      "Texte placeholder. Utilisez cette zone pour decrire l'intrigue, les tensions politiques, les personnages centraux et le type d'emotions que vous voulez promettre au lecteur. Vous pourrez aussi y ajouter des details sur le ton et les tropes.",
    cover: "/assets/covers/fous-papillons-cover.webp",
    gallery: [
      {
        src: "/assets/covers/fous-papillons-cover.webp",
        alt: "Couverture brochee de Fous-Papillons",
        label: "Broche",
        edition: {
          format: "Broche classique",
          price: "21,50 EUR",
          pages: 412,
          isbn: "979-8287581428",
          releaseDate: "Ete 2027",
          status: "Precommande ouverte",
          hook: "L'edition brochee pour entrer dans l'univers de Fous-Papillons.",
          description:
            "Edition standard en broche, parfaite pour une premiere decouverte du roman et de son atmosphere tragique.",
          purchaseLinks: [
            {
              label: "Amazon",
              href: "https://www.amazon.fr/s?k=Fous-Papillons+Vanya+Stolarski",
            },
            {
              label: "Fnac",
              href: "https://www.fnac.com/SearchResult/ResultList.aspx?Search=Fous-Papillons+Vanya+Stolarski",
            },
          ],
        },
      },
      {
        src: "/assets/covers/fous-papillons-cover.webp",
        alt: "Edition collector de Fous-Papillons",
        label: "Collector",
        edition: {
          format: "Collector relie + bonus",
          price: "29,90 EUR",
          pages: 436,
          isbn: "979-8287581435",
          releaseDate: "Automne 2027",
          status: "Tirage limite",
          hook: "Une edition collector pensee pour les lecteurs qui veulent conserver le livre comme objet.",
          description:
            "Edition collector reliee avec contenu bonus, finitions plus riches et pagination augmentee pour accueillir des extras.",
          purchaseLinks: [
            {
              label: "Amazon Collector",
              href: "https://www.amazon.fr/s?k=Fous-Papillons+collector+Vanya+Stolarski",
            },
            {
              label: "Fnac Collector",
              href: "https://www.fnac.com/SearchResult/ResultList.aspx?Search=Fous-Papillons+collector+Vanya+Stolarski",
            },
          ],
        },
      },
      {
        src: "/assets/covers/fous-papillons-cover.webp",
        alt: "Dos collector de Fous-Papillons",
        label: "Dos collector",
        edition: {
          format: "Collector relie + bonus",
          price: "29,90 EUR",
          pages: 436,
          isbn: "979-8287581435",
          releaseDate: "Automne 2027",
          status: "Tirage limite",
          hook: "Le dos collector met en avant les finitions et la presence en bibliotheque.",
          description:
            "Vue du dos de l'edition collector, avec un rendu plus objet et une presentation orientee collection.",
          purchaseLinks: [
            {
              label: "Amazon Collector",
              href: "https://www.amazon.fr/s?k=Fous-Papillons+collector+Vanya+Stolarski",
            },
            {
              label: "Fnac Collector",
              href: "https://www.fnac.com/SearchResult/ResultList.aspx?Search=Fous-Papillons+collector+Vanya+Stolarski",
            },
          ],
        },
      },
    ],
    accent: "#3a4d45",
    quote:
      "Placeholder citation. Inserez ici une phrase emblematique, romantique ou tragique.",
    hook: "Une union forcee. Un coeur deja pris. Une ville qui observe tout.",
    details: [
      { label: "Heroine", value: "Nom placeholder" },
      { label: "Epoux", value: "Nom placeholder" },
      { label: "Lieu", value: "Paris, 1890" },
      { label: "Promesse", value: "Secrets, bals et blessures" },
    ],
    isLatest: true,
    featured: {
      label: "Dernier roman paru",
      kicker: "Roman phare",
      shortPitch:
        "Mariée de force au général de l'Etat major, Esther se retrouve embourbée dans les conflits politiques d'une France de 1890. Son cœur est pourtant ailleurs, loin de Paris, dans une forêt où l'attend un garçon ayant vendu son âme au diable pour elle. Entre Frantz, son mystérieux mari aussi froid que manipulateur et Ethan, cet amoureux d'enfance qu'elle veut à tout prix protéger, Esther ne sait plus qui aimer. Malheureusement, à cette époque où les tensions sont aussi vives que les conflits sont destructeurs, ils devront parvenir à survivre sans que le monde n'apprenne leurs machinations sans quoi... ils risquent tous l'exécution.",
      mediaType: "image",
      mediaSrc: "/assets/covers/fous-papillons-cover.webp",
      mediaPoster: "/assets/covers/fous-papillons-cover.webp",
      mediaAlt: "Visuel de campagne pour Fous-Papillons",
      gallery: [
        {
          src: "/assets/covers/fous-papillons-cover.webp",
          alt: "Visuel de campagne pour Fous-Papillons",
          label: "Edition principale",
        },
        {
          src: "/assets/covers/fous-papillons-cover.webp",
          alt: "Visuel de campagne pour Fous-Papillons",
          label: "Edition principale",
        },
        {
          src: "/assets/covers/fous-papillons-cover.webp",
          alt: "Visuel de campagne pour Fous-Papillons",
          label: "Edition principale",
        },
      ],
      stats: [
        { label: "Edition", value: "Collector + broche" },
        { label: "Atmosphere", value: "Bals, tensions, mystere" },
        { label: "Lecture", value: "Romance sombre et lyrique" },
      ],
      spotlight: [
        { label: "Heroine", value: "Esther placeholder" },
        { label: "Promesse", value: "Mariage force, ville en ebulition" },
        { label: "Media", value: "Image aujourd'hui, video demain" },
      ],
    },
  },
  {
    slug: "le-coeur-dankaa",
    title: "Le coeur d'Ankaa",
    tome: "Tome 1",
    series: "Le Royaume Fendu",
    pages: 479,
    isbn: "978-2957655106",
    releaseDate: "Hiver 2027",
    format: "Grand format",
    status: "En ecriture",
    price: "24,00 EUR",
    genres: ["Fantasy", "Guerre", "Magie"],
    description:
      "Une fantasy epique centree sur l'exil, la foi et la reconquete d'un royaume brise.",
    longDescription:
      "Texte placeholder. Detaillez ici l'univers, la magie, les enjeux militaires et la quete du protagoniste. Cette section peut devenir votre texte de quatrieme de couverture longue ou une note d'intention pour les lecteurs.",
    cover: "/assets/covers/le-coeur-dankaa-cover.webp",
    gallery: [
      {
        src: "/assets/covers/le-coeur-dankaa-cover.webp",
        alt: "Couverture de Le coeur d'Ankaa",
        label: "Couverture",
      },
    ],
    accent: "#3a4d45",
    quote:
      "Placeholder citation. Ajoutez ici une phrase liee au mythe d'Ankaa ou a la guerre.",
    hook: "Un exil. Un artefact legendaire. Un royaume qui ne pardonne rien.",
    details: [
      { label: "Protagoniste", value: "Nom placeholder" },
      { label: "Quete", value: "Retrouver le coeur d'Ankaa" },
      { label: "Territoire", value: "Royaume frontalier fictif" },
      { label: "Magie", value: "Reliques, serments et ciel rouge" },
    ],
  },
];

export const getBookBySlug = (slug: string) =>
  books.find((book) => book.slug === slug);

export const latestBook = books.find((book) => book.isLatest) ?? books[0];


