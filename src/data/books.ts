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
    title: "Coeur de Renard",
    tome: "Tome 1",
    series: "Duologie",
    pages: 371,
    isbn: "979-10-978469-1-6",
    releaseDate: "2025",
    format: "Relié + broché",
    status: "Disponible",
    price: "Selon édition",
    purchaseLinks: [
      {
        label: "Boutique SumUp",
        href: "https://vanyastolarski.sumupstore.com/product/coeur-de-renard-relie",
      },
    ],
    genres: [
      "Thriller",
      "Psychologique",
      "Romance sombre",
      "Historique",
      "Art",
      "Duologie",
    ],
    description:
      "Il est arnaqueur d'art. Elle va en être victime. Elle va le traquer sans merci. Il va l'aider sous une fausse identité.",
    longDescription:
      "En pleine occupation, Renard tente de survivre en remboursant une dette qui le pousse aux pires vices, notamment en vendant des faux tableaux. Fortune, quant à elle, voit, impuissante, ses parents sombrer dans les idéologies nazies et d'extrême droite. Alors qu'elle tente de leur faire ouvrir les yeux sur les conséquences de leurs décisions, les occupants gagnent en influence sur la banque dont elle doit hériter. Son honneur sera sali si elle échoue à retrouver l'escroc qui souhaite la chute de la banque, mais quel honneur lui restera-t-il si ses parents se vendent aux nazis ?",
    cover: "/assets/covers/coeur-de-renard-cover.webp",
    gallery: [
      {
        src: "/assets/covers/coeur-de-renard-cover.webp",
        alt: "Format relié de Coeur de Renard",
        label: "Relié",
      },
      {
        src: "/assets/covers/cdr-cover-broche.webp",
        alt: "Format broché de Coeur de Renard",
        label: "Broché",
      },
      {
        src: "/assets/covers/cdr-cover.webp",
        alt: "Visuel éditorial de Coeur de Renard",
        label: "Visuel",
      },
    ],
    accent: "#3d3834",
    quote:
      "Fortune était ce genre de femme à trouver un cap en pleine tempête, à remplacer le capitaine si celui-ci venait à tomber.",
    hook:
      "En pleine Seconde Guerre mondiale, la règle est de ne jamais croire un coeur de renard.",
    details: [
      { label: "Personnages", value: "Renard & Fortune" },
      { label: "Cadre", value: "Paris, 1943" },
      { label: "Promesse", value: "Traque, faux tableaux, morale grise" },
      { label: "Edition", value: "Roman relié ou broché" },
    ],
  },
  {
    slug: "fous-papillons",
    title: "Fous-Papillons",
    tome: "One-shot",
    series: "Roman historique fantastique",
    pages: 412,
    isbn: "979-8287581428",
    releaseDate: "2025",
    format: "Relié + broché",
    status: "Disponible",
    price: "Selon édition",
    purchaseLinks: [
      {
        label: "Amazon",
        href: "https://www.amazon.fr/Fous-Papillons-Vanya-Stolarski/dp/B0FGCKQLX6",
      },
      {
        label: "Boutique SumUp",
        href: "https://vanyastolarski.sumupstore.com/product/fous-papillons-relie-avec-jaquette",
      },
    ],
    genres: [
      "Fantastique",
      "Historique",
      "Romance tragique",
      "Mariage arrangé",
      "Soulmates",
      "One-shot",
    ],
    description:
      "Mariée de force au général de l'Etat major, Esther voit son cœur tiraillé entre un mari dangereux et un amour d'enfance qui a vendu son âme pour elle.",
    longDescription:
      "Fous-Papillons est une romance aux airs de tragédie, où s'aimer frôle la haine, voire s'y confond lorsqu'il ne reste plus d'autre solution pour rester dans le cœur de l'autre. Vous suivrez les aventures d'Ethan et Esther de 1880 à 1920, dans de nombreux pays différents à l’époque où les conflits de la Première Guerre mondiale font des ravages. Paris, les Vosges, la Sicile et Saint-Pétersbourg : vous voyagerez autant dans la neige que sous le soleil de la Méditerranée.",
    cover: "/assets/covers/fous-papillons-cover.webp",
    gallery: [
      {
        src: "/assets/covers/fous-papillons-cover.webp",
        alt: "Format relié de Fous-Papillons",
        label: "Relié",
      },
      {
        src: "/assets/covers/fous-papillons-featured.webp",
        alt: "Format broché de Fous-Papillons",
        label: "Visuel",
      },
    ],
    accent: "#3a4d45",
    quote:
      "Si Ethan ne voyait pas d’un mauvais oeil l’idée d’aller en enfer, celle qu’Esther soit condamnée à l’éternelle perdition ne lui était pas supportable.",
    hook:
      "Entre Frantz, son mystérieux mari, et Ethan, cet amoureux d'enfance qu'elle veut à tout prix protéger, Esther ne sait plus qui aimer.",
    details: [
      { label: "Personnages", value: "Esther, Ethan, Frantz" },
      { label: "Période", value: "1880 à 1920" },
      { label: "Lieux", value: "Paris, Vosges, Sicile, Saint-Pétersbourg" },
      { label: "Promesse", value: "Âmes soeurs maudites et tragédie" },
    ],
    isLatest: true,
    featured: {
      label: "Dernier roman paru",
      kicker: "Lecture phare",
      shortPitch:
        "Une romance tragique et fantastique où l'Histoire, les conflits politiques et une malédiction intime se heurtent sans jamais relâcher la tension.",
      mediaType: "image",
      mediaSrc: "/assets/covers/fous-papillons-featured.webp",
      mediaPoster: "/assets/covers/fous-papillons-featured.webp",
      mediaAlt: "Visuel éditorial de Fous-Papillons",
      gallery: [
        {
          src: "/assets/covers/fous-papillons-cover.webp",
          alt: "Couverture de Fous-Papillons",
          label: "Couverture",
        },
        {
          src: "/assets/covers/fous-papillons-featured.webp",
          alt: "Visuel collector de Fous-Papillons",
          label: "Collector",
        },
      ],
      stats: [
        { label: "Pagination", value: "412 pages" },
        { label: "Format", value: "Relié + broché" },
        { label: "Tonalité", value: "Historique & tragique" },
      ],
      spotlight: [
        { label: "Héroïne", value: "Esther" },
        { label: "Amour maudit", value: "Ethan" },
        { label: "Cadre", value: "1880-1920" },
      ],
    },
  },
  {
    slug: "le-coeur-dankaa",
    title: "Le coeur d'Ankaa",
    tome: "Tome 1",
    series: "Imposteurs",
    pages: 479,
    isbn: "978-2957655106",
    releaseDate: "2021",
    format: "Broché",
    status: "Disponible",
    price: "Selon édition",
    purchaseLinks: [
      {
        label: "Amazon",
        href: "https://www.amazon.fr/C%C5%93ur-dAnkaa-1-Imposteurs/dp/2957655101",
      },
    ],
    genres: ["Fantasy", "Guerre", "Magie"],
    description:
      "Chassé de chez lui, Johen part en quête du coeur d’Ankaa pendant qu'une guerre menace d'engloutir le royaume.",
    longDescription:
      "Dans un monde de fantasy où les nymphes et la magie ont été bannis, Johen apprend qu’il n’est en réalité pas le fils légitime de son père. Il l’apprend lorsqu’il doit porter la couronne et qu’il se fait trahir par son oncle. Alycie, elle, ne connaît rien du monde après son île. Tout ce qu’elle sait, c’est qu’elle n’est pas comme les autres nymphes et que sa déesse ne lui parle pas. Entre complots, guerre et magie, ils vont devoir survivre à des révélations qui bouleversent tout.",
    cover: "/assets/covers/le-coeur-dankaa-cover.webp",
    gallery: [
      {
        src: "/assets/covers/le-coeur-dankaa-cover.webp",
        alt: "Couverture de Le coeur d'Ankaa",
        label: "Couverture",
      },
    ],
    accent: "#3d3834",
    quote: "Ils sont nés imposteurs. Ils seront inoubliables.",
    hook:
      "Entre complots, guerre et magie, Alycie et Johen vont devoir faire confiance à leur instinct pour survivre.",
    details: [
      { label: "Personnages", value: "Johen & Alycie" },
      { label: "Quête", value: "Retrouver le coeur d'Ankaa" },
      { label: "Monde", value: "Fantasy, guerre, magie" },
      { label: "Promesse", value: "Trahisons et destin contrarié" },
    ],
  },
];

export const getBookBySlug = (slug: string) =>
  books.find((book) => book.slug === slug);

export const latestBook = books.find((book) => book.isLatest) ?? books[0];
