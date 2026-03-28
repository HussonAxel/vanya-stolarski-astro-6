export interface ServiceGalleryItem {
  src: string;
  alt: string;
  label: string;
}

export interface Service {
  name: string;
  eyebrow: string;
  price: string;
  accent: string;
  format: string;
  universe: string;
  focus: string;
  gallery: ServiceGalleryItem[];
  tags: string[];
  description: string;
}

export const services: Service[] = [
  {
    name: "Couverture",
    eyebrow: "Service éditorial",
    price: "Sous devis",
    accent: "#3a4d45",
    format: "Sur mesure",
    universe: "Tous genres",
    focus: "Dorures possibles",
    gallery: [
      {
        src: "/assets/services/couvertures/cover-1.webp",
        alt: "Exemple de couverture fantasy",
        label: "Collector",
      },
      {
        src: "/assets/services/couvertures/cover-2.webp",
        alt: "Exemple de couverture collector",
        label: "Thriller",
      },
      {
        src: "/assets/services/couvertures/cover-3.webp",
        alt: "Exemple de couverture romance",
        label: "Romance",
      },
      {
        src: "/assets/services/couvertures/cover-5.webp",
        alt: "Exemple de couverture premium",
        label: "Fantasy",
      },
    ],
    tags: ["Tous genres", "Objet-livre", "Sur mesure"],
    description:
      "Je propose des couvertures pensées comme de vrais objets-livres : lisibles, singulières, luxueuses et adaptées au genre, au ton et à l'identité de ton roman. Il est possible d'également créer des dorures pour s'adapter à ton roman",
  },
  {
    name: "Premades",
    eyebrow: "Collection disponible",
    price: "Disponible",
    accent: "#3a4d45",
    format: "Base adaptable",
    universe: "Tous genres",
    focus: "Ajustements possibles",
    gallery: [
      {
        src: "/assets/services/premades/premade.webp",
        alt: "Exemple de premade fantasy",
        label: "Premade 01",
      },
      {
        src: "/assets/services/premades/premade2.webp",
        alt: "Exemple de premade science-fiction",
        label: "Premade 02",
      },
    ],
    tags: ["Tous genres", "Adaptable", "Disponible"],
    description:
      "Je propose des premades pour aller plus vite tout en gardant un rendu premium, cohérent et adaptable à ton projet.",
  },
  {
    name: "Jaspages",
    eyebrow: "Finition collector",
    price: "80 € / 120 €",
    accent: "#3d3834",
    format: "Sur mesure",
    universe: "Tous genres",
    focus: "Tranche personnalisée",
    gallery: [
      {
        src: "/assets/services/jaspages/jaspage-four.webp",
        alt: "Exemple de jaspage collector",
        label: "A quatre on refait le monde",
      },
      {
        src: "/assets/services/jaspages/jaspage-five.webp",
        alt: "Exemple de jaspage ornemental",
        label: "A quatre on refait le monde",
      },
      {
        src: "/assets/services/jaspages/jaspage-six.webp",
        alt: "Exemple de jaspage décoratif",
        label: "A quatre on refait le monde",
      },
      {
        src: "/assets/services/jaspages/jaspage-seven.webp",
        alt: "Exemple de jaspage personnalisé",
        label: "Fous Papillons",
      },
      {
        src: "/assets/services/jaspages/jaspage-eight.webp",
        alt: "Exemple de jaspage premium",
        label: "Fous Papillons",
      },
      {
        src: "/assets/services/jaspages/jaspage-nine.webp",
        alt: "Exemple de jaspage luxe",
        label: "Coeur De Renard",
      },
    ],
    tags: ["Tranche", "Tous genres", "Personnalisable"],
    description:
      "J’ai créé des jaspages pour donner une impression de luxe et de qualité à un roman, avec des finitions personnalisables selon le projet.",
  },
  {
    name: "Pages de garde",
    eyebrow: "Intérieur illustré",
    price: "Sous devis",
    accent: "#3d3834",
    format: "Double page",
    universe: "Tous genres",
    focus: "Ouverture immersive",
    gallery: [
      {
        src: "/assets/services/pagedegarde/pdg2.webp",
        alt: "Exemple de pages de garde illustrées",
        label: "Double page",
      },
      {
        src: "/assets/services/pagedegarde/pdg3.webp",
        alt: "Exemple de pages de garde sur mesure",
        label: "Univers",
      },
    ],
    tags: ["Intérieur", "Sur devis", "Univers sur mesure"],
    description:
      "J’ai créé des pages de garde pour prolonger l’univers du livre, poser un décor dès l’ouverture et renforcer la sensation d’objet soigné.",
  },
  {
    name: "Entêtes de chapitres",
    eyebrow: "Finition intérieure",
    price: "À partir de 20 €",
    accent: "#3a4d45",
    format: "Chapitrage",
    universe: "Saga & one-shot",
    focus: "Rythme de lecture",
    gallery: [
      {
        src: "/assets/services/headers/header-seven.webp",
        alt: "Exemple d'entête de chapitre saga",
        label: "Saga",
      },
      {
        src: "/assets/services/headers/header-eight.webp",
        alt: "Exemple d'entête de chapitre orné",
        label: "Orné",
      },
      {
        src: "/assets/services/headers/header-nine.webp",
        alt: "Exemple d'entête de chapitre prestige",
        label: "Prestige",
      },
      {
        src: "/assets/services/headers/header-ten.webp",
        alt: "Exemple d'entête de chapitre collection",
        label: "Collection",
      },
      {
        src: "/assets/services/headers/header-eleven.webp",
        alt: "Exemple d'entête de chapitre décoratif",
        label: "Décoratif",
      },
      {
        src: "/assets/services/headers/header-twelve.webp",
        alt: "Exemple d'entête de chapitre luxe",
        label: "Luxe",
      },
      {
        src: "/assets/services/headers/header-thirteen.webp",
        alt: "Exemple d'entête de chapitre fantasy",
        label: "Fantasy",
      },
      {
        src: "/assets/services/headers/header-fourteen.webp",
        alt: "Exemple d'entête de chapitre épique",
        label: "Épique",
      },
      {
        src: "/assets/services/headers/header-fifteen.webp",
        alt: "Exemple d'entête de chapitre raffiné",
        label: "Raffiné",
      },
    ],
    tags: ["Chapitrage", "À partir de 20 €", "Personnalisable"],
    description:
      "Je propose des entêtes de chapitres pour donner au texte une finition plus élégante, mieux rythmer la lecture et renforcer la cohérence visuelle.",
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
        label: "Royaume",
      },
      {
        src: "/assets/services/maps/maps-two.webp",
        alt: "Exemple de carte fantasy archipel",
        label: "Archipel",
      },
      {
        src: "/assets/services/maps/maps-three.webp",
        alt: "Exemple de carte fantasy territoire",
        label: "Territoire",
      },
      {
        src: "/assets/services/maps/maps-six.webp",
        alt: "Exemple de carte fantasy relief",
        label: "Relief",
      },
      {
        src: "/assets/services/maps/maps-seven.webp",
        alt: "Exemple de carte fantasy double page",
        label: "Double page",
      },
      {
        src: "/assets/services/maps/maps-height.webp",
        alt: "Exemple de carte fantasy détaillée",
        label: "Détaillée",
      },
    ],
    tags: ["1 page", "2 pages", "Mondes imaginaires"],
    description:
      "Je propose de donner vie à tes mondes imaginaires à travers des cartes détaillées et personnalisées, pensées pour renforcer l’immersion.",
  },
  {
    name: "Illustration",
    eyebrow: "Direction visuelle",
    price: "Sous devis",
    accent: "#3d3834",
    format: "Sur mesure",
    universe: "Tous genres",
    focus: "Communication & personnages",
    gallery: [
      {
        src: "/assets/services/illustrations/illustration-seventeen.webp",
        alt: "Exemple d'illustration fantasy affiche",
        label: "Affiche",
      },
      {
        src: "/assets/services/illustrations/illustration-eighteen.webp",
        alt: "Exemple d'illustration fantasy couverture de campagne",
        label: "Communication",
      },
      {
        src: "/assets/services/illustrations/illustration-fourteen.webp",
        alt: "Exemple d'illustration fantasy ronde",
        label: "Icône",
      },
      {
        src: "/assets/services/illustrations/illustration-ten.webp",
        alt: "Exemple d'illustration fantasy décor",
        label: "Décor",
      },
      {
        src: "/assets/services/illustrations/illustration-eleven.webp",
        alt: "Exemple d'illustration fantasy grand format",
        label: "Grand format",
      },
      {
        src: "/assets/services/illustrations/illustration-twelve.webp",
        alt: "Exemple d'illustration fantasy dramatique",
        label: "Dramatique",
      },
      {
        src: "/assets/services/illustrations/illustration-five.webp",
        alt: "Exemple d'illustration fantasy portrait",
        label: "Portrait",
      },
      {
        src: "/assets/services/illustrations/illustration-six.webp",
        alt: "Exemple d'illustration fantasy scène",
        label: "Scène",
      },
      {
        src: "/assets/services/illustrations/illustration-seven.webp",
        alt: "Exemple d'illustration fantasy ambiance",
        label: "Ambiance",
      },
      {
        src: "/assets/gallery/coeur-de-renard--fortune-cigarette.webp",
        alt: "Illustration de Fortune pour Coeur De Renard",
        label: "CDR",
      },
      {
        src: "/assets/gallery/coeur-de-renard--renard-monstre.webp",
        alt: "Illustration de Renard pour Coeur De Renard",
        label: "CDR",
      },
      {
        src: "/assets/gallery/notre-sang-dans-lhumus-de-la-foret--scene.webp",
        alt: "Illustration Notre sang danas l'humus de la Forêt",
        label: "Forêt",
      },
      {
        src: "/assets/gallery/trouver-la-lune--portrait-lune.webp",
        alt: "Illustration Trouver la lune",
        label: "Lune",
      },
      {
        src: "/assets/gallery/trouver-la-lune--portrait-neige.webp",
        alt: "Illustration Trouver la lune",
        label: "Lune",
      },
      // {
      //   src: "/assets/services/illustrations/illustration-eight.webp",
      //   alt: "Exemple d'illustration fantasy campagne",
      //   label: "Campagne",
      // },
      // {
      //   src: "/assets/services/illustrations/illustration-nine.webp",
      //   alt: "Exemple d'illustration fantasy personnage",
      //   label: "Personnage",
      // },

      // {
      //   src: "/assets/services/illustrations/illustration-thirteen.webp",
      //   alt: "Exemple d'illustration fantasy colorée",
      //   label: "Colorée",
      // },

      // {
      //   src: "/assets/services/illustrations/illustration-fifteen.webp",
      //   alt: "Exemple d'illustration fantasy campagne",
      //   label: "Narrative",
      // },
      // {
      //   src: "/assets/services/illustrations/illustration-sixteen.webp",
      //   alt: "Exemple d'illustration fantasy concept",
      //   label: "Concept",
      // },

    ],
    tags: ["Illustration", "Tous genres", "Sous devis"],
    description:
      "Je propose des illustrations sur mesure pour prolonger l’univers du livre, nourrir la communication et donner des images fortes aux personnages ou aux scènes.",
  },
];
