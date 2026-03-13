import { c as createComponent } from './astro-component_CjVDIu3q.mjs';
import { D as renderTemplate, l as maybeRenderHead, Y as addAttribute } from './transition_DxZe40lS.mjs';
import { r as renderComponent } from './entrypoint_BRtiGiUj.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_QqMnxkFE.mjs';

const galleryItems = [
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
    description: "Un portrait frontal de Fortune, pense comme une entree immediate dans l'aura du personnage."
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
    description: "Une lecture plus ombreuse de Renard, avec une presence plus coupee et plus nerveuse."
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
    description: "Une composition de duo qui fait monter la tension entre Renard et Fortune sans surcharger le cadre."
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
    description: "Une variation plus ample de Renard et Fortune, pensee comme un visuel de campagne plus dramatique."
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
    description: "Un marque-page exclusif a la campagne Ulule, traite comme une vraie piece de collection."
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
    description: "Un portrait d'Ethan construit sur le regard, la retenue et une tension tres intime."
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
    description: "Une planche BD exclusive a la campagne Ulule, utile pour montrer comment l'univers bascule vers le narratif dessine."
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
    description: "Un portrait de Chiara plus editorial, presque magazine, pense pour installer une attitude nette."
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
    description: "Une premiere apparition d'Aspen, plus douce et plus contemplative, ancree dans un imaginaire de character design."
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
    description: "Une etude de Frantz qui donne du poids au personnage sans quitter une lecture tres sensible."
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
    description: "Un portrait d'Esther plus dramatique, porte par une lumiere tenue et une vraie densite emotionnelle."
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
    description: "Une interpretation d'Agape plus lumineuse, pensee comme une respiration visuelle dans la serie."
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
    description: "Un visuel de Brille Papillons plus graphique, concu comme une image-signature a part entiere."
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
    description: "Un dessin d'Aspen plus brut, a la frontiere entre croquis fini et piece de galerie."
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
    description: "Une variation d'Aspen plus expressive, qui conserve un esprit fanart tout en restant editoriale."
  }
];
const galleryBookFilters = [
  "all",
  ...new Set(galleryItems.map((item) => item.bookKey))
];
const galleryBookFilterLabels = Object.fromEntries(
  galleryItems.map((item) => [item.bookKey, item.book])
);
const galleryArtistFilters = [
  "all",
  ...new Set(galleryItems.map((item) => item.artist))
];

