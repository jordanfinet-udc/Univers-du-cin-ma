import { Article, BoxOfficeItem, MovieRelease, TrailerItem } from '../types/cinema';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Tournage en IMAX 70mm : Les coulisses exclusives de la nouvelle fresque cinématographique de l\'année',
    category: 'News',
    kicker: 'Exclusif',
    summary: 'Plongez au cœur d\'une production colossale où décors réels en studio et caméras argentiques ultra-haute fidélité redéfinissent l\'expérience visuelle en salle. Notre rédaction a pu assister aux premières prises de vue.',
    content: [
      'Dans un contexte où les effets numériques envahissent souvent les superproductions, une poignée de cinéastes persiste à privilégier l\'authenticité de la pellicule et l\'immensité de décors physiques gigantesques. Sur ce plateau de tournage tenu secret jusqu\'à ce matin, l\'effervescence est à son comble.',
      'Les équipes techniques s\'affairent autour d\'une grue géante supportant une caméra IMAX de plus de 45 kilos. L\'éclairage zénithal, orchestré par un directeur de la photographie réputé, crée des contrastes saisissants qui rappellent les grandes heures du cinéma classique tout en exploitant les technologies optiques les plus avant-gardistes.',
      'Selon nos informations recueillies auprès des producteurs, le budget alloué aux prises de vue réelles dépasse les standards habituels : aucun fond vert pour les séquences principales. Les comédiens évoluent dans des environnements entièrement construits pour insuffler une vérité de jeu palpable.',
      'La sortie nationale est d\'ores et déjà calée pour la fin de l\'année, avec une distribution prévue dans un réseau exclusif de salles équipées en projection laser et 70mm.'
    ],
    quote: {
      text: 'Le public ressent immédiatement la différence entre un artifice virtuel et la vibration organique de la lumière traversant une lentille argentique.',
      author: 'Le Directeur de la Photographie'
    },
    imageUrl: '/src/assets/images/hero_cinema_feature_1794356425220.jpg',
    publishedAt: 'Aujourd\'hui à 14:30',
    timeAgo: 'Aujourd\'hui',
    author: 'La Rédaction',
    readTime: '4 min',
    isFeatured: true,
    trailerUrl: 'yoLZT3jX3b4',
    tags: ['Tournage', 'IMAX', 'Production', 'Grand Écran']
  },
  {
    id: 'art-2',
    title: 'Nouveau casting confirmé pour le prochain blockbuster Marvel',
    category: 'Films',
    kicker: 'Casting',
    summary: 'Les studios viennent d\'officialiser l\'arrivée de deux figures prestigieuses du cinéma d\'auteur pour incarner les antagonistes clés de la prochaine phase du MCU.',
    content: [
      'Après des mois de spéculations et de théories de fans, Marvel Studios a enfin levé le voile sur le casting principal de son prochain projet d\'envergure.',
      'L\'intégration d\'acteurs renommés issus du théâtre et du cinéma indépendant marque une volonté claire du studio d\'apporter une intensité dramatique plus dense aux relations entre super-héros et antagonistes.',
      'Le tournage débutera à l\'automne prochain dans les studios de Pinewood à Londres, avec une sortie mondiale programmée pour l\'été suivant.'
    ],
    imageUrl: '/src/assets/images/movie_marvel_blockbuster_1794356425807.jpg',
    publishedAt: 'Aujourd\'hui à 12:15',
    timeAgo: 'Il y a 2 heures',
    author: 'Marc Delaunay',
    readTime: '3 min',
    isFeatured: false,
    trailerUrl: 'd9MyW72ELq0',
    tags: ['Marvel', 'Blockbuster', 'Casting', 'Cinéma US']
  },
  {
    id: 'art-3',
    title: 'La bande-annonce officielle de la saison 2 est enfin disponible',
    category: 'Séries',
    kicker: 'Bande-Annonce',
    summary: 'Deux minutes de tension psychologique haletante confirment le virage plus sombre et viscéral de la série dramatique la plus plébiscitée de ces dernières années.',
    content: [
      'Les premières images de cette seconde saison confirment les promesses des créateurs : la tension monte d\'un cran et les personnages sont poussés dans leurs derniers retranchements moraux.',
      'Portée par une mise en scène intimiste et une photographie aux tonalités ambrées, la série s\'annonce comme l\'un des événements télévisuels majeurs du trimestre à venir.',
      'Les huit épisodes seront diffusés à un rythme hebdomadaire dès le mois prochain, avec une avant-première réservée aux abonnés lors du festival Séries Mania.'
    ],
    imageUrl: '/src/assets/images/series_prestige_drama_1794356426048.jpg',
    publishedAt: 'Aujourd\'hui à 09:40',
    timeAgo: 'Il y a 5 heures',
    author: 'Émilie Mercier',
    readTime: '3 min',
    isFeatured: false,
    trailerUrl: 'uYPbbksJxIg',
    tags: ['Séries', 'Drame', 'Bande-annonce', 'Streaming']
  },
  {
    id: 'art-4',
    title: 'Les chiffres du box-office de la semaine viennent de tomber',
    category: 'Box-Office',
    kicker: 'Analyse',
    summary: 'Forte reprise de la fréquentation dans les salles hexagonales avec plus de 3,8 millions d\'entrées cumulées et un nouveau leader indiscutable au sommet.',
    content: [
      'Le public a répondu massivement présent cette semaine avec une dynamique remarquable portée par un équilibre sain entre cinéma d\'animation familial et thriller d\'auteur.',
      'Le leader du classement franchit le cap symbolique du million d\'entrées dès sa première semaine d\'exploitation, bénéficiant d\'un bouche-à-oreille particulièrement favorable.',
      'Les exploitants de salles soulignent également l\'engouement continu pour les séances en salles premium (Dolby Cinema, IMAX et 4DX), qui représentent désormais près de 25% des recettes globales sur les titres phares.'
    ],
    imageUrl: '/src/assets/images/cinema_palace_marquee_1794356427431.jpg',
    publishedAt: 'Hier à 18:00',
    timeAgo: 'Hier',
    author: 'Thomas Rivoire',
    readTime: '5 min',
    isFeatured: false,
    tags: ['Box-Office', 'Fréquentation', 'Salles', 'Économie']
  },
  {
    id: 'art-5',
    title: 'Sorties 4K Ultra HD & Blu-Ray : L\'édition collector restaurée du chef-d\'œuvre classique',
    category: 'DVD / Blu-Ray / 4K',
    kicker: 'Nouveautés',
    summary: 'Transfert Dolby Vision étincelant depuis le négatif original 35mm, mixage sonore Atmos et plus de 4 heures de suppléments inédits pour les collectionneurs.',
    content: [
      'Les amoureux de supports physiques vont pouvoir redécouvrir cette œuvre majeure dans des conditions de visionnage jamais égalées à domicile.',
      'Le travail de numérisation 4K a été supervisé directement par les ayant-droits et les archivistes de la cinémathèque, restaurant avec une fidélité chirurgicale les teintes argentiques d\'époque sans lissage artificiel.',
      'Le coffret prestige comprend également un livret de 80 pages richement documenté et des entretiens d\'archives exclusifs.'
    ],
    imageUrl: '/src/assets/images/cinema_palace_marquee_1794356427431.jpg',
    publishedAt: 'Il y a 2 jours',
    timeAgo: 'Il y a 2 jours',
    author: 'Lucas Fontenelle',
    readTime: '4 min',
    isFeatured: false,
    tags: ['4K UHD', 'Blu-Ray', 'Collector', 'Patrimoine', 'Nouveautés']
  },
  {
    id: 'art-6',
    title: 'Steelbook Édition Limitée : Les précommandes de la trilogie culte sont ouvertes',
    category: 'DVD / Blu-Ray / 4K',
    kicker: 'Précommandes',
    summary: 'Boîtier métal exclusif avec embossage haute précision, master 4K natif et disque bonus exclusif contenant le documentaire de tournage restauré.',
    content: [
      'Attendue depuis des années par la communauté de home-cinéphiles, la trilogie intégrale bénéficie enfin d\'un transfert 4K UHD avec étalonnage HDR10+ et Dolby Atmos.',
      'Les précommandes sont ouvertes auprès des distributeurs agréés, avec une limitation stricte à deux exemplaires par foyer afin de limiter la spéculation.',
      'La livraison des premiers exemplaires numérotés débutera à partir du 15 décembre prochain.'
    ],
    imageUrl: '/src/assets/images/movie_marvel_blockbuster_1794356425807.jpg',
    publishedAt: 'Il y a 3 jours',
    timeAgo: 'Il y a 3 jours',
    author: 'Lucas Fontenelle',
    readTime: '3 min',
    isFeatured: false,
    tags: ['Précommandes', 'Steelbook', '4K UHD', 'Blu-Ray']
  },
  {
    id: 'art-7',
    title: 'Festival de Cannes : Les premiers favoris de la sélection officielle se dessinent',
    category: 'Cinéma',
    kicker: 'Festivals',
    summary: 'Le comité de sélection finalise la liste des 20 longs-métrages en lice pour la Palme d\'or. Entre grands maîtres internationaux et voix émergentes audacieuses.',
    content: [
      'La Croisette s\'apprête à accueillir l\'élite du 7ème art mondial. Les bruits de couloir s\'intensifient à mesure que la conférence de presse d\'annonce approche.',
      'Plusieurs films très attendus, achevés in extremis en post-production, ont déjà été projetés en comité restreint et suscitent des éloges unanimes de la part des programmateurs.',
      'Notre équipe sera mobilisée sur place pour vous faire vivre chaque montée des marches, les critiques quotidiennes et le palmarès en direct.'
    ],
    imageUrl: '/src/assets/images/hero_cinema_feature_1794356425220.jpg',
    publishedAt: 'Il y a 3 jours',
    timeAgo: 'Il y a 3 jours',
    author: 'La Rédaction',
    readTime: '4 min',
    isFeatured: false,
    tags: ['Cannes', 'Palme d\'Or', 'Auteur', 'Festival']
  }
];

