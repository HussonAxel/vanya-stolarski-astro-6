import { c as createComponent } from './astro-component_CjVDIu3q.mjs';
import { D as renderTemplate, l as maybeRenderHead, Y as addAttribute } from './transition_DxZe40lS.mjs';
import { r as renderComponent } from './entrypoint_BRtiGiUj.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_QqMnxkFE.mjs';

const services = [
  {
    name: "Couverture",
    eyebrow: "Service éditorial",
    price: "Sous devis",
    accent: "#3a4d45",
    format: "Sur mesure",
    universe: "Fantasy & SF",
    focus: "Objet-livre premium",
    gallery: [
      {
        src: "/assets/services/couvertures/cover-1.webp",
        alt: "Exemple de couverture fantasy",
        label: "Fantasy"
      },
      {
        src: "/assets/services/couvertures/cover-2.webp",
        alt: "Exemple de couverture collector",
        label: "Collector"
      },
      {
        src: "/assets/services/couvertures/cover-3.webp",
        alt: "Exemple de couverture romance",
        label: "Romance"
      },
      {
        src: "/assets/services/couvertures/cover-5.webp",
        alt: "Exemple de couverture premium",
        label: "Luxe"
      }
    ],
    tags: ["Fantasy", "Science-fiction", "Sur mesure"],
    description: "Je propose des couvertures pour les romans de fantasy et de science-fiction, pensées comme de vrais objets-livres : lisibles, singulières, luxueuses et adaptées à ton univers."
  },
  {
    name: "Premades",
    eyebrow: "Collection disponible",
    price: "Disponible",
    accent: "#3a4d45",
    format: "Formats adaptables",
    universe: "Fantasy & SF",
    focus: "Mise en ligne rapide",
    gallery: [
      {
        src: "/assets/services/premades/premade.webp",
        alt: "Exemple de premade fantasy",
        label: "Premade 01"
      },
      {
        src: "/assets/services/premades/premade2.webp",
        alt: "Exemple de premade science-fiction",
        label: "Premade 02"
      }
    ],
    tags: ["Fantasy", "Science-fiction", "Disponible"],
    description: "Je propose des premades pour aller plus vite tout en gardant un rendu premium, cohérent et adaptable à ton projet."
  },
  {
    name: "Jaspages",
    eyebrow: "Finition collector",
    price: "80 € / 120 €",
    accent: "#3d3834",
    format: "Édition collector",
    universe: "Fantasy & SF",
    focus: "Tranche personnalisée",
    gallery: [
      {
        src: "/assets/services/jaspages/jaspage-four.webp",
        alt: "Exemple de jaspage collector",
        label: "Collector"
      },
      {
        src: "/assets/services/jaspages/jaspage-five.webp",
        alt: "Exemple de jaspage ornemental",
        label: "Ornement"
      },
      {
        src: "/assets/services/jaspages/jaspage-six.webp",
        alt: "Exemple de jaspage décoratif",
        label: "Motif"
      },
      {
        src: "/assets/services/jaspages/jaspage-seven.webp",
        alt: "Exemple de jaspage personnalisé",
        label: "Personnalisé"
      },
      {
        src: "/assets/services/jaspages/jaspage-eight.webp",
        alt: "Exemple de jaspage premium",
        label: "Premium"
      },
      {
        src: "/assets/services/jaspages/jaspage-nine.webp",
        alt: "Exemple de jaspage luxe",
        label: "Luxe"
      }
    ],
    tags: ["Édition collector", "Fantasy", "Personnalisable"],
    description: "J’ai créé des jaspages pour donner une impression de luxe et de qualité à un roman, avec des finitions personnalisables selon le projet."
  },
  {
    name: "Pages de garde",
    eyebrow: "Intérieur illustré",
    price: "Sous devis",
    accent: "#3d3834",
    format: "Double page",
    universe: "Univers sur mesure",
    focus: "Ouverture immersive",
    gallery: [
      {
        src: "/assets/services/pagedegarde/pdg2.webp",
        alt: "Exemple de pages de garde illustrées",
        label: "Double page"
      },
      {
        src: "/assets/services/pagedegarde/pdg3.webp",
        alt: "Exemple de pages de garde sur mesure",
        label: "Univers"
      }
    ],
    tags: ["Intérieur", "Sur devis", "Univers sur mesure"],
    description: "J’ai créé des pages de garde pour prolonger l’univers du livre, poser un décor dès l’ouverture et renforcer la sensation d’objet soigné."
  },
  {
    name: "Entêtes de chapitres",
    eyebrow: "Finition intérieure",
    price: "À partir de 20 €",
    accent: "#3a4d45",
    format: "Chapitrage",
    universe: "Fantasy & SF",
    focus: "Rythme de lecture",
    gallery: [
      {
        src: "/assets/services/headers/header-seven.webp",
        alt: "Exemple d'entête de chapitre saga",
        label: "Saga"
      },
      {
        src: "/assets/services/headers/header-eight.webp",
        alt: "Exemple d'entête de chapitre orné",
        label: "Orné"
      },
      {
        src: "/assets/services/headers/header-nine.webp",
        alt: "Exemple d'entête de chapitre prestige",
        label: "Prestige"
      },
      {
        src: "/assets/services/headers/header-ten.webp",
        alt: "Exemple d'entête de chapitre collection",
        label: "Collection"
      },
      {
        src: "/assets/services/headers/header-eleven.webp",
        alt: "Exemple d'entête de chapitre décoratif",
        label: "Décoratif"
      },
      {
        src: "/assets/services/headers/header-twelve.webp",
        alt: "Exemple d'entête de chapitre luxe",
        label: "Luxe"
      },
      {
        src: "/assets/services/headers/header-thirteen.webp",
        alt: "Exemple d'entête de chapitre fantasy",
        label: "Fantasy"
      },
      {
        src: "/assets/services/headers/header-fourteen.webp",
        alt: "Exemple d'entête de chapitre épique",
        label: "Épique"
      },
      {
        src: "/assets/services/headers/header-fifteen.webp",
        alt: "Exemple d'entête de chapitre raffiné",
        label: "Raffiné"
      }
    ],
    tags: ["Chapitrage", "À partir de 20 €", "Personnalisable"],
    description: "Je propose des entêtes de chapitres pour donner au texte une finition plus élégante, mieux rythmer la lecture et renforcer la cohérence visuelle."
  },
  {
    name: "Cartographie",
    eyebrow: "Monde & territoire",
    price: "1 page 200 € / 2 pages 400 €",
    accent: "#3a4d45",
    format: "1 ou 2 pages",
    universe: "Mondes imaginaires",
    focus: "Lecture immersive",
    gallery: [
      {
        src: "/assets/services/maps/maps-one.webp",
        alt: "Exemple de carte fantasy royaume",
        label: "Royaume"
      },
      {
        src: "/assets/services/maps/maps-two.webp",
        alt: "Exemple de carte fantasy archipel",
        label: "Archipel"
      },
      {
        src: "/assets/services/maps/maps-three.webp",
        alt: "Exemple de carte fantasy territoire",
        label: "Territoire"
      },
      {
        src: "/assets/services/maps/maps-six.webp",
        alt: "Exemple de carte fantasy relief",
        label: "Relief"
      },
      {
        src: "/assets/services/maps/maps-seven.webp",
        alt: "Exemple de carte fantasy double page",
        label: "Double page"
      },
      {
        src: "/assets/services/maps/maps-height.webp",
        alt: "Exemple de carte fantasy détaillée",
        label: "Détaillée"
      }
    ],
    tags: ["1 page", "2 pages", "Mondes imaginaires"],
    description: "Je propose de donner vie à tes mondes imaginaires à travers des cartes détaillées et personnalisées, pensées pour renforcer l’immersion."
  },
  {
    name: "Illustration",
    eyebrow: "Direction visuelle",
    price: "Sous devis",
    accent: "#3d3834",
    format: "Illustration sur mesure",
    universe: "Fantasy & SF",
    focus: "Campagne & contenu",
    gallery: [
      {
        src: "/assets/services/illustrations/illustration-five.webp",
        alt: "Exemple d'illustration fantasy portrait",
        label: "Portrait"
      },
      {
        src: "/assets/services/illustrations/illustration-six.webp",
        alt: "Exemple d'illustration fantasy scène",
        label: "Scène"
      },
      {
        src: "/assets/services/illustrations/illustration-seven.webp",
        alt: "Exemple d'illustration fantasy ambiance",
        label: "Ambiance"
      },
      {
        src: "/assets/services/illustrations/illustration-eight.webp",
        alt: "Exemple d'illustration fantasy campagne",
        label: "Campagne"
      },
      {
        src: "/assets/services/illustrations/illustration-nine.webp",
        alt: "Exemple d'illustration fantasy personnage",
        label: "Personnage"
      },
      {
        src: "/assets/services/illustrations/illustration-ten.webp",
        alt: "Exemple d'illustration fantasy décor",
        label: "Décor"
      },
      {
        src: "/assets/services/illustrations/illustration-eleven.webp",
        alt: "Exemple d'illustration fantasy grand format",
        label: "Grand format"
      },
      {
        src: "/assets/services/illustrations/illustration-twelve.webp",
        alt: "Exemple d'illustration fantasy dramatique",
        label: "Dramatique"
      },
      {
        src: "/assets/services/illustrations/illustration-thirteen.webp",
        alt: "Exemple d'illustration fantasy colorée",
        label: "Colorée"
      },
      {
        src: "/assets/services/illustrations/illustration-fourteen.webp",
        alt: "Exemple d'illustration fantasy ronde",
        label: "Icône"
      },
      {
        src: "/assets/services/illustrations/illustration-fifteen.webp",
        alt: "Exemple d'illustration fantasy campagne",
        label: "Narrative"
      },
      {
        src: "/assets/services/illustrations/illustration-sixteen.webp",
        alt: "Exemple d'illustration fantasy concept",
        label: "Concept"
      },
      {
        src: "/assets/services/illustrations/illustration-seventeen.webp",
        alt: "Exemple d'illustration fantasy affiche",
        label: "Affiche"
      },
      {
        src: "/assets/services/illustrations/illustration-eighteen.webp",
        alt: "Exemple d'illustration fantasy couverture de campagne",
        label: "Communication"
      }
    ],
    tags: ["Illustration", "Fantasy", "Sous devis"],
    description: "Je propose des illustrations sur mesure pour prolonger l’univers du livre, nourrir la communication et donner des images fortes aux personnages ou aux scènes."
  }
];

