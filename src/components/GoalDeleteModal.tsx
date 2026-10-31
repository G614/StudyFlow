import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { StudyGoal } from '../types/goal';

interface GoalDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  goal: StudyGoal | null;
}

export const GoalDeleteModal: React.FC<GoalDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  goal,
}) => {
  if (!isOpen || !goal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md border border-slate-200">
          <div className="p-6">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 mx-auto sm:mx-0">
              <AlertTriangle className="w-6 h-6 stroke-[2]" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 text-center sm:text-left">
              Excluir este objetivo?
            </h3>
            <p className="mt-2 text-sm text-slate-600 text-center sm:text-left">
              Tem certeza de que deseja remover{' '}
              <strong className="text-slate-900 font-semibold">"{goal.title}"</strong>?
              Essa ação não poderá ser desfeita.
            </p>

            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-sm font-semibold shadow-sm shadow-rose-200 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Sim, excluir</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
