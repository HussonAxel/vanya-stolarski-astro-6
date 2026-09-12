import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

const externalLink = defineType({
  name: "externalLink",
  title: "Lien",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Libellé",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});

const mediaImage = defineType({
  name: "mediaImage",
  title: "Image éditoriale",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Fichier",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      name: "alt",
      title: "Texte alternatif",
      type: "string",
      description: "Décris l’image pour les personnes qui ne peuvent pas la voir.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Légende courte",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "alt", media: "image" },
  },
});

const bookDetail = defineType({
  name: "bookDetail",
  title: "Repère du livre",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Libellé", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "value", title: "Valeur", type: "string", validation: (Rule) => Rule.required() }),
  ],
  preview: { select: { title: "label", subtitle: "value" } },
});

const priceOption = defineType({
  name: "priceOption",
  title: "Option de prix",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Format", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "value", title: "Prix", type: "string", validation: (Rule) => Rule.required() }),
  ],
  preview: { select: { title: "label", subtitle: "value" } },
});

const editionPublishing = defineType({
  name: "editionPublishing",
  title: "Informations de l’édition",
  type: "object",
  fields: [
    defineField({ name: "format", title: "Format", type: "string" }),
    defineField({ name: "price", title: "Prix", type: "string" }),
    defineField({ name: "isbn", title: "ISBN", type: "string" }),
    defineField({ name: "pages", title: "Pages", type: "number", validation: (Rule) => Rule.integer().min(1) }),
    defineField({ name: "releaseDate", title: "Date de sortie", type: "string" }),
    defineField({ name: "status", title: "Statut", type: "string" }),
  ],
});

const bookEdition = defineType({
  name: "bookEdition",
  title: "Édition",
  type: "object",
  fields: [
    defineField({ name: "id", title: "Identifiant", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "label", title: "Nom de l’édition", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "media", title: "Couverture", type: "mediaImage", validation: (Rule) => Rule.required() }),
    defineField({ name: "publishing", title: "Publication", type: "editionPublishing" }),
    defineField({
      name: "links",
      title: "Liens spécifiques",
      type: "object",
      fields: [
        defineField({
          name: "purchase",
          title: "Liens d’achat",
          type: "array",
          of: [defineArrayMember({ type: "externalLink" })],
        }),
      ],
    }),
    defineField({
      name: "narrative",
      title: "Texte spécifique",
      type: "object",
      fields: [
        defineField({ name: "hook", title: "Accroche", type: "text", rows: 3 }),
        defineField({ name: "description", title: "Description", type: "text", rows: 6 }),
      ],
    }),
  ],
  preview: {
    select: { title: "label", media: "media.image" },
  },
});

const bookFeaturedMedia = defineType({
  name: "bookFeaturedMedia",
  title: "Média mis en avant",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: { list: [{ title: "Image", value: "image" }, { title: "Vidéo", value: "video" }] },
      initialValue: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "image", title: "Image principale", type: "mediaImage" }),
    defineField({ name: "src", title: "URL vidéo", type: "string" }),
    defineField({ name: "poster", title: "Affiche de la vidéo", type: "mediaImage" }),
    defineField({
      name: "gallery",
      title: "Galerie du média",
      type: "array",
      of: [defineArrayMember({ type: "mediaImage" })],
    }),
  ],
});

