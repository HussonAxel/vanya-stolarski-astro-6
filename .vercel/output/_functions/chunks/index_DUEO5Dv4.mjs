import { c as createComponent } from './astro-component_CjVDIu3q.mjs';
import { l as maybeRenderHead, D as renderTemplate, Y as addAttribute, F as Fragment } from './transition_DxZe40lS.mjs';
import { r as renderComponent } from './entrypoint_BRtiGiUj.mjs';
import { b as books, $ as $$BookCardGallery, l as latestBook } from './books_BWU3du9d.mjs';
import { r as renderScript, $ as $$Layout } from './Layout_QqMnxkFE.mjs';
import { r as reviews } from './reviews_CjzulC4a.mjs';

const $$BookShowcase = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="livres" class="relative overflow-hidden bg-[#3a4d45] py-22 text-[#FFFAFA]"> <div class="pointer-events-none absolute inset-0"> <div class="absolute -top-[4.5rem] left-0 h-72 w-72 -translate-x-1/4 rounded-full bg-[#3a4d45] blur-3xl opacity-80"></div> <div class="absolute right-0 -bottom-24 h-96 w-96 translate-x-1/4 rounded-full bg-[#3a4d45] blur-3xl opacity-70"></div> </div> <div class="site-shell relative z-10"> <div class="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"> <div class="max-w-3xl space-y-5"> <div class="flex items-center gap-3"> <span class="h-px w-10 bg-[#FFFAFA]"></span> <span class="font-sans text-[10px] font-bold tracking-[0.35em] text-[#FFFAFA] uppercase">
Bibliothèque
</span> </div> <h2 class="font-serif text-4xl leading-none md:text-6xl text-balance">
Les romans, leurs éditions et leurs univers rassemblés dans une même vitrine.
</h2> <p class="font-sans text-base leading-relaxed text-[#FFFAFA]/78 md:text-lg">
Chaque fiche donne accès aux couvertures, aux informations clés et à une présentation plus complète du livre.
</p> </div> <a href="/reviews" class="section-panel inline-flex items-center gap-3 self-start rounded-full border-2 border-[#FFFAFA] bg-[#3a4d45] px-6 py-4 font-sans text-[11px] font-bold tracking-[0.25em] text-[#FFFAFA] uppercase shadow-[0_18px_60px_-35px_rgba(61,56,52,0.45)] transition-all duration-300 hover:border-[#3a4d45]/35 hover:bg-[#FFFAFA] hover:text-[#3d3834]">
Voir tous les avis
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12h14"></path> <path d="m12 5 7 7-7 7"></path> </svg> </a> </div> <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3"> ${books.map((book) => {
    const galleryItems = book.gallery?.length ? book.gallery : book.featured?.gallery?.length ? book.featured.gallery : [
      {
        src: book.cover,
        alt: `Couverture de ${book.title}`,
        label: "Couverture"
      }
    ];
    return renderTemplate`<article class="section-panel fade-up group flex h-full flex-col overflow-hidden rounded-[2.2rem] border border-[#FFFAFA]/10 bg-[#FFFAFA] text-[#3d3834] shadow-[0_30px_90px_-54px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-transform duration-500"> <div class="relative overflow-hidden rounded-b-[1.5rem]"> ${renderComponent($$result, "BookCardGallery", $$BookCardGallery, { "items": galleryItems, "title": `Galerie ${book.title}` })} </div> <div class="flex flex-1 flex-col p-6 text-center md:text-left"> <div class="flex flex-1 flex-col gap-4"> <h3 class="font-serif text-2xl text-[#3d3834] text-balance"> ${book.title} </h3> <p class="font-sans text-xs tracking-widest text-[#3d3834]/78 uppercase"> ${book.tome} - ${book.pages} pages - ISBN ${book.isbn} </p> <div class="flex flex-wrap justify-center gap-2 md:justify-start"> ${book.genres.map((genre) => renderTemplate`<span class="border border-[#3d3834]/10 bg-[#FFFAFA] px-2 py-1 text-[10px] tracking-wide text-[#3d3834] uppercase"> ${genre} </span>`)} </div> <p class="line-clamp-3 text-sm leading-relaxed font-light text-[#3d3834]/80"> ${book.description} </p> <a${addAttribute(`/livres/${book.slug}`, "href")} class="mt-auto inline-flex items-center text-xs font-bold tracking-widest text-[#3a4d45] uppercase hover:underline">
En savoir plus
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1"> <path d="M5 12h14"></path> <path d="m12 5 7 7-7 7"></path> </svg> </a> </div> </div> </article>`;
  })} </div> <div class="mt-20 text-center"> <a href="/livres" class="section-panel inline-flex items-center gap-3 rounded-full border border-[#3d3834]/15 bg-[#3a4d45] px-8 py-4 font-sans text-[11px] font-bold tracking-[0.25em] text-[#FFFAFA] uppercase transition-all duration-300 hover:border-[#3a4d45]/40 hover:bg-[#3a4d45] hover:text-[#FFFAFA]">
