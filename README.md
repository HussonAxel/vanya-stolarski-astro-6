# Vanya Stolarski

## Commandes

| Commande          | Action                                  |
| :---------------- | :-------------------------------------- |
| `npm install`     | Installe les dependances                |
| `npm run dev`     | Lance le site en local                  |
| `npm run build`   | Genere la version de production         |
| `npm run preview` | Ouvre un apercu local de la production  |

## Campagne Ulule dynamique

Le menu principal embarque une carte `Derniere campagne Ulule` rendue cote serveur via une server island Astro.

Configuration:

1. Copier `.env.example` en `.env`
2. Renseigner `ULULE_PROJECT_ID` avec l'identifiant du projet Ulule
3. Optionnel: ajuster `ULULE_SECONDARY_HREF` et `ULULE_SECONDARY_LABEL`

Notes techniques:

- Les donnees Ulule sont recuperees cote serveur
- Le cache memoire est conserve pendant `4 heures`
- Si Ulule ne repond pas ou si `ULULE_PROJECT_ID` est absent, le site retombe sur une carte de campagne statique
- Le projet utilise `@astrojs/node` pour supporter ce rendu serveur cible