const book = defineType({
  name: "book",
  title: "Livre",
  type: "document",
  groups: [
    { name: "identity", title: "Identité" },
    { name: "publishing", title: "Publication" },
    { name: "narrative", title: "Texte" },
    { name: "media", title: "Médias" },
    { name: "links", title: "Liens" },
    { name: "marketing", title: "Mise en avant" },
  ],
  fields: [
    defineField({ name: "title", title: "Titre de travail", type: "string", description: "Utilisé dans la liste du Studio.", group: "identity" }),
    defineField({
      name: "slug",
      title: "Slug URL",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
      group: "identity",
    }),
    defineField({
      name: "identity",
      title: "Identité",
      type: "object",
      group: "identity",
      fields: [
        defineField({ name: "title", title: "Titre affiché", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "subtitle", title: "Sous-titre", type: "string" }),
        defineField({ name: "tome", title: "Tome / type", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "saga", title: "Saga", type: "string" }),
        defineField({ name: "series", title: "Série", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "genres", title: "Genres", type: "array", of: [defineArrayMember({ type: "string" })] }),
        defineField({ name: "accent", title: "Couleur d’accent", type: "string", description: "Ex. #3a4d45" }),
      ],
    }),
    defineField({
      name: "publishing",
      title: "Publication",
      type: "object",
      group: "publishing",
      fields: [
        defineField({ name: "status", title: "Statut", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "releaseDate", title: "Date de sortie", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "defaultFormat", title: "Format par défaut", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "defaultPrice", title: "Prix par défaut", type: "string" }),
        defineField({ name: "defaultIsbn", title: "ISBN par défaut", type: "string" }),
        defineField({ name: "pages", title: "Nombre de pages", type: "number", validation: (Rule) => Rule.integer().min(1) }),
        defineField({ name: "priceOptions", title: "Options de prix", type: "array", of: [defineArrayMember({ type: "priceOption" })] }),
      ],
    }),
    defineField({
      name: "narrative",
      title: "Texte",
      type: "object",
      group: "narrative",
      fields: [
        defineField({ name: "hook", title: "Accroche", type: "text", rows: 3 }),
        defineField({ name: "shortDescription", title: "Description courte", type: "text", rows: 8, validation: (Rule) => Rule.required() }),
        defineField({ name: "longDescription", title: "Synopsis long", type: "text", rows: 12, validation: (Rule) => Rule.required() }),
        defineField({ name: "quote", title: "Citation", type: "text", rows: 4 }),
        defineField({ name: "details", title: "Repères", type: "array", of: [defineArrayMember({ type: "bookDetail" })] }),
      ],
    }),
    defineField({
      name: "media",
      title: "Médias",
      type: "object",
      group: "media",
      fields: [
        defineField({ name: "cover", title: "Couverture principale", type: "mediaImage", validation: (Rule) => Rule.required() }),
        defineField({ name: "editions", title: "Éditions", type: "array", of: [defineArrayMember({ type: "bookEdition" })] }),
        defineField({ name: "relatedGalleryIds", title: "Galeries liées", type: "array", of: [defineArrayMember({ type: "string" })], description: "Slugs de livres dont la galerie doit aussi apparaître." }),
      ],
    }),
    defineField({
      name: "links",
      title: "Liens",
      type: "object",
      group: "links",
      fields: [
        defineField({ name: "purchase", title: "Liens d’achat", type: "array", of: [defineArrayMember({ type: "externalLink" })] }),
        defineField({ name: "playlists", title: "Playlists", type: "array", of: [defineArrayMember({ type: "externalLink" })] }),
        defineField({ name: "chapterOneHref", title: "Lien du premier chapitre", type: "string", description: "URL ou chemin public, par exemple /assets/…" }),
      ],
    }),
    defineField({
      name: "marketing",
      title: "Mise en avant",
      type: "object",
      group: "marketing",
      fields: [
        defineField({ name: "isLatest", title: "Dernière parution", type: "boolean", initialValue: false }),
        defineField({
          name: "featured",
          title: "Bloc mis en avant",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "kicker", title: "Sur-titre", type: "string" }),
            defineField({ name: "shortPitch", title: "Pitch", type: "text", rows: 8 }),
            defineField({ name: "media", title: "Média", type: "bookFeaturedMedia" }),
            defineField({ name: "stats", title: "Statistiques", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", title: "Libellé", type: "string" }), defineField({ name: "value", title: "Valeur", type: "string" })] })] }),
            defineField({ name: "spotlight", title: "Points forts", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", title: "Libellé", type: "string" }), defineField({ name: "value", title: "Valeur", type: "string" })] })] }),
          ],
        }),
      ],
    }),
    defineField({ name: "order", title: "Ordre d’affichage", type: "number", description: "Plus petit = affiché en premier.", initialValue: 100 }),
    defineField({ name: "published", title: "Visible sur le site", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "identity.title", subtitle: "identity.tome", media: "media.cover.image" },
  },
});

const serviceGalleryItem = defineType({
  name: "serviceGalleryItem",
  title: "Exemple de prestation",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required().assetRequired() }),
    defineField({ name: "alt", title: "Texte alternatif", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "label", title: "Libellé", type: "string" }),
  ],
  preview: { select: { title: "label", subtitle: "alt", media: "image" } },
});