Voir toute la bibliotheque
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12h14"></path> <path d="m12 5 7 7-7 7"></path> </svg> </a> </div> </div> </section>`;
}, "D:/Documents/Projects/vanya-stolarski-astro-6/src/components/BookShowcase.astro", void 0);

const $$BookGallery = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BookGallery;
  const { items, title = "Galerie du livre" } = Astro2.props;
  const galleryId = `gallery-${Math.random().toString(36).slice(2, 10)}`;
  const slides = items.length > 0 ? items : [];
  const hasMultiple = slides.length > 1;
  return renderTemplate`${maybeRenderHead()}<div class="book-gallery space-y-4"${addAttribute(galleryId, "id")} data-gallery${addAttribute(slides.length, "data-count")}${addAttribute(title, "aria-label")}> <div class="rounded-[1.85rem] border border-[#3d3834]/8 bg-[#FFFAFA] p-2.5 shadow-[0_32px_90px_-60px_rgba(61,56,52,0.45)]"> <div class="relative overflow-hidden rounded-[1.55rem] bg-[#f6efec]"> ${slides.map((item, index) => renderTemplate`<figure${addAttribute([
    "book-gallery-slide",
    index === 0 ? "block" : "hidden"
  ], "class:list")} data-slide${addAttribute(index, "data-index")}> <img${addAttribute(item.src, "src")}${addAttribute(item.alt, "alt")} class="aspect-[4/4.9] w-full object-cover"${addAttribute(index === 0 ? "eager" : "lazy", "loading")}> </figure>`)} ${hasMultiple && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <div class="pointer-events-none absolute left-3 top-3"> <span class="pointer-events-auto rounded-full bg-[#fffaf8]/88 px-3 py-1.5 font-sans text-[10px] font-bold tracking-[0.22em] text-[#3d3834]/70 uppercase backdrop-blur-sm" data-counter>
1 / ${slides.length} </span> </div> <div class="pointer-events-none absolute inset-x-0 inset-y-0 flex items-center justify-between px-3"> <button type="button" class="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#FFFAFA]/16 bg-[#3d3834]/22 text-[#FFFAFA] backdrop-blur-sm transition-all duration-300 hover:border-[#FFFAFA]/28 hover:bg-[#fffaf8]/92 hover:text-[#3d3834]" data-prev aria-label="Image precedente"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="m15 18-6-6 6-6"></path> </svg> </button> <button type="button" class="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#FFFAFA]/16 bg-[#3d3834]/22 text-[#FFFAFA] backdrop-blur-sm transition-all duration-300 hover:border-[#FFFAFA]/28 hover:bg-[#fffaf8]/92 hover:text-[#3d3834]" data-next aria-label="Image suivante"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="m9 18 6-6-6-6"></path> </svg> </button> </div> ` })}`} </div> </div> ${hasMultiple && renderTemplate`<div class="rounded-[1.4rem] border border-[#3d3834]/8 bg-[#FFFAFA] p-3 shadow-[0_20px_60px_-48px_rgba(61,56,52,0.35)]"> <div class="space-y-2.5"> <p class="font-sans text-[10px] font-bold tracking-[0.24em] text-[#3d3834]/58 uppercase">
Choisir une vue
</p> <div class="flex flex-wrap gap-2.5" role="tablist"${addAttribute(`${title} miniatures`, "aria-label")}> ${slides.map((item, index) => renderTemplate`<button type="button"${addAttribute([
    "inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-left transition-all duration-300",
    index === 0 ? "border-[#3a4d45]/22 bg-[#3a4d45] text-[#FFFAFA]" : "border-[#3d3834]/10 bg-[#fffaf8] text-[#3d3834]/72 hover:border-[#3a4d45]/24 hover:bg-[#f3ece8]"
  ], "class:list")} data-thumb${addAttribute(index, "data-index")}${addAttribute(`Afficher ${item.label ?? `image ${index + 1}`}`, "aria-label")}${addAttribute(index === 0 ? "true" : "false", "aria-selected")} role="tab"> <span class="inline-flex h-2.5 w-2.5 rounded-full bg-current opacity-50"></span> <span class="font-sans text-[10px] font-bold tracking-[0.18em] uppercase" data-thumb-label> ${item.label ?? `Vue ${index + 1}`} </span> </button>`)} </div> </div> </div>`} </div> ${renderScript($$result, "D:/Documents/Projects/vanya-stolarski-astro-6/src/components/BookGallery.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Documents/Projects/vanya-stolarski-astro-6/src/components/BookGallery.astro", void 0);

const $$FeaturedBookHeroCommercial = createComponent(($$result, $$props, $$slots) => {
  const featured = latestBook.featured;
  const galleryItems = featured?.gallery?.length ? featured.gallery : featured?.mediaSrc ? [
    {
      src: featured.mediaSrc,
      alt: featured.mediaAlt,
      label: "Edition principale"
    }
  ] : [];
  return renderTemplate`${maybeRenderHead()}<section class="relative overflow-hidden bg-[#fff7f3] py-14 md:py-16"> <div class="pointer-events-none absolute inset-0"> <div class="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(58,77,69,0.06),transparent)]"></div> <div class="absolute right-0 top-[calc(50%-9rem)] h-72 w-72 translate-x-1/3 rounded-full bg-[#3a4d45]/8 blur-3xl"></div> </div> <div class="site-shell relative z-10 px-6"> <article class="fade-up overflow-hidden rounded-[2.5rem] border border-[#3d3834]/10 bg-[#fffaf8] p-6 shadow-[0_34px_110px_-70px_rgba(61,56,52,0.34)] md:p-8 xl:p-9 mt-20"> <div class="grid gap-7 xl:grid-cols-[minmax(0,1.06fr)_24rem] xl:items-stretch"> <div class="flex min-w-0 flex-col gap-6 xl:h-full"> <div class="flex flex-wrap items-center gap-2.5"> <span class="rounded-full bg-[#3a4d45] px-4 py-2 font-sans text-[10px] font-bold tracking-[0.28em] text-[#FFFAFA] uppercase"> ${latestBook.status} </span> <span class="rounded-full border border-[#3d3834]/10 bg-[#FFFAFA] px-4 py-2 font-sans text-[10px] font-bold tracking-[0.28em] text-[#3d3834]/78 uppercase"> ${featured?.label} </span> ${latestBook.genres.map((genre) => renderTemplate`<span class="rounded-full border border-[#3d3834]/10 bg-[#FFFAFA] px-3 py-1.5 font-sans text-[10px] font-bold tracking-[0.2em] text-[#3d3834]/70 uppercase"> ${genre} </span>`)} </div> <div class="space-y-3"> <p class="font-sans text-[10px] font-bold tracking-[0.34em] text-[#3d3834]/60 uppercase"> ${latestBook.series} - ${latestBook.tome} </p> <h2 class="max-w-3xl font-serif text-4xl leading-[0.94] text-[#3d3834] text-balance md:text-5xl xl:text-[4.2rem]"> ${latestBook.title} </h2> <p class="max-w-2xl font-sans text-base leading-relaxed text-[#3d3834]/82 md:text-lg italic"> ${latestBook.hook} </p> <p class="max-w-2xl font-sans text-sm leading-relaxed text-[#3d3834]/68 md:text-[0.98rem]"> ${featured?.shortPitch} </p> </div> <div class="mt-auto space-y-4"> <div class="grid gap-3 sm:grid-cols-3"> <div class="rounded-[1.55rem] border border-[#3d3834]/8 bg-[#FFFAFA] p-4"> <p class="font-sans text-[9px] font-bold tracking-[0.24em] text-[#3d3834]/52 uppercase">