export const MOCK_RELEASES: MovieRelease[] = [
  {
    id: 'rel-1',
    title: 'L\'Ombre des Cimes',
    releaseDate: 'Mercredi 11 Novembre',
    period: 'week',
    director: 'Claire Denis',
    cast: ['Juliette Binoche', 'Vincent Lindon', 'Grégoire Colin'],
    genre: 'Drame / Thriller',
    duration: '2h04',
    distributor: 'Ad Vitam',
    posterUrl: '/src/assets/images/series_prestige_drama_1794356426048.jpg',
    synopsis: 'Dans une vallée alpine isolée par les premières neiges, une juge d\'instruction rouvre un dossier classé qui réveille de vieilles rancœurs villageoises.',
    trailerId: 'yoLZT3jX3b4',
    isHighlight: true
  },
  {
    id: 'rel-2',
    title: 'Cyber-Vanguard : L\'Éveil',
    releaseDate: 'Mercredi 11 Novembre',
    period: 'week',
    director: 'Gareth Edwards',
    cast: ['John David Washington', 'Gemma Chan', 'Ken Watanabe'],
    genre: 'Science-Fiction / Action',
    duration: '2h18',
    distributor: '20th Century Studios',
    posterUrl: '/src/assets/images/movie_marvel_blockbuster_1794356425807.jpg',
    synopsis: 'Au cœur d\'une mégalopole sous surveillance totale, un soldat déserteur découvre que la conscience artificielle qu\'il doit neutraliser détient la mémoire de sa fille disparue.',
    trailerId: 'd9MyW72ELq0',
    isHighlight: true
  },
  {
    id: 'rel-3',
    title: 'Les Enfants du Quai',
    releaseDate: 'Mercredi 11 Novembre',
    period: 'week',
    director: 'Éric Lartigau',
    cast: ['François Damiens', 'Marina Foïs', 'Camille Cottin'],
    genre: 'Comédie Dramatique',
    duration: '1h46',
    distributor: 'Gaumont',
    posterUrl: '/src/assets/images/cinema_palace_marquee_1794356427431.jpg',
    synopsis: 'Une chronique tendre et drôle sur une fratrie de marins-pêcheurs en Bretagne bien décidée à sauver le bistrot familial de la faillite.',
    trailerId: 'uYPbbksJxIg'
  },
  {
    id: 'rel-4',
    title: 'Chroniques Stellaires : Horizon Infini',
    releaseDate: '25 Novembre',
    period: 'month',
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'],
    genre: 'Épique / SF',
    duration: '2h46',
    distributor: 'Warner Bros.',
    posterUrl: '/src/assets/images/hero_cinema_feature_1794356425220.jpg',
    synopsis: 'L\'exploration ultime aux frontières de l\'espace connu, où la survie de l\'humanité dépend d\'une alliance fragile avec une civilisation ancestrale.',
    trailerId: 'yoLZT3jX3b4',
    isHighlight: true
  },
  {
    id: 'rel-5',
    title: 'La Chambre des Secrets Parisiens',
    releaseDate: '2 Décembre',
    period: 'month',
    director: 'Olivier Assayas',
    cast: ['Louis Garrel', 'Virginie Efira', 'Léa Seydoux'],
    genre: 'Policier / Mystère',
    duration: '1h58',
    distributor: 'Le Pacte',
    posterUrl: '/src/assets/images/series_prestige_drama_1794356426048.jpg',
    synopsis: 'Un conservateur du musée du Louvre disparaît en laissant derrière lui une toile mystérieusement découpée et un message codé en latin.',
    trailerId: 'uYPbbksJxIg'
  }
];

