# Univers du Cinéma — Portail d'Actualités & Magazine Cinématographique

Magazine d'actualités cinéma et séries de référence, reprenant l'élégance éditoriale des publications emblématiques (Variety, Deadline, Première) avec un bandeau rouge distinctif, un aperçu rapide d'articles sur la page d'accueil, un lecteur popup de bandes-annonces, un calendrier interactif des sorties en salles, un classement Box-Office hebdomadaire, et un espace de publication pour les rédacteurs.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> Les choix de conception validés lors de la phase de cadrage régissent l'architecture et les interactions :
> - **Aperçu rapide direct** : Les articles complets s'ouvrent en aperçu rapide sur la page d'accueil (tiroir latéral fluide et lecture enrichie avec citation, galerie et crédits) sans rupture de contexte.
> - **Fonctionnalités interactives majeures intégrées** :
>   1. Lecteur vidéo popup (modal fluide) pour visionner les bandes-annonces HD de films et séries avec synopses.
>   2. Calendrier interactif des sorties cinéma filtrable (sorties de la semaine et du mois avec dates et distributeurs).
>   3. Moteur de recherche instantanée et filtres par catégorie (Films, Séries, Bandes-annonces, Box-Office, DVD/Blu-Ray).
>   4. Classement interactif du Top Box-Office hebdomadaire avec entrées, évolutions de rang et recettes.
> - **Espace Rédacteur / Publication** : Formulaire dédié permettant d'ajouter, modifier et gérer les actualités avec persistance locale (`localStorage`).

---

## 1. Vue d'Ensemble & Concept

- **Rôle du Produit** : Portail web francophone d'actualités cinématographiques au design journalistique inspiré de *Variety* et *Deadline*, alliant rigueur typographique et fonctionnalités interactives pour cinéphiles.
- **Audience Cible** : Passionnés de cinéma, journalistes, cinéphiles à la recherche des dernières actualités, bandes-annonces récentes, dates de sorties en salle et tendances du box-office.
- **Valeur Clé** : Ergonomie de lecture immédiate (zéro chargement de page lourd), navigation catégorielle réactive, et outils intégrés (trailers, calendrier des sorties, box-office, console de publication).

---

## 2. Expérience Utilisateur & Design Visuel

### A. Direction Artistique & Palette
- **Inspiration** : Grandes revues hollywoodiennes et européennes (Variety, Deadline, Cahiers du Cinéma, Allociné Pro).
- **Palette chromatique (Discipline 60-30-10)** :
  - *Toile de fond neutre (60%)* : Blanc pur (`#FFFFFF`) et blanc cassé chaud (`#F9FAFB`) apportant clarté et confort de lecture.
  - *Surfaces structurelles (30%)* : Cartes blanc immaculé avec bordures ultra-fines (`border-gray-200`), séparateurs typographiques discrets, typographies titrage noir encre (`#111827`) et texte courant anthracite (`#4B5563`).
  - *Bandeau et accents vifs (10%)* : Rouge cinéma vibrant (`#B91C1C` / `bg-red-700`, avec rehauts `#991B1B`), rappelant les tapis rouges et enseignes de cinémas vintage.
- **Typographie** :
  - *Titrage & Header* : `Montserrat` en graisses bold & black (900) pour une prestance journalistique affirmée.
  - *Corps de texte* : `Open Sans` pour une lisibilité optimale sur les longs paragraphes.
  - *Chiffres & Box-Office* : `tabular-nums font-mono` pour l'alignement précis des entrées et montants.
- **Respect anti-slop** :
  - Pas de pilules superflues sur les métadonnées : séparateurs discrets `·` ou `/` avec typographie calme.
  - Pas de badges gadgets ni de fausses balises code.
  - Vrais lecteurs vidéo et contrôles fonctionnels sans faux boutons.

### B. Parcours Utilisateur
1. **En-tête & Navigation** :
   - Grand bandeau rouge supérieur avec titre signature "UNIVERS DU CINÉMA".
   - Barre de navigation typographique avec sous-menus déroulants interactifs : *News*, *Films / Séries*, *Bandes-annonces (Films, Séries)*, *Cinéma (Sorties de la semaine, Sorties du mois)*, *DVD / Blu-Ray*.
   - Barre d'outils secondaire : recherche instantanée en direct, filtre rapide par catégorie et bouton d'accès à l'espace rédacteur.
2. **Zone Principale (Grille 2/3 - 1/3)** :
   - *Colonne gauche (2/3)* :
     - **Dernière News (À la Une)** : Grand visuel cinématographique, surtitre éditorial rouge, titre percutant, résumé et bouton d'action "Lire l'article complet".
     - **Flux des actualités filtrées** : Grille d'articles avec aperçu de lecture instantané, temps de lecture et date.
     - **Vues spécialisées activables** (via les menus de navigation) :
       - *Vue Calendrier des sorties* : fiches films avec date de sortie, réalisateur, casting et genre.
       - *Vue Bandes-annonces* : grille vidéo avec bouton de lecture directe en popup.
       - *Vue Box-Office* : tableau interactif hebdomadaire avec évolution des entrées.
   - *Colonne droite (1/3)* :
     - **News Précédentes & En continu** : Flux chronologique des actualités récentes avec miniatures, badges de catégorie textuels et horodatages.
     - **Widget Top 5 Box-Office express** : Aperçu rapide des films les plus vus de la semaine.
     - **Bande-annonce en vedette** : Carte interactive lançant directement le lecteur vidéo modal.
