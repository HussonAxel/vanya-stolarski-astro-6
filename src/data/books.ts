export interface ExternalLink {
  label: string;
  href: string;
}

export interface MediaImage {
  src: string;
  alt: string;
  label?: string;
}

export interface BookDetail {
  label: string;
  value: string;
}

export interface BookEdition {
  id: string;
  label: string;
  media: MediaImage;
  publishing?: {
    format?: string;
    price?: string;
    isbn?: string;
    pages?: number;
    releaseDate?: string;
    status?: string;
  };
  links?: {
    purchase?: ExternalLink[];
  };
  narrative?: {
    hook?: string;
    description?: string;
  };
}

export interface FeaturedBookBlock {
  label: string;
  kicker: string;
  shortPitch: string;
  media: {
    type: "image" | "video";
    src: string;
    poster?: string;
    alt: string;
    gallery?: MediaImage[];
  };
  stats: Array<{ label: string; value: string }>;
  spotlight: Array<{ label: string; value: string }>;
}

export interface Book {
  slug: string;
  identity: {
    title: string;
    subtitle?: string;
    tome: string;
    series: string;
    genres: string[];
    accent: string;
  };
  publishing: {
    status: string;
    releaseDate: string;
    defaultFormat: string;
    defaultPrice?: string;
    defaultIsbn?: string;
    pages?: number;
    priceOptions?: Array<{ label: string; value: string }>;
  };
  narrative: {
    hook: string;
    shortDescription: string;
    longDescription: string;
    quote: string;
    details: BookDetail[];
  };
  media: {
    cover: MediaImage;
    editions: BookEdition[];
    relatedGalleryIds?: string[];
  };
  links: {
    purchase?: ExternalLink[];
    playlists?: ExternalLink[];
    chapterOneHref?: string;
  };
  marketing?: {
    featured?: FeaturedBookBlock;
    isLatest?: boolean;
  };
}

export type BookGalleryItem = {
  src: string;
  alt: string;
  label?: string;
};