const $$Tarifs = createComponent(($$result, $$props, $$slots) => {
  const contact = {
    email: "vanya.stolarski@gmail.com",
    instagramHandle: "vanyastolar.auteure",
    instagramUrl: "https://www.instagram.com/vanyastolar.auteure/"
  };
  const commitments = [
    {
      title: "Univers ciblés",
      text: "Je travaille avant tout autour de la fantasy et de la science-fiction, avec une recherche de rendu plus luxueux, plus singulier et plus éditorial."
    },
    {
      title: "Formats variables",
      text: "Les prestations peuvent s'adapter à plusieurs tailles, niveaux de finition et contraintes de fabrication selon le projet et le support final."
    },
    {
      title: "Demande sur mesure",
      text: "Pour toute demande personnalisée ou pour un devis, tu peux me contacter directement par mail ou via Instagram afin que l'on cadre le besoin ensemble."
    }
  ];
  const process = [
    {
      step: "01",
      title: "Prise de contact",
      text: "On échange sur le livre, l'univers, les références visuelles et le type de rendu attendu."
    },
    {
      step: "02",
      title: "Devis et cadrage",
      text: "Je précise le format, la personnalisation possible, les livrables et le tarif selon la demande."
    },
    {
      step: "03",
      title: "Production",
      text: "Je réalise le visuel ou l'élément éditorial en gardant la cohérence du projet et la qualité d'exécution."
    }
  ];
  const serviceImageDimensions = {
    "/assets/services/couvertures/cover-1.webp": { width: 1816, height: 1217 },
    "/assets/services/couvertures/cover-2.webp": { width: 2360, height: 1657 },
    "/assets/services/couvertures/cover-3.webp": { width: 2360, height: 1622 },
    "/assets/services/couvertures/cover-5.webp": { width: 2360, height: 1663 },
    "/assets/services/premades/premade.webp": { width: 2360, height: 1657 },
    "/assets/services/premades/premade2.webp": { width: 2360, height: 1663 },
    "/assets/services/jaspages/jaspage-five.webp": { width: 319, height: 1819 },
    "/assets/services/jaspages/jaspage-six.webp": { width: 319, height: 1819 },
    "/assets/services/jaspages/jaspage-seven.webp": { width: 449, height: 2551 },
    "/assets/services/jaspages/jaspage-eight.webp": { width: 472, height: 1772 },
    "/assets/services/jaspages/jaspage-nine.webp": { width: 378, height: 2480 },
    "/assets/services/jaspages/jaspage-one.webp": { width: 2048, height: 2048 },
    "/assets/services/jaspages/jaspage-two.webp": { width: 2048, height: 2048 },
    "/assets/services/jaspages/jaspage-three.webp": { width: 2048, height: 2048 },
    "/assets/services/jaspages/jaspage-four.webp": { width: 319, height: 2551 },
    "/assets/services/pagedegarde/pdg1.webp": { width: 2360, height: 1578 },
    "/assets/services/pagedegarde/pdg2.webp": { width: 3223, height: 2360 },
    "/assets/services/pagedegarde/pdg3.webp": { width: 3041, height: 1563 },
    "/assets/services/headers/header-eight.webp": { width: 1800, height: 2700 },
    "/assets/services/headers/header-eleven.webp": { width: 1800, height: 2700 },
    "/assets/services/headers/header-twelve.webp": { width: 1800, height: 2700 },
    "/assets/services/headers/header-thirteen.webp": { width: 1800, height: 2700 },
    "/assets/services/headers/header-fourteen.webp": { width: 1800, height: 2700 },
    "/assets/services/headers/header-fifteen.webp": { width: 1800, height: 2700 },
    "/assets/services/headers/header-one.webp": { width: 1640, height: 2360 },
    "/assets/services/headers/header-three.webp": { width: 1087, height: 1625 },
    "/assets/services/headers/header-seven.webp": { width: 1800, height: 2700 },
    "/assets/services/headers/header-ten.webp": { width: 1800, height: 2700 },
    "/assets/services/maps/maps-two.webp": { width: 780, height: 1196 },
    "/assets/services/maps/maps-three.webp": { width: 3307, height: 2480 },
    "/assets/services/maps/maps-height.webp": { width: 3543, height: 2953 },
    "/assets/services/maps/maps-one.webp": { width: 2048, height: 2048 },
    "/assets/services/maps/maps-four.webp": { width: 1640, height: 2360 },
    "/assets/services/maps/maps-six.webp": { width: 2374, height: 2e3 },
    "/assets/services/maps/maps-seven.webp": { width: 1714, height: 2480 },
    "/assets/services/illustrations/illustration-five.webp": {
      width: 4e3,
      height: 4500
    },
    "/assets/services/illustrations/illustration-six.webp": {
      width: 1640,
      height: 2360
    },
    "/assets/services/illustrations/illustration-eight.webp": {
      width: 1640,
      height: 2360
    },
    "/assets/services/illustrations/illustration-nine.webp": {
      width: 1640,
      height: 2360
    },
    "/assets/services/illustrations/illustration-ten.webp": {
      width: 1640,
      height: 2360
    },
    "/assets/services/illustrations/illustration-twelve.webp": {
      width: 4e3,
      height: 5e3
    },
    "/assets/services/illustrations/illustration-thirteen.webp": {
      width: 4e3,
      height: 4500
    },
    "/assets/services/illustrations/illustration-fourteen.webp": {
      width: 1e3,
      height: 1e3
    },
    "/assets/services/illustrations/illustration-sixteen.webp": {
      width: 3e3,
      height: 3e3
    },
    "/assets/services/illustrations/illustration-seventeen.webp": {
      width: 3e3,
      height: 4e3
    },
    "/assets/services/illustrations/illustration-eighteen.webp": {
      width: 1273,
      height: 1563
    },
    "/assets/services/illustrations/illustration-one.webp": {
      width: 1640,
      height: 2360
    },
    "/assets/services/illustrations/illustration-seven.webp": {
      width: 1640,
      height: 2360
    },
    "/assets/services/illustrations/illustration-eleven.webp": {
      width: 4e3,
      height: 5e3
    },
    "/assets/services/illustrations/illustration-fifteen.webp": {
      width: 3506,
      height: 4001
    }
  };
  const getServiceGalleryCardWidth = (src) => {
    const dimensions = serviceImageDimensions[src];
    if (!dimensions) {
      return "width:min(72vw, 24rem);";
    }
    const ratio = dimensions.width / dimensions.height;
    if (ratio >= 1.75) {
      return "width:min(90vw, 42rem);";
    }
    if (ratio >= 1.2) {
      return "width:min(82vw, 34rem);";
    }
    if (ratio >= 0.9) {
      return "width:min(72vw, 28rem);";
    }
    if (ratio >= 0.55) {
      return "width:min(58vw, 22rem);";
    }
    return "width:min(52vw, 18rem);";
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Tarifs - Vanya Stolarski", "data-astro-cid-asijnltu": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="overflow-hidden bg-[#FFFAFA] text-[#3d3834]" data-astro-cid-asijnltu> <!-- ─── HERO ─── --> <section class="relative overflow-hidden bg-[#3d3834] px-6 py-24 text-[#FFFAFA]" data-astro-cid-asijnltu> <div class="site-shell relative mt-20" data-astro-cid-asijnltu> <div class="mt-10 grid gap-10 md:grid-cols-[1.12fr_0.88fr] md:items-end" data-astro-cid-asijnltu> <div class="space-y-6" data-astro-cid-asijnltu> <span class="inline-flex rounded-full border border-[#FFFAFA]/10 bg-[#FFFAFA] px-4 py-2 font-sans text-[10px] font-bold tracking-[0.25em] text-[#3d3834] uppercase" data-astro-cid-asijnltu>
Tarifs
</span> <h1 class="max-w-5xl font-serif text-5xl leading-none text-balance md:text-7xl" data-astro-cid-asijnltu>
Voici les tarifs de mes services pour enrichir, habiller et donner
              plus de présence à un univers de livre.
</h1> <p class="max-w-2xl font-sans text-base leading-relaxed text-[#FFFAFA] md:text-lg" data-astro-cid-asijnltu>
Je propose des visuels et éléments éditoriaux pour les romans de
              fantasy et de science-fiction, avec une recherche de luxe, de
              qualité et d'identité forte.
</p> <div class="flex flex-wrap gap-3 pt-2" data-astro-cid-asijnltu> <a href="#services" class="inline-flex items-center gap-3 rounded-full bg-[#3a4d45] px-7 py-4 font-sans text-[11px] font-bold tracking-[0.25em] text-[#FFFAFA] uppercase transition-all duration-300 hover:bg-[#FFFAFA] hover:text-[#3d3834]" data-astro-cid-asijnltu>
Voir les tarifs
</a> <a${addAttribute(`mailto:${contact.email}`, "href")} class="inline-flex items-center gap-3 rounded-full border border-[#FFFAFA]/12 bg-[#FFFAFA] px-7 py-4 font-sans text-[11px] font-bold tracking-[0.25em] text-[#3d3834] uppercase transition-all duration-300 hover:border-[#3a4d45]/40 hover:bg-[#FFFAFA]" data-astro-cid-asijnltu>
Demander un devis
</a> </div> </div> <div class="section-panel fade-up rounded-lg border border-[#FFFAFA]/10 bg-[#FFFAFA] p-8 backdrop-blur-sm" data-astro-cid-asijnltu> <div class="grid gap-6 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3" data-astro-cid-asijnltu> <div data-astro-cid-asijnltu> <p class="font-serif text-5xl text-[#3a4d45]" data-astro-cid-asijnltu>7</p> <p class="mt-2 font-sans text-[10px] font-bold tracking-[0.25em] text-[#3d3834] uppercase" data-astro-cid-asijnltu>
Services
</p> </div> <div data-astro-cid-asijnltu> <p class="font-serif text-5xl text-[#3a4d45]" data-astro-cid-asijnltu>SF</p> <p class="mt-2 font-sans text-[10px] font-bold tracking-[0.25em] text-[#3d3834] uppercase" data-astro-cid-asijnltu>
Fantasy & SF
</p> </div> <div data-astro-cid-asijnltu> <p class="font-serif text-5xl text-[#3a4d45]" data-astro-cid-asijnltu>Devis</p> <p class="mt-2 font-sans text-[10px] font-bold tracking-[0.25em] text-[#3d3834] uppercase" data-astro-cid-asijnltu>
Sur mesure
</p> </div> </div> <div class="mt-8 rounded-[1.6rem] border border-[#FFFAFA]/10 bg-[#FFFAFA] p-6" data-astro-cid-asijnltu> <p class="font-sans text-[10px] font-bold tracking-[0.3em] text-[#3a4d45] uppercase" data-astro-cid-asijnltu>
Contact
</p> <div class="mt-4 space-y-3 font-sans text-sm leading-relaxed text-[#3d3834]" data-astro-cid-asijnltu> <p data-astro-cid-asijnltu>
Mail&nbsp;: <a${addAttribute(`mailto:${contact.email}`, "href")} class="text-[#3d3834] underline underline-offset-4" data-astro-cid-asijnltu>${contact.email}</a> </p> <p data-astro-cid-asijnltu>
Instagram&nbsp;: <a${addAttribute(contact.instagramUrl, "href")} target="_blank" rel="noreferrer" class="text-[#3d3834] underline underline-offset-4" data-astro-cid-asijnltu>${contact.instagramHandle}</a> </p> </div> </div> </div> </div> </div> </section> <!-- ─── SERVICES ─── --> <section id="services" class="relative overflow-hidden bg-[#FFFAFA] px-6 py-24" data-astro-cid-asijnltu> <div class="site-shell relative space-y-6" data-astro-cid-asijnltu> <div class="max-w-3xl space-y-4" data-astro-cid-asijnltu> <p class="font-sans text-[10px] font-bold tracking-[0.35em] text-[#3a4d45] uppercase" data-astro-cid-asijnltu>
Services
</p> <h2 class="font-serif text-4xl leading-none text-balance md:text-6xl" data-astro-cid-asijnltu>
Des prestations pensées pour donner plus de matière, plus de
            finition et plus de désir à l'objet livre.
</h2> <p class="max-w-2xl font-sans text-base leading-relaxed text-[#3d3834]/78 md:text-lg" data-astro-cid-asijnltu>
Pour toute demande personnalisée ou pour un devis, n'hésite pas à me
            contacter par mail ou via Instagram. Les tarifs affichés ici servent
            de repère selon le type de prestation.
</p> </div> <div class="space-y-10 pt-8 lg:space-y-12" data-astro-cid-asijnltu> ${services.map((service) => renderTemplate`<section class="section-panel fade-up space-y-7 overflow-hidden rounded-[2.4rem] bg-[#fffdfa] p-6 md:p-8 xl:p-10" data-astro-cid-asijnltu>  <div class="flex flex-wrap items-start justify-between gap-5 border-b border-[#3d3834]/8 pb-6" data-astro-cid-asijnltu> <div class="space-y-2.5" data-astro-cid-asijnltu> <p class="font-sans text-[10px] font-bold tracking-[0.34em] text-[#3a4d45] uppercase" data-astro-cid-asijnltu> ${service.eyebrow} </p> <h3 class="font-serif text-3xl leading-[0.95] text-[#3d3834] text-balance md:text-[2.6rem]" data-astro-cid-asijnltu> ${service.name} </h3> </div> <div class="flex flex-wrap items-center gap-3 pt-1" data-astro-cid-asijnltu> <span class="rounded-full px-4 py-2 font-sans text-[10px] font-bold tracking-[0.22em] uppercase"${addAttribute(`background:${service.accent}; color:#FFFAFA;`, "style")} data-astro-cid-asijnltu> ${service.price} </span> <a${addAttribute(`mailto:${contact.email}`, "href")} class="inline-flex items-center gap-2 rounded-full border border-[#3d3834]/10 bg-[#FFFAFA] px-4 py-2 font-sans text-[10px] font-bold tracking-[0.2em] text-[#3d3834] uppercase transition-all duration-300 hover:border-[#3a4d45]/35 hover:bg-[#3a4d45] hover:text-[#FFFAFA]" data-astro-cid-asijnltu>
Demander un devis
</a> </div> </div>  <div class="service-gallery space-y-4" data-service-gallery-root data-astro-cid-asijnltu> <div class="flex flex-wrap items-center justify-between gap-3" data-astro-cid-asijnltu> <div class="flex items-center gap-3" data-astro-cid-asijnltu> <span class="inline-flex rounded-full border border-[#3d3834]/8 bg-[#fffaf8] px-3 py-1.5 font-sans text-[9px] font-bold tracking-[0.18em] text-[#3d3834]/66 uppercase" data-astro-cid-asijnltu> ${service.gallery.length} visuels
</span> </div> <span class="inline-flex items-center gap-2 rounded-full border border-[#3d3834]/8 bg-[#fffaf8] px-3 py-1.5 font-sans text-[9px] font-bold tracking-[0.2em] text-[#3d3834]/62 uppercase" data-astro-cid-asijnltu> <span aria-hidden="true" class="text-sm leading-none text-[#3a4d45]" data-astro-cid-asijnltu>←</span>
Faire défiler
<span aria-hidden="true" class="text-sm leading-none text-[#3a4d45]" data-astro-cid-asijnltu>→</span> </span> </div> <div class="relative" data-astro-cid-asijnltu> <div data-service-gallery-scroller class="-mx-2 flex cursor-grab gap-5 overflow-x-auto px-2 pb-4 snap-x snap-mandatory [scrollbar-width:auto] [scrollbar-color:rgba(58,77,69,0.55)_rgba(61,56,52,0.10)] active:cursor-grabbing" data-astro-cid-asijnltu> ${service.gallery.map((img, i) => renderTemplate`<figure class="group relative shrink-0 snap-start"${addAttribute(getServiceGalleryCardWidth(img.src), "style")} data-astro-cid-asijnltu> <button type="button" class="service-gallery-trigger block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3a4d45] focus-visible:ring-offset-4 focus-visible:ring-offset-[#fffdfa]" data-service-gallery-trigger${addAttribute(img.src, "data-image")}${addAttribute(img.alt, "data-alt")}${addAttribute(img.label, "data-title")}${addAttribute(service.name, "data-service")}${addAttribute(service.eyebrow, "data-eyebrow")}${addAttribute(service.price, "data-price")}${addAttribute(service.description, "data-description")}${addAttribute(service.format, "data-format")}${addAttribute(service.universe, "data-universe")}${addAttribute(service.focus, "data-focus")}${addAttribute(serviceImageDimensions[img.src]?.width, "data-width")}${addAttribute(serviceImageDimensions[img.src]?.height, "data-height")}${addAttribute(`Voir ${img.label} en grand`, "aria-label")} data-astro-cid-asijnltu> <div class="relative flex h-[18rem] items-center justify-center overflow-hidden rounded-[1.9rem] border border-[#3d3834]/8 bg-[linear-gradient(180deg,#fffdfa_0%,#f2e9e4_100%)] p-3 transition-all duration-500 sm:h-[21rem] sm:p-4 md:h-[24rem] lg:h-[27rem]" data-astro-cid-asijnltu> <img${addAttribute(img.src, "src")}${addAttribute(img.alt, "alt")}${addAttribute(serviceImageDimensions[img.src]?.width, "width")}${addAttribute(serviceImageDimensions[img.src]?.height, "height")} class="h-full w-full rounded-[0.8rem] object-contain transition-transform duration-500 group-hover:scale-[1.02]"${addAttribute(i === 0 ? "eager" : "lazy", "loading")} data-astro-cid-asijnltu> <span class="absolute bottom-4 left-4 inline-flex rounded-full border border-[#FFFAFA]/20 bg-[#3d3834]/78 px-3 py-1.5 font-sans text-[9px] font-bold tracking-[0.22em] text-[#FFFAFA] uppercase backdrop-blur-sm" data-astro-cid-asijnltu> ${img.label} </span> </div> </button> </figure>`)} </div> <div class="pointer-events-none mt-2 flex items-center gap-3 px-2 md:hidden" data-astro-cid-asijnltu> <span class="font-sans text-[9px] font-bold tracking-[0.2em] text-[#3d3834]/48 uppercase" data-astro-cid-asijnltu>
Glisser
</span> <div class="relative h-px flex-1 overflow-hidden rounded-full bg-[#3d3834]/10" data-astro-cid-asijnltu> <span class="absolute inset-y-0 left-0 w-16 rounded-full bg-[#3a4d45]/28" data-astro-cid-asijnltu></span> </div> <span aria-hidden="true" class="font-serif text-lg leading-none text-[#3a4d45]/72" data-astro-cid-asijnltu>→</span> </div> </div> </div>  <div class="grid gap-6 border-t border-[#3d3834]/8 pt-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-start lg:gap-8" data-astro-cid-asijnltu> <div class="space-y-4" data-astro-cid-asijnltu> <p class="max-w-2xl font-sans text-[0.98rem] leading-8 text-[#3d3834]/72" data-astro-cid-asijnltu> ${service.description} </p> <div class="flex flex-wrap gap-2" data-astro-cid-asijnltu> ${service.tags.map((tag) => renderTemplate`<span class="rounded-full border border-[#3d3834]/8 bg-[#fffaf8] px-3 py-1 font-sans text-[9px] font-bold tracking-[0.16em] text-[#3d3834]/70 uppercase" data-astro-cid-asijnltu> ${tag} </span>`)} </div> </div> <div class="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3" data-astro-cid-asijnltu> <div class="rounded-[1.7rem] border border-[#3d3834]/8 bg-[#fffaf8] px-4 py-4" data-astro-cid-asijnltu> <p class="font-sans text-[9px] font-bold tracking-[0.2em] text-[#3d3834]/50 uppercase" data-astro-cid-asijnltu>
Format
</p> <p class="mt-2 font-serif text-[1.35rem] leading-tight text-[#3d3834]" data-astro-cid-asijnltu> ${service.format} </p> </div> <div class="rounded-[1.7rem] border border-[#3d3834]/8 bg-[#fffaf8] px-4 py-4" data-astro-cid-asijnltu> <p class="font-sans text-[9px] font-bold tracking-[0.2em] text-[#3d3834]/50 uppercase" data-astro-cid-asijnltu>
Univers
</p> <p class="mt-2 font-serif text-[1.35rem] leading-tight text-[#3d3834]" data-astro-cid-asijnltu> ${service.universe} </p> </div> <div class="rounded-[1.7rem] border border-[#3d3834]/8 bg-[#fffaf8] px-4 py-4" data-astro-cid-asijnltu> <p class="font-sans text-[9px] font-bold tracking-[0.2em] text-[#3d3834]/50 uppercase" data-astro-cid-asijnltu>
Focus
</p> <p class="mt-2 font-serif text-[1.35rem] leading-tight text-[#3d3834]" data-astro-cid-asijnltu> ${service.focus} </p> </div> </div> </div> </section>`)} </div> </div> </section> <div id="service-gallery-modal" class="pointer-events-none fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-[#3d3834]/74 px-4 py-4 opacity-0 transition-all duration-300 md:items-center md:py-8" role="dialog" aria-modal="true" aria-labelledby="service-gallery-modal-title" aria-hidden="true" data-astro-cid-asijnltu> <div data-service-gallery-close class="absolute inset-0" data-astro-cid-asijnltu></div> <div class="relative z-10 my-auto w-full max-w-[min(96vw,1380px)] overflow-hidden rounded-[2.2rem] border border-[#FFFAFA]/10 bg-[#FFFAFA] shadow-[0_35px_120px_-50px_rgba(61,56,52,0.6)] lg:max-h-[92vh]" data-astro-cid-asijnltu> <button type="button" id="service-gallery-modal-close" class="absolute top-4 right-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#3d3834]/10 bg-[#FFFAFA]/92 font-sans text-xs font-bold tracking-[0.2em] text-[#3d3834] uppercase shadow-[0_10px_30px_-24px_rgba(61,56,52,0.55)] transition-all duration-300 hover:border-[#3a4d45]/30 hover:bg-[#3a4d45] hover:text-[#FFFAFA]" aria-label="Fermer la popup" data-astro-cid-asijnltu>
X
</button> <div class="grid lg:grid-cols-[minmax(0,1fr)_390px] lg:items-stretch" data-astro-cid-asijnltu> <div class="relative flex min-h-[40vh] items-center justify-center overflow-hidden bg-[#3d3834] px-4 py-16 md:min-h-[54vh] md:px-6 lg:min-h-0 lg:px-8 lg:py-8" data-astro-cid-asijnltu> <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,250,248,0.08),transparent_56%)]" data-astro-cid-asijnltu></div> <div class="relative flex w-full items-center justify-center" data-astro-cid-asijnltu> <button type="button" id="service-gallery-modal-prev" class="absolute left-0 top-1/2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#FFFAFA]/14 bg-[#FFFAFA]/10 font-sans text-lg text-[#FFFAFA] backdrop-blur-sm transition-all duration-300 hover:bg-[#FFFAFA] hover:text-[#3d3834] disabled:pointer-events-none disabled:opacity-30" aria-label="Image précédente" data-astro-cid-asijnltu>
‹
</button> <div class="relative inline-flex max-h-[78vh] w-full max-w-full items-center justify-center overflow-hidden rounded-[1.55rem] border border-[#FFFAFA]/8 bg-[#312d2a] p-3 shadow-[0_24px_60px_-45px_rgba(61,56,52,0.45)] md:p-4" data-astro-cid-asijnltu> <img id="service-gallery-modal-image" src="" alt="" class="block max-h-[68vh] max-w-full rounded-[1rem] object-contain md:max-h-[74vh] lg:max-h-[calc(92vh-8rem)]" data-astro-cid-asijnltu> </div> <button type="button" id="service-gallery-modal-next" class="absolute right-0 top-1/2 z-10 inline-flex h-11 w-11  items-center justify-center rounded-full border border-[#FFFAFA]/14 bg-[#FFFAFA]/10 font-sans text-lg text-[#FFFAFA] backdrop-blur-sm transition-all duration-300 hover:bg-[#FFFAFA] hover:text-[#3d3834] disabled:pointer-events-none disabled:opacity-30" aria-label="Image suivante" data-astro-cid-asijnltu>
›
</button> </div> </div> <div class="min-h-0 overflow-y-auto p-6 md:p-8 lg:max-h-[92vh] lg:p-9" data-astro-cid-asijnltu> <div class="space-y-6" data-astro-cid-asijnltu> <div class="space-y-4" data-astro-cid-asijnltu> <div class="flex flex-wrap items-center gap-2.5" data-astro-cid-asijnltu> <p id="service-gallery-modal-eyebrow" class="font-sans text-[10px] font-bold tracking-[0.3em] text-[#3a4d45] uppercase" data-astro-cid-asijnltu></p> <span id="service-gallery-modal-price" class="inline-flex rounded-full border border-[#3d3834]/10 bg-[#fffaf8] px-3 py-1.5 font-sans text-[9px] font-bold tracking-[0.22em] text-[#3d3834]/70 uppercase" data-astro-cid-asijnltu></span> </div> <div data-astro-cid-asijnltu> <h2 id="service-gallery-modal-title" class="font-serif text-3xl leading-none text-[#3d3834] text-balance md:text-4xl" data-astro-cid-asijnltu></h2> <p id="service-gallery-modal-service" class="mt-3 font-sans text-sm font-bold tracking-[0.2em] text-[#3d3834]/56 uppercase" data-astro-cid-asijnltu></p> <p id="service-gallery-modal-description" class="mt-4 font-sans text-sm leading-relaxed text-[#3d3834]/78 md:text-base" data-astro-cid-asijnltu></p> </div> </div> <div class="rounded-[1.7rem] border border-[#3d3834]/10 bg-[#fffaf8] p-5" data-astro-cid-asijnltu> <p class="font-sans text-[10px] font-bold tracking-[0.22em] text-[#3d3834]/58 uppercase" data-astro-cid-asijnltu>
Détails
</p> <dl class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1" data-astro-cid-asijnltu> <div class="space-y-1" data-astro-cid-asijnltu> <dt class="font-sans text-[10px] font-bold tracking-[0.22em] text-[#3d3834]/55 uppercase" data-astro-cid-asijnltu>Format</dt> <dd id="service-gallery-modal-format" class="font-serif text-[1.45rem] leading-tight text-[#3d3834] break-words" data-astro-cid-asijnltu></dd> </div> <div class="space-y-1" data-astro-cid-asijnltu> <dt class="font-sans text-[10px] font-bold tracking-[0.22em] text-[#3d3834]/55 uppercase" data-astro-cid-asijnltu>Univers</dt> <dd id="service-gallery-modal-universe" class="font-serif text-[1.45rem] leading-tight text-[#3d3834] break-words" data-astro-cid-asijnltu></dd> </div> <div class="space-y-1" data-astro-cid-asijnltu> <dt class="font-sans text-[10px] font-bold tracking-[0.22em] text-[#3d3834]/55 uppercase" data-astro-cid-asijnltu>Focus</dt> <dd id="service-gallery-modal-focus" class="font-serif text-[1.45rem] leading-tight text-[#3d3834] break-words" data-astro-cid-asijnltu></dd> </div> <div class="space-y-1" data-astro-cid-asijnltu> <dt class="font-sans text-[10px] font-bold tracking-[0.22em] text-[#3d3834]/55 uppercase" data-astro-cid-asijnltu>Dimensions</dt> <dd id="service-gallery-modal-dimensions" class="font-serif text-[1.35rem] leading-tight text-[#3d3834]" data-astro-cid-asijnltu></dd> </div> </dl> </div> <div class="rounded-[1.7rem] border border-[#3d3834]/10 bg-[#FFFAFA] p-5" data-astro-cid-asijnltu> <p class="font-sans text-[10px] font-bold tracking-[0.22em] text-[#3d3834]/58 uppercase" data-astro-cid-asijnltu>
Note visuelle
</p> <p id="service-gallery-modal-alt" class="mt-3 font-sans text-sm leading-relaxed text-[#3d3834]/78 md:text-[0.95rem]" data-astro-cid-asijnltu></p> </div> </div> </div> </div> </div> </div> <!-- ─── PROCESSUS & ENGAGEMENTS ─── --> <section class="relative overflow-hidden bg-[#FFFAFA] px-6 py-24" data-astro-cid-asijnltu> <div class="site-shell relative grid gap-6 lg:grid-cols-[0.95fr_1.05fr]" data-astro-cid-asijnltu> <div class="section-panel fade-up rounded-[2.35rem] border border-[#3d3834]/10 bg-[#3d3834] p-8 text-[#FFFAFA] shadow-[0_24px_80px_-48px_rgba(61,56,52,0.42)] md:p-10" data-astro-cid-asijnltu> <p class="font-sans text-[10px] font-bold tracking-[0.35em] text-[#3a4d45] uppercase" data-astro-cid-asijnltu>
Comment ça se passe
</p> <h2 class="mt-5 font-serif text-4xl leading-none text-balance md:text-5xl" data-astro-cid-asijnltu>
Une base claire pour discuter du besoin, du rendu et du bon niveau
            de personnalisation.
</h2> <p class="mt-6 max-w-xl font-sans text-base leading-relaxed text-[#FFFAFA]" data-astro-cid-asijnltu>
Certains tarifs sont fixes, d'autres passent par un devis. Dans tous
            les cas, l'idée est de cadrer la demande avec précision pour que le
            visuel final soit cohérent avec ton univers de livre.
</p> <div class="mt-10 space-y-4 border-t border-[#FFFAFA]/10 pt-8" data-astro-cid-asijnltu> ${process.map((item) => renderTemplate`<div class="flex items-start gap-4" data-astro-cid-asijnltu> <span class="font-serif text-3xl text-[#3a4d45]" data-astro-cid-asijnltu> ${item.step} </span> <div data-astro-cid-asijnltu> <p class="font-sans text-[10px] font-bold tracking-[0.3em] text-[#FFFAFA] uppercase" data-astro-cid-asijnltu> ${item.title} </p> <p class="mt-2 font-sans text-sm leading-relaxed text-[#FFFAFA]" data-astro-cid-asijnltu> ${item.text} </p> </div> </div>`)} </div> </div> <div class="grid gap-6 md:grid-cols-3" data-astro-cid-asijnltu> ${commitments.map((item) => renderTemplate`<article class="section-panel fade-up rounded-[2.1rem] border border-[#3d3834]/10 bg-[#FFFAFA] p-7 shadow-[0_20px_70px_-45px_rgba(61,56,52,0.34)] backdrop-blur-sm" data-astro-cid-asijnltu> <p class="font-sans text-[10px] font-bold tracking-[0.28em] text-[#3a4d45] uppercase" data-astro-cid-asijnltu>
Repère
</p> <h3 class="mt-4 font-serif text-3xl leading-none text-[#3d3834] text-balance" data-astro-cid-asijnltu> ${item.title} </h3> <p class="mt-4 font-sans text-base leading-relaxed text-[#3d3834]/78" data-astro-cid-asijnltu> ${item.text} </p> </article>`)} </div> </div> </section> <!-- ─── CTA FINAL ─── --> <section class="relative overflow-hidden bg-[#FFFAFA] px-6 py-24" data-astro-cid-asijnltu> <div class="site-shell relative mt-20" data-astro-cid-asijnltu> <div class="section-panel fade-up rounded-[2.5rem] border border-[#3d3834]/10 bg-[#3d3834] px-8 py-10 text-[#FFFAFA] shadow-[0_26px_90px_-55px_rgba(61,56,52,0.45)] md:px-10 md:py-12" data-astro-cid-asijnltu> <div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end" data-astro-cid-asijnltu> <div data-astro-cid-asijnltu> <p class="font-sans text-[10px] font-bold tracking-[0.35em] text-[#3a4d45] uppercase" data-astro-cid-asijnltu>
Demande personnalisée
</p> <h2 class="mt-4 font-serif text-4xl leading-none text-balance md:text-5xl" data-astro-cid-asijnltu>
Pour toute demande personnalisée ou pour un devis, écris-moi
                directement.
</h2> <p class="mt-4 max-w-2xl font-sans text-base leading-relaxed text-[#FFFAFA]" data-astro-cid-asijnltu>
Mail&nbsp;: ${contact.email}<br data-astro-cid-asijnltu>
Instagram&nbsp;: ${contact.instagramHandle} </p> </div> <div class="flex flex-wrap gap-3 lg:justify-end" data-astro-cid-asijnltu> <a${addAttribute(`mailto:${contact.email}`, "href")} class="inline-flex items-center gap-3 rounded-full bg-[#3a4d45] px-7 py-4 font-sans text-[11px] font-bold tracking-[0.25em] text-[#FFFAFA] uppercase transition-all duration-300 hover:bg-[#FFFAFA] hover:text-[#3d3834]" data-astro-cid-asijnltu>
Envoyer un mail
</a> <a${addAttribute(contact.instagramUrl, "href")} target="_blank" rel="noreferrer" class="inline-flex items-center gap-3 rounded-full border border-[#FFFAFA]/12 bg-[#FFFAFA] px-7 py-4 font-sans text-[11px] font-bold tracking-[0.25em] text-[#3d3834] uppercase transition-all duration-300 hover:bg-[#FFFAFA]" data-astro-cid-asijnltu>
Ouvrir Instagram
</a> </div> </div> </div> </div> </section> </main> ` })}  ${renderScript($$result, "D:/Documents/Projects/vanya-stolarski-astro-6/src/pages/tarifs.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Documents/Projects/vanya-stolarski-astro-6/src/pages/tarifs.astro", void 0);

const $$file = "D:/Documents/Projects/vanya-stolarski-astro-6/src/pages/tarifs.astro";
const $$url = "/tarifs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Tarifs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
