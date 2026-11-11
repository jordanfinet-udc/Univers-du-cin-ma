import React, { useEffect } from 'react';
import { X, Film, ExternalLink } from 'lucide-react';

interface TrailerModalProps {
  trailerId: string | null;
  title: string;
  onClose: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ trailerId, title, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (trailerId) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [trailerId, onClose]);

  if (!trailerId) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Bande-annonce : ${title}`}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-gray-950 text-white rounded-lg shadow-2xl border border-gray-800 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête de la modale */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="p-1 bg-red-700 rounded text-white shrink-0">
              <Film className="w-4 h-4" />
            </span>
            <div className="truncate">
              <span className="text-[11px] text-red-400 uppercase font-bold tracking-wider block">
                Bande-Annonce HD
              </span>
              <h3 className="text-base font-bold font-heading text-white truncate">{title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://www.youtube.com/watch?v=${trailerId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition text-xs flex items-center gap-1"
              title="Ouvrir sur YouTube"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition"
              aria-label="Fermer la vidéo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Lecteur Vidéo Responsive 16:9 */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailerId}?autoplay=1&modestbranding=1&rel=0`}
            title={`Bande-annonce de ${title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Pied de lecteur */}
        <div className="px-5 py-3 bg-gray-900/90 flex items-center justify-between text-xs text-gray-400">
          <span>Univers du Cinéma · Espace Vidéo</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white rounded font-medium transition"
          >
            Fermer le lecteur
          </button>
        </div>
      </div>
    </div>
  );
};
