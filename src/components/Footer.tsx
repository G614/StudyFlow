import React from 'react';
import { BookOpen, Sparkles, RefreshCcw } from 'lucide-react';

interface FooterProps {
  onRestoreSamples: () => void;
  onClearAll: () => void;
  totalGoals: number;
}

export const Footer: React.FC<FooterProps> = ({
  onRestoreSamples,
  onClearAll,
  totalGoals,
}) => {
  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white py-8 text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
            SF
          </div>
          <span className="font-semibold text-slate-700">StudyFlow</span>
          <span>—</span>
          <span>Organização simples para você aprender no seu próprio ritmo.</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRestoreSamples}
            className="hover:text-indigo-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
            title="Recarregar os objetivos de exemplo para iniciantes"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Restaurar exemplos</span>
          </button>

          {totalGoals > 0 && (
            <>
              <span>•</span>
              <button
                onClick={onClearAll}
                className="hover:text-rose-600 transition-colors cursor-pointer"
                title="Limpar todos os objetivos do armazenamento local"
              >
                Limpar dados
              </button>
            </>
          )}
        </div>
      </div>
    </footer>
  );
};