const $$Galerie = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Galerie - Vanya Stolarski", "data-astro-cid-fd4xczjg": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="overflow-hidden bg-[#FFFAFA] text-[#3d3834]" data-astro-cid-fd4xczjg> <section class="relative overflow-hidden bg-[#3d3834] px-6 py-24 text-[#FFFAFA]" data-astro-cid-fd4xczjg> <div class="site-shell relative mt-20" data-astro-cid-fd4xczjg> <div class="mt-10 grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end" data-astro-cid-fd4xczjg> <div class="space-y-6" data-astro-cid-fd4xczjg> <span class="inline-flex rounded-full border border-[#FFFAFA]/10 bg-[#FFFAFA] px-4 py-2 font-sans text-[10px] font-bold tracking-[0.25em] text-[#3d3834] uppercase" data-astro-cid-fd4xczjg>
Galerie editoriale
</span> <h1 class="max-w-4xl font-serif text-5xl leading-none text-balance md:text-7xl" data-astro-cid-fd4xczjg>
Une galerie plus brute, plus collection, plus proche d'un mur d'atelier vivant.
</h1> <p class="max-w-2xl font-sans text-base leading-relaxed text-[#FFFAFA] md:text-lg" data-astro-cid-fd4xczjg>
Les images se lisent d'abord comme une matiere visuelle. Au clic, chaque illustration s'ouvre dans une fiche plus detaillee avec son contexte et son rattachement au roman.
</p> </div> <div class="section-panel fade-up rounded-lg border border-[#FFFAFA]/10 bg-[#FFFAFA] p-8 backdrop-blur-sm" data-astro-cid-fd4xczjg> <div class="grid grid-cols-2 gap-6" data-astro-cid-fd4xczjg> <div data-astro-cid-fd4xczjg> <p class="font-serif text-5xl text-[#3a4d45]" data-astro-cid-fd4xczjg>${galleryItems.length}</p> <p class="mt-2 font-sans text-[10px] font-bold tracking-[0.25em] text-[#3d3834] uppercase" data-astro-cid-fd4xczjg>
Visuels
</p> </div> <div data-astro-cid-fd4xczjg> <p class="font-serif text-5xl text-[#3a4d45]" data-astro-cid-fd4xczjg>${galleryArtistFilters.length - 1}</p> <p class="mt-2 font-sans text-[10px] font-bold tracking-[0.25em] text-[#3d3834] uppercase" data-astro-cid-fd4xczjg>
Artistes
</p> </div> </div> </div> </div> </div> </section> <section class="relative overflow-hidden bg-[#FFFAFA] px-6 py-16 md:py-20" data-astro-cid-fd4xczjg> <div class="site-shell relative space-y-8" data-astro-cid-fd4xczjg> <div class="section-panel fade-up rounded-[1.8rem] border border-[#3d3834]/10 bg-[#FFFAFA] p-4 shadow-[0_20px_70px_-45px_rgba(61,56,52,0.3)] backdrop-blur-sm md:p-5" data-astro-cid-fd4xczjg> <div class="space-y-3" data-astro-cid-fd4xczjg> <p id="gallery-book-filter-label" class="sr-only" data-astro-cid-fd4xczjg>Filtrer par roman</p> <div class="flex flex-wrap gap-2" data-filter-group="book" aria-labelledby="gallery-book-filter-label" data-astro-cid-fd4xczjg> ${galleryBookFilters.map((filter) => renderTemplate`<button type="button"${addAttribute(filter, "data-book-filter")} data-filter-kind="book"${addAttribute(filter === "all" ? "true" : "false", "data-active")} class="gallery-filter rounded-full border border-[#3d3834]/10 bg-[#FFFAFA] px-3 py-2 font-sans text-[9px] font-bold tracking-[0.18em] text-[#3d3834] uppercase transition-all duration-300"${addAttribute(filter === "all" ? "Afficher tous les romans" : `Filtrer par ${galleryBookFilterLabels[filter]}`, "aria-label")} data-astro-cid-fd4xczjg> ${filter === "all" ? "Tout" : galleryBookFilterLabels[filter]} </button>`)} </div> <div class="h-px w-full bg-[#3d3834]" data-astro-cid-fd4xczjg></div> <p id="gallery-artist-filter-label" class="sr-only" data-astro-cid-fd4xczjg>Filtrer par artiste</p> <div class="flex flex-wrap gap-2" data-filter-group="artist" aria-labelledby="gallery-artist-filter-label" data-astro-cid-fd4xczjg> ${galleryArtistFilters.map((filter) => renderTemplate`<button type="button"${addAttribute(filter, "data-artist-filter")} data-filter-kind="artist"${addAttribute(filter === "all" ? "true" : "false", "data-active")} class="gallery-filter rounded-full border border-[#3d3834]/10 bg-[#FFFAFA] px-3 py-2 font-sans text-[9px] font-bold tracking-[0.18em] text-[#3d3834] uppercase transition-all duration-300"${addAttribute(filter === "all" ? "Afficher tous les artistes" : `Filtrer par ${filter}`, "aria-label")} data-astro-cid-fd4xczjg> ${filter === "all" ? "Tout" : filter} </button>`)} </div> </div> </div> <div class="w-full" data-astro-cid-fd4xczjg> <div id="gallery-grid" class="gallery-columns columns-1 gap-4 sm:columns-2 xl:columns-4" data-astro-cid-fd4xczjg> ${galleryItems.map((item) => renderTemplate`<button type="button" class="gallery-item gallery-card fade-up group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-[1.35rem] border border-[#3d3834]/8 bg-[#FFFAFA] shadow-[0_24px_80px_-52px_rgba(61,56,52,0.45)] transition-all duration-300 hover:shadow-[0_30px_90px_-52px_rgba(61,56,52,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3a4d45]"${addAttribute(item.bookKey, "data-book")}${addAttribute(item.artist, "data-artist")} data-gallery-trigger${addAttribute(item.title, "data-title")}${addAttribute(item.image, "data-image")}${addAttribute(item.alt, "data-alt")}${addAttribute(item.book, "data-book-label")}${addAttribute(item.bookHref ?? "", "data-book-href")}${addAttribute(item.artist, "data-artist-label")}${addAttribute(item.date, "data-date")}${addAttribute(item.description, "data-description")}${addAttribute(`Ouvrir la fiche de ${item.title}`, "aria-label")} data-astro-cid-fd4xczjg> <div class="relative overflow-hidden bg-[#FFFAFA]" data-astro-cid-fd4xczjg> <img${addAttribute(item.image, "src")}${addAttribute(item.alt, "alt")} loading="lazy" class="w-full rounded-[1.35rem] object-cover transition-transform duration-700 group-hover:scale-[1.025]" data-astro-cid-fd4xczjg> </div> </button>`)} </div> </div> </div> </section> <div id="gallery-modal" class="pointer-events-none fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#3d3834]/72 px-4 py-4 opacity-0 transition-all duration-300 md:items-center md:py-8" role="dialog" aria-modal="true" aria-labelledby="gallery-modal-title" aria-hidden="true" data-astro-cid-fd4xczjg> <div data-gallery-close class="absolute inset-0" data-astro-cid-fd4xczjg></div> <div class="relative z-10 my-auto w-full max-w-[min(96vw,1380px)] overflow-hidden rounded-[2.2rem] border border-[#FFFAFA]/10 bg-[#FFFAFA] shadow-[0_35px_120px_-50px_rgba(61,56,52,0.6)] lg:max-h-[92vh]" data-astro-cid-fd4xczjg> <button type="button" id="gallery-modal-close" class="absolute top-4 right-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#3d3834]/10 bg-[#FFFAFA]/92 font-sans text-xs font-bold tracking-[0.2em] text-[#3d3834] uppercase shadow-[0_10px_30px_-24px_rgba(61,56,52,0.55)] transition-all duration-300 hover:border-[#3a4d45]/30 hover:bg-[#3a4d45] hover:text-[#FFFAFA]" aria-label="Fermer la popup" data-astro-cid-fd4xczjg>
X
</button> <div class="grid lg:grid-cols-[minmax(0,1fr)_400px] lg:items-stretch" data-astro-cid-fd4xczjg> <div class="relative flex min-h-[38vh] items-center justify-center overflow-hidden bg-[#3d3834] p-3 md:min-h-[48vh] md:p-4 lg:min-h-0 lg:p-5" data-astro-cid-fd4xczjg> <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,250,248,0.08),transparent_56%)]" data-astro-cid-fd4xczjg></div> <div class="relative inline-flex h-full w-full max-w-full items-center justify-center overflow-hidden rounded-[1.55rem] border border-[#FFFAFA]/8 bg-[#312d2a] p-3 shadow-[0_24px_60px_-45px_rgba(61,56,52,0.45)] md:p-4" data-astro-cid-fd4xczjg> <img id="gallery-modal-image" src="" alt="" class="block max-h-[58vh] max-w-full rounded-[1rem] object-contain md:max-h-[72vh] lg:max-h-[calc(92vh-5.5rem)]" data-astro-cid-fd4xczjg> </div> </div> <div class="min-h-0 overflow-y-auto p-6 md:p-8 lg:max-h-[92vh] lg:p-9" data-astro-cid-fd4xczjg> <div class="space-y-6" data-astro-cid-fd4xczjg> <div class="space-y-4" data-astro-cid-fd4xczjg> <div class="flex flex-wrap items-center gap-2.5" data-astro-cid-fd4xczjg> <p id="gallery-modal-artist" class="font-sans text-[10px] font-bold tracking-[0.3em] text-[#3d3834] uppercase" data-astro-cid-fd4xczjg></p> <span class="inline-flex rounded-full border border-[#3d3834]/10 bg-[#fffaf8] px-3 py-1.5 font-sans text-[9px] font-bold tracking-[0.22em] text-[#3d3834]/70 uppercase" data-astro-cid-fd4xczjg>
Illustration
</span> </div> <div data-astro-cid-fd4xczjg> <h2 id="gallery-modal-title" class="font-serif text-3xl leading-none text-balance md:text-4xl" data-astro-cid-fd4xczjg></h2> <p id="gallery-modal-description" class="mt-4 font-sans text-sm leading-relaxed text-[#3d3834]/78 md:text-base" data-astro-cid-fd4xczjg></p> </div> </div> <div class="rounded-[1.7rem] border border-[#3d3834]/10 bg-[#fffaf8] p-5" data-astro-cid-fd4xczjg> <p class="font-sans text-[10px] font-bold tracking-[0.22em] text-[#3d3834]/58 uppercase" data-astro-cid-fd4xczjg>
Contexte
</p> <dl class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1" data-astro-cid-fd4xczjg> <div class="space-y-1" data-astro-cid-fd4xczjg> <dt class="font-sans text-[10px] font-bold tracking-[0.22em] text-[#3d3834]/55 uppercase" data-astro-cid-fd4xczjg>Roman</dt> <dd id="gallery-modal-book" class="font-serif text-[1.55rem] leading-tight text-[#3d3834] break-words" data-astro-cid-fd4xczjg></dd> </div> <div class="space-y-1" data-astro-cid-fd4xczjg> <dt class="font-sans text-[10px] font-bold tracking-[0.22em] text-[#3d3834]/55 uppercase" data-astro-cid-fd4xczjg>Artiste</dt> <dd id="gallery-modal-artist-detail" class="font-serif text-[1.45rem] leading-tight text-[#3d3834] break-words" data-astro-cid-fd4xczjg></dd> </div> <div class="space-y-1 sm:col-span-2 lg:col-span-1" data-astro-cid-fd4xczjg> <dt class="font-sans text-[10px] font-bold tracking-[0.22em] text-[#3d3834]/55 uppercase" data-astro-cid-fd4xczjg>Date</dt> <dd id="gallery-modal-date" class="font-serif text-[1.45rem] leading-tight text-[#3d3834]" data-astro-cid-fd4xczjg></dd> </div> </dl> </div> <div class="rounded-[1.7rem] border border-[#3d3834]/10 bg-[#FFFAFA] p-5" data-astro-cid-fd4xczjg> <p class="font-sans text-[10px] font-bold tracking-[0.22em] text-[#3d3834]/58 uppercase" data-astro-cid-fd4xczjg>
Note visuelle
</p> <p id="gallery-modal-alt" class="mt-3 font-sans text-sm leading-relaxed text-[#3d3834]/78 md:text-[0.95rem]" data-astro-cid-fd4xczjg></p> </div> <div class="flex flex-wrap gap-3 pt-1" data-astro-cid-fd4xczjg> <a id="gallery-modal-link" href="#" class="inline-flex items-center gap-3 rounded-full bg-[#3d3834] px-6 py-4 font-sans text-[11px] font-bold tracking-[0.24em] text-[#FFFAFA] uppercase transition-all duration-300 hover:bg-[#3a4d45]" data-astro-cid-fd4xczjg>
Voir le roman
</a> </div> </div> </div> </div> </div> </div> ${renderScript($$result2, "D:/Documents/Projects/vanya-stolarski-astro-6/src/pages/galerie.astro?astro&type=script&index=0&lang.ts")} </main> ` })}`;
}, "D:/Documents/Projects/vanya-stolarski-astro-6/src/pages/galerie.astro", void 0);

const $$file = "D:/Documents/Projects/vanya-stolarski-astro-6/src/pages/galerie.astro";
const $$url = "/galerie";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Galerie,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
