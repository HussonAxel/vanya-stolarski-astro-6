export interface Citation {
  quoteNumber: number;
  createdAt: string;
  quote: string;
  authorOfQuote: string;
  bookTitle: string;
}

export const citations: Citation[] = [
  {
    quoteNumber: 1,
    createdAt: "19 décembre 2025",
    quote:
      "Si Ethan ne voyait pas d’un mauvais oeil l’idée d’aller en enfer, celle qu’Esther soit condamnée à l’éternelle perdition ne lui était pas supportable.",
    authorOfQuote: "Vanya Stolarski",
    bookTitle: "Fous-Papillons",
  },
  {
    quoteNumber: 2,
    createdAt: "15 août 2025",
    quote:
      "Le salon était si vide, la chambre si froide, le lit trop grand et son coeur trop vide de n’avoir personne à aimer.",
    authorOfQuote: "Vanya Stolarski",
    bookTitle: "Fous-Papillons",
  },
  {
    quoteNumber: 3,
    createdAt: "15 août 2025",
    quote:
      "Il avait encore un atout dans sa poche. Un atout qui pouvait lui sauver la peau autant que le condamner.",
    authorOfQuote: "Vanya Stolarski",
    bookTitle: "Coeur de Renard",
  },
  {
    quoteNumber: 4,
    createdAt: "15 août 2025",
    quote:
      "Fortune était ce genre de femme à trouver un cap en pleine tempête, à remplacer le capitaine si celui-ci venait à tomber. Elle rétablissait l'ordre et le créait là où il n'y en avait pas.",
    authorOfQuote: "Vanya Stolarski",
    bookTitle: "Coeur de Renard",
  },
  {
    quoteNumber: 5,
    createdAt: "15 août 2025",
    quote:
      "Fortune était la solution à presque tous ses problèmes et, non content d'avoir bénéficié de sa générosité sans rien lui offrir en retour, il comptait l'extorquer d'une bien vile manière : en utilisant contre elle sa bonne foi et son désir de révolte.",
    authorOfQuote: "Vanya Stolarski",
    bookTitle: "Coeur de Renard",
  },
];
