import { c as createComponent } from './astro-component_CIy402ez.mjs';
import { D as renderTemplate, l as maybeRenderHead, Y as addAttribute } from './transition_aFiTmAOW.mjs';
import { r as renderComponent } from './entrypoint_KdGt3AND.mjs';
import { r as reviews } from './reviews_CjzulC4a.mjs';
import { $ as $$Layout } from './Layout_DRO1MNFU.mjs';

const $$Reviews = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Avis de lecture - Vanya Stolarski" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="overflow-hidden bg-[#FFFAFA] text-[#3d3834]"> <section class="relative overflow-hidden bg-[#3d3834] px-6 py-24 text-[#FFFAFA]"> <div class="site-shell relative mt-20"> <div class="mt-10 grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end"> <div class="space-y-6"> <span class="inline-flex rounded-full border border-[#FFFAFA]/10 bg-[#FFFAFA] px-4 py-2 font-sans text-[10px] font-bold tracking-[0.25em] text-[#3d3834] uppercase">
Avis de lecture
</span> <h1 class="max-w-4xl font-serif text-5xl leading-none text-balance md:text-7xl">
Tous les retours de lecture réunis dans une page éditoriale, ample et lisible.
</h1> <p class="max-w-2xl font-sans text-base leading-relaxed text-[#FFFAFA] md:text-lg">
Amazon, Instagram et retours de lecture : chaque avis garde sa source, sa date et un extrait plus développé.
</p> </div> <div class="section-panel fade-up rounded-lg border border-[#FFFAFA]/10 bg-[#FFFAFA] p-8 backdrop-blur-sm"> <p class="font-serif text-6xl text-[#3a4d45]">${reviews.length}</p> <p class="mt-3 font-sans text-[10px] font-bold tracking-[0.25em] text-[#3d3834] uppercase">
Avis déjà intégrés
</p> </div> </div> </div> </section> <section class="relative overflow-hidden bg-[#FFFAFA] px-6 py-20"> <div class="site-shell"> ${reviews.map((review, index) => {
    const hasExtendedBody = review.excerpt.trim() !== review.text.trim() && review.excerpt.length > review.text.length + 40;
    return renderTemplate`<article${addAttribute([
      "fade-up relative py-12 md:py-16",
      index > 0 ? "border-t border-[#3d3834]/10" : ""
    ], "class:list")}> <div class="grid gap-10 xl:grid-cols-[16rem_minmax(0,1fr)] xl:gap-14"> <aside class="space-y-6"> <div class="flex flex-wrap items-center gap-3"> <span class="rounded-full px-4 py-2 font-sans text-[10px] font-bold tracking-[0.25em] uppercase"${addAttribute(`background:${review.accent}; color:#FFFAFA;`, "style")}> ${review.tag} </span> <span class="font-sans text-[10px] font-bold tracking-[0.25em] text-[#3d3834] uppercase"> ${review.source} </span> </div> <div class="space-y-3"> <div class="flex gap-1"${addAttribute(`color:${review.accent};`, "style")}> ${Array.from({ length: review.rating }).map(() => renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0"> <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path> </svg>`)} </div> <p class="font-sans text-[10px] font-bold tracking-[0.25em] text-[#3a4d45] uppercase"> ${review.book} </p> <p class="font-sans text-sm leading-relaxed text-[#3d3834]/72"> ${review.author} - ${review.date} </p> </div> <div class="flex flex-wrap gap-3"> ${review.link && renderTemplate`<a${addAttribute(review.link, "href")} target="_blank" rel="noreferrer" class="inline-flex items-center gap-3 rounded-full border border-[#3d3834]/10 bg-[#FFFAFA] px-5 py-3 font-sans text-[10px] font-bold tracking-[0.24em] text-[#3d3834] uppercase transition-all duration-300 hover:border-[#3a4d45]/35 hover:text-[#3a4d45]">
Voir l'avis
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 7h10v10"></path> <path d="M7 17 17 7"></path> </svg> </a>`} <a${addAttribute(`/livres/${review.bookSlug}`, "href")} class="inline-flex items-center gap-3 rounded-full border border-[#3d3834]/10 bg-[#FFFAFA] px-5 py-3 font-sans text-[10px] font-bold tracking-[0.24em] text-[#3d3834] uppercase transition-all duration-300 hover:border-[#3a4d45]/35 hover:text-[#3a4d45]">
Voir le roman
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12h14"></path> <path d="m12 5 7 7-7 7"></path> </svg> </a> </div> </aside> <div class="space-y-6 md:space-y-7"> <div class="flex items-center gap-3"> <span class="h-px w-12 bg-[#3a4d45]/28"></span> <span class="font-sans text-[9px] font-bold tracking-[0.26em] text-[#3d3834]/42 uppercase">
Extrait
</span> </div> <blockquote class="max-w-[34ch] font-serif text-[1.9rem] leading-[1.1] text-[#3d3834] text-balance md:text-[2.9rem]"> ${review.text} </blockquote> ${hasExtendedBody && renderTemplate`<div class="max-w-[72ch] space-y-3"> <p class="font-sans text-[9px] font-bold tracking-[0.24em] text-[#3d3834]/45 uppercase">
Lecture complète
</p> <p class="font-sans text-[15px] leading-8 text-[#3d3834]/74 md:text-base md:leading-[1.9]"> ${review.excerpt} </p> </div>`} </div> </div> </article>`;
  })} </div> </section> </main> ` })}`;
}, "D:/Documents/Projects/vanya-stolarski-astro-6/src/pages/reviews.astro", void 0);

const $$file = "D:/Documents/Projects/vanya-stolarski-astro-6/src/pages/reviews.astro";
const $$url = "/reviews";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Reviews,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
