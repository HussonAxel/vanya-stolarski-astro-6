import assert from 'node:assert/strict';
import { test } from 'node:test';
import { reviews, amazonReviewSources } from '../src/data/reviews';
import { isVerifiedAmazonReview, mergeVerifiedReviews } from '../src/lib/reviews';
import { conversionForLink } from '../src/lib/conversion-events';

test('unverified CMS reviews cannot restore invented ratings or attribution', () => {
  const unverified = { ...reviews[0], rating: undefined, author: 'Vanya Stolarski', sourceVerifiedAt: undefined };
  assert.equal(isVerifiedAmazonReview(unverified), false);
  assert.deepEqual(mergeVerifiedReviews(reviews, [unverified]), reviews);
  assert.equal(mergeVerifiedReviews(reviews, [reviews[0]]).length, reviews.length);
  assert.ok(reviews.some(review => review.rating === 4));
  assert.ok(reviews.every(isVerifiedAmazonReview));
  assert.equal(amazonReviewSources.find(source => source.bookSlug === 'coeur-de-renard-tome-2')?.rating, undefined);
});

test('conversion events distinguish intent from purchase and exclude private details', () => {
  const page = 'https://www.vanyastolarski.fr/tarifs?email=private@example.com';
  assert.deepEqual(conversionForLink('mailto:private@example.com?subject=secret', page), { name: 'contact_click', data: { page: '/tarifs', destination: 'email' } });
  assert.deepEqual(conversionForLink('https://www.amazon.fr/dp/B0FG8X1YMY?tag=private', page), { name: 'shop_click', data: { page: '/tarifs', destination: 'amazon' } });
  assert.equal(conversionForLink('https://www.amazon.fr/gp/customer-reviews/R123', page), undefined);
  assert.equal(conversionForLink('https://fakeamazon.fr/dp/B123', page), undefined);
  assert.equal(conversionForLink('/assets/ChapterOneBooks/ChapterOneBooks_Fous_Papillons.pdf', page)?.name, 'chapter_click');
});