3. **Aperçu Rapide d'Article (Tiroir / Modal fluide)** :
   - Déclenchement au clic sur n'importe quel article.
   - Affiche le contenu complet, la galerie d'images, les citations clés, l'auteur, les tags thématiques, et un bouton pour partager ou fermer facilement.
4. **Lecteur Vidéo Popup (Trailer Modal)** :
   - Lecteur plein écran optimisé avec intégration vidéo responsive, synopsis du film, fiche technique et date de sortie.
5. **Panneau de Rédaction (Espace Éditeur)** :
   - Modal ou volet d'administration permettant de rédiger un nouvel article : titre, catégorie, résumé, corps de texte, URL d'image, statut "À la Une", et intégration d'une bande-annonce. Sauvegarde instantanée dans le stockage local.

---

## 3. Choix Produits & Arbitrages Techniques

- **Navigation fluide intégrée sans rechargement** :
  - *Choix* : Navigation par états réactifs synchronisés avec l'historique et la barre de navigation. Les liens de menu (ex: "Bandes-annonces > Films", "Cinéma > Sorties de la semaine") filtrent dynamiquement la vue principale sans quitter la page.
  - *Pourquoi* : Répond fidèlement au choix utilisateur d'un affichage direct et rapide sur la page d'accueil sans perte de contexte.
- **Persistance locale (`localStorage`)** :
  - *Choix* : Stockage côté client des articles créés et modifiés, pré-alimenté par un catalogue éditorial riche et crédible (films récents, blockbusters, cinéma d'auteur, actualités de tournages).
  - *Pourquoi* : Permet une utilisation complète et autonome immédiate avec persistance entre les rafraîchissements sans dépendance réseau externe fragile.
- **Lecteur Vidéo Adaptatif** :
  - *Choix* : Modal intégrant les vidéos YouTube cinéma officielles au format embed sécurisé (`https://www.youtube-nocookie.com/embed/...`) avec fallback visuel élégant.

---

## 4. Architecture Technique & Modèle de Données

### Diagramme de Composants & Flux

```
┌────────────────────────────────────────────────────────────────────────┐
│                          UNIVERS DU CINÉMA                             │
├────────────────────────────────────────────────────────────────────────┤
│  [ Header & Brand Wordmark : "UNIVERS DU CINÉMA" ]                      │
│  [ Top Nav Bar : News | Films / Séries | Bandes-annonces ▾ | Cinéma ▾ ] │
├────────────────────────────────────────────────────────────────────────┤
│  [ Toolbar : Recherche Instantanée | Filtres Tags | Bouton + Nouvel Art]│
├───────────────────────────────────┬────────────────────────────────────┤
│  COLONNE GAUCHE (2/3)             │  COLONNE DROITE (1/3)              │
│  ┌─────────────────────────────┐  │  ┌───────────────────────────────┐ │
│  │ A la Une (Dernière News)    │  │  │ News Précédentes (Timeline)   │ │
│  │ Visuel, Kicker, Titre, Dex  │  │  │ Cartes compactes avec image   │ │
│  └─────────────────────────────┘  │  └───────────────────────────────┘ │
│  ┌─────────────────────────────┐  │  ┌───────────────────────────────┐ │
│  │ Vues Dynamiques :           │  │  │ Widget Top Box-Office         │ │
│  │ • Flux Articles Filtrés     │  │  │ Classement #1 à #5            │ │
│  │ • Calendrier Sorties        │  │  └───────────────────────────────┘ │
│  │ • Grille Bandes-Annonces    │  │  ┌───────────────────────────────┐ │
│  │ • Classement Box-Office     │  │  │ Trailer du Jour (Vidéo)       │ │
│  └─────────────────────────────┘  │  └───────────────────────────────┘ │
├───────────────────────────────────┴────────────────────────────────────┤
│  INTERACTIONS POPUP & MODALES                                          │
│  ┌─────────────────────────────┐   ┌─────────────────────────────────┐ │
│  │ Tiroir Aperçu Article       │   │ Lecteur Vidéo Popup             │ │
│  │ Lecture complète in-page    │   │ Trailer HD + Fiche technique    │ │
│  └─────────────────────────────┘   └─────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ Modal Rédaction / Éditeur d'Article (Création + Sauvegarde)       │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Modèle de Données TypeScript

- `Article` :
  - `id`: string
  - `title`: string
  - `category`: `'Films'` | `'Séries'` | `'Box-Office'` | `'Bandes-Annonces'` | `'Festivals'` | `'DVD / Blu-Ray'`
  - `kicker`: string (ex: "Exclusif", "Tournage", "Critique")
  - `summary`: string
  - `content`: string (paragraphes détaillés, citations)
  - `imageUrl`: string
  - `publishedAt`: string
  - `author`: string
  - `readTime`: string
  - `featured`: boolean
  - `trailerUrl`?: string
- `MovieRelease` :
  - `id`: string
  - `title`: string
  - `releaseDate`: string
  - `period`: `'week'` | `'month'`
  - `director`: string
  - `cast`: string[]
  - `genre`: string
  - `posterUrl`: string
  - `trailerId`: string
  - `synopsis`: string
- `BoxOfficeEntry` :
  - `rank`: number
  - `previousRank`: number
  - `title`: string
  - `weeklyEntries`: number
  - `totalEntries`: number
  - `weeksCount`: number
  - `distributor`: string
