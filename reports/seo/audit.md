# Audit SEO — Vanya Stolarski
Date : 2 novembre 2026. Domaine : https://www.vanyastolarski.fr/. Cible : public français, romans et illustration à parts égales.

## Synthèse
Les contenus des romans existent déjà et les pages sont rendues côté serveur. Les lacunes prioritaires concernent leur présentation aux moteurs : descriptions absentes sur 12 pages, aucune canonical sur les 13 pages inspectées, titres identiques pour les deux tomes de Cœur de Renard, H1 de navigation répété et sitemap absent à l’adresse /sitemap.xml.
Les corrections sont dans le projet local, sans déploiement, sans écriture dans Sanity et sans nouveau synopsis, prix, ISBN, date, note ou témoignage.

## Méthode et preuves
Avant : lecture du site de production avec le navigateur, inspection du HTML des 13 routes, du robots.txt et de /sitemap.xml ; vérification du DOM rendu de l’accueil pour les données structurées.
Après : mêmes métadonnées extraites du serveur Astro local, alimenté par les contenus Sanity configurés, plus tests automatiques.
Les captures détaillées sont dans [before-after.json](./before-after.json). Le bilan visuel est dans [summary.html](./summary.html).
L’absence de JSON-LD dans le HTML n’exclut pas à elle seule une injection JavaScript : le DOM de l’accueil et le code source ont également été examinés. Les nouvelles données structurées sont rendues côté serveur et parsées dans les tests.

## Constats et corrections

| Priorité / impact attendu | Constat et preuve | Correction livrée |
| --- | --- | --- |
| P1 / élevé | /sitemap.xml renvoyait 404 | Sitemap XML dynamique : 8 routes publiques et 5 fiches publiées, données Sanity identiques au catalogue, cache invalidé par le webhook existant |
| P1 / élevé | 0/13 canonical | Canonical absolue sur le domaine officiel, sans paramètres de suivi ni slash final sauf racine ; origine Astro explicitée |
| P1 / moyen | 12/13 sans description | 13 descriptions distinctes ; fiches construites à partir du titre, du tome et du texte éditorial existant, tronqué sans reformulation |
| P1 / moyen | Les deux tomes de Cœur de Renard avaient le même title | Tome présent dans les titres des fiches concernées |
| P1 / moyen | H1 Explorer dans le menu ; 11 pages avec deux H1 | Menu converti en paragraphe, H1 d’identité sur l’accueil, titres descriptifs du catalogue, des prestations et des pages de soutien ; textes poétiques conservés dans les introductions |
| P1 / moyen | Livre inconnu redirigé vers /livres puis 200 | Véritable réponse 404, page française utile et noindex ; pas de canonical de page valide sur une erreur |
| P2 / moyen | Prestations peu explicites dans la navigation principale et l’accueil | Liens descriptifs vers /tarifs et accès parallèles romans / illustration sur l’accueil |
| P2 / moyen | Certaines images de galerie pointaient vers des fiches absentes | Lien vers un roman proposé seulement si sa fiche existe dans le catalogue publié |
| P2 / moyen | Aucune donnée structurée repérée dans les sources et l’accueil rendu | Graphe Person / WebSite / WebPage ; Book et fil d’Ariane sur les fiches, issus des données existantes ; sérialisation protégée contre une fermeture de script venant du CMS |
| P2 / faible | Balises de partage absentes du layout | Open Graph, locale fr_FR, cartes Twitter ; couverture et texte alternatif existants pour les livres |
| P2 / moyen | sizes des couvertures annonçait 42rem sur grand écran | 24rem pour la colonne de l’accueil, 28rem pour les fiches ; adaptation aux petites tailles, srcset et priorité de la première image conservés |

Le robots.txt de production est géré par Cloudflare : il existe et autorise la recherche. Le fichier ajouté à l’origine indique le sitemap et exclut les chemins techniques. La politique Cloudflare sur les robots d’entraînement reste gérée à la périphérie. Vérifier après déploiement que le fichier final conserve les règles et expose la ligne Sitemap.

## Comparatif mesuré
Périmètre identique de 13 pages. Avant = production ; après = local.

| Contrôle | Avant | Après |
| --- | ---: | ---: |
| Pages avec description | 1/13 | 13/13 |
| Pages avec canonical | 0/13 | 13/13 |
| Titres distincts | 12 pour 13 pages | 13 pour 13 pages |
| Pages avec exactement un H1 dans le HTML | 2/13, dont l’accueil avec le seul H1 de menu | 13/13 |
| Pages avec JSON-LD dans le HTML | 0/13 | 13/13 |
| Sitemap à /sitemap.xml | 404 | 200, 13 URL |
| URL de livre inconnue | Redirection vers catalogue 200 | 404 et noindex |

Ce sont des vérifications d’implémentation. Elles ne mesurent ni classement, ni indexation effective, ni hausse de CTR ou de trafic. Une canonical et un sitemap sont des signaux, pas une garantie d’indexation ; Google peut aussi choisir un autre extrait.