Disponibilite
</p> <p class="mt-2 font-serif text-[1.32rem] leading-tight text-[#3d3834]"> ${latestBook.releaseDate} </p> </div> <div class="rounded-[1.55rem] border border-[#3d3834]/8 bg-[#FFFAFA] p-4"> <p class="font-sans text-[9px] font-bold tracking-[0.24em] text-[#3d3834]/52 uppercase">
Format
</p> <p class="mt-2 font-serif text-[1.32rem] leading-tight text-[#3d3834]"> ${latestBook.format} </p> </div> <div class="rounded-[1.55rem] border border-[#3d3834]/8 bg-[#3a4d45] p-4 text-[#FFFAFA]"> <p class="font-sans text-[9px] font-bold tracking-[0.24em] text-[#FFFAFA]/62 uppercase">
Prix public
</p> <p class="mt-2 font-serif text-[1.32rem] leading-tight text-[#FFFAFA]"> ${latestBook.price} </p> </div> </div> <div class="flex flex-wrap gap-3"> <a${addAttribute(`/livres/${latestBook.slug}`, "href")} class="inline-flex items-center gap-3 rounded-full bg-[#3a4d45] px-7 py-4 font-sans text-[11px] font-bold tracking-[0.24em] text-[#FFFAFA] uppercase transition-all duration-300 hover:bg-[#3d3834]">
Decouvrir le roman
</a> <a href="/reviews" class="inline-flex items-center gap-3 rounded-full border border-[#3d3834]/10 bg-[#FFFAFA] px-7 py-4 font-sans text-[11px] font-bold tracking-[0.24em] text-[#3d3834] uppercase transition-all duration-300 hover:border-[#3a4d45]/35 hover:bg-[#3a4d45] hover:text-[#FFFAFA]">
Voir les avis
</a> </div> </div> </div> <div class="flex h-full flex-col space-y-4 xl:pl-3"> ${renderComponent($$result, "BookGallery", $$BookGallery, { "items": galleryItems, "title": `Galerie ${latestBook.title}` })} </div> </div> </article> </div> </section>`;
}, "D:/Documents/Projects/vanya-stolarski-astro-6/src/components/FeaturedBookHeroCommercial.astro", void 0);

const $$Reviews = createComponent(($$result, $$props, $$slots) => {
  const leftColumnReviews = reviews.slice(0, 2);
  const rightColumnReviews = reviews.slice(2, 5);
  const truncate = (text, maxLength) => text.length <= maxLength ? text : `${text.slice(0, maxLength).trimEnd()}...`;
  return renderTemplate`${maybeRenderHead()}<section id="reviews" class="relative overflow-hidden bg-[#FFFAFA] py-22 text-[#3d3834]"> <div class="pointer-events-none absolute inset-x-0 top-0 h-28 opacity-[0.06]"> <svg viewBox="0 0 400 150" preserveAspectRatio="none" class="h-full w-full fill-[#3d3834]"> <path d="M0,64 C120,112 220,18 400,70 L400,0 L0,0 Z"></path> </svg> </div> <div class="site-shell relative z-10 px-6"> <div class="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"> <div class="max-w-3xl space-y-5"> <div class="flex items-center gap-3"> <span class="h-px w-10 bg-[#3a4d45]"></span> <span class="font-sans text-[10px] font-bold tracking-[0.35em] text-[#3a4d45] uppercase">
