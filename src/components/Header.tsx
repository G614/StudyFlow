import React from 'react';
import { BookOpen, Plus, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenCreateModal: () => void;
  totalGoals: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCreateModal, totalGoals }) => {
  return (
    <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-sm sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Marca / Identidade */}
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-500 flex items-center justify-center text-white shadow-md shadow-indigo-100 ring-2 ring-indigo-50">
            <BookOpen className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                StudyFlow
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                Iniciantes
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 hidden sm:block">
              Organize seus passos de aprendizagem com clareza e leveza
            </p>
          </div>
        </div>

        {/* Botão de Ação Primária */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCreateModal}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm shadow-sm shadow-indigo-200 hover:shadow transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Novo Objetivo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
