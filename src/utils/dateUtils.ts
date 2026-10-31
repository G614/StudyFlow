/**
 * Utilitários para formatação e cálculo amigável de prazos em português.
 */

import { GoalStatus } from '../types/goal';

export function formatDateBR(dateString: string): string {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-').map(Number);
  if (!year || !month || !day) return dateString;

  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export interface DeadlineIndicator {
  label: string;
  isOverdue: boolean;
  isToday: boolean;
  badgeClass: string;
  iconName?: 'alert' | 'calendar' | 'check';
}

export function getDeadlineInfo(deadlineString: string, status: GoalStatus): DeadlineIndicator {
  if (status === 'concluido') {
    return {
      label: 'Concluído a tempo',
      isOverdue: false,
      isToday: false,
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
  }

  if (!deadlineString) {
    return {
      label: 'Sem prazo',
      isOverdue: false,
      isToday: false,
      badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
    };
  }

  const [year, month, day] = deadlineString.split('-').map(Number);
  const targetDate = new Date(year, month - 1, day);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    const overdueDays = Math.abs(diffDays);
    return {
      label: overdueDays === 1 ? 'Venceu ontem' : `Atrasado há ${overdueDays} dias`,
      isOverdue: true,
      isToday: false,
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200 font-medium',
    };
  }

  if (diffDays === 0) {
    return {
      label: 'Vence hoje!',
      isOverdue: false,
      isToday: true,
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300 font-medium animate-pulse',
    };
  }

  if (diffDays === 1) {
    return {
      label: 'Vence amanhã',
      isOverdue: false,
      isToday: false,
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    };
  }

  if (diffDays <= 5) {
    return {
      label: `Faltam ${diffDays} dias`,
      isOverdue: false,
      isToday: false,
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    };
  }

  return {
    label: `Faltam ${diffDays} dias`,
    isOverdue: false,
    isToday: false,
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
  };
}