const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "eyebrow", title: "Sur-titre", type: "string" }),
    defineField({ name: "price", title: "Prix", type: "string" }),
    defineField({ name: "accent", title: "Couleur d’accent", type: "string" }),
    defineField({ name: "format", title: "Format", type: "string" }),
    defineField({ name: "universe", title: "Univers", type: "string" }),
    defineField({ name: "focus", title: "Point fort", type: "string" }),
    defineField({ name: "gallery", title: "Galerie", type: "array", of: [defineArrayMember({ type: "serviceGalleryItem" })] }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "description", title: "Description", type: "text", rows: 8 }),
    defineField({ name: "order", title: "Ordre d’affichage", type: "number", initialValue: 100 }),
    defineField({ name: "published", title: "Visible sur le site", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "name", subtitle: "price", media: "gallery.0.image" } },
});

const galleryItem = defineType({
  name: "galleryItem",
  title: "Image de galerie",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "image", title: "Image", type: "mediaImage", validation: (Rule) => Rule.required() }),
    defineField({ name: "book", title: "Livre lié", type: "reference", to: [{ type: "book" }] }),
    defineField({ name: "bookSlug", title: "Slug de secours", type: "string", description: "Utilisé uniquement pour les contenus importés ou sans référence." }),
    defineField({ name: "artist", title: "Artiste", type: "string" }),
    defineField({ name: "date", title: "Date affichée", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 5 }),
    defineField({ name: "order", title: "Ordre d’affichage", type: "number", initialValue: 100 }),
    defineField({ name: "published", title: "Visible sur le site", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "title", subtitle: "artist", media: "image.image" } },
});

const review = defineType({
  name: "review",
  title: "Avis de lecture",
  type: "document",
  fields: [
    defineField({ name: "rating", title: "Note", type: "number", validation: (Rule) => Rule.required().integer().min(1).max(5) }),
    defineField({ name: "text", title: "Extrait", type: "text", rows: 5, validation: (Rule) => Rule.required() }),
    defineField({ name: "excerpt", title: "Avis complet", type: "text", rows: 14, validation: (Rule) => Rule.required() }),
    defineField({ name: "book", title: "Livre lié", type: "reference", to: [{ type: "book" }] }),
    defineField({ name: "bookLabel", title: "Nom du livre affiché", type: "string" }),
    defineField({ name: "bookSlug", title: "Slug du livre", type: "string" }),
    defineField({ name: "date", title: "Date affichée", type: "string" }),
    defineField({ name: "author", title: "Auteur de l’avis", type: "string" }),
    defineField({ name: "source", title: "Source", type: "string" }),
    defineField({ name: "tag", title: "Tag", type: "string" }),
    defineField({ name: "accent", title: "Couleur d’accent", type: "string" }),
    defineField({ name: "link", title: "Lien vers l’avis", type: "url" }),
    defineField({ name: "isbn", title: "ISBN", type: "string" }),
    defineField({ name: "order", title: "Ordre d’affichage", type: "number", initialValue: 100 }),
    defineField({ name: "published", title: "Visible sur le site", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "bookLabel", subtitle: "author" } },
});

const citation = defineType({
  name: "citation",
  title: "Citation",
  type: "document",
  fields: [
    defineField({ name: "quoteNumber", title: "Numéro", type: "number", validation: (Rule) => Rule.required().integer().min(1) }),
    defineField({ name: "createdAt", title: "Date affichée", type: "string" }),
    defineField({ name: "quote", title: "Citation", type: "text", rows: 6, validation: (Rule) => Rule.required() }),
    defineField({ name: "authorOfQuote", title: "Auteur de la citation", type: "string" }),
    defineField({ name: "book", title: "Livre lié", type: "reference", to: [{ type: "book" }] }),
    defineField({ name: "bookTitle", title: "Titre du livre affiché", type: "string" }),
    defineField({ name: "order", title: "Ordre d’affichage", type: "number", initialValue: 100 }),
    defineField({ name: "published", title: "Visible sur le site", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "quote", subtitle: "bookTitle" } },
});

export const schemaTypes = [
  externalLink,
  mediaImage,
  bookDetail,
  priceOption,
  editionPublishing,
  bookEdition,
  bookFeaturedMedia,
  book,
  serviceGalleryItem,
  service,
  galleryItem,
  review,
  citation,
];
