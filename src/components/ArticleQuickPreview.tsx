import React, { useEffect } from 'react';
import { X, Play, Clock, User, Share2, Check, PenSquare, ArrowLeft } from 'lucide-react';
import { Article } from '../types/cinema';

interface ArticleQuickPreviewProps {
  article: Article | null;
  onClose: () => void;
  onPlayTrailer?: (trailerId: string, title: string) => void;
  onEditArticle?: (article: Article) => void;
}

export const ArticleQuickPreview: React.FC<ArticleQuickPreviewProps> = ({
  article,
  onClose,
  onPlayTrailer,
  onEditArticle,
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white h-full overflow-y-auto shadow-2xl flex flex-col relative z-10 animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barre supérieure d'actions */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-20 border-b border-gray-200 px-6 py-3.5 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-red-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Fermer l'aperçu</span>
          </button>

          <div className="flex items-center gap-2">
            {onEditArticle && (
              <button
                onClick={() => {
                  onClose();
                  onEditArticle(article);
                }}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition"
                title="Modifier cet article"
              >
                <PenSquare className="w-3.5 h-3.5 text-gray-600" />
                <span>Modifier</span>
              </button>
            )}

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition"
              title="Partager le lien"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Lien copié !</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-gray-600" />
                  <span>Partager</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Principale & Badge */}
        <div className="relative w-full h-80 sm:h-96 bg-gray-900 overflow-hidden shrink-0">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Badge & Métadonnées flottantes */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider">
              <span className="bg-red-700 px-2 py-0.5 rounded text-white shadow-xs">
                {article.kicker}
              </span>
              <span className="text-red-300 font-semibold">{article.category}</span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-300">{article.readTime} de lecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white leading-tight">
              {article.title}
            </h2>
          </div>

          {/* Bouton trailer si disponible */}
          {article.trailerUrl && onPlayTrailer && (
            <button
              onClick={() => onPlayTrailer(article.trailerUrl!, article.title)}
              className="absolute top-6 right-6 inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase px-3.5 py-2 rounded shadow-lg transition"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Voir la Bande-Annonce</span>
            </button>
          )}
        </div>

        {/* Corps de l'Article */}
        <div className="p-6 sm:p-10 space-y-6 flex-1">
          {/* Ligne Auteur & Date */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200 text-xs text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs uppercase">
                {article.author.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-gray-900 block">{article.author}</span>
                <span className="text-gray-500 text-[11px]">Journaliste Cinéma</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.publishedAt}
              </span>
            </div>
          </div>

          {/* Chapeau / Résumé */}
          <p className="text-lg text-gray-800 font-semibold leading-relaxed border-l-2 border-red-700 pl-4 py-1 italic bg-red-50/40">
            {article.summary}
          </p>

          {/* Paragraphes de l'article */}
          <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed space-y-4 text-base">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="first-letter:text-2xl first-letter:font-bold first-letter:text-red-700">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Citation mise en avant (Pull Quote) */}
          {article.quote && (
            <div className="my-8 p-6 bg-gray-50 border-y border-gray-200 text-center">
              <blockquote className="text-lg sm:text-xl font-heading font-medium italic text-gray-900 leading-snug">
                « {article.quote.text} »
              </blockquote>
              <cite className="block mt-2 text-xs uppercase tracking-wider font-bold text-red-700 not-italic">
                — {article.quote.author}
              </cite>
            </div>
          )}

          {/* Tags */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mr-1">
                Mots-clés :
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded transition cursor-default font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer d'article */}
          <div className="bg-red-50 border border-red-100 rounded-lg p-5 flex items-center justify-between mt-8">
            <div>
              <h4 className="text-sm font-bold uppercase text-red-800 font-heading">
                Univers du Cinéma
              </h4>
              <p className="text-xs text-red-600 mt-0.5">
                Restez informés des prochaines exclusivités et analyses de la rédaction.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase rounded transition shrink-0"
            >
              Retour aux News
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
