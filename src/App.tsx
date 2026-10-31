/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { GoalStats } from './components/GoalStats';
import { GoalFilterBar, FilterStatus, SortOption } from './components/GoalFilterBar';
import { GoalCard } from './components/GoalCard';
import { GoalFormModal } from './components/GoalFormModal';
import { GoalDeleteModal } from './components/GoalDeleteModal';
import { EmptyState } from './components/EmptyState';
import { Footer } from './components/Footer';
import { storageService } from './services/storageService';
import { GoalFormData, GoalStatus, GoalStatsSummary, StudyGoal } from './types/goal';
import { CheckCircle2, Plus } from 'lucide-react';

export default function App() {
  // Estado principal de objetivos
  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Estados de modais e interações
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<StudyGoal | null>(null);
  const [deletingGoal, setDeletingGoal] = useState<StudyGoal | null>(null);

  // Estados de filtros e busca
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('deadline_asc');

  // Feedback toast temporário
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3000);
  };

  // Carrega objetivos do LocalStorage ao montar
  useEffect(() => {
    const storedGoals = storageService.getGoals();
    setGoals(storedGoals);
    setIsLoaded(true);
  }, []);

  // Cálculo de estatísticas
  const stats: GoalStatsSummary = useMemo(() => {
    const total = goals.length;
    const naoIniciados = goals.filter((g) => g.status === 'nao_iniciado').length;
    const emAndamento = goals.filter((g) => g.status === 'em_andamento').length;
    const concluidos = goals.filter((g) => g.status === 'concluido').length;
    const percentualConcluido = total > 0 ? Math.round((concluidos / total) * 100) : 0;

    return {
      total,
      naoIniciados,
      emAndamento,
      concluidos,
      percentualConcluido,
    };
  }, [goals]);

  // Lista filtrada e ordenada
  const filteredGoals = useMemo(() => {
    let result = [...goals];

    // Filtro por status
    if (filterStatus !== 'todos') {
      result = result.filter((goal) => goal.status === filterStatus);
    }

    // Filtro por busca textual (título ou descrição)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (goal) =>
          goal.title.toLowerCase().includes(query) ||
          goal.description.toLowerCase().includes(query)
      );
    }

    // Ordenação
    result.sort((a, b) => {
      if (sortBy === 'deadline_asc') {
        return a.deadline.localeCompare(b.deadline);
      }
      if (sortBy === 'deadline_desc') {
        return b.deadline.localeCompare(a.deadline);
      }
      if (sortBy === 'created_desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });

    return result;
  }, [goals, filterStatus, searchQuery, sortBy]);

  // Ações de criação e edição
  const handleOpenCreateModal = () => {
    setEditingGoal(null);
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (goal: StudyGoal) => {
    setEditingGoal(goal);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData: GoalFormData) => {
    if (editingGoal) {
      // Edição
      const updated = storageService.updateGoal(editingGoal.id, formData);
      if (updated) {
        setGoals((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
        showToast('Objetivo atualizado com sucesso!');
      }
    } else {
      // Novo cadastro
      const created = storageService.addGoal(formData);
      setGoals((prev) => [created, ...prev]);
      showToast('Objetivo cadastrado com sucesso!');
    }
    setEditingGoal(null);
  };

  // Ações de status rápido
  const handleStatusChange = (id: string, newStatus: GoalStatus) => {
    const updated = storageService.toggleGoalStatus(id, newStatus);
    if (updated) {
      setGoals((prev) => prev.map((g) => (g.id === id ? updated : g)));
      showToast(
        newStatus === 'concluido'
          ? 'Parabéns! Objetivo marcado como concluído! 🎉'
          : 'Status do objetivo atualizado!'
      );
    }
  };

  // Exclusão
  const handleDeleteRequest = (goal: StudyGoal) => {
    setDeletingGoal(goal);
  };

  const handleConfirmDelete = () => {
    if (!deletingGoal) return;
    const success = storageService.deleteGoal(deletingGoal.id);
    if (success) {
      setGoals((prev) => prev.filter((g) => g.id !== deletingGoal.id));
      showToast('Objetivo excluído com sucesso.');
    }
    setDeletingGoal(null);
  };

  // Restauração de exemplos
  const handleRestoreSamples = () => {
    const sampleGoals = storageService.restoreSampleGoals();
    setGoals(sampleGoals);
    setFilterStatus('todos');
    setSearchQuery('');
    showToast('Exemplos práticos restaurados com sucesso!');
  };

  // Limpeza total
  const handleClearAll = () => {
    if (window.confirm('Tem certeza de que deseja apagar todos os objetivos cadastrados?')) {
      storageService.clearAllGoals();
      setGoals([]);
      showToast('Todos os objetivos foram removidos.');
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-sm">
        Carregando o StudyFlow...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Barra de Navegação Superior */}
      <Header onOpenCreateModal={handleOpenCreateModal} totalGoals={stats.total} />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Painel de Métricas e Progresso */}
        <GoalStats stats={stats} />

        {/* Barra de Controles: Filtros, Busca e Ordenação */}
        {stats.total > 0 && (
          <GoalFilterBar
            currentFilter={filterStatus}
            onFilterChange={setFilterStatus}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            stats={stats}
          />
        )}

        {/* Seção da Listagem de Objetivos */}
        <section aria-label="Lista de objetivos de estudo">
          {stats.total === 0 ? (
            <EmptyState
              type="no-goals"
              onOpenCreateModal={handleOpenCreateModal}
              onRestoreSamples={handleRestoreSamples}
            />
          ) : filteredGoals.length === 0 ? (
            <EmptyState
              type="no-filter-match"
              onOpenCreateModal={handleOpenCreateModal}
              onClearFilters={() => {
                setFilterStatus('todos');
                setSearchQuery('');
              }}
              filterLabel={searchQuery || filterStatus}
            />
          ) : (
            <div>
              {/* Cabeçalho da Lista com contador contextual */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="text-sm font-semibold text-slate-700">
                  {filteredGoals.length === 1
                    ? '1 objetivo exibido'
                    : `${filteredGoals.length} objetivos exibidos`}
                  {filterStatus !== 'todos' && ` (${filterStatus.replace('_', ' ')})`}
                </div>
                <button
                  onClick={handleOpenCreateModal}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 cursor-pointer sm:hidden"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Adicionar outro
                </button>
              </div>

              {/* Grade de Cartões */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteRequest}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Rodapé Acolhedor */}
      <Footer
        onRestoreSamples={handleRestoreSamples}
        onClearAll={handleClearAll}
        totalGoals={stats.total}
      />

      {/* Modal de Criação / Edição de Objetivo */}
      <GoalFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingGoal(null);
        }}
        onSubmit={handleFormSubmit}
        initialGoal={editingGoal}
      />

      {/* Modal de Confirmação de Exclusão */}
      <GoalDeleteModal
        isOpen={Boolean(deletingGoal)}
        onClose={() => setDeletingGoal(null)}
        onConfirm={handleConfirmDelete}
        goal={deletingGoal}
      />

      {/* Notificação Toast Flutuante */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs sm:text-sm font-medium shadow-lg shadow-slate-900/20 border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
