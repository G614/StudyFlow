import React from 'react';
import { Sparkles, Plus, RefreshCw, SearchX, BookOpen } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-goals' | 'no-filter-match';
  onOpenCreateModal: () => void;
  onRestoreSamples?: () => void;
  onClearFilters?: () => void;
  filterLabel?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  onOpenCreateModal,
  onRestoreSamples,
  onClearFilters,
  filterLabel,
}) => {
  if (type === 'no-filter-match') {
    return (
      <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-8 sm:p-12 text-center max-w-xl mx-auto my-6">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Nenhum objetivo encontrado
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Não localizamos nenhum objetivo com o filtro {filterLabel ? `"${filterLabel}"` : 'aplicado'}.
          Tente buscar por outro termo ou limpe os filtros.
        </p>
        {onClearFilters && (
          <div className="mt-5">
            <button
              onClick={onClearFilters}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Ver todos os objetivos
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-dashed border-indigo-200 p-8 sm:p-12 text-center max-w-xl mx-auto my-6 shadow-xs">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
        <BookOpen className="w-8 h-8 stroke-[1.8]" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
        Nenhum objetivo cadastrado por enquanto
      </h3>
      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
        Toda grande jornada de aprendizado começa com uma meta simples. Defina o que você deseja estudar hoje e acompanhe sua evolução!
      </p>

      {/* Ações sugeridas */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onOpenCreateModal}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm shadow-indigo-200 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Cadastrar meu primeiro objetivo</span>
        </button>

        {onRestoreSamples && (
          <button
            onClick={onRestoreSamples}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Carregar exemplos práticos</span>
          </button>
        )}
      </div>
    </div>
  );
};
