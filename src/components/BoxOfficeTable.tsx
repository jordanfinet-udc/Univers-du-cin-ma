import React from 'react';
import { TrendingUp, TrendingDown, Minus, Sparkles, Play, Award, Globe } from 'lucide-react';
import { BoxOfficeItem } from '../types/cinema';

interface BoxOfficeTableProps {
  items: BoxOfficeItem[];
  onPlayTrailer: (trailerId: string, title: string) => void;
  scope: 'france' | 'monde';
  onSelectScope: (scope: 'france' | 'monde') => void;
}

export const BoxOfficeTable: React.FC<BoxOfficeTableProps> = ({
  items,
  onPlayTrailer,
  scope,
  onSelectScope,
}) => {
  const formatValue = (num: number, isDollar?: boolean) => {
    if (isDollar) {
      if (num >= 1_000_000_000) {
        return `$ ${(num / 1_000_000_000).toFixed(2)} Mds`;
      }
      if (num >= 1_000_000) {
        return `$ ${(num / 1_000_000).toFixed(1)} M`;
      }
      return `$ ${new Intl.NumberFormat('en-US').format(num)}`;
    }
    return `${new Intl.NumberFormat('fr-FR').format(num)} entrées`;
  };

  const isMonde = scope === 'monde';

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
      {/* En-tête avec onglets France / Monde */}
      <div className="p-6 border-b border-gray-200 bg-linear-to-r from-red-900 to-red-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            {isMonde ? (
              <Globe className="w-5 h-5 text-amber-400" />
            ) : (
              <Award className="w-5 h-5 text-amber-400" />
            )}
            <span className="text-xs uppercase font-bold tracking-widest text-red-200">
              {isMonde ? 'Classement International' : 'Classement Officiel France'}
            </span>
          </div>
          <h2 className="text-2xl font-bold uppercase tracking-wide font-heading mt-1">
            {isMonde ? 'Box-Office Monde · Recettes Globales' : 'Box-Office France · Entrées Salles'}
          </h2>
          <p className="text-xs text-red-200/90 mt-1">
            {isMonde
              ? 'Recettes mondiales en dollars US (Source : Box Office Mojo / Comscore).'
              : 'Entrées enregistrées sur l\'ensemble du territoire national (Source : CBO Box-Office).'}
          </p>
        </div>

        {/* Sélecteur de sous-catégorie Box-Office France / Box-Office Monde */}
        <div className="inline-flex p-1 bg-red-950/70 border border-red-700/80 rounded-lg shrink-0 self-start md:self-auto">
          <button
            onClick={() => onSelectScope('france')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase rounded-md transition ${
              !isMonde
                ? 'bg-white text-red-900 shadow-xs'
                : 'text-red-200 hover:text-white hover:bg-red-800/50'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Box-Office France</span>
          </button>
          <button
            onClick={() => onSelectScope('monde')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase rounded-md transition ${
              isMonde
                ? 'bg-white text-red-900 shadow-xs'
                : 'text-red-200 hover:text-white hover:bg-red-800/50'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Box-Office Monde</span>
          </button>
        </div>
      </div>

      {/* Tableau des entrées / recettes */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-bold tracking-wider">
            <tr>
              <th scope="col" className="py-3 px-4 text-center w-16">Rang</th>
              <th scope="col" className="py-3 px-4 text-center w-20">Évol.</th>
              <th scope="col" className="py-3 px-4">Film & Réalisateur</th>
              <th scope="col" className="py-3 px-4 text-right">
                {isMonde ? 'Recettes Semaine' : 'Entrées Semaine'}
              </th>
              <th scope="col" className="py-3 px-4 text-right">
                {isMonde ? 'Total Monde' : 'Cumul Total'}
              </th>
              <th scope="col" className="py-3 px-4 text-center">Semaines</th>
              <th scope="col" className="py-3 px-4 text-right">Bande-Annonce</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => {
              const isNew = item.previousRank === null;
              const hasGained = item.previousRank !== null && item.previousRank > item.rank;
              const hasLost = item.previousRank !== null && item.previousRank < item.rank;
              const isStable = item.previousRank !== null && item.previousRank === item.rank;
              const isDollar = item.unit === 'dollars' || isMonde;

              return (
                <tr key={item.rank} className="hover:bg-red-50/30 transition-colors">
                  {/* Rang */}
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-heading font-black text-sm ${
                        item.rank === 1
                          ? 'bg-amber-400 text-gray-950 ring-2 ring-amber-300'
                          : item.rank === 2
                          ? 'bg-gray-200 text-gray-800'
                          : item.rank === 3
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {item.rank}
                    </span>
                  </td>

                  {/* Évolution */}
                  <td className="py-4 px-4 text-center">
                    {isNew && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <Sparkles className="w-2.5 h-2.5" /> New
                      </span>
                    )}
                    {hasGained && (
                      <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600">
                        <TrendingUp className="w-3.5 h-3.5" /> +{item.previousRank! - item.rank}
                      </span>
                    )}
                    {hasLost && (
                      <span className="inline-flex items-center gap-0.5 text-xs font-bold text-rose-600">
                        <TrendingDown className="w-3.5 h-3.5" /> -{item.rank - item.previousRank!}
                      </span>
                    )}
                    {isStable && (
                      <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-gray-400">
                        <Minus className="w-3.5 h-3.5" /> =
                      </span>
                    )}
                  </td>

                  {/* Film & Réalisateur */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.posterUrl}
                        alt={item.title}
                        className="w-10 h-14 object-cover rounded shadow-xs shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=300&auto=format&fit=crop';
                        }}
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 text-base leading-snug hover:text-red-700 cursor-pointer">
                          {item.title}
                        </h4>
                        <div className="text-xs text-gray-500 mt-0.5">
                          <span>Par {item.director}</span>
                          <span className="mx-1.5">·</span>
                          <span>{item.distributor}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Entrées / Recettes Semaine */}
                  <td className="py-4 px-4 text-right font-mono font-bold text-gray-900 tabular-nums">
                    {formatValue(item.weeklyEntries, isDollar)}
                  </td>

                  {/* Cumul Total */}
                  <td className="py-4 px-4 text-right font-mono text-gray-600 tabular-nums">
                    {formatValue(item.totalEntries, isDollar)}
                  </td>

                  {/* Semaines d'exploitation */}
                  <td className="py-4 px-4 text-center font-mono text-gray-700 tabular-nums">
                    Semaine {item.weeksCount}
                  </td>

                  {/* Action */}
                  <td className="py-4 px-4 text-right">
                    {item.trailerId ? (
                      <button
                        onClick={() => onPlayTrailer(item.trailerId!, item.title)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold uppercase bg-red-700 hover:bg-red-800 text-white rounded transition"
                        title="Regarder la bande-annonce"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span className="hidden sm:inline">Trailer</span>
                      </button>
                    ) : (
                      <span className="text-gray-300 text-xs">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