export const MOCK_BOX_OFFICE_FRANCE: BoxOfficeItem[] = [
  {
    rank: 1,
    previousRank: 1,
    title: 'Dune : Deuxième Partie',
    director: 'Denis Villeneuve',
    weeklyEntries: 1045230,
    totalEntries: 4210950,
    weeksCount: 4,
    distributor: 'Warner Bros.',
    posterUrl: '/src/assets/images/hero_cinema_feature_1794356425220.jpg',
    trailerId: 'yoLZT3jX3b4',
    scope: 'france',
    unit: 'entrées'
  },
  {
    rank: 2,
    previousRank: null, // Nouveau
    title: 'Cyber-Vanguard : L\'Éveil',
    director: 'Gareth Edwards',
    weeklyEntries: 685410,
    totalEntries: 685410,
    weeksCount: 1,
    distributor: '20th Century Studios',
    posterUrl: '/src/assets/images/movie_marvel_blockbuster_1794356425807.jpg',
    trailerId: 'd9MyW72ELq0',
    scope: 'france',
    unit: 'entrées'
  },
  {
    rank: 3,
    previousRank: 2,
    title: 'Le Mystère de la Nuit Noire',
    director: 'David Fincher',
    weeklyEntries: 412800,
    totalEntries: 1980400,
    weeksCount: 3,
    distributor: 'Sony Pictures',
    posterUrl: '/src/assets/images/series_prestige_drama_1794356426048.jpg',
    trailerId: 'uYPbbksJxIg',
    scope: 'france',
    unit: 'entrées'
  },
  {
    rank: 4,
    previousRank: 3,
    title: 'La Symphonie des Étoiles',
    director: 'Damien Chazelle',
    weeklyEntries: 295600,
    totalEntries: 1320150,
    weeksCount: 5,
    distributor: 'Paramount',
    posterUrl: '/src/assets/images/cinema_palace_marquee_1794356427431.jpg',
    trailerId: 'yoLZT3jX3b4',
    scope: 'france',
    unit: 'entrées'
  },
  {
    rank: 5,
    previousRank: 4,
    title: 'L\'Ombre des Cimes',
    director: 'Claire Denis',
    weeklyEntries: 210450,
    totalEntries: 210450,
    weeksCount: 1,
    distributor: 'Ad Vitam',
    posterUrl: '/src/assets/images/series_prestige_drama_1794356426048.jpg',
    trailerId: 'yoLZT3jX3b4',
    scope: 'france',
    unit: 'entrées'
  }
];

