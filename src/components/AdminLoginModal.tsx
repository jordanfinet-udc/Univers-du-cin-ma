import React, { useState } from 'react';
import { Lock, ShieldCheck, X, KeyRound, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  isAdmin: boolean;
  onLogout: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  isAdmin,
  onLogout,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mot de passe administrateur par défaut "admin" ou "cinema"
    if (password === 'admin' || password === 'cinema' || password === 'admin123') {
      onSuccess();
      setPassword('');
      setError(false);
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Accès Administration"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-red-700 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-red-200" />
            <h3 className="text-sm font-bold uppercase tracking-wider font-heading">
              Espace Administrateur
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-red-200 hover:text-white rounded transition"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {isAdmin ? (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-base">Vous êtes connecté en tant qu'Admin</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Le bouton de rédaction et les options d'édition d'articles sont désormais activés.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold uppercase rounded transition"
                >
                  Fermer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase rounded transition"
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                Connectez-vous pour accéder aux fonctions de rédaction, modification et publication d'actualités.
              </p>

              {error && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Mot de passe incorrect (Indice : <strong>admin</strong>)</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Mot de passe Administrateur
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    autoFocus
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    placeholder="Entrez le mot de passe..."
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-red-700 focus:border-red-700 outline-none"
                  />
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">
                  Mot de passe par défaut : <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700">admin</code>
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-1.5 border border-gray-300 text-gray-700 text-xs font-semibold uppercase rounded hover:bg-gray-50 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase rounded transition shadow-xs"
                >
                  Se connecter
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