## Titres avant / après
| `/` | Vanya Stolarski - Autrice & Illustratrice | Vanya Stolarski | Romans et illustration de livres |
| `/livres` | Livres - Vanya Stolarski | Romans de Vanya Stolarski | Livres et éditions |
| `/tarifs` | Tarifs - Vanya Stolarski | Illustration de livres : prestations et tarifs | Vanya Stolarski |
| `/galerie` | Galerie - Vanya Stolarski | Galerie des univers des romans | Vanya Stolarski |
| `/reviews` | Avis de lecture - Vanya Stolarski | Avis de lecture sur les romans | Vanya Stolarski |
| `/citations` | Citations - Vanya Stolarski | Citations et extraits des romans | Vanya Stolarski |
| `/coll-libris` | Coll'Libris - Cartes collector | Vanya Stolarski | Coll'Libris - Cartes collector | Vanya Stolarski |
| `/atelier-cartes` | Atelier cartes 3D - Vanya Stolarski | Atelier cartes 3D - Vanya Stolarski |
| `/livres/trouver-la-lune` | Trouver la Lune - Vanya Stolarski | Trouver la Lune — Tome I | Vanya Stolarski |
| `/livres/coeur-de-renard` | Coeur de Renard - Vanya Stolarski | Coeur de Renard — Tome 1 | Vanya Stolarski |
| `/livres/fous-papillons` | Fous-Papillons - Vanya Stolarski | Fous-Papillons | Vanya Stolarski |
| `/livres/coeur-de-renard-tome-2` | Coeur de Renard - Vanya Stolarski | Coeur de Renard — Tome 2 | Vanya Stolarski |
| `/livres/le-coeur-dankaa` | Le coeur d'Ankaa - Vanya Stolarski | Le coeur d'Ankaa — Tome 1 | Vanya Stolarski |

## Carte des intentions de recherche
Hypothèses fondées sur les contenus existants, sans volumes ni positions inventés. À confronter aux requêtes Search Console.

| Destination | Intention principale | Conversion |
| --- | --- | --- |
| / | Vanya Stolarski, autrice et illustratrice | Choix romans ou illustration |
| /livres | Romans de Vanya Stolarski | Choix d’un livre |
| /livres/[slug] | Titre exact + autrice + tome | Lecture de la présentation, extrait, achat externe |
| /tarifs | Illustration de livres, couverture de livre, jaspage, cartographie, tarifs | Demande de devis |
| /galerie | Illustrations des univers des romans | Exploration des créations et de leur contexte |
| /reviews | Avis + titre de roman | Réassurance avant achat |
| /citations | Citations + titre de roman | Découverte des textes et du catalogue |
| /coll-libris | Coll’Libris, cartes collector | Découverte de la collection |

Ne pas créer automatiquement de pages pour chaque mot-clé. Les galeries présentent plusieurs artistes : elles ne doivent pas être décrites comme des réalisations exclusivement signées Vanya.

## Vérifications
- `npm run check` : 54 fichiers, aucune erreur, aucun avertissement.
- `SEO_TEST_ORIGIN=http://127.0.0.1:4321 npm run test:seo` : 4 tests réussis, dont contrôle HTTP des 13 pages et de 12 destinations internes, sitemap XML, titres/descriptions distincts, canonical avec paramètre de suivi, H1, JSON-LD, 404, robots.
- Les tests contrôlent aussi l’échappement JSON-LD et la distinction des tomes ; les tests HTTP sont ignorés sans SEO_TEST_ORIGIN.
- `git diff --check` : réussi.
- Accueil local inspecté dans le navigateur : H1 visible sous l’en-tête, navigation parallèle vers les deux activités, pas de débordement horizontal à la largeur inspectée (1279 px).
- `npm run build` : compilation serveur/client et prérendu effectués ; assemblage final de l’adaptateur Vercel bloqué par EPERM sur une création de lien symbolique de dépendance React sous Windows. La génération de production complète reste à vérifier dans l’environnement de déploiement.
- Avertissement de build sur le poids du module de l’atelier 3D et sur la version Node locale 26 (runtime Vercel 24). Aucun score Core Web Vitals de terrain n’est revendiqué.
- Les données structurées sont parsées et cohérentes avec les sources ; la validation Rich Results Test après déploiement reste à faire. Book n’est pas une promesse d’enrichissement visible dans Google.

## Suite priorisée
1. **Mise en ligne** : terminer le build dans l’environnement Vercel habituel ; vérifier sur le domaine les réponses HTTP, robots.txt et sitemap avant de soumettre ce dernier dans Search Console.
2. **Mesure** : conserver une référence des 28 derniers jours dans Search Console, filtrée sur France. Comparer ensuite des périodes équivalentes en tenant compte des sorties de livres et campagnes. Séparer recherches de marque, titres de livres et prestations.
3. **Conversions** : suivre séparément les clics vers les boutiques et les demandes de devis, si un outil de mesure conforme aux choix de confidentialité est déjà en place. Aucun traceur ajouté.
4. **CTR et positions 8–20** : dès que des données sont disponibles, choisir les pages à impressions réelles et retravailler leurs titres selon les requêtes constatées ; pas de classement concurrentiel inventé.
5. **Prestations** : des pages dédiées couverture / jaspage / cartographie peuvent être pertinentes seulement avec des exemples attribués, processus et conditions confirmés. Rassembler ces informations avant de les rédiger.
6. **Confiance** : envisager une page de présentation avec parcours, publications et crédits vérifiés ; demander ces éléments à l’autrice avant publication.
7. **Performance** : mesurer PageSpeed Insights et les données de terrain après déploiement, notamment l’accueil et une fiche livre sur mobile. Le poids de l’atelier 3D mérite une investigation distincte ; pas de refonte de ses effets dans ce lot.

## Références
- [Google : canonicalisation](https://developers.google.com/search/docs/crawling-indexing/canonicalization)
- [Google : construire et soumettre un sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google : guide SEO pour développeurs](https://developers.google.com/search/docs/fundamentals/get-started-developers)
- [Google : principes SEO JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Site de production audité](https://www.vanyastolarski.fr/)
