/**
 * Tipos de dados para o gerenciamento de objetivos de estudo no StudyFlow.
 */

export type GoalStatus = 'nao_iniciado' | 'em_andamento' | 'concluido';

export interface StudyGoal {
  id: string;
  title: string;
  description: string;
  deadline: string; // Formato YYYY-MM-DD
  status: GoalStatus;
  createdAt: string; // ISO String
  updatedAt?: string; // ISO String
}

export type GoalFormData = {
  title: string;
  description: string;
  deadline: string;
  status: GoalStatus;
};

export interface GoalStatsSummary {
  total: number;
  naoIniciados: number;
  emAndamento: number;
  concluidos: number;
  percentualConcluido: number;
}

export const STATUS_DETAILS: Record<
  GoalStatus,
  {
    label: string;
    description: string;
    colorBadge: string;
    bgHover: string;
    borderColor: string;
    accentColor: string;
  }
> = {
  nao_iniciado: {
    label: 'Não iniciado',
    description: 'Planejado para começar',
    colorBadge: 'bg-slate-100 text-slate-700 border-slate-200',
    bgHover: 'hover:bg-slate-50',
    borderColor: 'border-slate-200',
    accentColor: 'text-slate-500',
  },
  em_andamento: {
    label: 'Em andamento',
    description: 'Estudo em progresso ativo',
    colorBadge: 'bg-amber-50 text-amber-700 border-amber-200',
    bgHover: 'hover:bg-amber-50/40',
    borderColor: 'border-amber-200',
    accentColor: 'text-amber-600',
  },
  concluido: {
    label: 'Concluído',
    description: 'Objetivo alcançado!',
    colorBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    bgHover: 'hover:bg-emerald-50/40',
    borderColor: 'border-emerald-200',
    accentColor: 'text-emerald-600',
  },
};
