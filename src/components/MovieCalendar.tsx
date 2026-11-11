import React, { useState } from 'react';
import { Calendar, Play, Clock, Film, Filter } from 'lucide-react';
import { MovieRelease } from '../types/cinema';

interface MovieCalendarProps {
  releases: MovieRelease[];
  initialPeriod?: 'week' | 'month';
  onPlayTrailer: (trailerId: string, title: string) => void;
}

export const MovieCalendar: React.FC<MovieCalendarProps> = ({
  releases,
  initialPeriod = 'week',
  onPlayTrailer,
}) => {
  const [period, setPeriod] = useState<'week' | 'month'>(initialPeriod);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const genres = ['all', ...Array.from(new Set(releases.map((r) => r.genre.split(' / ')[0])))];

  const filteredReleases = releases.filter((movie) => {
    const matchPeriod = movie.period === period;
    const matchGenre = selectedGenre === 'all' || movie.genre.includes(selectedGenre);
    return matchPeriod && matchGenre;
  });

  return (
    <div className="space-y-6">
      {/* En-tête de section avec filtres */}
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-700" />
              <h2 className="text-xl font-bold uppercase tracking-wider text-gray-900 font-heading">
                Calendrier des Sorties en Salles
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Consultez les films à l'affiche cette semaine et les avant-premières du mois.
            </p>
          </div>

          {/* Sélecteur de période */}
          <div className="inline-flex p-1 bg-gray-100 rounded-lg shrink-0">
            <button
              onClick={() => setPeriod('week')}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded-md transition ${
                period === 'week'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sorties de la semaine
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded-md transition ${
                period === 'month'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sorties du mois
            </button>
          </div>
        </div>

        {/* Filtres par genre */}
        <div className="flex items-center gap-2 pt-3 overflow-x-auto scrollbar-none text-xs">
          <span className="text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3" /> Genre :
          </span>
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-2.5 py-1 rounded transition capitalize whitespace-nowrap ${
                selectedGenre === g
                  ? 'bg-gray-900 text-white font-bold'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {g === 'all' ? 'Tous les genres' : g}
            </button>
          ))}
        </div>
      </div>

      {/* Grille des films */}
      {filteredReleases.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-lg border border-gray-200 text-gray-500">
          <Film className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="font-semibold">Aucune sortie trouvée pour ces critères.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReleases.map((movie) => (
            <article
              key={movie.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="relative h-56 bg-gray-900 overflow-hidden">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Date de sortie badge */}
                <div className="absolute top-3 left-3 bg-red-700 text-white text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow-xs">
                  {movie.releaseDate}
                </div>

                {movie.isHighlight && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-gray-950 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    Coup de Cœur
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] text-gray-300 font-semibold block uppercase">
                    {movie.genre} · {movie.duration}
                  </span>
                  <h3 className="text-xl font-bold font-heading text-white leading-tight">
                    {movie.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-gray-500 mb-2 space-y-0.5">
                    <p>
                      <strong className="text-gray-700 font-semibold">Réalisation :</strong>{' '}
                      {movie.director}
                    </p>
                    <p className="truncate">
                      <strong className="text-gray-700 font-semibold">Avec :</strong>{' '}
                      {movie.cast.join(', ')}
                    </p>
                    <p>
                      <strong className="text-gray-700 font-semibold">Distributeur :</strong>{' '}
                      {movie.distributor}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mt-3">
                    {movie.synopsis}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 font-medium">Séances disponibles</span>
                  {movie.trailerId ? (
                    <button
                      onClick={() => onPlayTrailer(movie.trailerId!, movie.title)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded text-xs font-bold uppercase transition"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Bande-annonce</span>
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400 italic">Bande-annonce à venir</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
