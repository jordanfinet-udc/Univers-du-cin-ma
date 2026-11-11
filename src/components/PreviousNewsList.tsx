import React from 'react';
import { Play, TrendingUp, Clock, ChevronRight } from 'lucide-react';
import { Article, BoxOfficeItem } from '../types/cinema';

interface PreviousNewsListProps {
  articles: Article[];
  boxOfficeItems: BoxOfficeItem[];
  onOpenPreview: (article: Article) => void;
  onPlayTrailer: (trailerId: string, title: string) => void;
  onViewAllBoxOffice: () => void;
}

export const PreviousNewsList: React.FC<PreviousNewsListProps> = ({
  articles,
  boxOfficeItems,
  onOpenPreview,
  onPlayTrailer,
  onViewAllBoxOffice,
}) => {
  return (
    <aside className="space-y-8">
      {/* SECTION NEWS PRÉCÉDENTES (Exacte structure demandée avec catégorie au singulier) */}
      <div>
        <h2 className="text-xl font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-900 pb-2 mb-4 font-heading">
          News Précédentes
        </h2>

        <div className="space-y-4">
          {articles.map((art) => (
            <article
              key={art.id}
              onClick={() => onOpenPreview(art)}
              className="bg-white p-4 rounded-lg shadow-xs border border-gray-200 flex gap-4 hover:shadow-md transition cursor-pointer group"
            >
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-20 h-20 object-cover rounded shrink-0 group-hover:brightness-95 transition"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=300&auto=format&fit=crop';
                }}
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs text-red-700 font-bold uppercase block mb-1">
                  {art.category}
                </span>
                <h4 className="font-bold text-sm leading-snug text-gray-900 group-hover:text-red-700 transition line-clamp-2">
                  {art.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1.5">
                  <Clock className="w-3 h-3" />
                  <span>{art.timeAgo}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* WIDGET TOP BOX-OFFICE FLASH */}
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-red-700" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 font-heading">
              Top 3 Box-Office
            </h3>
          </div>
          <button
            onClick={onViewAllBoxOffice}
            className="text-[11px] font-bold uppercase text-red-700 hover:text-red-800 flex items-center"
          >
            <span>Voir tout</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {boxOfficeItems.slice(0, 3).map((item) => (
            <div
              key={item.rank}
              className="flex items-center justify-between gap-3 text-xs p-2 rounded hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`w-6 h-6 rounded-full font-black flex items-center justify-center shrink-0 ${
                    item.rank === 1
                      ? 'bg-amber-400 text-gray-950 text-xs'
                      : 'bg-gray-100 text-gray-700 text-xs'
                  }`}
                >
                  {item.rank}
                </span>
                <div className="truncate">
                  <h5 className="font-bold text-gray-900 truncate hover:text-red-700 cursor-pointer">
                    {item.title}
                  </h5>
                  <span className="text-[11px] text-gray-400">
                    {item.unit === 'dollars'
                      ? `$ ${(item.weeklyEntries / 1_000_000).toFixed(1)} M`
                      : `${new Intl.NumberFormat('fr-FR').format(item.weeklyEntries)} entrées`}
                  </span>
                </div>
              </div>

              {item.trailerId && (
                <button
                  onClick={() => onPlayTrailer(item.trailerId!, item.title)}
                  className="p-1.5 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded transition shrink-0"
                  title="Voir la bande-annonce"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* BANDE-ANNONCE DU MOMENT / SPOTLIGHT */}
      <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-xs border border-gray-800">
        <div className="p-3 bg-red-700 text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 fill-current" />
            Bande-Annonce du Moment
          </span>
          <span className="text-red-200">Exclusivité</span>
        </div>

        <div
          className="relative aspect-video bg-black cursor-pointer group"
          onClick={() => onPlayTrailer('yoLZT3jX3b4', 'Dune : Deuxième Partie')}
        >
          <img
            src="/src/assets/images/hero_cinema_feature_1794356425220.jpg"
            alt="Dune : Deuxième Partie"
            className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-red-700 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-600 transition-transform">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
          </div>
          <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-bold drop-shadow-md truncate">
            Dune : Deuxième Partie (Bande-Annonce)
          </div>
        </div>

        <div className="p-3.5 text-xs text-gray-300">
          <p className="line-clamp-2 text-gray-300 text-[11px] leading-relaxed">
            Redécouvrez la bande-annonce officielle de la fresque de Denis Villeneuve.
          </p>
        </div>
      </div>
    </aside>
  );
};
