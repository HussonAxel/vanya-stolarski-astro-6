import { c as createComponent } from './astro-component_CjVDIu3q.mjs';
import { D as renderTemplate, l as maybeRenderHead, Y as addAttribute } from './transition_DxZe40lS.mjs';
import { r as renderComponent } from './entrypoint_BRtiGiUj.mjs';
import { b as books, l as latestBook, $ as $$BookCardGallery } from './books_BWU3du9d.mjs';
import { $ as $$Layout } from './Layout_QqMnxkFE.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Livres - Vanya Stolarski" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="bg-[#FFFAFA] text-[#3d3834]"> <section class="relative overflow-hidden bg-[#3d3834] px-6 py-24 text-[#FFFAFA]"> <div class="site-shell relative flex flex-col gap-10"> <div class="grid gap-10 md:grid-cols-[1.3fr_0.7fr] md:items-end mt-20"> <div class="space-y-6"> <span class="inline-flex rounded-full border border-[#FFFAFA]/10 bg-[#FFFAFA] px-4 py-2 font-sans text-[10px] font-bold tracking-[0.25em] text-[#3d3834] uppercase">
Bibliotheque
</span> <h1 class="max-w-4xl font-serif text-5xl leading-none text-balance md:text-7xl">
Les livres vivent ici, avec la meme tension feutree que la page
              d'accueil.
</h1> <p class="max-w-2xl font-sans text-base leading-relaxed text-[#FFFAFA] md:text-lg">
Chaque fiche rassemble les couvertures, les informations clés,
              les genres, les liens d'achat et une présentation plus ample de
              chaque roman.
</p> </div> <div class="fade-up rounded-lg border border-[#FFFAFA]/10 bg-[#FFFAFA] p-8 backdrop-blur-sm"> <div class="grid grid-cols-2 gap-6"> <div> <p class="font-serif text-5xl text-[#3a4d45]">${books.length}</p> <p class="mt-2 font-sans text-[10px] font-bold tracking-[0.25em] text-[#3d3834] uppercase">
Livres
</p> </div> <div> <p class="font-serif text-5xl text-[#3a4d45]"> ${latestBook.releaseDate} </p> <p class="mt-2 font-sans text-[10px] font-bold tracking-[0.25em] text-[#3d3834] uppercase">
Derniere parution
</p> </div> </div> <a${addAttribute(`/livres/${latestBook.slug}`, "href")} class="mt-8 inline-flex items-center gap-3 rounded-lg border border-[#3d3834]/10 px-4 py-3 font-sans text-[11px] font-bold tracking-[0.2em] text-[#3d3834] uppercase transition-all duration-300 hover:border-[#3a4d45]/30 hover:text-[#3a4d45] w-full justify-between"${addAttribute(`Ouvrir la fiche de ${latestBook.title}`, "aria-label")}>
Voir ${latestBook.title} <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12h14"></path> <path d="m12 5 7 7-7 7"></path> </svg> </a> </div> </div> </div> </section> <section class="px-6 py-24"> <div class="site-shell"> <div class="grid gap-10 lg:grid-cols-3"> ${books.map((book, index) => {
    const galleryItems = book.gallery?.length ? book.gallery : [
      {
        src: book.cover,
        alt: `Couverture de ${book.title}`,
        label: "Couverture"
      }
    ];
    return renderTemplate`<article class="fade-up group flex h-full flex-col overflow-hidden rounded-lg border border-[#3d3834]/10 bg-[#FFFAFA] shadow-[0_24px_80px_-40px_rgba(61,56,52,0.45)]"> <div class="relative overflow-hidden"${addAttribute(`background:${book.accent};`, "style")}> ${renderComponent($$result2, "BookCardGallery", $$BookCardGallery, { "items": galleryItems, "title": `Galerie ${book.title}` }, { "overlay": ($$result3) => renderTemplate`<div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3d3834]/45 via-transparent to-transparent"></div><div class="pointer-events-none absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4"> <div> <p class="font-sans text-[10px] font-bold tracking-[0.3em] text-[#FFFAFA] uppercase"> ${book.series} </p> <h2 class="mt-2 font-serif text-3xl text-[#FFFAFA] text-balance"> ${book.title} </h2> </div> <span class="rounded-full border border-[#FFFAFA]/20 bg-[#FFFAFA] px-3 py-1 font-sans text-[10px] font-bold tracking-[0.25em] text-[#3d3834] uppercase"> ${String(index + 1).padStart(2, "0")} </span> </div>` })} </div> <div class="flex flex-1 flex-col gap-6 p-8"> <div class="flex flex-wrap gap-2"> ${book.genres.map((genre) => renderTemplate`<span class="rounded-full border border-[#3d3834]/10 bg-[#FFFAFA] px-3 py-1 font-sans text-[10px] font-bold tracking-[0.12em] text-[#3d3834] uppercase"> ${genre} </span>`)} </div> <p class="font-sans text-sm leading-relaxed text-[#3d3834]/78"> ${book.description} </p> <div class="mt-auto flex flex-col gap-6"> <div class="grid grid-cols-3 gap-4 border-y border-[#3d3834]/10 py-5"> <div> <p class="font-serif text-2xl">${book.pages}</p> <p class="font-sans text-[10px] font-bold tracking-[0.2em] text-[#3d3834] uppercase">
Pages
</p> </div> <div> <p class="font-serif text-2xl"> ${book.tome.replace("Tome ", "T")} </p> <p class="font-sans text-[10px] font-bold tracking-[0.2em] text-[#3d3834] uppercase">
Volume
</p> </div> <div> <p class="font-serif text-2xl"> ${book.status === "En ecriture" ? "WIP" : "OK"} </p> <p class="font-sans text-[10px] font-bold tracking-[0.2em] text-[#3d3834] uppercase">
Etat
</p> </div> </div> <div class="flex flex-col gap-4"> <a${addAttribute(`/livres/${book.slug}`, "href")} class="inline-flex items-center justify-between gap-3 rounded-lg bg-[#3d3834] px-6 py-3 font-sans text-[11px] font-bold tracking-[0.25em] text-[#FFFAFA] uppercase transition-all duration-300 w-full">
Ouvrir la fiche
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12h14"></path> <path d="m12 5 7 7-7 7"></path> </svg> </a> <a${addAttribute(`/livres/${book.slug}`, "href")} class="inline-flex items-center gap-3 rounded-lg bg-[#3d3834] px-6 py-3 font-sans text-[11px] font-bold tracking-[0.25em] text-[#FFFAFA] uppercase transition-all duration-300 w-full">
Télécharger le premier chapitre${" "} <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12h14"></path> <path d="m12 5 7 7-7 7"></path> </svg> </a> </div> </div> </div> </article>`;
  })} </div> </div> </section> </main> ` })}`;
}, "D:/Documents/Projects/vanya-stolarski-astro-6/src/pages/livres/index.astro", void 0);

const $$file = "D:/Documents/Projects/vanya-stolarski-astro-6/src/pages/livres/index.astro";
const $$url = "/livres";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
