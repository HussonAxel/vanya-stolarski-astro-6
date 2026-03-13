import { c as createComponent } from './astro-component_CjVDIu3q.mjs';
import { D as renderTemplate, l as maybeRenderHead, Y as addAttribute } from './transition_DxZe40lS.mjs';
import { r as renderComponent } from './entrypoint_BRtiGiUj.mjs';
import { $ as $$Layout } from './Layout_QqMnxkFE.mjs';

const citations = [
  {
    quoteNumber: 1,
    createdAt: "19 décembre 2025",
    quote: "Si Ethan ne voyait pas d’un mauvais oeil l’idée d’aller en enfer, celle qu’Esther soit condamnée à l’éternelle perdition ne lui était pas supportable.",
    authorOfQuote: "Vanya Stolarski"
  },
  {
    quoteNumber: 2,
    createdAt: "15 août 2025",
    quote: "Le salon était si vide, la chambre si froide, le lit trop grand et son coeur trop vide de n’avoir personne à aimer.",
    authorOfQuote: "Vanya Stolarski"
  },
  {
    quoteNumber: 3,
    createdAt: "15 août 2025",
    quote: "Il avait encore un atout dans sa poche. Un atout qui pouvait lui sauver la peau autant que le condamner.",
    authorOfQuote: "Vanya Stolarski"
  },
  {
    quoteNumber: 4,
    createdAt: "15 août 2025",
    quote: "Fortune était ce genre de femme à trouver un cap en pleine tempête, à remplacer le capitaine si celui-ci venait à tomber. Elle rétablissait l'ordre et le créait là où il n'y en avait pas.",
    authorOfQuote: "Vanya Stolarski"
  },
  {
    quoteNumber: 5,
    createdAt: "15 août 2025",
    quote: "Fortune était la solution à presque tous ses problèmes et, non content d'avoir bénéficié de sa générosité sans rien lui offrir en retour, il comptait l'extorquer d'une bien vile manière : en utilisant contre elle sa bonne foi et son désir de révolte.",
    authorOfQuote: "Vanya Stolarski"
  }
];

const $$Citations = createComponent(($$result, $$props, $$slots) => {
  const accents = ["#3a4d45", "#3d3834", "#8b5e3c"];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Citations - Vanya Stolarski" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="overflow-hidden bg-[#FFFAFA] text-[#3d3834]"> <section class="relative overflow-hidden bg-[#3d3834] px-6 py-24 text-[#FFFAFA]"> <div class="site-shell relative mt-20"> <div class="mt-10 grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end"> <div class="space-y-6"> <span class="inline-flex rounded-full border border-[#FFFAFA]/10 bg-[#FFFAFA] px-4 py-2 font-sans text-[10px] font-bold tracking-[0.25em] text-[#3d3834] uppercase">
Extraits de romans
</span> <h1 class="max-w-4xl font-serif text-5xl leading-none text-balance md:text-7xl">
Des phrases choisies pour laisser respirer la voix des livres.
</h1> <p class="max-w-2xl font-sans text-base leading-relaxed text-[#FFFAFA] md:text-lg">
Une page plus légère que les avis, pensée comme un recueil de citations issues de l'univers de Vanya Stolarski.
</p> </div> <div class="section-panel fade-up rounded-lg border border-[#FFFAFA]/10 bg-[#FFFAFA] p-8 backdrop-blur-sm"> <p class="font-serif text-6xl text-[#3a4d45]">${citations.length}</p> <p class="mt-3 font-sans text-[10px] font-bold tracking-[0.25em] text-[#3d3834] uppercase">
Citations en ligne
</p> </div> </div> </div> </section> <section class="relative overflow-hidden bg-[#FFFAFA] px-6 py-20"> <div class="site-shell grid gap-6 lg:grid-cols-2"> ${citations.map((citation, index) => {
    const accent = accents[index % accents.length];
    return renderTemplate`<article${addAttribute([
      "section-panel fade-up group relative overflow-hidden rounded-[2.35rem] border border-[#3d3834]/10 bg-[#FFFAFA] p-7 shadow-[0_24px_80px_-48px_rgba(61,56,52,0.38)] backdrop-blur-sm transition-all duration-300 md:p-8",
      index % 3 === 0 ? "lg:col-span-2" : ""
    ], "class:list")}> <div aria-hidden="true" class="pointer-events-none absolute top-0 right-0 h-36 w-36 rounded-full blur-3xl opacity-30"${addAttribute(`background:${accent};`, "style")}></div> <div class="relative z-10 space-y-6"> <div class="flex flex-wrap items-center justify-between gap-4"> <div class="flex flex-wrap items-center gap-3"> <span class="rounded-full px-4 py-2 font-sans text-[10px] font-bold tracking-[0.25em] uppercase"${addAttribute(`background:${accent}; color:#FFFAFA;`, "style")}>
Citation
</span> <span class="font-sans text-[10px] font-bold tracking-[0.25em] text-[#3d3834]/74 uppercase">
Extrait de roman
</span> </div> <span class="font-sans text-[10px] font-bold tracking-[0.25em] text-[#3d3834]/58 uppercase">
Citation ${String(citation.quoteNumber).padStart(2, "0")} </span> </div> <blockquote class="max-w-4xl font-serif text-3xl leading-relaxed text-balance md:text-4xl">
"${citation.quote}"
</blockquote> <div class="flex flex-wrap items-center justify-between gap-4 border-t border-[#3d3834]/8 pt-5"> <div> <p class="font-sans text-[10px] font-bold tracking-[0.25em] text-[#3a4d45] uppercase"> ${citation.authorOfQuote} </p> <p class="mt-2 font-sans text-sm text-[#3d3834]/78"> ${citation.createdAt} </p> </div> <a href="/livres" class="inline-flex items-center gap-3 rounded-full border border-[#3d3834]/10 bg-[#FFFAFA] px-5 py-3 font-sans text-[10px] font-bold tracking-[0.24em] text-[#3d3834] uppercase transition-all duration-300 hover:border-[#3a4d45]/35 hover:bg-[#3a4d45] hover:text-[#FFFAFA]">
Voir les romans
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12h14"></path> <path d="m12 5 7 7-7 7"></path> </svg> </a> </div> </div> </article>`;
  })} </div> </section> </main> ` })}`;
}, "D:/Documents/Projects/vanya-stolarski-astro-6/src/pages/citations.astro", void 0);

const $$file = "D:/Documents/Projects/vanya-stolarski-astro-6/src/pages/citations.astro";
const $$url = "/citations";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Citations,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
