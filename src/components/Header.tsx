import React, { useState } from 'react';
import { Search, PenLine, Film, Tv, Calendar, Disc, Menu, X, ChevronDown, Globe, Award, Lock, Sparkles } from 'lucide-react';
import { ArticleCategory } from '../types/cinema';

interface HeaderProps {
  activeCategory: ArticleCategory | 'all' | 'sorties-semaine' | 'sorties-mois' | 'trailers-films' | 'trailers-series';
  onSelectCategory: (category: ArticleCategory | 'all' | 'sorties-semaine' | 'sorties-mois' | 'trailers-films' | 'trailers-series') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCreateModal: () => void;
  activeView: 'feed' | 'calendar' | 'trailers' | 'boxoffice';
  onSelectView: (view: 'feed' | 'calendar' | 'trailers' | 'boxoffice') => void;
  boxOfficeScope: 'france' | 'monde';
  onSelectBoxOfficeScope: (scope: 'france' | 'monde') => void;
  isAdmin: boolean;
  onOpenAdminLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenCreateModal,
  activeView,
  onSelectView,
  boxOfficeScope,
  onSelectBoxOfficeScope,
  isAdmin,
  onOpenAdminLogin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (
    cat: ArticleCategory | 'all' | 'sorties-semaine' | 'sorties-mois' | 'trailers-films' | 'trailers-series',
    view: 'feed' | 'calendar' | 'trailers' | 'boxoffice' = 'feed',
    boScope?: 'france' | 'monde'
  ) => {
    onSelectCategory(cat);
    onSelectView(view);
    if (boScope) {
      onSelectBoxOfficeScope(boScope);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full shadow-md sticky top-0 z-40 bg-white">
      {/* BANDEAU ROUGE (Uniquement sur la partie Titre & Logo) */}
      <div className="w-full bg-red-700 text-white py-2 sm:py-2.5 px-4 border-b border-red-800 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:block text-[11px] uppercase tracking-widest text-red-200 font-semibold w-24 text-left">
            Édition Quotidienne
          </div>

          {/* Logo officiel redimensionné de moitié */}
          <button
            onClick={() => handleNavClick('all', 'feed')}
            className="group cursor-pointer mx-auto text-center focus:outline-none flex flex-col items-center justify-center py-0.5 max-w-[85vw]"
            aria-label="Accueil Univers du Cinéma"
          >
            <img
              src="/assets/aistudio/universducin_ma_2_622b5099.png"
              alt="Univers du Cinéma"
              className="h-10 sm:h-14 md:h-18 lg:h-20 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-102 drop-shadow-md"
              style={{ mixBlendMode: 'screen' }}
            />
          </button>

          {/* Zone Admin / Rédiger */}
          <div className="hidden sm:flex items-center justify-end w-24">
            {isAdmin ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onOpenCreateModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-white text-red-700 rounded hover:bg-red-50 transition shadow-sm"
                  title="Rédiger un nouvel article"
                >
                  <PenLine className="w-3.5 h-3.5" />
                  <span>Rédiger</span>
                </button>
                <button
                  onClick={onOpenAdminLogin}
                  className="p-1 text-red-200 hover:text-white rounded"
                  title="Options Administrateur"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 block" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="p-1.5 text-red-300 hover:text-white hover:bg-red-800 rounded transition opacity-60 hover:opacity-100"
                title="Accès Administrateur"
                aria-label="Connexion Administrateur"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Bouton Menu Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 text-white hover:bg-red-800 rounded focus:outline-none ml-2"
            aria-label="Basculer le menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* RUBRIQUES : FOND BLANC, ÉCRITES EN NOIR, ROUGE AU SURVOL */}
      <nav className="w-full bg-white text-gray-900 border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul className="hidden md:flex flex-wrap items-center font-bold text-xs lg:text-sm tracking-wide uppercase">
            
            {/* News */}
            <li className="group relative">
              <button
                onClick={() => handleNavClick('all', 'feed')}
                className={`block py-3 px-3 lg:px-4 transition-colors ${
                  activeCategory === 'all' && activeView === 'feed'
                    ? 'text-red-700 bg-red-50/70 border-b-2 border-red-700 font-extrabold'
                    : 'text-gray-900 hover:text-red-700 hover:bg-gray-50'
                }`}
              >
                News
              </button>
            </li>

            {/* Films (Noir sur fond blanc, rouge au hover) */}
            <li className="group relative border-l border-gray-200">
              <button
                onClick={() => handleNavClick('Films', 'feed')}
                className={`block py-3 px-3 lg:px-4 transition-colors ${
                  activeCategory === 'Films' && activeView === 'feed'
                    ? 'text-red-700 bg-red-50/70 border-b-2 border-red-700 font-extrabold'
                    : 'text-gray-900 hover:text-red-700 hover:bg-gray-50'
                }`}
              >
                Films
              </button>
            </li>

            {/* Séries (Noir sur fond blanc, rouge au hover) */}
            <li className="group relative border-l border-gray-200">
              <button
                onClick={() => handleNavClick('Séries', 'feed')}
                className={`block py-3 px-3 lg:px-4 transition-colors ${
                  activeCategory === 'Séries' && activeView === 'feed'
                    ? 'text-red-700 bg-red-50/70 border-b-2 border-red-700 font-extrabold'
                    : 'text-gray-900 hover:text-red-700 hover:bg-gray-50'
                }`}
              >
                Séries
              </button>
            </li>

            {/* Bandes-annonces */}
            <li className="group relative border-l border-gray-200">
              <button
                onClick={() => handleNavClick('all', 'trailers')}
                className={`flex items-center gap-1 py-3 px-3 lg:px-4 transition-colors ${
                  activeView === 'trailers'
                    ? 'text-red-700 bg-red-50/70 border-b-2 border-red-700 font-extrabold'
                    : 'text-gray-900 hover:text-red-700 hover:bg-gray-50'
                }`}
              >
                Bandes-annonces
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:text-red-700" />
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block w-56 bg-white text-gray-900 shadow-xl border border-gray-200 border-t-2 border-t-red-700 z-50 py-1">
                <button
                  onClick={() => handleNavClick('trailers-films', 'trailers')}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-700 border-b border-gray-100 text-xs font-semibold uppercase flex items-center justify-between transition-colors"
                >
                  <span>Bandes-annonces Films</span>
                  <Film className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-700" />
                </button>
                <button
                  onClick={() => handleNavClick('trailers-series', 'trailers')}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-700 text-xs font-semibold uppercase flex items-center justify-between transition-colors"
                >
                  <span>Bandes-annonces Séries</span>
                  <Tv className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-700" />
                </button>
              </div>
            </li>

            {/* Cinéma */}
            <li className="group relative border-l border-gray-200">
              <button
                onClick={() => handleNavClick('all', 'calendar')}
                className={`flex items-center gap-1 py-3 px-3 lg:px-4 transition-colors ${
                  activeView === 'calendar'
                    ? 'text-red-700 bg-red-50/70 border-b-2 border-red-700 font-extrabold'
                    : 'text-gray-900 hover:text-red-700 hover:bg-gray-50'
                }`}
              >
                Cinéma
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:text-red-700" />
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block w-52 bg-white text-gray-900 shadow-xl border border-gray-200 border-t-2 border-t-red-700 z-50 py-1">
                <button
                  onClick={() => handleNavClick('sorties-semaine', 'calendar')}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-700 border-b border-gray-100 text-xs font-semibold uppercase flex items-center justify-between transition-colors"
                >
                  <span>Sorties de la semaine</span>
                  <Calendar className="w-3.5 h-3.5 text-red-700" />
                </button>
                <button
                  onClick={() => handleNavClick('sorties-mois', 'calendar')}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-700 text-xs font-semibold uppercase flex items-center justify-between transition-colors"
                >
                  <span>Sorties du mois</span>
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>
            </li>

            {/* Box-Office */}
            <li className="group relative border-l border-gray-200">
              <button
                onClick={() => handleNavClick('Box-Office', 'boxoffice', 'france')}
                className={`flex items-center gap-1 py-3 px-3 lg:px-4 transition-colors ${
                  activeView === 'boxoffice'
                    ? 'text-red-700 bg-red-50/70 border-b-2 border-red-700 font-extrabold'
                    : 'text-gray-900 hover:text-red-700 hover:bg-gray-50'
                }`}
              >
                Box-Office
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:text-red-700" />
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block w-52 bg-white text-gray-900 shadow-xl border border-gray-200 border-t-2 border-t-red-700 z-50 py-1">
                <button
                  onClick={() => handleNavClick('Box-Office', 'boxoffice', 'france')}
                  className={`w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-700 border-b border-gray-100 text-xs font-semibold uppercase flex items-center justify-between transition-colors ${
                    activeView === 'boxoffice' && boxOfficeScope === 'france' ? 'text-red-700 bg-red-50 font-bold' : ''
                  }`}
                >
                  <span>Box-Office France</span>
                  <Award className="w-3.5 h-3.5 text-red-700" />
                </button>
                <button
                  onClick={() => handleNavClick('Box-Office', 'boxoffice', 'monde')}
                  className={`w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-700 text-xs font-semibold uppercase flex items-center justify-between transition-colors ${
                    activeView === 'boxoffice' && boxOfficeScope === 'monde' ? 'text-red-700 bg-red-50 font-bold' : ''
                  }`}
                >
                  <span>Box-Office Monde</span>
                  <Globe className="w-3.5 h-3.5 text-red-700" />
                </button>
              </div>
            </li>

            {/* DVD / Bluray / 4k */}
            <li className="group relative border-l border-gray-200 border-r">
              <button
                onClick={() => handleNavClick('DVD / Blu-Ray / 4K', 'feed')}
                className={`flex items-center gap-1 py-3 px-3 lg:px-4 transition-colors ${
                  (activeCategory === 'DVD / Blu-Ray / 4K' || activeCategory === 'Précommandes' || activeCategory === 'Nouveautés') && activeView === 'feed'
                    ? 'text-red-700 bg-red-50/70 border-b-2 border-red-700 font-extrabold'
                    : 'text-gray-900 hover:text-red-700 hover:bg-gray-50'
                }`}
              >
                DVD/Bluray/4k
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:text-red-700" />
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block w-52 bg-white text-gray-900 shadow-xl border border-gray-200 border-t-2 border-t-red-700 z-50 py-1">
                <button
                  onClick={() => handleNavClick('Précommandes', 'feed')}
                  className={`w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-700 border-b border-gray-100 text-xs font-semibold uppercase flex items-center justify-between transition-colors ${
                    activeCategory === 'Précommandes' ? 'text-red-700 bg-red-50 font-bold' : ''
                  }`}
                >
                  <span>Précommandes</span>
                  <Sparkles className="w-3.5 h-3.5 text-red-700" />
                </button>
                <button
                  onClick={() => handleNavClick('Nouveautés', 'feed')}
                  className={`w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-700 text-xs font-semibold uppercase flex items-center justify-between transition-colors ${
                    activeCategory === 'Nouveautés' ? 'text-red-700 bg-red-50 font-bold' : ''
                  }`}
                >
                  <span>Nouveautés</span>
                  <Disc className="w-3.5 h-3.5 text-gray-500" />
                </button>
              </div>
            </li>

          </ul>

          {/* BARRE DE RECHERCHE SUR FOND BLANC À DROITE DE DVD/BLURAY/4K */}
          <div className="hidden md:flex items-center pl-3 py-2 shrink-0">
            <div className="relative w-48 lg:w-60">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white text-gray-900 placeholder-gray-400 text-xs pl-8 pr-7 py-1.5 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-700 focus:border-red-700 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700"
                  title="Effacer la recherche"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Menu Mobile Accordéon sur fond blanc */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 px-4 space-y-1 text-sm border-t border-gray-200 bg-white">
            <div className="relative py-1 mb-2">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-gray-50 text-gray-900 placeholder-gray-400 text-xs pl-9 pr-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-red-700"
              />
            </div>

            <button
              onClick={() => handleNavClick('all', 'feed')}
              className="w-full text-left py-2 px-3 rounded text-gray-900 hover:text-red-700 hover:bg-gray-50 font-bold uppercase transition"
            >
              Toutes les News
            </button>
            <button
              onClick={() => handleNavClick('Films', 'feed')}
              className="w-full text-left py-2 px-3 rounded text-gray-900 hover:text-red-700 hover:bg-gray-50 font-bold uppercase transition"
            >
              Films
            </button>
            <button
              onClick={() => handleNavClick('Séries', 'feed')}
              className="w-full text-left py-2 px-3 rounded text-gray-900 hover:text-red-700 hover:bg-gray-50 font-bold uppercase transition"
            >
              Séries
            </button>
            <button
              onClick={() => handleNavClick('trailers-films', 'trailers')}
              className="w-full text-left py-2 px-3 rounded text-gray-700 hover:text-red-700 hover:bg-gray-50 uppercase pl-6 text-xs transition"
            >
              ↳ Bandes-annonces Films
            </button>
            <button
              onClick={() => handleNavClick('trailers-series', 'trailers')}
              className="w-full text-left py-2 px-3 rounded text-gray-700 hover:text-red-700 hover:bg-gray-50 uppercase pl-6 text-xs transition"
            >
              ↳ Bandes-annonces Séries
            </button>
            <button
              onClick={() => handleNavClick('sorties-semaine', 'calendar')}
              className="w-full text-left py-2 px-3 rounded text-gray-900 hover:text-red-700 hover:bg-gray-50 uppercase transition"
            >
              Cinéma · Sorties de la semaine
            </button>
            <button
              onClick={() => handleNavClick('sorties-mois', 'calendar')}
              className="w-full text-left py-2 px-3 rounded text-gray-900 hover:text-red-700 hover:bg-gray-50 uppercase transition"
            >
              Cinéma · Sorties du mois
            </button>
            <button
              onClick={() => handleNavClick('Box-Office', 'boxoffice', 'france')}
              className="w-full text-left py-2 px-3 rounded text-gray-900 hover:text-red-700 hover:bg-gray-50 uppercase transition"
            >
              Box-Office France
            </button>
            <button
              onClick={() => handleNavClick('Box-Office', 'boxoffice', 'monde')}
              className="w-full text-left py-2 px-3 rounded text-gray-900 hover:text-red-700 hover:bg-gray-50 uppercase transition"
            >
              Box-Office Monde
            </button>
            <button
              onClick={() => handleNavClick('Précommandes', 'feed')}
              className="w-full text-left py-2 px-3 rounded text-gray-700 hover:text-red-700 hover:bg-gray-50 uppercase pl-6 text-xs transition"
            >
              ↳ DVD/Bluray/4k : Précommandes
            </button>
            <button
              onClick={() => handleNavClick('Nouveautés', 'feed')}
              className="w-full text-left py-2 px-3 rounded text-gray-700 hover:text-red-700 hover:bg-gray-50 uppercase pl-6 text-xs transition"
            >
              ↳ DVD/Bluray/4k : Nouveautés
            </button>

            {/* Accès Rédacteur mobile si Admin */}
            <div className="pt-3 border-t border-gray-200">
              {isAdmin ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCreateModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-red-700 hover:bg-red-800 text-white font-bold rounded uppercase text-xs shadow-xs"
                >
                  <PenLine className="w-4 h-4" />
                  Rédiger un article (Admin)
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminLogin();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded uppercase text-xs"
                >
                  <Lock className="w-3.5 h-3.5 text-gray-600" />
                  Connexion Administration
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
