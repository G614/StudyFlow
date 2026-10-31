import React, { useState, useEffect } from 'react';
import { X, Calendar, Flag, Sparkles, Check, AlertCircle } from 'lucide-react';
import { GoalFormData, GoalStatus, StudyGoal } from '../types/goal';

interface GoalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GoalFormData) => void;
  initialGoal?: StudyGoal | null;
}

export const GoalFormModal: React.FC<GoalFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialGoal,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<GoalStatus>('nao_iniciado');
  const [errors, setErrors] = useState<{ title?: string; deadline?: string }>({});

  const isEditing = Boolean(initialGoal);

  // Preenche dados quando abre para edição ou reseta para criação
  useEffect(() => {
    if (initialGoal) {
      setTitle(initialGoal.title);
      setDescription(initialGoal.description);
      setDeadline(initialGoal.deadline);
      setStatus(initialGoal.status);
    } else {
      // Padrão de prazo para 7 dias no futuro para facilitar
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 7);
      const formattedDefault = defaultDate.toISOString().split('T')[0];

      setTitle('');
      setDescription('');
      setDeadline(formattedDefault);
      setStatus('nao_iniciado');
    }
    setErrors({});
  }, [initialGoal, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: { title?: string; deadline?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Por favor, insira o título do seu objetivo de estudo.';
    } else if (title.trim().length < 3) {
      newErrors.title = 'O título deve ter no mínimo 3 caracteres.';
    }

    if (!deadline) {
      newErrors.deadline = 'Por favor, selecione uma data limite.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      deadline,
      status,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-slate-200">
          {/* Cabeçalho do Modal */}
          <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isEditing ? 'Editar Objetivo de Estudo' : 'Novo Objetivo de Estudo'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isEditing
                    ? 'Ajuste os detalhes ou o prazo da sua meta'
                    : 'Defina o que você vai aprender e mantenha o foco'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
              title="Fechar formulário"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Campo Título */}
            <div>
              <label htmlFor="goal-title" className="block text-sm font-semibold text-slate-800 mb-1">
                Título do Objetivo <span className="text-rose-500">*</span>
              </label>
              <input
                id="goal-title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
                }}
                placeholder="Ex: Praticar funções e loops em JavaScript"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                  errors.title
                    ? 'border-rose-300 bg-rose-50/20 focus:border-rose-500'
                    : 'border-slate-300 focus:border-indigo-600'
                }`}
                autoFocus
              />
              {errors.title && (
                <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Campo Descrição */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="goal-desc" className="block text-sm font-semibold text-slate-800">
                  Descrição e Anotações
                </label>
                <span className="text-[11px] text-slate-400">Opcional</span>
              </div>
              <textarea
                id="goal-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva detalhes, tópicos ou materiais que você vai utilizar (ex: assistir aula 4 e fazer os exercícios propostos)."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all resize-none"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Dica: objetivos com tarefas específicas são mais fáceis de concluir.
              </p>
            </div>

            {/* Campo Prazo */}
            <div>
              <label htmlFor="goal-deadline" className="block text-sm font-semibold text-slate-800 mb-1">
                Prazo Limite <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="goal-deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => {
                    setDeadline(e.target.value);
                    if (errors.deadline) setErrors((prev) => ({ ...prev, deadline: undefined }));
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                    errors.deadline
                      ? 'border-rose-300 bg-rose-50/20 focus:border-rose-500'
                      : 'border-slate-300 focus:border-indigo-600'
                  }`}
                />
              </div>
              {errors.deadline && (
                <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.deadline}
                </p>
              )}
            </div>

            {/* Campo Status */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Status Atual
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus('nao_iniciado')}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    status === 'nao_iniciado'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
                  Não iniciado
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('em_andamento')}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    status === 'em_andamento'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                      : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                  Em andamento
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('concluido')}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    status === 'concluido'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  Concluído
                </button>
              </div>
            </div>

            {/* Rodapé / Botões de Ação */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold shadow-sm shadow-indigo-200 transition-colors cursor-pointer"
              >
                {isEditing ? 'Salvar Alterações' : 'Cadastrar Objetivo'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
