# Vanya Stolarski

## Commandes

| Commande | Action |
| :-- | :-- |
| `npm install` | Installe les dépendances |
| `npm run dev` | Lance le site en local |
| `npm run build` | Génère la version de production |
| `npm run preview` | Ouvre un aperçu local de la production |
| `npm run sanity:import` | Importe les constantes et images actuelles dans Sanity |
| `npm run sanity:typegen` | Extrait le schéma et génère les types Sanity |

## Sanity CMS

Le projet intègre Sanity avec son Studio directement sur `/admin`. Les contenus suivants sont éditables :

- livres, éditions, synopsis, prix, liens et mises en avant ;
- services et galeries d’exemples ;
- images de la galerie, avec livre lié, artiste et description ;
- avis de lecture et citations.

### Première configuration

1. Créer un projet sur [sanity.io/manage](https://www.sanity.io/manage).
2. Copier `.env.example` vers `.env`.
3. Renseigner `PUBLIC_SANITY_PROJECT_ID` et `PUBLIC_SANITY_DATASET`.
4. Lancer `npm run dev`, puis ouvrir `http://localhost:4321/admin` pour vérifier le Studio.
5. Dans Sanity, ajouter `http://localhost:4321` aux origines CORS autorisées pour les requêtes authentifiées.
6. Créer un token API avec permission `Editor`, le placer temporairement dans `SANITY_API_WRITE_TOKEN`, puis lancer `npm run sanity:import`.
7. Retirer le token d’écriture du fichier `.env` après l’import si aucune migration supplémentaire n’est prévue.

Le site garde un fallback sur les fichiers locaux tant qu’aucun projet Sanity n’est configuré, ou si le dataset ne contient encore aucun document. Une fois l’import réalisé, les pages SSR utilisent les documents publiés de Sanity ; les modifications publiées sont donc visibles sans modifier le code.

Les tokens ne doivent jamais être préfixés par `PUBLIC_` ni commités. En production, seul `PUBLIC_SANITY_PROJECT_ID` et `PUBLIC_SANITY_DATASET` doivent être publics ; les tokens restent des variables secrètes du fournisseur de déploiement.

## Campagne Ulule dynamique

Le menu principal embarque une carte `Dernière campagne Ulule` rendue côté serveur via une server island Astro.

Configuration :

1. Copier `.env.example` en `.env`.
2. Renseigner `ULULE_PROJECT_ID` avec l’identifiant du projet Ulule.
3. Optionnel : ajuster `ULULE_SECONDARY_HREF` et `ULULE_SECONDARY_LABEL`.

Notes techniques :

- les données Ulule sont récupérées côté serveur ;
- le cache mémoire est conservé pendant 4 heures ;
- si Ulule ne répond pas ou si `ULULE_PROJECT_ID` est absent, le site retombe sur une carte de campagne statique.
