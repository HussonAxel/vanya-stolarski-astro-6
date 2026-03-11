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
  genres: string[];
  description: string;
  longDescription: string;
  cover: string;
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
        "Une romance tragique et fantastique portee par un imaginaire somptueux, des alliances forcees et une tension emotionnelle qui monte chapitre apres chapitre.",
      mediaType: "image",
      mediaSrc: "/assets/covers/fous-papillons-cover.webp",
      mediaPoster: "/assets/covers/fous-papillons-cover.webp",
      mediaAlt: "Visuel de campagne pour Fous-Papillons",
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
