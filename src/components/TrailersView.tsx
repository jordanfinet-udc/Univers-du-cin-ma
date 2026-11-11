import React, { useState } from 'react';
import { Play, Film, Tv, Clock } from 'lucide-react';
import { TrailerItem } from '../types/cinema';

interface TrailersViewProps {
  trailers: TrailerItem[];
  filterType?: 'all' | 'film' | 'serie';
  onPlayTrailer: (youtubeId: string, title: string) => void;
}

export const TrailersView: React.FC<TrailersViewProps> = ({
  trailers,
  filterType = 'all',
  onPlayTrailer,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'film' | 'serie'>(filterType);

  const filtered = trailers.filter((t) => {
    if (activeFilter === 'all') return true;
    return t.type === activeFilter;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-red-700 fill-red-700" />
            <h2 className="text-xl font-bold uppercase tracking-wider text-gray-900 font-heading">
              Bandes-Annonces & Teasers Officiels
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Visionnez en haute définition les dernières bandes-annonces cinéma et séries.
          </p>
        </div>

        <div className="inline-flex p-1 bg-gray-100 rounded-lg shrink-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-xs font-bold uppercase rounded-md transition ${
              activeFilter === 'all'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Toutes
          </button>
          <button
            onClick={() => setActiveFilter('film')}
            className={`px-3 py-1.5 text-xs font-bold uppercase rounded-md transition ${
              activeFilter === 'film'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Film
          </button>
          <button
            onClick={() => setActiveFilter('serie')}
            className={`px-3 py-1.5 text-xs font-bold uppercase rounded-md transition ${
              activeFilter === 'serie'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Série
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div
              className="relative aspect-video bg-gray-900 cursor-pointer overflow-hidden"
              onClick={() => onPlayTrailer(item.youtubeId, item.title)}
            >
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

              {/* Bouton Play central stylisé */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-13 h-13 rounded-full bg-red-700 text-white flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-115 group-hover:bg-red-600">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>

              {/* Durée badge */}
              <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                {item.duration}
              </div>

              {/* Type badge */}
              <div className="absolute top-2.5 left-2.5 bg-red-700 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                {item.type === 'film' ? <Film className="w-3 h-3" /> : <Tv className="w-3 h-3" />}
                {item.type === 'film' ? 'Film' : 'Série'}
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] text-gray-500 font-medium block mb-1">
                  {item.directorOrCreator} · {item.releaseDate}
                </span>
                <h3
                  onClick={() => onPlayTrailer(item.youtubeId, item.title)}
                  className="font-bold text-gray-900 text-sm hover:text-red-700 cursor-pointer leading-snug line-clamp-2"
                >
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                  {item.synopsis}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-red-700 font-bold uppercase">
                  Bande-Annonce HD
                </span>
                <button
                  onClick={() => onPlayTrailer(item.youtubeId, item.title)}
                  className="text-xs font-semibold text-gray-700 hover:text-red-700 flex items-center gap-1"
                >
                  <span>Lancer</span>
                  <Play className="w-3 h-3 fill-current" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
