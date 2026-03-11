export interface Review {
  id: string;
  rating: number;
  text: string;
  excerpt: string;
  bookSlug: string;
  book: string;
  date: string;
  author: string;
  source: string;
  tag: string;
  accent: string;
}

export const reviews: Review[] = [
  {
    id: "revue-atelier-1",
    rating: 5,
    text:
      "Une lecture d'une rare elegance. Le roman installe une tension douce et venimeuse qui ne retombe jamais.",
    excerpt:
      "Placeholder review longue. Vous pourrez remplacer ce texte par une critique complete, une chronique presse ou une citation lectrice plus developpee.",
    bookSlug: "fous-papillons",
    book: "Fous-Papillons",
    date: "17 septembre 2025",
    author: "Chroniqueuse placeholder",
    source: "Atelier des pages",
    tag: "Coup de coeur",
    accent: "#3a4d45",
  },
  {
    id: "revue-lanterne-2",
    rating: 5,
    text:
      "La plume est visuelle, sensuelle, et chaque scene semble eclairee par une chandelle trop pres du velours.",
    excerpt:
      "Placeholder review longue. Cette zone pourra accueillir une critique plus complete avec plusieurs phrases et un ton plus personnel ou journalistique.",
    bookSlug: "coeur-de-renard",
    book: "Coeur De Renard",
    date: "2 octobre 2025",
    author: "Redaction placeholder",
    source: "La Lanterne Noire",
    tag: "Ambiance marquante",
    accent: "#3a4d45",
  },
  {
    id: "revue-observatoire-3",
    rating: 4,
    text:
      "Un univers tres maitrise, avec une sensation de legende ancienne qui continue de vibrer apres la derniere page.",
    excerpt:
      "Placeholder review longue. Remplacez-la plus tard par une vraie citation, un passage de blog litteraire ou une review Instagram retravaillee.",
    bookSlug: "le-coeur-dankaa",
    book: "Le coeur d'Ankaa",
    date: "12 novembre 2025",
    author: "Media placeholder",
    source: "Observatoire Fantasy",
    tag: "Univers fort",
    accent: "#3a4d45",
  },
  {
    id: "revue-velours-4",
    rating: 5,
    text:
      "On sent une vraie direction artistique dans l'ecriture: silhouettes, textures, regards, tout reste en memoire.",
    excerpt:
      "Placeholder review longue. Vous pourrez y coller une critique entiere ou bien un montage de plusieurs retours lecteurs.",
    bookSlug: "fous-papillons",
    book: "Fous-Papillons",
    date: "6 janvier 2026",
    author: "Lectrice placeholder",
    source: "Velours & papier",
    tag: "Lecture immersive",
    accent: "#3a4d45",
  },
  {
    id: "revue-minuit-5",
    rating: 5,
    text:
      "Entre noirceur, grace et tension, le texte trouve une voix tres singuliere.",
    excerpt:
      "Placeholder review longue. Servez-vous de cet espace pour stocker une version plus longue de la citation utilisee sur la home.",
    bookSlug: "coeur-de-renard",
    book: "Coeur De Renard",
    date: "21 fevrier 2026",
    author: "Blog placeholder",
    source: "Minuit Critique",
    tag: "Voix singuliere",
    accent: "#3d3834",
  },
];

export const homepageReviews = reviews.slice(0, 3);
