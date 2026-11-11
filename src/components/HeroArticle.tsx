import React from 'react';
import { Play, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Article } from '../types/cinema';

interface HeroArticleProps {
  featuredArticle: Article | null;
  secondaryArticles: Article[];
  onOpenPreview: (article: Article) => void;
  onPlayTrailer?: (trailerId: string, title: string) => void;
}

export const HeroArticle: React.FC<HeroArticleProps> = ({
  featuredArticle,
  secondaryArticles,
  onOpenPreview,
  onPlayTrailer,
}) => {
  if (!featuredArticle) {
    return (
      <div className="bg-white p-8 rounded-lg border border-gray-200 text-center text-gray-500">
        Aucune actualité disponible pour le moment.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* SECTION DERNIÈRE NEWS (À LA UNE PRINCIPALE) */}
      <section>
        <div className="flex items-center justify-between border-b-2 border-red-700 pb-2 mb-4">
          <h2 className="text-xl font-bold uppercase tracking-wider text-red-700 font-heading flex items-center gap-2">
            <span>Dernière News</span>
          </h2>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">
            Édition Spéciale
          </span>
        </div>

        <article
          onClick={() => onOpenPreview(featuredArticle)}
          className="group bg-white rounded-lg shadow-xs border border-gray-200 overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col"
        >
          {/* Grande image héro */}
          <div className="relative w-full h-80 sm:h-96 bg-gray-900 overflow-hidden">
            <img
              src={featuredArticle.imageUrl}
              alt={featuredArticle.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Bouton de lecture rapide flottant */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-xs font-bold uppercase px-3 py-1.5 rounded backdrop-blur-xs flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-red-400" />
              <span>Aperçu Rapide</span>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block bg-red-700 text-white text-xs font-bold px-2.5 py-1 uppercase rounded">
                {featuredArticle.kicker}
              </span>
              <span className="text-xs font-bold uppercase text-red-700 tracking-wide">
                {featuredArticle.category}
              </span>
              <span className="text-gray-300">·</span>
              <span className="text-xs text-gray-500">{featuredArticle.readTime} de lecture</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-heading group-hover:text-red-700 transition leading-snug mb-3 text-gray-950">
              {featuredArticle.title}
            </h3>

            <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">
              {featuredArticle.summary}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-400 font-medium">
                Publié {featuredArticle.publishedAt} · Par {featuredArticle.author}
              </div>

              <div className="flex items-center gap-3">
                {featuredArticle.trailerUrl && onPlayTrailer && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayTrailer(featuredArticle.trailerUrl!, featuredArticle.title);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-xs font-bold uppercase transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-red-700" />
                    <span>Bande-annonce</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onOpenPreview(featuredArticle)}
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-red-700 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Lire l'article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* ARTICLES SECONDAIRES DU FLUX */}
      {secondaryArticles.length > 0 && (
        <section className="pt-2">
          <div className="flex items-center justify-between border-b-2 border-gray-300 pb-2 mb-4">
            <h3 className="text-lg font-bold uppercase tracking-wider text-gray-800 font-heading">
              Actualités Récentes & Dossiers
            </h3>
            <span className="text-xs text-gray-500">
              {secondaryArticles.length} articles disponibles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {secondaryArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => onOpenPreview(article)}
                className="group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 bg-gray-900 overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=400&auto=format&fit=crop';
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5 bg-red-700 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow-xs">
                      {article.kicker}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-1.5 text-xs text-red-700 font-bold uppercase mb-1.5">
                      <span>{article.category}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-gray-400 text-[11px] font-normal lowercase">{article.readTime}</span>
                    </div>

                    <h4 className="font-bold text-gray-900 text-base leading-snug group-hover:text-red-700 transition line-clamp-2">
                      {article.title}
                    </h4>

                    <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.timeAgo}
                  </span>
                  <span className="font-semibold text-red-700 group-hover:underline">
                    Aperçu →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