export const MOCK_BOX_OFFICE_MONDE: BoxOfficeItem[] = [
  {
    rank: 1,
    previousRank: 1,
    title: 'Vice-Versa 2 (Inside Out 2)',
    director: 'Kelsey Mann',
    weeklyEntries: 48500000,
    totalEntries: 1698200000,
    weeksCount: 12,
    distributor: 'Walt Disney Studios',
    posterUrl: '/src/assets/images/cinema_palace_marquee_1794356427431.jpg',
    trailerId: 'yoLZT3jX3b4',
    scope: 'monde',
    unit: 'dollars'
  },
  {
    rank: 2,
    previousRank: 2,
    title: 'Deadpool & Wolverine',
    director: 'Shawn Levy',
    weeklyEntries: 32400000,
    totalEntries: 1338500000,
    weeksCount: 9,
    distributor: 'Marvel Studios / Disney',
    posterUrl: '/src/assets/images/movie_marvel_blockbuster_1794356425807.jpg',
    trailerId: 'd9MyW72ELq0',
    scope: 'monde',
    unit: 'dollars'
  },
  {
    rank: 3,
    previousRank: null, // Nouveau
    title: 'Cyber-Vanguard : Global Release',
    director: 'Gareth Edwards',
    weeklyEntries: 89000000,
    totalEntries: 89000000,
    weeksCount: 1,
    distributor: '20th Century Studios',
    posterUrl: '/src/assets/images/hero_cinema_feature_1794356425220.jpg',
    trailerId: 'd9MyW72ELq0',
    scope: 'monde',
    unit: 'dollars'
  },
  {
    rank: 4,
    previousRank: 3,
    title: 'Dune : Part Two',
    director: 'Denis Villeneuve',
    weeklyEntries: 14200000,
    totalEntries: 714400000,
    weeksCount: 16,
    distributor: 'Warner Bros. Pictures',
    posterUrl: '/src/assets/images/hero_cinema_feature_1794356425220.jpg',
    trailerId: 'yoLZT3jX3b4',
    scope: 'monde',
    unit: 'dollars'
  },
  {
    rank: 5,
    previousRank: 4,
    title: 'Oppenheimer',
    director: 'Christopher Nolan',
    weeklyEntries: 8100000,
    totalEntries: 977200000,
    weeksCount: 20,
    distributor: 'Universal Pictures',
    posterUrl: '/src/assets/images/series_prestige_drama_1794356426048.jpg',
    trailerId: 'uYPbbksJxIg',
    scope: 'monde',
    unit: 'dollars'
  }
];

