/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroArticle } from './components/HeroArticle';
import { PreviousNewsList } from './components/PreviousNewsList';
import { ArticleQuickPreview } from './components/ArticleQuickPreview';
import { TrailerModal } from './components/TrailerModal';
import { MovieCalendar } from './components/MovieCalendar';
import { BoxOfficeTable } from './components/BoxOfficeTable';
import { TrailersView } from './components/TrailersView';
import { ArticleEditorModal } from './components/ArticleEditorModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Footer } from './components/Footer';
import { Article, ArticleCategory } from './types/cinema';
import {
  MOCK_BOX_OFFICE_FRANCE,
  MOCK_BOX_OFFICE_MONDE,
  MOCK_RELEASES,
  MOCK_TRAILERS,
} from './data/mockData';
import {
  getStoredArticles,
  saveArticles,
  resetArticlesToDefault,
} from './services/storage';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(() => getStoredArticles());
  const [activeCategory, setActiveCategory] = useState<
    ArticleCategory | 'all' | 'sorties-semaine' | 'sorties-mois' | 'trailers-films' | 'trailers-series'
  >('all');
  const [activeView, setActiveView] = useState<'feed' | 'calendar' | 'trailers' | 'boxoffice'>('feed');
  const [boxOfficeScope, setBoxOfficeScope] = useState<'france' | 'monde'>('france');
  const [searchQuery, setSearchQuery] = useState('');

  // Gestion du mode Administrateur (Masqué par défaut aux visiteurs)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('univers_du_cinema_is_admin') === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Modales d'interaction
  const [previewArticle, setPreviewArticle] = useState<Article | null>(null);
  const [trailerData, setTrailerData] = useState<{ id: string; title: string } | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const handleAdminSuccess = () => {
    setIsAdmin(true);
    try {
      localStorage.setItem('univers_du_cinema_is_admin', 'true');
    } catch {}
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem('univers_du_cinema_is_admin');
    } catch {}
  };

  // Filtrage des articles pour la vue principale
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      // Filtre de recherche
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = art.title.toLowerCase().includes(query);
        const matchSummary = art.summary.toLowerCase().includes(query);
        const matchTags = art.tags.some((t) => t.toLowerCase().includes(query));
        const matchAuthor = art.author.toLowerCase().includes(query);
        if (!matchTitle && !matchSummary && !matchTags && !matchAuthor) {
          return false;
        }
      }

      // Filtre de catégorie
      if (
        activeCategory === 'all' ||
        activeCategory === 'sorties-semaine' ||
        activeCategory === 'sorties-mois' ||
        activeCategory === 'trailers-films' ||
        activeCategory === 'trailers-series'
      ) {
        return true;
      }

      // Filtre spécifique DVD / Blu-Ray / 4K
      if (activeCategory === 'DVD / Blu-Ray / 4K') {
        return (
          art.category === 'DVD / Blu-Ray / 4K' ||
          art.category === 'Précommandes' ||
          art.category === 'Nouveautés'
        );
      }

      if (activeCategory === 'Précommandes') {
        return (
          art.category === 'Précommandes' ||
          art.kicker.toLowerCase().includes('précommande') ||
          art.tags.some((t) => t.toLowerCase().includes('précommande'))
        );
      }

      if (activeCategory === 'Nouveautés') {
        return (
          art.category === 'Nouveautés' ||
          art.kicker.toLowerCase().includes('nouveauté') ||
          art.tags.some((t) => t.toLowerCase().includes('nouveaut'))
        );
      }

      return art.category === activeCategory;
    });
  }, [articles, activeCategory, searchQuery]);

  // Article À la Une (Dernière News) et Articles secondaires
  const featuredArticle = useMemo(() => {
    const featured = filteredArticles.find((a) => a.isFeatured);
    return featured || filteredArticles[0] || null;
  }, [filteredArticles]);

  const secondaryArticles = useMemo(() => {
    if (!featuredArticle) return [];
    return filteredArticles.filter((a) => a.id !== featuredArticle.id);
  }, [filteredArticles, featuredArticle]);

  // Articles pour la colonne "News Précédentes" (au moins les 3 premiers non mis en avant)
  const previousNewsArticles = useMemo(() => {
    const candidates = articles.filter((a) => !a.isFeatured);
    return candidates.length > 0 ? candidates.slice(0, 5) : articles.slice(1, 6);
  }, [articles]);

  // Données Box-Office selon le scope actif (France ou Monde)
  const currentBoxOfficeData = useMemo(() => {
    return boxOfficeScope === 'monde' ? MOCK_BOX_OFFICE_MONDE : MOCK_BOX_OFFICE_FRANCE;
  }, [boxOfficeScope]);

  // Gestion des actions
  const handlePlayTrailer = (trailerId: string, title: string) => {
    setTrailerData({ id: trailerId, title });
  };

  const handleOpenCreateModal = () => {
    if (!isAdmin) {
      setIsAdminModalOpen(true);
      return;
    }
    setEditingArticle(null);
    setIsEditorOpen(true);
  };

  const handleEditArticle = (art: Article) => {
    if (!isAdmin) {
      setIsAdminModalOpen(true);
      return;
    }
    setEditingArticle(art);
    setIsEditorOpen(true);
  };

  const handleSaveArticle = (savedArt: Article) => {
    let updated: Article[];
    const exists = articles.some((a) => a.id === savedArt.id);

    if (exists) {
      updated = articles.map((a) => (a.id === savedArt.id ? savedArt : a));
    } else {
      if (savedArt.isFeatured) {
        updated = [savedArt, ...articles.map((a) => ({ ...a, isFeatured: false }))];
      } else {
        updated = [savedArt, ...articles];
      }
    }

    if (savedArt.isFeatured) {
      updated = updated.map((a) => (a.id === savedArt.id ? savedArt : { ...a, isFeatured: false }));
    }

    setArticles(updated);
    saveArticles(updated);

    if (previewArticle && previewArticle.id === savedArt.id) {
      setPreviewArticle(savedArt);
    }
  };

  const handleResetData = () => {
    if (window.confirm('Voulez-vous rétablir les articles officiels de démonstration ?')) {
      const reset = resetArticlesToDefault();
      setArticles(reset);
      setActiveCategory('all');
      setActiveView('feed');
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900 selection:bg-red-700 selection:text-white">
      {/* BANDEAU ROUGE & NAVIGATION VARIETY/DEADLINE */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCreateModal={handleOpenCreateModal}
        activeView={activeView}
        onSelectView={setActiveView}
        boxOfficeScope={boxOfficeScope}
        onSelectBoxOfficeScope={setBoxOfficeScope}
        isAdmin={isAdmin}
        onOpenAdminLogin={() => setIsAdminModalOpen(true)}
      />

      {/* CONTENU PRINCIPAL DYNAMIQUE */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Vue : FLUX PRINCIPAL (Basé sur le layout original 2/3 - 1/3) */}
        {activeView === 'feed' && (
          <div>
            {/* Notification de recherche active */}
            {searchQuery && (
              <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-xs flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  Résultats pour « <strong className="text-red-700">{searchQuery}</strong> » :{' '}
                  <span className="font-bold">{filteredArticles.length}</span> actualité(s) trouvée(s)
                </span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-red-700 font-bold uppercase hover:underline"
                >
                  Effacer le filtre
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* À GAUCHE (2/3 de la largeur) : LA DERNIÈRE NEWS + FLUX */}
              <div className="lg:col-span-2">
                <HeroArticle
                  featuredArticle={featuredArticle}
                  secondaryArticles={secondaryArticles}
                  onOpenPreview={setPreviewArticle}
                  onPlayTrailer={handlePlayTrailer}
                />
              </div>

              {/* À DROITE (1/3 de la largeur) : NEWS PRÉCÉDENTES & WIDGETS */}
              <div className="lg:col-span-1">
                <PreviousNewsList
                  articles={previousNewsArticles}
                  boxOfficeItems={currentBoxOfficeData}
                  onOpenPreview={setPreviewArticle}
                  onPlayTrailer={handlePlayTrailer}
                  onViewAllBoxOffice={() => setActiveView('boxoffice')}
                />
              </div>
            </div>
          </div>
        )}

        {/* Vue : CALENDRIER DES SORTIES CINÉMA */}
        {activeView === 'calendar' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setActiveView('feed')}
                className="text-xs font-bold uppercase text-red-700 hover:text-red-800 transition"
              >
                ← Revenir au flux d'actualités
              </button>
            </div>
            <MovieCalendar
              releases={MOCK_RELEASES}
              initialPeriod={activeCategory === 'sorties-mois' ? 'month' : 'week'}
              onPlayTrailer={handlePlayTrailer}
            />
          </div>
        )}

        {/* Vue : BANDES-ANNONCES HD */}
        {activeView === 'trailers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setActiveView('feed')}
                className="text-xs font-bold uppercase text-red-700 hover:text-red-800 transition"
              >
                ← Revenir au flux d'actualités
              </button>
            </div>
            <TrailersView
              trailers={MOCK_TRAILERS}
              filterType={
                activeCategory === 'trailers-films'
                  ? 'film'
                  : activeCategory === 'trailers-series'
                  ? 'serie'
                  : 'all'
              }
              onPlayTrailer={handlePlayTrailer}
            />
          </div>
        )}

        {/* Vue : BOX-OFFICE HEBDOMADAIRE (FRANCE & MONDE) */}
        {activeView === 'boxoffice' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setActiveView('feed')}
                className="text-xs font-bold uppercase text-red-700 hover:text-red-800 transition"
              >
                ← Revenir au flux d'actualités
              </button>
            </div>
            <BoxOfficeTable
              items={currentBoxOfficeData}
              onPlayTrailer={handlePlayTrailer}
              scope={boxOfficeScope}
              onSelectScope={setBoxOfficeScope}
            />
          </div>
        )}
      </main>

      {/* APERÇU RAPIDE D'ARTICLE (In-page quick reader drawer) */}
      <ArticleQuickPreview
        article={previewArticle}
        onClose={() => setPreviewArticle(null)}
        onPlayTrailer={handlePlayTrailer}
        onEditArticle={isAdmin ? handleEditArticle : undefined}
      />

      {/* LECTEUR VIDÉO POPUP (Trailer Modal) */}
      <TrailerModal
        trailerId={trailerData?.id || null}
        title={trailerData?.title || ''}
        onClose={() => setTrailerData(null)}
      />

      {/* PANNEAU DE RÉDACTION D'ARTICLE (Réservé à l'Admin) */}
      <ArticleEditorModal
        isOpen={isEditorOpen && isAdmin}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingArticle(null);
        }}
        onSave={handleSaveArticle}
        editingArticle={editingArticle}
      />

      {/* MODAL CONNEXION ADMINISTRATEUR */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={handleAdminSuccess}
        isAdmin={isAdmin}
        onLogout={handleAdminLogout}
      />

      {/* PIED DE PAGE ÉDITORIAL */}
      <Footer
        onResetData={handleResetData}
        onSelectCategory={setActiveCategory}
        onSelectView={setActiveView}
        isAdmin={isAdmin}
        onOpenAdminLogin={() => setIsAdminModalOpen(true)}
      />
    </div>
  );
}
