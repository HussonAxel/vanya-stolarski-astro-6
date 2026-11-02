// Manually checked Amazon snapshots, not a live feed or a calculated Amazon score.
export interface Review {
  id: string;
  rating?: number;
  text: string;
  excerpt: string;
  bookSlug: string;
  book: string;
  date: string;
  author: string;
  source: string;
  tag: string;
  accent: string;
  link?: string;
  isbn?: string;
  sourceVerifiedAt?: string;
}

export const amazonReviewSources = [
  { book: 'Fous-Papillons', bookSlug: 'fous-papillons', asin: 'B0FG8X1YMY', url: 'https://www.amazon.fr/dp/B0FG8X1YMY', rating: 4.8, ratingCount: 20, checkedAt: '2026-11-02' },
  { book: 'Cœur de Renard - Tome 1', bookSlug: 'coeur-de-renard', asin: 'B0GKN5WW28', url: 'https://www.amazon.fr/dp/B0GKN5WW28', rating: 4.6, ratingCount: 6, checkedAt: '2026-11-02' },
  { book: 'Cœur de Renard - Tome 2', bookSlug: 'coeur-de-renard-tome-2', asin: 'B0HHX8W66W', url: 'https://www.amazon.fr/dp/B0HHX8W66W', rating: undefined, ratingCount: undefined, checkedAt: '2026-11-02' },
];

const checkedReviews = [
  { id: 'R38SPK65NUSBRG', author: 'Elsa', rating: 5, date: '31 août 2026', bookSlug: 'fous-papillons', text: 'superbe lecture qui ne nous laisse pas indemne !' },
  { id: 'R1TKLXM54PZDYX', author: 'Anonyme', rating: 4, date: '27 novembre 2025', bookSlug: 'fous-papillons', text: "J'ai beaucoup apprécié ma lecture. Merci." },
  { id: 'R1I1JRZVAKKSM9', author: 'Salomé', rating: 5, date: '24 août 2025', bookSlug: 'fous-papillons', text: 'La plume est excellente.' },
  { id: 'R17BUND7ESFOMA', author: 'Bookshavethorns', rating: 5, date: '14 octobre 2026', bookSlug: 'coeur-de-renard', text: "La plume de l'auteure m'a beaucoup marquée." },
  { id: 'R2GFLKMN0DILHM', author: 'Océane B.', rating: 4, date: '18 mai 2026', bookSlug: 'coeur-de-renard', text: "J'ai adoré ma lecture." },
  { id: 'R2GPNQA3LMI4JV', author: 'Emma Uzn', rating: 5, date: '13 février 2026', bookSlug: 'coeur-de-renard', text: 'Je ne peux que recommander cette lecture.' },
];

export const reviews: Review[] = checkedReviews.map(review => ({
  ...review,
  book: amazonReviewSources.find(source => source.bookSlug === review.bookSlug)!.book,
  excerpt: review.text,
  source: 'Amazon',
  tag: 'Extrait d’avis Amazon',
  accent: '#3a4d45',
  link: `https://www.amazon.fr/gp/customer-reviews/${review.id}`,
  sourceVerifiedAt: '2026-11-02',
}));
