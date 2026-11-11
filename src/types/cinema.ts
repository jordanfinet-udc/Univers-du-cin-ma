export type ArticleCategory = 
  | 'News'
  | 'Films'
  | 'Séries'
  | 'Bandes-annonces'
  | 'Cinéma'
  | 'Box-Office'
  | 'DVD / Blu-Ray / 4K'
  | 'Précommandes'
  | 'Nouveautés';

export interface Article {
  id: string;
  title: string;
  category: ArticleCategory;
  kicker: string; // ex: "Exclusif", "Casting", "Critique", "Tournage"
  summary: string;
  content: string[]; // Paragraphes complets
  quote?: {
    text: string;
    author: string;
  };
  imageUrl: string;
  publishedAt: string;
  timeAgo: string;
  author: string;
  readTime: string;
  isFeatured?: boolean; // Pour la "Dernière News"
  trailerUrl?: string; // YouTube embed ID ou URL
  tags: string[];
}

export interface MovieRelease {
  id: string;
  title: string;
  releaseDate: string;
  period: 'week' | 'month';
  director: string;
  cast: string[];
  genre: string;
  duration: string;
  distributor: string;
  posterUrl: string;
  synopsis: string;
  trailerId?: string;
  isHighlight?: boolean;
}

export interface BoxOfficeItem {
  rank: number;
  previousRank: number | null; // null if new release
  title: string;
  director: string;
  weeklyEntries: number; // Entrées ou Recettes
  totalEntries: number;  // Cumul Entrées ou Cumul Recettes
  weeksCount: number;
  distributor: string;
  posterUrl: string;
  trailerId?: string;
  scope?: 'france' | 'monde';
  unit?: 'entrées' | 'dollars';
}

export interface TrailerItem {
  id: string;
  title: string;
  type: 'film' | 'serie';
  youtubeId: string;
  duration: string;
  releaseDate: string;
  thumbnailUrl: string;
  synopsis: string;
  directorOrCreator: string;
}