Avis récents
</span> </div> <h2 class="font-serif text-4xl leading-none text-balance md:text-6xl">
Quelques retours choisis, dans une composition plus dense et plus lisible.
</h2> <p class="font-sans text-base leading-relaxed text-[#3d3834]/78 md:text-lg">
Deux critiques fortes en colonne, puis trois formats plus rapides pour donner plus de rythme sans alourdir la page.
</p> </div> <a href="/reviews" class="section-panel inline-flex items-center gap-3 self-start rounded-full border border-[#3d3834]/12 bg-[#FFFAFA] px-6 py-4 font-sans text-[11px] font-bold tracking-[0.25em] text-[#3d3834] uppercase shadow-[0_18px_60px_-35px_rgba(61,56,52,0.45)] transition-all duration-300 hover:border-[#3a4d45]/35 hover:bg-[#3a4d45] hover:text-[#FFFAFA]">
Voir tous les avis
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12h14"></path> <path d="m12 5 7 7-7 7"></path> </svg> </a> </div> <div class="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]"> <div class="grid gap-5"> ${leftColumnReviews.map((review, index) => renderTemplate`<article${addAttribute([
    "section-panel fade-up group relative flex h-full flex-col overflow-hidden rounded-[2.35rem] p-6 shadow-[0_24px_80px_-50px_rgba(61,56,52,0.45)] transition-all duration-300 md:p-7",
    index === 0 ? "bg-[#3d3834] text-[#FFFAFA]" : "border border-[#3d3834]/10 bg-[#FFFAFA] text-[#3d3834]"
  ], "class:list")}> <div class="relative z-10 flex h-full flex-1 flex-col gap-5"> <div class="flex flex-wrap items-center justify-between gap-3"> <div class="flex items-center gap-3"> <span class="rounded-full px-3 py-1 font-sans text-[10px] font-bold tracking-[0.2em] uppercase"${addAttribute(`background:${index === 0 ? "#3a4d45" : review.accent}; color:#FFFAFA;`, "style")}> ${review.tag} </span> <span${addAttribute([
    "font-sans text-[10px] font-bold tracking-[0.25em] uppercase",
    index === 0 ? "text-[#FFFAFA]" : "text-[#3d3834]/72"
  ], "class:list")}> ${review.source} </span> </div> <div class="flex gap-1"> ${Array.from({ length: review.rating }).map(() => renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0"> <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path> </svg>`)} </div> </div> <blockquote> ${review.text} </blockquote> <p> ${truncate(review.excerpt, 280)} </p> <div${addAttribute([
    "mt-auto flex flex-wrap items-center justify-between gap-4 border-t pt-5",
    index === 0 ? "border-[#FFFAFA]/10" : "border-[#3d3834]/8"
  ], "class:list")}> <div> <p${addAttribute([
    "font-sans text-[10px] font-bold tracking-[0.25em] uppercase",
    index === 0 ? "text-[#FFFAFA]" : "text-[#3d3834]/72"
  ], "class:list")}> ${review.book} </p> <p${addAttribute([
    "mt-2 font-sans text-sm",
    index === 0 ? "text-[#FFFAFA]/72" : "text-[#3d3834]/72"
  ], "class:list")}> ${review.author} - ${review.date} </p> </div> <a href="/reviews"${addAttribute([
    "inline-flex items-center gap-2 font-sans text-[10px] font-bold tracking-[0.24em] uppercase transition-all duration-300 hover:gap-3",
    index === 0 ? "rounded-full border border-[#FFFAFA]/12 bg-[#FFFAFA] px-4 py-2 text-[#3d3834]" : "text-[#3d3834]"
  ], "class:list")}>