export const books: Book[] = [
  {
    slug: "coeur-de-renard",
    identity: {
      title: "Coeur de Renard",
      tome: "Tome 1",
      series: "Duologie",
      genres: [
        "Thriller",
        "Psychologique",
        "Romance sombre",
        "Historique",
        "Art",
        "Duologie",
      ],
      accent: "#3d3834",
    },
    publishing: {
      status: "Disponible",
      releaseDate: "2025",
      defaultFormat: "Relié + broché",
      defaultPrice: "Selon édition",
      defaultIsbn: "979-10-978469-1-6",
      pages: 371,
      priceOptions: [
        { label: "Broché", value: "18 €" },
        { label: "Relié", value: "27 €" },
      ],
    },
    narrative: {
      hook: "",
      shortDescription:
        "Il est escroc.\nElle va en être victime.\nElle va la traquer sans merci.\nIl va l'aider sous une fausse identité.\nA Paris, en 1943,\nla règle est de ne jamais croire\nun coeur de Renard.",
      longDescription:
        "En pleine occupation, Renard tente de survivre en remboursant une dette qui le pousse aux pires vices, notamment en vendant des faux tableaux. Fortune, quant à elle, voit, impuissante, ses parents sombrer dans les idéologies nazies et d'extrême droite. Alors qu'elle tente de leur faire ouvrir les yeux sur les conséquences de leurs décisions, les occupants gagnent en influence sur la banque dont elle doit hériter. Son honneur sera sali si elle échoue à retrouver l'escroc qui souhaite la chute de la banque, mais quel honneur lui restera-t-il si ses parents se vendent aux nazis ?",
      quote:
        "Fortune était ce genre de femme à trouver un cap en pleine tempête, à remplacer le capitaine si celui-ci venait à tomber.",
      details: [
        { label: "Personnages", value: "Renard & Fortune" },
        { label: "Cadre", value: "Paris, 1943" },
        { label: "Promesse", value: "Traque, faux tableaux, morale grise" },
        { label: "Édition", value: "Roman relié ou broché" },
        { label: "ISBN relié", value: "9791097846909" },
        { label: "ISBN broché", value: "9791097846916" },
      ],
    },
    media: {
      cover: {
        src: "/assets/covers/Cover_CDR_Ulule.png",
        alt: "Couverture de Coeur de Renard - édition reliée",
      },
      editions: [
        {
          id: "relie",
          label: "Relié",
          media: {
            src: "/assets/covers/Cover_CDR_Ulule.png",
            alt: "Couverture de Coeur de Renard - édition reliée",
            label: "Relié",
          },
          publishing: {
            format: "Relié",
            isbn: "9791097846909",
            price: "27€",
            pages: 371,
            releaseDate: "2025",
            status: "Disponible",
          },
        },
        {
          id: "broche",
          label: "Broché",
          media: {
            src: "/assets/covers/cdr-cover-broche.webp",
            alt: "Format broché de Coeur de Renard",
            label: "Broché",
          },
          publishing: {
            format: "Broché",
            isbn: "9791097846916",
            price: "18€",
            pages: 371,
            releaseDate: "2025",
            status: "Disponible",
          },
        },
      ],
    },
    links: {
      purchase: [
        {
          label: "Boutique SumUp",
          href: "https://vanyastolarski.sumupstore.com/product/coeur-de-renard-relie",
        },
      ],
      playlists: [
        {
          label: "Playlist - Coeur De Renard",
          href: "https://www.youtube.com/watch?v=ReucEI_1ON4&list=PLVXimxL_FsmRbztlkOcut0Nn8ILUXwzRT",
        },
      ],
      chapterOneHref:
        "/assets/chapteronebooks/chapteronebooks-coeur-de-renard.pdf",
    },
    marketing: {
      isLatest: true,
      featured: {
        label: "Dernier roman paru",
        kicker: "Lecture phare",
        shortPitch:
          "En pleine occupation, Renard tente de survivre en remboursant une dette qui le pousse aux pires vices, notamment en vendant des faux tableaux. Fortune, quant à elle, voit, impuissante, ses parents sombrer dans les idéologies nazies et d'extrême droite. Alors qu'elle tente de leur faire ouvrir les yeux sur les conséquences de leurs décisions, les occupants gagnent en influence sur la banque dont elle doit hériter. Son honneur sera sali si elle échoue à retrouver l'escroc qui souhaite la chute de la banque, mais quel honneur lui restera-t-il si ses parents se vendent aux nazis ?",
        media: {
          type: "image",
          src: "/assets/covers/Cover_CDR_Ulule.png",
          poster: "/assets/covers/Cover_CDR_Ulule.png",
          alt: "Couverture de Coeur de Renard - édition reliée",
          gallery: [
            {
              src: "/assets/covers/Cover_CDR_Ulule.png",
              alt: "Couverture de Coeur de Renard - édition reliée",
              label: "Relié",
            },
            {
              src: "/assets/covers/cdr-cover-broche.webp",
              alt: "Format broché de Coeur de Renard",
              label: "Broché",
            },
          ],
        },
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
  },
  {
    slug: "fous-papillons",
    identity: {
      title: "Fous-Papillons",
      tome: "One-shot",
      series: "Roman historique fantastique",
      genres: [
        "Fantastique",
        "Historique",
        "Romance tragique",
        "Mariage arrangé",
        "Soulmates",
        "One-shot",
      ],
      accent: "#3a4d45",
    },
    publishing: {
      status: "Disponible",
      releaseDate: "2025",
      defaultFormat: "Relié + broché",
      defaultPrice: "Selon édition",
      defaultIsbn: "9782957655137",
      pages: 412,
      priceOptions: [
        { label: "Broché", value: "18 €" },
        { label: "Relié", value: "27 €" },
      ],
    },
    narrative: {
      hook:
        "Entre Frantz, son mystérieux mari, et Ethan, cet amoureux d'enfance qu'elle veut à tout prix protéger, Esther ne sait plus qui aimer.",
      shortDescription:
        "Mariée de force au général de l'Etat major, Esther se retrouve embourbée dans les conflits politiques d'une France de 1890. Son cœur est pourtant ailleurs, loin de Paris, dans une forêt où l'attend un garçon ayant vendu son âme au diable pour elle. Entre Frantz, son mystérieux mari aussi froid que manipulateur et Ethan, cet amoureux d'enfance qu'elle veut à tout prix protéger, Esther ne sait plus qui aimer. Malheureusement, à cette époque où les tensions sont aussi vives que les conflits sont destructeurs, ils devront parvenir à survivre sans que le monde n'apprenne leurs machinations sans quoi... ils risquent tous l'exécution.",
      longDescription:
        "Mariée de force au général de l'Etat major, Esther se retrouve embourbée dans les conflits politiques d'une France de 1890. Son cœur est pourtant ailleurs, loin de Paris, dans une forêt où l'attend un garçon ayant vendu son âme au diable pour elle. Entre Frantz, son mystérieux mari aussi froid que manipulateur et Ethan, cet amoureux d'enfance qu'elle veut à tout prix protéger, Esther ne sait plus qui aimer. Malheureusement, à cette époque où les tensions sont aussi vives que les conflits sont destructeurs, ils devront parvenir à survivre sans que le monde n'apprenne leurs machinations sans quoi... ils risquent tous l'exécution.",
      quote:
        "Si Ethan ne voyait pas d'un mauvais oeil l'idée d'aller en enfer, celle qu'Esther soit condamnée à l'éternelle perdition ne lui était pas supportable.",
      details: [
        { label: "Personnages", value: "Esther, Ethan, Frantz, Chiara" },
        { label: "Période", value: "1880 à 1920" },
        { label: "Lieux", value: "Paris, Vosges, Sicile, Saint-Pétersbourg" },
        { label: "ISBN relié", value: "9782957655137" },
        { label: "ISBN broché", value: "9798325070020" },
        { label: "Promesse", value: "Âmes soeurs maudites et tragédie" },
      ],
    },
    media: {
      cover: {
        src: "/assets/covers/fous-papillons-cover.webp",
        alt: "Format relié de Fous-Papillons",
      },
      editions: [
        {
          id: "relie",
          label: "Relié",
          media: {
            src: "/assets/covers/fous-papillons-cover.webp",
            alt: "Format relié de Fous-Papillons",
            label: "Relié",
          },
          publishing: {
            format: "Relié",
            isbn: "9782957655137",
            price: "27 €",
            pages: 412,
            releaseDate: "2025",
            status: "Disponible",
          },
        },
        {
          id: "broche",
          label: "Broché",
          media: {
            src: "/assets/covers/fous-papillons-featured.webp",
            alt: "Format broché de Fous-Papillons",
            label: "Broché",
          },
          publishing: {
            format: "Broché",
            isbn: "9798325070020",
            price: "18 €",
            pages: 412,
            releaseDate: "2025",
            status: "Disponible",
          },
        },
      ],
    },
    links: {
      purchase: [
        {
          label: "Amazon",
          href: "https://www.amazon.fr/Fous-Papillons-Vanya-Stolarski/dp/B0FGCKQLX6",
        },
        {
          label: "Boutique SumUp",
          href: "https://vanyastolarski.sumupstore.com/product/fous-papillons-relie-avec-jaquette",
        },
      ],
      playlists: [
        {
          label: "Playlist - Fous-Papillons",
          href: "https://www.youtube.com/watch?v=QmrU94FzTSI&list=PLVXimxL_FsmQJipEaN7eBoVW4l9XBOJqF",
        },
      ],
      chapterOneHref:
        "/assets/chapteronebooks/chapteronebooks-fous-papillons.pdf",
    },
    marketing: {
      featured: {
        label: "Dernier roman paru",
        kicker: "Lecture phare",
        shortPitch:
          "Mariée de force au général de l'Etat major, Esther se retrouve embourbée dans les conflits politiques d'une France de 1890. Son cœur est pourtant ailleurs, loin de Paris, dans une forêt où l'attend un garçon ayant vendu son âme au diable pour elle. Entre Frantz, son mystérieux mari aussi froid que manipulateur et Ethan, cet amoureux d'enfance qu'elle veut à tout prix protéger, Esther ne sait plus qui aimer. Malheureusement, à cette époque où les tensions sont aussi vives que les conflits sont destructeurs, ils devront parvenir à survivre sans que le monde n'apprenne leurs machinations sans quoi... ils risquent tous l'exécution.",
        media: {
          type: "image",
          src: "/assets/covers/fous-papillons-featured.webp",
          poster: "/assets/covers/fous-papillons-featured.webp",
          alt: "Visuel éditorial de Fous-Papillons",
          gallery: [
            {
              src: "/assets/covers/fous-papillons-cover.webp",
              alt: "Couverture de Fous-Papillons",
              label: "Couverture",
            },
            {
              src: "/assets/covers/fous-papillons-featured.webp",
              alt: "Visuel éditorial de Fous-Papillons",
              label: "Visuel",
            },
          ],
        },
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
  },
  {
    slug: "coeur-de-renard-tome-2",
    identity: {
      title: "Coeur de Renard",
      tome: "Tome 2",
      series: "Duologie",
      genres: [
        "Thriller",
        "Psychologique",
        "Romance sombre",
        "Historique",
        "Art",
        "Duologie",
        "Vengeance",
      ],
      accent: "#3d3834",
    },
    publishing: {
      status: "A paraître",
      releaseDate: "À venir",
      defaultFormat: "Relié + broché",
      defaultPrice: "Selon édition",
      defaultIsbn: "NA",
      pages: 525,
      priceOptions: [
        { label: "Broché", value: "18 €" },
        { label: "Relié", value: "27 €" },
      ],
    },
    narrative: {
      hook:
        "Elle n'a plus qu'une option : cambrioler sa propre banque, même si cela revient à lui offrir une seconde chance.",
      shortDescription:
        "Il l'a trahie\nElle n'a plus qu'une option :\nCambrioler sa propre banque.\nMême si cela revient,\nÀ lui offrir une seconde chance.\nEn pleine Seconde Guerre mondiale\nLa seule issue est de devenir\nun coeur de renard.",
      longDescription:
        "Il l'a trahie\nElle n'a plus qu'une option :\nCambrioler sa propre banque.\nMême si cela revient,\nÀ lui offrir une seconde chance.\nEn pleine Seconde Guerre mondiale\nLa seule issue est de devenir\nun coeur de renard.",
      quote:
        "Tu es d'une complexité terrifiante, Renard. Tout ce que je croyais sur toi est faux et tout ce que tu pourrais être, au contraire, m'effraie.",
      details: [
        { label: "Personnages", value: "Renard & Fortune" },
        { label: "Cadre", value: "Seconde Guerre mondiale" },
        { label: "Promesse", value: "Trahison, cambriolage, seconde chance" },
        { label: "Édition", value: "Roman relié ou broché" },
        { label: "ISBN relié", value: "NA" },
        { label: "ISBN broché", value: "NA" },
      ],
    },
    media: {
      cover: {
        src: "/assets/covers/coeur-de-renard-tome-2--relie.webp",
        alt: "Couverture de Coeur de Renard - tome 2 - édition reliée",
      },
      editions: [
        {
          id: "relie",
          label: "Relié",
          media: {
            src: "/assets/covers/coeur-de-renard-tome-2--relie.webp",
            alt: "Couverture de Coeur de Renard - tome 2 - édition reliée",
            label: "Relié",
          },
          publishing: {
            format: "Relié",
            isbn: "NA",
            price: "27 €",
            pages: 525,
            releaseDate: "À venir",
            status: "A paraître",
          },
        },
        {
          id: "broche",
          label: "Broché",
          media: {
            src: "/assets/covers/coeur-de-renard-tome-2--broche.webp",
            alt: "Couverture de Coeur de Renard - tome 2 - édition brochée",
            label: "Broché",
          },
          publishing: {
            format: "Broché",
            isbn: "NA",
            price: "18 €",
            pages: 525,
            releaseDate: "À venir",
            status: "A paraître",
          },
        },
      ],
    },
    links: {},
  },
  {
    slug: "le-coeur-dankaa",
    identity: {
      title: "Le coeur d'Ankaa",
      tome: "Tome 1",
      series: "Imposteurs",
      genres: ["Fantasy", "Guerre", "Magie"],
      accent: "#3d3834",
    },
    publishing: {
      status: "Disponible",
      releaseDate: "2021",
      defaultFormat: "Broché",
      defaultPrice: "Selon édition",
      defaultIsbn: "978-2957655106",
      pages: 479,
    },
    narrative: {
      hook:
        "Entre complots, guerre et magie, Alycie et Johen vont devoir faire confiance à leur instinct pour survivre.",
      shortDescription:
        "Chassé de chez lui, Johen se met en quête du coeur d'Ankaa qui, il en est persuadé, va permettre de rétablir l'ordre dans son royaume. Mais alors qu'il en est proche, la guerre s'échoue sur les rives de son continent. Plongé dans la bataille, Johen va devoir progresser sans regarder derrière lui, au risque de s'effondrer. Tous ne sortiront pas vivants de cette guerre mais Johen est déterminé à en sauver le plus possible. Alycie est une nymphe. Comme la totalité de son peuple, elle a été exilée vingt ans plus tôt pour des actes basés sur un mensonge. Alors qu'elle cherche encore sa place, une terrible révélation s'abat sur elle. Sa destinée n'est pas celle qu'elle avait imaginée. Entre complots, guerre et magie, elle va devoir faire confiance en son instinct pour survivre. Sa voie est toute tracée : il ne lui reste qu'à la suivre.\nIls sont nés imposteurs.\nIls seront inoubliables.",
      longDescription:
        "Chassé de chez lui, Johen se met en quête du coeur d'Ankaa qui, il en est persuadé, va permettre de rétablir l'ordre dans son royaume. Mais alors qu'il en est proche, la guerre s'échoue sur les rives de son continent. Plongé dans la bataille, Johen va devoir progresser sans regarder derrière lui, au risque de s'effondrer. Tous ne sortiront pas vivants de cette guerre mais Johen est déterminé à en sauver le plus possible. Alycie est une nymphe. Comme la totalité de son peuple, elle a été exilée vingt ans plus tôt pour des actes basés sur un mensonge. Alors qu'elle cherche encore sa place, une terrible révélation s'abat sur elle. Sa destinée n'est pas celle qu'elle avait imaginée. Entre complots, guerre et magie, elle va devoir faire confiance en son instinct pour survivre. Sa voie est toute tracée : il ne lui reste qu'à la suivre.\nIls sont nés imposteurs.\nIls seront inoubliables.",
      quote: "Ils sont nés imposteurs. Ils seront inoubliables.",
      details: [
        { label: "Personnages", value: "Johen & Alycie" },
        { label: "Quête", value: "Retrouver le coeur d'Ankaa" },
        { label: "Monde", value: "Fantasy, guerre, magie" },
        { label: "Promesse", value: "Trahisons et destin contrarié" },
      ],
    },
    media: {
      cover: {
        src: "/assets/covers/le-coeur-dankaa-cover.webp",
        alt: "Couverture de Le coeur d'Ankaa",
      },
      editions: [
        {
          id: "couverture",
          label: "Couverture",
          media: {
            src: "/assets/covers/le-coeur-dankaa-cover.webp",
            alt: "Couverture de Le coeur d'Ankaa",
            label: "Couverture",
          },
        },
      ],
    },
    links: {
      purchase: [
        {
          label: "Amazon",
          href: "https://www.amazon.fr/C%C5%93ur-dAnkaa-1-Imposteurs/dp/2957655101",
        },
      ],
    },
  },
];

export const getBookBySlug = (slug: string) =>
  books.find((book) => book.slug === slug);

export const latestBook =
  books.find((book) => book.marketing?.isLatest) ?? books[0];
