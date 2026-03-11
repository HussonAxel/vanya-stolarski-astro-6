export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  alt: string;
  bookKey: string;
  book: string;
  bookHref?: string;
  artist: string;
  date: string;
  description: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Fortune",
    image: "/assets/gallery/coeur-de-renard--fortune.webp",
    alt: "Illustration de Fortune pour Coeur De Renard",
    bookKey: "coeur-de-renard",
    book: "Coeur De Renard",
    bookHref: "/livres/coeur-de-renard",
    artist: "pumpkinspace.latte",
    date: "Fevrier 2025",
    description: "Un portrait frontal de Fortune, pense comme une entree immediate dans l'aura du personnage.",
  },
  {
    id: "gal-2",
    title: "Renard",
    image: "/assets/gallery/coeur-de-renard--renard.webp",
    alt: "Illustration de Renard pour Coeur De Renard",
    bookKey: "coeur-de-renard",
    book: "Coeur De Renard",
    bookHref: "/livres/coeur-de-renard",
    artist: "pumpkinspace.latte",
    date: "Fevrier 2025",
    description: "Une lecture plus ombreuse de Renard, avec une presence plus coupee et plus nerveuse.",
  },
  {
    id: "gal-3",
    title: "Renard & Fortune",
    image: "/assets/gallery/coeur-de-renard--renard-fortune.webp",
    alt: "Illustration de Renard et Fortune pour Coeur De Renard",
    bookKey: "coeur-de-renard",
    book: "Coeur De Renard",
    bookHref: "/livres/coeur-de-renard",
    artist: "pumpkinspace.latte",
    date: "Fevrier 2025",
    description: "Une composition de duo qui fait monter la tension entre Renard et Fortune sans surcharger le cadre.",
  },
  {
    id: "gal-4",
    title: "Renard & Fortune",
    image: "/assets/gallery/coeur-de-renard--fortune-renard-2.webp",
    alt: "Illustration de Renard et Fortune pour Coeur De Renard",
    bookKey: "coeur-de-renard",
    book: "Coeur De Renard",
    bookHref: "/livres/coeur-de-renard",
    artist: "purplishartz",
    date: "Novembre 2025",
    description:
      "Une variation plus ample de Renard et Fortune, pensee comme un visuel de campagne plus dramatique.",
  },
  {
    id: "gal-5",
    title: "Marque page Coeur De Renard",
    image: "/assets/gallery/coeur-de-renard--marque-page.webp",
    alt: "Marque page illustre pour Coeur De Renard",
    bookKey: "coeur-de-renard",
    book: "Coeur De Renard",
    bookHref: "/livres/coeur-de-renard",
    artist: "pumpkinspace.latte",
    date: "Decembre 2025",
    description:
      "Un marque-page exclusif a la campagne Ulule, traite comme une vraie piece de collection.",
  },
  {
    id: "gal-6",
    title: "Ethan",
    image: "/assets/gallery/fous-papillons--ethan.webp",
    alt: "Illustration de Ethan pour Fous Papillons",
    bookKey: "fous-papillons",
    book: "Fous Papillons",
    bookHref: "/livres/fous-papillons",
    artist: "Artsymoon",
    date: "Mars 2024",
    description: "Un portrait d'Ethan construit sur le regard, la retenue et une tension tres intime.",
  },
  {
    id: "gal-7",
    title: "Planche BD Coeur De Renard",
    image: "/assets/gallery/coeur-de-renard--planche-bd.webp",
    alt: "Planche BD illustree pour Coeur De Renard",
    bookKey: "coeur-de-renard",
    book: "Coeur De Renard",
    bookHref: "/livres/coeur-de-renard",
    artist: "purplishartz",
    date: "Decembre 2025",
    description:
      "Une planche BD exclusive a la campagne Ulule, utile pour montrer comment l'univers bascule vers le narratif dessine.",
  },
  {
    id: "gal-8",
    title: "Chiara",
    image: "/assets/gallery/fous-papillons--chiara.webp",
    alt: "Illustration de Chiara pour Fous Papillons",
    bookKey: "fous-papillons",
    book: "Fous Papillons",
    bookHref: "/livres/fous-papillons",
    artist: "Artsymoon",
    date: "Mars 2024",
    description: "Un portrait de Chiara plus editorial, presque magazine, pense pour installer une attitude nette.",
  },
  {
    id: "gal-9",
    title: "Aspen",
    image: "/assets/gallery/les-douze-divins--aspen-sarah.webp",
    alt: "Illustration de Aspen pour Les douze divins",
    bookKey: "les-douze-divins",
    book: "Les douze divins",
    artist: "blackrose_drawings",
    date: "Mars 2024",
    description: "Une premiere apparition d'Aspen, plus douce et plus contemplative, ancree dans un imaginaire de character design.",
  },
  {
    id: "gal-10",
    title: "Frantz",
    image: "/assets/gallery/fous-papillons--frantz.webp",
    alt: "Illustration de Frantz pour Fous Papillons",
    bookKey: "fous-papillons",
    book: "Fous Papillons",
    bookHref: "/livres/fous-papillons",
    artist: "Artsymoon",
    date: "Mars 2024",
    description: "Une etude de Frantz qui donne du poids au personnage sans quitter une lecture tres sensible.",
  },
  {
    id: "gal-11",
    title: "Esther",
    image: "/assets/gallery/fous-papillons--esther.webp",
    alt: "Illustration de Esther pour Fous Papillons",
    bookKey: "fous-papillons",
    book: "Fous Papillons",
    bookHref: "/livres/fous-papillons",
    artist: "Artsymoon",
    date: "Mars 2024",
    description: "Un portrait d'Esther plus dramatique, porte par une lumiere tenue et une vraie densite emotionnelle.",
  },
  {
    id: "gal-12",
    title: "Agape",
    image: "/assets/gallery/brille-papillons--agape.webp",
    alt: "Illustration Agape pour Brille Papillons",
    bookKey: "brille-papillons",
    book: "Brille Papillons",
    artist: "Artsymoon",
    date: "Mars 2024",
    description: "Une interpretation d'Agape plus lumineuse, pensee comme une respiration visuelle dans la serie.",
  },
  {
    id: "gal-13",
    title: "Brille Papillons",
    image: "/assets/gallery/brille-papillons--cover.webp",
    alt: "Illustration Brille Papillons",
    bookKey: "brille-papillons",
    book: "Brille Papillons",
    artist: "Bianca Lahr",
    date: "Decembre 2025",
    description: "Un visuel de Brille Papillons plus graphique, concu comme une image-signature a part entiere.",
  },
  {
    id: "gal-14",
    title: "Aspen",
    image: "/assets/gallery/les-douze-divins--aspen-dessin.webp",
    alt: "Croquis de Aspen pour Les douze divins",
    bookKey: "les-douze-divins",
    book: "Les douze divins",
    artist: "Vanya",
    date: "Mars 2024",
    description: "Un dessin d'Aspen plus brut, a la frontiere entre croquis fini et piece de galerie.",
  },
  {
    id: "gal-15",
    title: "Aspen",
    image: "/assets/gallery/les-douze-divins--aspen-chloe.webp",
    alt: "Illustration de Aspen pour Les douze divins",
    bookKey: "les-douze-divins",
    book: "Les douze divins",
    artist: "8kloweey",
    date: "Mars 2024",
    description: "Une variation d'Aspen plus expressive, qui conserve un esprit fanart tout en restant editoriale.",
  },
];

export const galleryBookFilters = [
  "all",
  ...new Set(galleryItems.map((item) => item.bookKey)),
];

export const galleryBookFilterLabels = Object.fromEntries(
  galleryItems.map((item) => [item.bookKey, item.book])
);

export const galleryArtistFilters = [
  "all",
  ...new Set(galleryItems.map((item) => item.artist)),
];
