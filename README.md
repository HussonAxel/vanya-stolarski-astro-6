# Vanya Stolarski

## Environnement

Utiliser Node.js 24 (`.nvmrc`) et pnpm 11.9.0. `pnpm-lock.yaml` est le seul fichier de verrouillage de référence, également utilisé par Vercel.

## Commandes

| Commande | Action |
| :-- | :-- |
| `pnpm install --frozen-lockfile` | Installe les dépendances |
| `pnpm dev` | Lance le site en local |
| `pnpm build` | Génère la version de production |
| `pnpm preview` | Ouvre un aperçu local de la production |
| `pnpm sanity:import` | Importe les constantes et images actuelles dans Sanity |
| `pnpm sanity:typegen` | Extrait le schéma et génère les types Sanity |

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
4. Lancer `pnpm dev`, puis ouvrir `http://localhost:4321/admin` pour vérifier le Studio.
5. Dans Sanity, ajouter `http://localhost:4321` aux origines CORS autorisées pour les requêtes authentifiées.
6. Créer un token API avec permission `Editor`, le placer temporairement dans `SANITY_API_WRITE_TOKEN`, puis lancer `pnpm sanity:import`.
7. Retirer le token d’écriture du fichier `.env` après l’import si aucune migration supplémentaire n’est prévue.

Le site garde un fallback sur les fichiers locaux tant qu’aucun projet Sanity n’est configuré, ou si le dataset ne contient encore aucun document. Une fois l’import réalisé, les pages SSR utilisent les documents publiés de Sanity ; les modifications publiées sont donc visibles sans modifier le code.

Les tokens ne doivent jamais être préfixés par `PUBLIC_` ni commités. En production, seul `PUBLIC_SANITY_PROJECT_ID` et `PUBLIC_SANITY_DATASET` doivent être publics ; les tokens restent des variables secrètes du fournisseur de déploiement.

### Cache CDN et webhook de publication

Les pages alimentées par Sanity sont mises en cache sur le CDN Vercel (`routeRules` dans `astro.config.mjs`) : 1 heure de fraîcheur, puis jusqu’à 1 jour servies en l’état pendant leur régénération en arrière-plan. `/atelier-cartes` et `/coll-libris` sont prérendues au build.

Pour qu’une publication soit visible immédiatement, créer un webhook dans [sanity.io/manage](https://www.sanity.io/manage) (API → Webhooks) :

1. URL : `https://<domaine>/api/revalidate`, méthode `POST`, dataset `production`.
2. Déclencheurs : création, mise à jour et suppression ; brouillons exclus.
3. En-tête HTTP : `Authorization: Bearer <secret>`.
4. Déclarer le même secret dans la variable Vercel `SANITY_REVALIDATE_SECRET`, puis redéployer (la valeur est lue au build).

Le webhook marque toutes les pages en cache comme périmées : la visite suivante reçoit encore l’ancienne version et déclenche sa régénération.

## Campagne Ulule dynamique

Le menu principal embarque une carte `Dernière campagne Ulule` rendue côté serveur via une server island Astro.

Configuration :

1. Copier `.env.example` en `.env`.
2. Renseigner `ULULE_PROJECT_ID` avec l’identifiant du projet Ulule.

Notes techniques :

- les données Ulule sont récupérées côté serveur ;
- le cache mémoire est conservé pendant 4 heures ;
- si Ulule ne répond pas ou si `ULULE_PROJECT_ID` est absent, le site retombe sur une carte de campagne statique.


## Avis Amazon et provenance

Les instantanés vérifiés sont dans `src/data/reviews.ts` : notes par livre, nombre d’évaluations, courts extraits, pseudonymes et liens individuels. Le relevé est daté du 2 novembre 2026 et n’est pas actualisé automatiquement. Un nombre d’évaluations Amazon n’est pas un nombre d’avis reproduits sur le site.

Dans le Studio, renseigner « Source Amazon vérifiée le » uniquement après vérification du lien individuel, de la note, de l’extrait et du pseudonyme. Les anciennes entrées sans provenance vérifiée ne sont plus affichées. Aucun document Sanity existant n’a été réécrit par cette mise à jour. Les notes globales ne sont pas déduites de la sélection d’extraits.

## Vercel Web Analytics

L’intégration est prête mais reste inactive par défaut :

1. Activer **Web Analytics** dans le tableau de bord du projet Vercel.
2. Définir `PUBLIC_VERCEL_ANALYTICS_ENABLED=true` pour la production et redéployer.
3. Si le plan autorise les événements personnalisés (Pro/Enterprise), définir aussi `PUBLIC_VERCEL_ANALYTICS_CUSTOM_EVENTS=true` puis redéployer.

Événements : `shop_click` (intention d’achat, pas achat confirmé), `chapter_click`, `quote_open` (ouverture du dialogue, pas devis envoyé), `contact_click` (email/Gmail/Instagram). Les propriétés sont limitées au chemin de page sans paramètres et à une catégorie de destination ; aucun email, sujet ou texte de demande n’est transmis. Les pages vues sont débarrassées de leurs paramètres et fragments. Aucune collecte en développement, sur les domaines de prévisualisation ni dans le Studio.

Sans accès au compte Vercel, l’activation et les premières données ne peuvent pas être confirmées depuis ce dépôt. Aucun changement de forfait payant n’est effectué. Références : https://vercel.com/docs/analytics/quickstart et https://vercel.com/docs/analytics/custom-events.

## Vérifications

- `pnpm check`
- `pnpm test:reliability`
- `pnpm exec playwright install chromium` puis `pnpm test:browser`
- Avec le site lancé : `SEO_TEST_ORIGIN=http://127.0.0.1:4321 pnpm test:seo` (PowerShell : `$env:SEO_TEST_ORIGIN='http://127.0.0.1:4321'; pnpm test:seo`).
- `pnpm audit --prod`
- `pnpm build` ; sous Windows, l’assemblage Vercel peut nécessiter la permission de créer les liens symboliques de dépendances pnpm. Ce point ne doit pas être masqué comme un build réussi.

Le moteur 3D de `/atelier-cartes` est téléchargé après activation explicite. Son rendu est suspendu hors écran et lorsque l’onglet est masqué. Les tests navigateur vérifient le chargement différé, la pause hors écran, le clavier du menu et l’absence de débordement mobile.
