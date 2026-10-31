import React from 'react';
import { Search, ArrowUpDown, Filter } from 'lucide-react';
import { GoalStatus, GoalStatsSummary } from '../types/goal';

export type FilterStatus = 'todos' | GoalStatus;
export type SortOption = 'deadline_asc' | 'deadline_desc' | 'created_desc';

interface GoalFilterBarProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  stats: GoalStatsSummary;
}

export const GoalFilterBar: React.FC<GoalFilterBarProps> = ({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  stats,
}) => {
  const filterTabs: Array<{ id: FilterStatus; label: string; count: number }> = [
    { id: 'todos', label: 'Todos', count: stats.total },
    { id: 'nao_iniciado', label: 'Não iniciados', count: stats.naoIniciados },
    { id: 'em_andamento', label: 'Em andamento', count: stats.emAndamento },
    { id: 'concluido', label: 'Concluídos', count: stats.concluidos },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-xs space-y-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Abas de Filtro por Status */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = currentFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onFilterChange(tab.id)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Busca e Ordenação */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Campo de Busca */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por título ou anotação..."
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/10 transition-all"
            />
          </div>

          {/* Seletor de Ordenação */}
          <div className="relative shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-medium">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                aria-label="Critério de ordenação dos objetivos"
                className="bg-transparent text-xs text-slate-700 font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="deadline_asc">Prazo mais próximo</option>
                <option value="deadline_desc">Prazo mais distante</option>
                <option value="created_desc">Mais recentes primeiro</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
