import { Article } from '../types/cinema';
import { INITIAL_ARTICLES } from '../data/mockData';

const STORAGE_KEY = 'univers_du_cinema_articles_v1';

export function getStoredArticles(): Article[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ARTICLES));
      return INITIAL_ARTICLES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_ARTICLES;
  } catch (e) {
    console.error('Failed to load articles from localStorage', e);
    return INITIAL_ARTICLES;
  }
}

export function saveArticles(articles: Article[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  } catch (e) {
    console.error('Failed to save articles to localStorage', e);
  }
}

export function resetArticlesToDefault(): Article[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ARTICLES));
    return INITIAL_ARTICLES;
  } catch (e) {
    console.error('Failed to reset articles', e);
    return INITIAL_ARTICLES;
  }
}
