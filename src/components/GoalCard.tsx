import React from 'react';
import { Calendar, Edit3, Trash2, CheckCircle, Clock, CircleDashed, ChevronRight } from 'lucide-react';
import { GoalStatus, STATUS_DETAILS, StudyGoal } from '../types/goal';
import { formatDateBR, getDeadlineInfo } from '../utils/dateUtils';

interface GoalCardProps {
  goal: StudyGoal;
  onEdit: (goal: StudyGoal) => void;
  onDelete: (goal: StudyGoal) => void;
  onStatusChange: (id: string, status: GoalStatus) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const statusConfig = STATUS_DETAILS[goal.status];
  const deadlineInfo = getDeadlineInfo(goal.deadline, goal.status);
  const formattedDate = formatDateBR(goal.deadline);

  // Ciclo rápido de transição de status para facilidade do estudante
  const handleQuickNextStatus = () => {
    if (goal.status === 'nao_iniciado') {
      onStatusChange(goal.id, 'em_andamento');
    } else if (goal.status === 'em_andamento') {
      onStatusChange(goal.id, 'concluido');
    } else {
      onStatusChange(goal.id, 'em_andamento');
    }
  };

  const getStatusIcon = (status: GoalStatus) => {
    switch (status) {
      case 'concluido':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'em_andamento':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'nao_iniciado':
      default:
        return <CircleDashed className="w-4 h-4 text-slate-500" />;
    }
  };

  const isCompleted = goal.status === 'concluido';

  return (
    <div
      className={`group relative bg-white rounded-2xl border transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden ${
        isCompleted
          ? 'border-emerald-200/90 bg-gradient-to-b from-white to-emerald-50/20'
          : deadlineInfo.isOverdue
          ? 'border-rose-200/90'
          : 'border-slate-200/90 hover:border-indigo-200'
      }`}
    >
      {/* Topo do Card: Status e Ações */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Badge de Status interativo */}
          <button
            onClick={handleQuickNextStatus}
            title="Clique para avançar o status deste objetivo"
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${statusConfig.colorBadge} ${statusConfig.bgHover}`}
          >
            {getStatusIcon(goal.status)}
            <span>{statusConfig.label}</span>
            <ChevronRight className="w-3 h-3 opacity-60" />
          </button>

          {/* Botões de Ação: Editar e Excluir */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(goal)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
              title="Editar este objetivo"
              aria-label={`Editar ${goal.title}`}
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(goal)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Excluir este objetivo"
              aria-label={`Excluir ${goal.title}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Título do Objetivo */}
        <h3
          className={`text-base font-bold tracking-tight transition-colors line-clamp-2 ${
            isCompleted ? 'text-slate-500 line-through decoration-emerald-500/60' : 'text-slate-900'
          }`}
        >
          {goal.title}
        </h3>

        {/* Descrição */}
        {goal.description ? (
          <p
            className={`mt-2 text-xs sm:text-sm leading-relaxed line-clamp-3 whitespace-pre-line ${
              isCompleted ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {goal.description}
          </p>
        ) : (
          <p className="mt-2 text-xs italic text-slate-400">Sem descrição detalhada adicionada.</p>
        )}
      </div>

      {/* Rodapé do Card: Prazo e Indicador */}
      <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs mt-3">
        {/* Data Limite */}
        <div className="flex items-center gap-1.5 text-slate-600 font-medium">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Prazo: {formattedDate || 'Não definido'}</span>
        </div>

        {/* Indicador de Proximidade / Vencimento */}
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] border ${deadlineInfo.badgeClass}`}
        >
          {deadlineInfo.label}
        </span>
      </div>
    </div>
  );
};
