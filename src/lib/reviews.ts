import type { Review } from '../data/reviews';

export const isVerifiedAmazonReview = (review: Review) =>
  Boolean(
    /^\d{4}-\d{2}-\d{2}$/.test(review.sourceVerifiedAt || '') &&
    !Number.isNaN(Date.parse(review.sourceVerifiedAt || '')) &&
    review.source === 'Amazon' &&
    /^https:\/\/(www\.)?amazon\.fr\/(?:gp\/customer-reviews\/|portal\/customer-reviews\/srp\/-\/)[A-Z0-9]+(?:[/?#]|$)/.test(review.link || '') &&
    review.author.trim() && review.bookSlug && review.text.trim() &&
    Number.isInteger(review.rating) && review.rating! >= 1 && review.rating! <= 5
  );

export const mergeVerifiedReviews = (curated: Review[], cms: Review[]) => {
  const bySource = new Map<string, Review>();
  for (const review of [...curated, ...cms].filter(isVerifiedAmazonReview)) {
    bySource.set(review.link!.split(/[?#]/)[0].replace(/\/$/, ''), review);
  }
  return [...bySource.values()];
};