Lire plus
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12h14"></path> <path d="m12 5 7 7-7 7"></path> </svg> </a> </div> </div> </article>`)} </div> <div class="grid gap-4"> ${rightColumnReviews.map((review) => renderTemplate`<article class="section-panel fade-up group relative flex min-h-[240px] flex-col overflow-hidden rounded-lg border border-[#3d3834]/10 bg-[#FFFAFA] p-5 shadow-[0_20px_65px_-48px_rgba(61,56,52,0.34)] transition-all duration-300 md:min-h-[260px]"> <div class="relative z-10 flex h-full flex-1 flex-col gap-4 md:flex-row md:items-stretch md:justify-between"> <div class="min-w-0 flex flex-1 flex-col justify-between gap-6 self-stretch"> <div class="space-y-3"> <div class="flex flex-wrap items-center gap-3"> <span class="rounded-full px-3 py-1 font-sans text-[10px] font-bold tracking-[0.2em] uppercase"${addAttribute(`background:${review.accent}; color:#FFFAFA;`, "style")}> ${review.tag} </span> <span class="font-sans text-[10px] font-bold tracking-[0.24em] text-[#3d3834]/72 uppercase"> ${review.source} </span> </div> <blockquote> ${review.text} </blockquote> </div> <div class="flex flex-wrap items-center gap-3 text-[11px] text-[#3d3834]/78"> <div class="flex gap-1"${addAttribute(`color:${review.accent};`, "style")}> ${Array.from({ length: review.rating }).map(() => renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0"> <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path> </svg>`)} </div> <span class="font-sans text-[10px] font-bold tracking-[0.22em] text-[#3d3834]/72 uppercase"> ${review.book} </span> <span class="font-sans text-sm text-[#3d3834]/72"> ${review.author} - ${review.date} </span> </div> </div> <a href="/reviews" class="inline-flex items-center gap-2 self-start font-sans text-[10px] font-bold tracking-[0.24em] uppercase text-[#3d3834] transition-all duration-300 hover:gap-3 md:self-end">
Lire
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12h14"></path> <path d="m12 5 7 7-7 7"></path> </svg> </a> </div> </article>`)} </div> </div> </div> </section>`;
}, "D:/Documents/Projects/vanya-stolarski-astro-6/src/components/Reviews.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Vanya Stolarski - Autrice & Illustratrice" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="overflow-hidden bg-[#FFFAFA]"> ${renderComponent($$result2, "FeaturedBookHeroCommercial", $$FeaturedBookHeroCommercial, {})} ${renderComponent($$result2, "BookShowcase", $$BookShowcase, {})} ${renderComponent($$result2, "Reviews", $$Reviews, {})} <!-- <Newsletter /> --> </main> ` })}`;
}, "D:/Documents/Projects/vanya-stolarski-astro-6/src/pages/index.astro", void 0);

const $$file = "D:/Documents/Projects/vanya-stolarski-astro-6/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
