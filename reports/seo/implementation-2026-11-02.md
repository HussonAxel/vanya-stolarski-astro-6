# Fiabilité, performances et mesure - 2 novembre 2026

## Périmètre livré localement

Le PDF de proposition a été créé et vérifié avant les premières modifications du site de ce lot : `output/pdf/proposition-seo-vanya-stolarski.pdf` (3 pages). Les nouvelles pages de prestations, la biographie et l’enrichissement éditorial des fiches restent des propositions à valider. Aucun nouveau résumé, prix, délai ou parcours professionnel n’a été inventé. Aucun document Sanity n’a été modifié à distance et ce lot n’a pas été poussé.

## Avis Amazon

Sources consultées dans le navigateur :

| Livre / référence | Relevé vérifié le 02/11/2026 |
| --- | --- |
| [Fous-Papillons - B0FG8X1YMY](https://www.amazon.fr/dp/B0FG8X1YMY) | 4,8/5 ; 20 évaluations |
| [Cœur de Renard tome 1 - B0GKN5WW28](https://www.amazon.fr/dp/B0GKN5WW28) | 4,6/5 ; 6 évaluations |
| [Cœur de Renard tome 2 - B0HHX8W66W](https://www.amazon.fr/dp/B0HHX8W66W) | Aucun avis client affiché lors du relevé ; aucune note déduite |

Six courts extraits sont présentés, avec pseudonymes réels, dates, notes vérifiées et liens individuels. La sélection comporte aussi des avis à quatre étoiles. Les notes Amazon ne sont pas recalculées à partir de cette sélection. Les données sont des instantanés datés, sans scraping à chaque visite ni promesse de synchronisation automatique.

La moyenne 5.0 fixe et les notes cinq étoiles par défaut ont été supprimées. Les anciennes entrées CMS sans provenance vérifiée sont exclues de l’affichage. Le Studio dispose d’un champ de vérification explicite ; les entrées vérifiées peuvent compléter le jeu local, avec déduplication par lien source. Les documents historiques restent dans Sanity.

## Dépendances et sécurité

| Module | Avant | Après |
| --- | --- | --- |
| Astro | 7.3.5 | 7.4.4 |
| @astrojs/vercel | 11.0.11 | 11.0.17 |
| @astrojs/react | 7.0.0 | 7.1.2 |
| React / React DOM | 19.3.0 | 19.3.1 |
| Sanity | 6.16.0 | 6.21.0 |
| @sanity/astro | 3.5.1 | 3.6.0 |
| @sanity/client | 8.7.0 | 8.14.1 |
| Three.js / types | 0.186.1 / 0.186.0 | 0.187.0 / 0.187.0 |

Autres mises à jour : styled-components, tslib, dotenv, @astrojs/check et types Node alignés sur Node 24. pnpm exécute maintenant les commandes du projet avec Node 24.22.2. `.nvmrc` et `engines` indiquent Node 24. Le fichier npm obsolète a été supprimé ; pnpm est la référence unique et l’installation avec verrouillage strict réussit. TypeScript 6 est conservé : une migration majeure n’est pas nécessaire pour ces corrections.

Correctifs transitifs dans la même version majeure pour path-to-regexp, js-yaml, smol-toml, undici et zod. Les exceptions d’âge de publication pour d’anciennes versions Sanity ont été retirées.

Résultat de `pnpm audit --prod` sur le graphe de production, incluant certains outils de build déclarés comme dépendances :

| Gravité | Avant | Après |
| --- | ---: | ---: |
| Critique | 1 | 0 |
| Élevée | 23 | 0 |
| Modérée | 27 | 2 |
| Faible | 5 | 0 |

Les deux alertes restantes concernent minimatch 10.2.6 et glob 13.0.6. Les correctifs publiés indiqués par l’audit exigent leurs versions majeures suivantes ; aucun remplacement majeur forcé n’a été ajouté dans une dépendance transitive. Ces alertes ne prouvent pas une exploitation du site public. La correction critique DOMPurify est incluse dans les nouvelles résolutions.

## Performances et accessibilité

- Atelier : script d’entrée généré de 642 443 octets à 696 octets, avant compression. Le moteur reste dans un module séparé d’environ 647 ko, téléchargé uniquement après activation explicite. Ce chiffre ne représente pas le poids total de la page et ne promet pas un gain de Core Web Vitals.
- Le rendu WebGL s’arrête hors écran et lorsque l’onglet est masqué. Reprise à visibilité retrouvée ; libération des ressources à la sortie.
- En-tête : suppression des écritures de variables CSS héritées à chaque frame, des animations de largeur/padding/flou et du flottement perpétuel. Le passage à l’état défilé anime uniquement une translation.
- Menu : fermé, il est `inert` ; ouvert, le contenu de fond est inactif. Focus initial, boucle de tabulation, fermeture Échap et restitution au bouton d’ouverture.
- Ajout d’un lien d’évitement vers le contenu. Les images du menu utilisent le chargement différé. Le carrousel d’avis ne défile plus automatiquement.
- Vérification visuelle du PDF, du menu mobile et de la page d’avis ; les tests vérifient aussi quatre routes à 390 px de large.

## AEO / GEO et Vercel Web Analytics

Le graphe de la page relie maintenant explicitement chaque fiche à son entité Book (`mainEntity`) ; le tome figure dans son nom alternatif. Les contenus littéraires et la politique Cloudflare sur les robots sont conservés. Les contenus supplémentaires proposés dans le PDF nécessitent encore les informations de l’autrice.

Vercel Web Analytics est intégré avec deux activations explicites et indépendantes :

1. Activer Web Analytics dans le projet Vercel, puis `PUBLIC_VERCEL_ANALYTICS_ENABLED=true` en production.
2. Si le forfait le permet, `PUBLIC_VERCEL_ANALYTICS_CUSTOM_EVENTS=true` pour les événements personnalisés (Pro/Enterprise), puis redéployer.

Événements : clic boutique, extrait PDF, ouverture du dialogue de devis et clic de contact email/Gmail/Instagram. Les seules propriétés personnalisées sont le chemin de page et une catégorie de destination. Les adresses email, sujets et paramètres d’URL ne sont pas transmis dans ces propriétés ; les URL de pages vues sont nettoyées. L’intégration n’envoie rien en développement ni sur les domaines de prévisualisation. Aucun abonnement n’a été changé. Sans accès au compte Vercel, la disponibilité du forfait, l’activation et la réception effective restent à confirmer.

Une ouverture de dialogue n’est pas une demande de devis envoyée ; un clic boutique n’est pas un achat. Ces métriques mesurent les intentions accessibles depuis le site.

## Validation et limites

- `pnpm check` : 61 fichiers, aucune erreur ni avertissement.
- `pnpm test:seo` avec serveur local : 4 tests, 13 pages et 12 liens internes.
- `pnpm test:reliability` : 2 tests, provenance des avis et contenu des événements.
- `pnpm test:browser` : 4 tests Chromium, menu clavier, avis, moteur 3D différé/arrêt hors écran, adaptation mobile.
- Tests existants de l’importeur et du Studio : 3 tests réussis.
- `pnpm install --frozen-lockfile` et `git diff --check` : réussis.
- `pnpm build` : compilation et prérendu réussis ; assemblage final Vercel encore bloqué sous Windows par EPERM sur les liens symboliques pnpm. Ce résultat n’est pas un build complet réussi. Il reste à vérifier dans l’environnement de déploiement.
- Le module 3D conserve un avertissement de taille ; il est désormais chargé à la demande. Aucun nouveau score PageSpeed ni gain de trafic n’est revendiqué.

Références : [événements personnalisés Vercel](https://vercel.com/docs/analytics/custom-events), [activation Web Analytics](https://vercel.com/docs/analytics/quickstart), [guide Google sur les fonctionnalités IA](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).
