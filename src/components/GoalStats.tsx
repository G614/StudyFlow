import React from 'react';
import { Target, Clock, CheckCircle2, CircleDashed, Award } from 'lucide-react';
import { GoalStatsSummary } from '../types/goal';

interface GoalStatsProps {
  stats: GoalStatsSummary;
}

export const GoalStats: React.FC<GoalStatsProps> = ({ stats }) => {
  const { total, naoIniciados, emAndamento, concluidos, percentualConcluido } = stats;

  return (
    <div className="space-y-4">
      {/* Barra de Progresso e Motivação */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-sm relative overflow-hidden">
        {/* Detalhe de fundo suave */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-300" />
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
                Seu Ritmo de Aprendizagem
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {total === 0
                ? 'Pronto para começar sua jornada?'
                : percentualConcluido === 100
                ? 'Incrível! Todos os objetivos foram concluídos! 🎉'
                : percentualConcluido > 50
                ? 'Mais da metade concluída! Continue firme! 🚀'
                : 'Pequenos passos constantes geram grandes resultados! 🌱'}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200/90">
              {total === 0
                ? 'Cadastre seu primeiro objetivo para dar início à sua rotina de estudos.'
                : `${concluidos} de ${total} objetivo${total > 1 ? 's' : ''} concluído${concluidos > 1 ? 's' : ''}.`}
            </p>
          </div>

          {/* Indicador de Porcentagem */}
          <div className="sm:text-right shrink-0">
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {percentualConcluido}%
            </div>
            <div className="text-xs text-indigo-200 font-medium">de conclusão</div>
          </div>
        </div>

        {/* Barra de Progresso */}
        <div className="mt-5 relative">
          <div className="h-3 w-full bg-white/15 rounded-full overflow-hidden p-0.5 backdrop-blur-xs">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all duration-500 ease-out shadow-xs"
              style={{ width: `${percentualConcluido}%` }}
            />
          </div>
        </div>
      </div>

      {/* Cartões de Contadores */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Geral */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Cadastrados</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{total}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {total === 1 ? '1 meta no total' : `${total} metas no total`}
          </div>
        </div>

        {/* Não Iniciados */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Não iniciados</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
              <CircleDashed className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-700">{naoIniciados}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Aguardando início</div>
        </div>

        {/* Em Andamento */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200/70 shadow-xs bg-amber-50/20 hover:border-amber-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-amber-800">Em andamento</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-900">{emAndamento}</div>
          <div className="text-[11px] text-amber-700/80 mt-0.5">Foco no momento</div>
        </div>

        {/* Concluídos */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-200/70 shadow-xs bg-emerald-50/20 hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-800">Concluídos</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-900">{concluidos}</div>
          <div className="text-[11px] text-emerald-700/80 mt-0.5">Missões cumpridas</div>
        </div>
      </div>
    </div>
  );
};
