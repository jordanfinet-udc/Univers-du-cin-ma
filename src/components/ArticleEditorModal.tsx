import React, { useState, useEffect } from 'react';
import { X, Save, Image, Sparkles, AlertCircle } from 'lucide-react';
import { Article, ArticleCategory } from '../types/cinema';

interface ArticleEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: Article) => void;
  editingArticle?: Article | null;
}

const PRESET_IMAGES = [
  { label: 'Plateau Tournage IMAX', url: '/src/assets/images/hero_cinema_feature_1794356425220.jpg' },
  { label: 'Blockbuster Sci-Fi / Marvel', url: '/src/assets/images/movie_marvel_blockbuster_1794356425807.jpg' },
  { label: 'Série Drame Prestige', url: '/src/assets/images/series_prestige_drama_1794356426048.jpg' },
  { label: 'Cinéma Palace Parisien', url: '/src/assets/images/cinema_palace_marquee_1794356427431.jpg' },
];

export const ArticleEditorModal: React.FC<ArticleEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingArticle,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ArticleCategory>('News');
  const [kicker, setKicker] = useState('Exclusif');
  const [summary, setSummary] = useState('');
  const [contentRaw, setContentRaw] = useState('');
  const [imageUrl, setImageUrl] = useState('/src/assets/images/hero_cinema_feature_1794356425220.jpg');
  const [author, setAuthor] = useState('La Rédaction');
  const [readTime, setReadTime] = useState('4 min');
  const [isFeatured, setIsFeatured] = useState(false);
  const [quoteText, setQuoteText] = useState('');
  const [quoteAuthor, setQuoteAuthor] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [tagsRaw, setTagsRaw] = useState('Cinéma, Actualité');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingArticle) {
      setTitle(editingArticle.title);
      setCategory(editingArticle.category);
      setKicker(editingArticle.kicker);
      setSummary(editingArticle.summary);
      setContentRaw(editingArticle.content.join('\n\n'));
      setImageUrl(editingArticle.imageUrl);
      setAuthor(editingArticle.author);
      setReadTime(editingArticle.readTime);
      setIsFeatured(!!editingArticle.isFeatured);
      setQuoteText(editingArticle.quote?.text || '');
      setQuoteAuthor(editingArticle.quote?.author || '');
      setTrailerUrl(editingArticle.trailerUrl || '');
      setTagsRaw(editingArticle.tags.join(', '));
    } else {
      // Formulaire vierge
      setTitle('');
      setCategory('News');
      setKicker('Exclusif');
      setSummary('');
      setContentRaw('');
      setImageUrl('/src/assets/images/hero_cinema_feature_1794356425220.jpg');
      setAuthor('La Rédaction');
      setReadTime('3 min');
      setIsFeatured(false);
      setQuoteText('');
      setQuoteAuthor('');
      setTrailerUrl('');
      setTagsRaw('Cinéma, Tournage, Exclusivité');
    }
    setError(null);
  }, [editingArticle, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Veuillez renseigner un titre pour l\'article.');
      return;
    }
    if (!summary.trim()) {
      setError('Veuillez renseigner un résumé / chapeau pour l\'article.');
      return;
    }

    const paragraphs = contentRaw.trim()
      ? contentRaw.split('\n\n').filter((p) => p.trim().length > 0)
      : [summary];

    const tags = tagsRaw
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const savedArticle: Article = {
      id: editingArticle ? editingArticle.id : `art-${Date.now()}`,
      title: title.trim(),
      category,
      kicker: kicker.trim() || 'News',
      summary: summary.trim(),
      content: paragraphs,
      imageUrl: imageUrl.trim() || '/src/assets/images/hero_cinema_feature_1794356425220.jpg',
      publishedAt: editingArticle ? editingArticle.publishedAt : 'Aujourd\'hui à l\'instant',
      timeAgo: editingArticle ? editingArticle.timeAgo : 'À l\'instant',
      author: author.trim() || 'La Rédaction',
      readTime: readTime.trim() || '3 min',
      isFeatured,
      trailerUrl: trailerUrl.trim() || undefined,
      quote: quoteText.trim()
        ? {
            text: quoteText.trim(),
            author: quoteAuthor.trim() || 'Source Rédaction',
          }
        : undefined,
      tags: tags.length > 0 ? tags : ['Cinéma'],
    };

    onSave(savedArticle);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={editingArticle ? "Modifier l'article" : "Rédiger un nouvel article"}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="bg-red-700 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-red-200" />
            <h3 className="text-lg font-bold uppercase tracking-wider font-heading">
              {editingArticle ? 'Modifier l\'article' : 'Espace Rédaction · Nouvel Article'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-red-200 hover:text-white hover:bg-red-800 rounded transition"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Titre */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Titre de l'actualité *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Révélations sur le tournage du nouveau blockbuster..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-700 focus:border-red-700 outline-none font-semibold text-gray-900"
            />
          </div>

          {/* Grille Catégorie & Surtitre */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Catégorie *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ArticleCategory)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-700 focus:border-red-700 outline-none bg-white font-medium"
              >
                <option value="News">News</option>
                <option value="Films">Films</option>
                <option value="Séries">Séries</option>
                <option value="Bandes-annonces">Bandes-annonces</option>
                <option value="Cinéma">Cinéma</option>
                <option value="Box-Office">Box-Office</option>
                <option value="DVD / Blu-Ray / 4K">DVD / Blu-Ray / 4K</option>
                <option value="Précommandes">DVD/4K - Précommandes</option>
                <option value="Nouveautés">DVD/4K - Nouveautés</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Surtitre / Tag Éditorial
              </label>
              <input
                type="text"
                value={kicker}
                onChange={(e) => setKicker(e.target.value)}
                placeholder="Ex: Exclusif, Casting, Tournage, Critique"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-700 focus:border-red-700 outline-none font-medium"
              />
            </div>
          </div>

          {/* Chapeau / Résumé */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Résumé d'accroche (Chapeau) *
            </label>
            <textarea
              rows={2}
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Une description accrocheuse de l'événement, du film ou du tournage..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-700 focus:border-red-700 outline-none"
            />
          </div>

          {/* Contenu complet */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Corps de l'article (séparer les paragraphes par un saut de ligne)
            </label>
            <textarea
              rows={5}
              value={contentRaw}
              onChange={(e) => setContentRaw(e.target.value)}
              placeholder="Développez l'article en plusieurs paragraphes détaillés..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-700 focus:border-red-700 outline-none leading-relaxed"
            />
          </div>

          {/* Choix d'image */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center justify-between">
              <span>Image de couverture</span>
              <span className="text-gray-400 font-normal lowercase">visuel cinéma HD</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
              {PRESET_IMAGES.map((img) => (
                <button
                  type="button"
                  key={img.url}
                  onClick={() => setImageUrl(img.url)}
                  className={`text-left p-1 border rounded text-[11px] truncate transition ${
                    imageUrl === img.url
                      ? 'border-red-700 bg-red-50 text-red-700 font-bold'
                      : 'border-gray-200 hover:border-gray-400 text-gray-600'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-12 object-cover rounded mb-1" />
                  <span className="block truncate">{img.label}</span>
                </button>
              ))}
            </div>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Ou collez une URL d'image personnalisée"
              className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded outline-none text-gray-600"
            />
          </div>

          {/* Grille Auteur, Temps de lecture & Trailer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Auteur
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Temps de lecture
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="Ex: 4 min"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                ID YouTube Trailer
              </label>
              <input
                type="text"
                value={trailerUrl}
                onChange={(e) => setTrailerUrl(e.target.value)}
                placeholder="Ex: yoLZT3jX3b4"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded outline-none"
              />
            </div>
          </div>

          {/* Citation optionnelle */}
          <div className="p-3 bg-gray-50 border border-gray-200 rounded space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
              Citation en exergue (Optionnel)
            </span>
            <input
              type="text"
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              placeholder="Texte de la citation marquante..."
              className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded outline-none bg-white"
            />
            <input
              type="text"
              value={quoteAuthor}
              onChange={(e) => setQuoteAuthor(e.target.value)}
              placeholder="Auteur de la citation (ex: Le Réalisateur)"
              className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded outline-none bg-white"
            />
          </div>

          {/* Mots-clés */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Mots-clés (séparés par des virgules)
            </label>
            <input
              type="text"
              value={tagsRaw}
              onChange={(e) => setTagsRaw(e.target.value)}
              placeholder="Cinéma, Marvel, Tournage, Box-Office"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded outline-none"
            />
          </div>

          {/* Toggle À la Une */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="isFeaturedToggle"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 text-red-700 rounded border-gray-300 focus:ring-red-700"
            />
            <label htmlFor="isFeaturedToggle" className="text-xs font-bold text-gray-800 uppercase tracking-wide cursor-pointer">
              Placer comme "Dernière News" (À la Une principale)
            </label>
          </div>

          {/* Boutons actions */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded text-xs font-bold uppercase transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded text-xs font-bold uppercase transition shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>{editingArticle ? 'Enregistrer les modifications' : 'Publier l\'actualité'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
