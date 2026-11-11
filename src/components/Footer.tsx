import React from 'react';
import { RotateCcw, Lock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onResetData: () => void;
  onSelectCategory: (cat: any) => void;
  onSelectView: (view: any) => void;
  isAdmin: boolean;
  onOpenAdminLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onResetData,
  onSelectCategory,
  onSelectView,
  isAdmin,
  onOpenAdminLogin,
}) => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 border-t-4 border-red-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Colonne 1 : Brand & Mission */}
          <div className="md:col-span-1">
            <img
              src="/assets/aistudio/universducin_ma_2_622b5099.png"
              alt="Univers du Cinéma"
              className="h-14 w-auto object-contain mb-3"
              style={{ mixBlendMode: 'screen' }}
            />
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Le magazine en ligne de référence pour toute l'actualité du septième art, les bandes-annonces, les sorties en salles et les analyses du box-office.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-800 flex flex-col gap-2">
              <button
                onClick={onResetData}
                className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition"
                title="Rétablir les articles par défaut"
              >
                <RotateCcw className="w-3.5 h-3.5 text-red-500" />
                <span>Réinitialiser les articles</span>
              </button>
              
              <button
                onClick={onOpenAdminLogin}
                className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition"
              >
                {isAdmin ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Mode Admin Actif</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-gray-500" />
                    <span>Accès Rédacteur / Admin</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Colonne 2 : Actualités & Dossiers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4 font-heading">
              Rubriques
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    onSelectView('feed');
                  }}
                  className="hover:text-white transition"
                >
                  Toutes les actualités
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Films');
                    onSelectView('feed');
                  }}
                  className="hover:text-white transition"
                >
                  Films
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Séries');
                    onSelectView('feed');
                  }}
                  className="hover:text-white transition"
                >
                  Séries
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('DVD / Blu-Ray / 4K');
                    onSelectView('feed');
                  }}
                  className="hover:text-white transition"
                >
                  DVD / Bluray / 4k (Tous)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Précommandes');
                    onSelectView('feed');
                  }}
                  className="hover:text-white transition pl-2 text-gray-400"
                >
                  ↳ Précommandes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Nouveautés');
                    onSelectView('feed');
                  }}
                  className="hover:text-white transition pl-2 text-gray-400"
                >
                  ↳ Nouveautés
                </button>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Événements & Outils */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4 font-heading">
              Exploration
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('sorties-semaine');
                    onSelectView('calendar');
                  }}
                  className="hover:text-white transition"
                >
                  Sorties de la semaine
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('sorties-mois');
                    onSelectView('calendar');
                  }}
                  className="hover:text-white transition"
                >
                  Sorties du mois
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    onSelectView('trailers');
                  }}
                  className="hover:text-white transition"
                >
                  Bandes-annonces HD
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Box-Office');
                    onSelectView('boxoffice');
                  }}
                  className="hover:text-white transition"
                >
                  Classement Box-Office France & Monde
                </button>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Édition & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4 font-heading">
              Rédaction
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              Proposez un communiqué de presse, une projection presse ou contactez notre rédaction cinéma.
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <div>Parution : Quotidienne</div>
              <div>Siège éditorial : Paris, France</div>
            </div>
          </div>

        </div>

        {/* Ligne inférieure de copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>
            © {new Date().getFullYear()} Univers du Cinéma. Tous droits réservés.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-gray-400 cursor-pointer">Mentions Légales</span>
            <span>·</span>
            <span className="hover:text-gray-400 cursor-pointer">Confidentialité</span>
            <span>·</span>
            <span className="hover:text-gray-400 cursor-pointer">Gestion des cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
