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
  pages?: number;
  isbn: string;
  releaseDate: string;
  format: string;
  status: string;
  price: string;
  priceOptions?: Array<{ label: string; value: string }>;
  purchaseLinks?: PurchaseLink[];
  chapterOneHref?: string;
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
    priceOptions: [
      { label: "Broché", value: "18 €" },
      { label: "Relié", value: "27 €" },
    ],
    purchaseLinks: [
      {
        label: "Boutique SumUp",
        href: "https://vanyastolarski.sumupstore.com/product/coeur-de-renard-relie",
      },
    ],
    chapterOneHref: "/assets/chapteronebooks/chapteronebooks-coeur-de-renard.pdf",
    genres: [
      "Thriller",
      "Psychologique",
      "Romance sombre",
      "Historique",
      "Art",
      "Duologie",
    ],
    description:
      "Il est escroc. \nElle va en être victime. \nElle va la traquer sans merci. \nIl va l'aider sous une fausse identité. \n A Paris, en 1943, \n la règle est de ne jamais croire \n Un coeur de Renard.",
    longDescription:
      "En pleine occupation, Renard tente de survivre en remboursant une dette qui le pousse aux pires vices, notamment en vendant des faux tableaux. Fortune, quant à elle, voit, impuissante, ses parents sombrer dans les idéologies nazies et d'extrême droite. Alors qu'elle tente de leur faire ouvrir les yeux sur les conséquences de leurs décisions, les occupants gagnent en influence sur la banque dont elle doit hériter. Son honneur sera sali si elle échoue à retrouver l'escroc qui souhaite la chute de la banque, mais quel honneur lui restera-t-il si ses parents se vendent aux nazis ?",
    cover: "/assets/covers/Cover_CDR_Ulule.png",
    gallery: [
      {
        src: "/assets/covers/Cover_CDR_Ulule.png",
        alt: "Couverture de Coeur de Renard - edition reliee",
        label: "Relié",
        edition: {
          format: "Relié",
          isbn: "9791097846909",
          price: "27€",
          pages: 371,
          releaseDate: "2025",
          status: "Disponible",
        },
      },
      {
        src: "/assets/covers/cdr-cover-broche.webp",
        alt: "Format broché de Coeur de Renard",
        label: "Broché",
        edition: {
          format: "Broché",
          isbn: "9791097846916",
          price: "18€",
          pages: 371,
          releaseDate: "2025",
          status: "Disponible",
        },
      },

    ],
    accent: "#3d3834",
    quote:
      "Fortune était ce genre de femme à trouver un cap en pleine tempête, à remplacer le capitaine si celui-ci venait à tomber.",
    hook:
      "",
    details: [
      { label: "Personnages", value: "Renard & Fortune" },
      { label: "Cadre", value: "Paris, 1943" },
      { label: "Promesse", value: "Traque, faux tableaux, morale grise" },
      { label: "Edition", value: "Roman relié ou broché" },
      { label: "ISBN relié", value: "9791097846909" },
      { label: "ISBN broché", value: "9791097846916" },
    ],
    isLatest: true,
    featured: {
      label: "Dernier roman paru",
      kicker: "Lecture phare",
      shortPitch:
        "En pleine occupation, Renard tente de survivre en remboursant une dette qui le pousse aux pires vices, notamment en vendant des faux tableaux. Fortune, quant à elle, voit, impuissante, ses parents sombrer dans les idéologies nazies et d'extrême droite. Alors qu'elle tente de leur faire ouvrir les yeux sur les conséquences de leurs décisions, les occupants gagnent en influence sur la banque dont elle doit hériter. Son honneur sera sali si elle échoue à retrouver l'escroc qui souhaite la chute de la banque, mais quel honneur lui restera-t-il si ses parents se vendent aux nazis ?",
      mediaType: "image",
      mediaSrc: "/assets/covers/Cover_CDR_Ulule.png",
      mediaPoster: "/assets/covers/Cover_CDR_Ulule.png",
      mediaAlt: "Couverture de Coeur de Renard - edition reliee",
      gallery: [
        {
          src: "/assets/covers/Cover_CDR_Ulule.png",
          alt: "Couverture de Coeur de Renard - edition reliee",
          label: "Relié",
        },
        {
          src: "/assets/covers/cdr-cover-broche.webp",
          alt: "Format broché de Coeur de Renard",
          label: "Broché",
        },
      ],
      stats: [
        { label: "Pagination", value: "371 pages" },
        { label: "Format", value: "Relié + broché" },
        { label: "Tonalité", value: "Thriller psychologique" },
      ],
      spotlight: [
        { label: "Héroïne", value: "Fortune" },
        { label: "Anti-héros", value: "Renard" },
        { label: "Cadre", value: "Paris, 1943" },
      ],
    },
  },
  {
    slug: "fous-papillons",
    title: "Fous-Papillons",
    tome: "One-shot",
    series: "Roman historique fantastique",
    pages: 412,
    isbn: "9782957655137",
    releaseDate: "2025",
    format: "Relié + broché",
    status: "Disponible",
    price: "Selon édition",
    priceOptions: [
      { label: "Broché", value: "18 €" },
      { label: "Relié", value: "27 €" },
    ],
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
    chapterOneHref: "/assets/chapteronebooks/chapteronebooks-fous-papillons.pdf",
    genres: [
      "Fantastique",
      "Historique",
      "Romance tragique",
      "Mariage arrangé",
      "Soulmates",
      "One-shot",
    ],
    description:
      "Mariée de force au général de l'Etat major, Esther se retrouve embourbée dans les conflits politiques d'une France de 1890. Son cœur est pourtant ailleurs, loin de Paris, dans une forêt où l'attend un garçon ayant vendu son âme au diable pour elle. Entre Frantz, son mystérieux mari aussi froid que manipulateur et Ethan, cet amoureux d'enfance qu'elle veut à tout prix protéger, Esther ne sait plus qui aimer. Malheureusement, à cette époque où les tensions sont aussi vives que les conflits sont destructeurs, ils devront parvenir à survivre sans que le monde n'apprenne leurs machinations sans quoi... ils risquent tous l'exécution.",
    longDescription:
      "Mariée de force au général de l'Etat major, Esther se retrouve embourbée dans les conflits politiques d'une France de 1890. Son cœur est pourtant ailleurs, loin de Paris, dans une forêt où l'attend un garçon ayant vendu son âme au diable pour elle. Entre Frantz, son mystérieux mari aussi froid que manipulateur et Ethan, cet amoureux d'enfance qu'elle veut à tout prix protéger, Esther ne sait plus qui aimer. Malheureusement, à cette époque où les tensions sont aussi vives que les conflits sont destructeurs, ils devront parvenir à survivre sans que le monde n'apprenne leurs machinations sans quoi... ils risquent tous l'exécution.",
    cover: "/assets/covers/fous-papillons-cover.webp",
    gallery: [
      {
        src: "/assets/covers/fous-papillons-cover.webp",
        alt: "Format relié de Fous-Papillons",
        label: "Relié",
        edition: {
          format: "Relié",
          isbn: "9782957655137",
          price: "27 €",
          pages: 412,
          releaseDate: "2025",
          status: "Disponible",
        },
      },
      {
        src: "/assets/covers/fous-papillons-featured.webp",
        alt: "Format broché de Fous-Papillons",
        label: "Broché",
        edition: {
          format: "Broché",
          isbn: "9798325070020",
          price: "18 €",
          pages: 412,
          releaseDate: "2025",
          status: "Disponible",
        },
      },
    ],
    accent: "#3a4d45",
    quote:
      "Si Ethan ne voyait pas d’un mauvais oeil l’idée d’aller en enfer, celle qu’Esther soit condamnée à l’éternelle perdition ne lui était pas supportable.",
    hook:
      "Entre Frantz, son mystérieux mari, et Ethan, cet amoureux d'enfance qu'elle veut à tout prix protéger, Esther ne sait plus qui aimer.",
    details: [
      { label: "Personnages", value: "Esther, Ethan, Frantz, Chiara" },
      { label: "Période", value: "1880 à 1920" },
      { label: "Lieux", value: "Paris, Vosges, Sicile, Saint-Pétersbourg" },
      { label: "ISBN relié", value: "9782957655137" },
      { label: "ISBN broché", value: "9798325070020" },
      { label: "Promesse", value: "Âmes soeurs maudites et tragédie" },
    ],
    featured: {
      label: "Dernier roman paru",
      kicker: "Lecture phare",
      shortPitch:
        "Mariée de force au général de l'Etat major, Esther se retrouve embourbée dans les conflits politiques d'une France de 1890. Son cœur est pourtant ailleurs, loin de Paris, dans une forêt où l'attend un garçon ayant vendu son âme au diable pour elle. Entre Frantz, son mystérieux mari aussi froid que manipulateur et Ethan, cet amoureux d'enfance qu'elle veut à tout prix protéger, Esther ne sait plus qui aimer. Malheureusement, à cette époque où les tensions sont aussi vives que les conflits sont destructeurs, ils devront parvenir à survivre sans que le monde n'apprenne leurs machinations sans quoi... ils risquent tous l'exécution.",
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
          alt: "Visuel editorial de Fous-Papillons",
          label: "Visuel",
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
    slug: "coeur-de-renard-tome-2",
    title: "Coeur de Renard",
    tome: "Tome 2",
    series: "Duologie",
    pages: 525,
    isbn: "NA",
    releaseDate: "A venir",
    format: "Relie + broche",
    status: "A paraitre",
    price: "Selon edition",
    priceOptions: [
      { label: "Broche", value: "18 €" },
      { label: "Relie", value: "27 €" },
    ],
    genres: [
      "Thriller",
      "Psychologique",
      "Romance sombre",
      "Historique",
      "Art",
      "Duologie",
      "Vengeance",
    ],
    description:
      "Il l'a trahie\nElle n'a plus qu'une option :\nCambrioler sa propre banque.\nMeme si cela revient,\nA lui offrir une seconde chance.\nEn pleine seconde guerre mondiale\nLa seule issue est de devenir\nUn coeur de renard.",
    longDescription:
      "Il l'a trahie\nElle n'a plus qu'une option :\nCambrioler sa propre banque.\nMeme si cela revient,\nA lui offrir une seconde chance.\nEn pleine seconde guerre mondiale\nLa seule issue est de devenir\nUn coeur de renard.",
    cover: "/assets/covers/coeur-de-renard-tome-2--relie.webp",
    gallery: [
      {
        src: "/assets/covers/coeur-de-renard-tome-2--relie.webp",
        alt: "Couverture de Coeur de Renard - tome 2 - edition reliee",
        label: "Relie",
        edition: {
          format: "Relie",
          isbn: "NA",
          price: "27 €",
          pages: 525,
          releaseDate: "A venir",
          status: "A paraitre",
        },
      },
      {
        src: "/assets/covers/coeur-de-renard-tome-2--broche.webp",
        alt: "Couverture de Coeur de Renard - tome 2 - edition brochee",
        label: "Broche",
        edition: {
          format: "Broche",
          isbn: "NA",
          price: "18 €",
          pages: 525,
          releaseDate: "A venir",
          status: "A paraitre",
        },
      },
    ],
    accent: "#3d3834",
    quote:
      "Tu es d'une complexite terrifiante, Renard. Tout ce que je croyais sur toi est faux et tout ce que tu pourrais etre, au contraire, m'effraie.",
    hook:
      "Elle n'a plus qu'une option : cambrioler sa propre banque, meme si cela revient a lui offrir une seconde chance.",
    details: [
      { label: "Personnages", value: "Renard & Fortune" },
      { label: "Cadre", value: "Seconde Guerre mondiale" },
      { label: "Promesse", value: "Trahison, cambriolage, seconde chance" },
      { label: "Edition", value: "Roman relie ou broche" },
      { label: "ISBN relie", value: "NA" },
      { label: "ISBN broche", value: "NA" },
    ],
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
    description: "Chassé de chez lui, Johen se met en quête du cœur d’Ankaa qui, il en est persuadé, va permettre de rétablir l’ordre dans son royaume. Mais alors qu’il en est proche, la guerre s’échoue sur les rives de son continent. Plongé dans la bataille, Johen va devoir progresser sans regarder derrière lui, au risque de s’effondrer. Tous ne sortiront pas vivants de cette guerre mais Johen est déterminé à en sauver le plus possible. Alycie est une nymphe.Comme la totalité de son peuple, elle a été exilée vingt ans plus tôt pour des actes basés sur un mensonge.Alors qu'elle cherche encore sa place, une terrible révélation s'abat sur elle.Sa destinée n'est pas celle qu'elle avait imaginée.Entre complots, guerre et magie, elle va devoir faire confiance en son instinct pour survivre.Sa voie est toute tracée: il ne lui reste qu'à la suivre. \n Ils sont nés imposteurs. \n Ils seront inoubliables.",
    longDescription: "Chassé de chez lui, Johen se met en quête du cœur d’Ankaa qui, il en est persuadé, va permettre de rétablir l’ordre dans son royaume. Mais alors qu’il en est proche, la guerre s’échoue sur les rives de son continent. Plongé dans la bataille, Johen va devoir progresser sans regarder derrière lui, au risque de s’effondrer. Tous ne sortiront pas vivants de cette guerre mais Johen est déterminé à en sauver le plus possible. Alycie est une nymphe.Comme la totalité de son peuple, elle a été exilée vingt ans plus tôt pour des actes basés sur un mensonge.Alors qu'elle cherche encore sa place, une terrible révélation s'abat sur elle.Sa destinée n'est pas celle qu'elle avait imaginée.Entre complots, guerre et magie, elle va devoir faire confiance en son instinct pour survivre.Sa voie est toute tracée: il ne lui reste qu'à la suivre. \n Ils sont nés imposteurs. \n Ils seront inoubliables.",
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