export const MOCK_BOX_OFFICE: BoxOfficeItem[] = MOCK_BOX_OFFICE_FRANCE;

export const MOCK_TRAILERS: TrailerItem[] = [
  {
    id: 'tr-1',
    title: 'Dune : Deuxième Partie (Bande-Annonce Officielle)',
    type: 'film',
    youtubeId: 'yoLZT3jX3b4',
    duration: '2:24',
    releaseDate: 'En salles',
    thumbnailUrl: '/src/assets/images/hero_cinema_feature_1794356425220.jpg',
    synopsis: 'Paul Atréides s\'unit à Chani et aux Fremen tout en préparant sa revanche contre les conspirateurs qui ont détruit sa famille.',
    directorOrCreator: 'Denis Villeneuve'
  },
  {
    id: 'tr-2',
    title: 'Avatar : La Voie de l\'Eau (Bande-Annonce Principale)',
    type: 'film',
    youtubeId: 'd9MyW72ELq0',
    duration: '2:28',
    releaseDate: 'Disponible en 4K UHD',
    thumbnailUrl: '/src/assets/images/movie_marvel_blockbuster_1794356425807.jpg',
    synopsis: 'Jake Sully et Neytiri ont formé une famille et font tout pour rester aussi soudés que possible face aux nouvelles menaces.',
    directorOrCreator: 'James Cameron'
  },
  {
    id: 'tr-3',
    title: 'Oppenheimer (Bande-Annonce Finale)',
    type: 'film',
    youtubeId: 'uYPbbksJxIg',
    duration: '3:05',
    releaseDate: 'Disponible en Blu-Ray',
    thumbnailUrl: '/src/assets/images/series_prestige_drama_1794356426048.jpg',
    synopsis: 'L\'histoire du physicien J. Robert Oppenheimer à la tête du Projet Manhattan lors de la création de la première arme nucléaire.',
    directorOrCreator: 'Christopher Nolan'
  }
];
