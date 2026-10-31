/**
 * Serviço de armazenamento local (LocalStorage) para o StudyFlow.
 * Responsável pela persistência e manipulação dos dados dos objetivos de estudo.
 */

import { GoalFormData, StudyGoal } from '../types/goal';

const STORAGE_KEY = 'studyflow_goals_data_v1';

/**
 * Retorna uma data no formato YYYY-MM-DD adicionando N dias à data atual.
 */
function getRelativeDateString(daysOffset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0];
}

/**
 * Exemplos iniciais acolhedores projetados para orientar estudantes iniciantes.
 */
export const SAMPLE_GOALS: StudyGoal[] = [
  {
    id: 'sample-1',
    title: 'Compreender a Lógica de Programação Básica',
    description: 'Estudar conceitos de variáveis, estruturas condicionais (if/else) e laços de repetição (for/while). Praticar com 5 exercícios simples.',
    deadline: getRelativeDateString(4),
    status: 'em_andamento',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'sample-2',
    title: 'Leitura do Capítulo 1: Fundamentos do Estudo Ativo',
    description: 'Ler o material introdutório, grifar palavras-chave e criar um mapa mental resumindo os tópicos principais.',
    deadline: getRelativeDateString(1),
    status: 'concluido',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'sample-3',
    title: 'Configurar o Ambiente de Prática e Criar Primeiro Projeto',
    description: 'Instalar as ferramentas recomendadas no curso, organizar pastas no computador e fazer o primeiro teste prático de execução.',
    deadline: getRelativeDateString(8),
    status: 'nao_iniciado',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

class StorageService {
  /**
   * Obtém todos os objetivos salvos no LocalStorage.
   * Se for o primeiro acesso (sem chave cadastrada), carrega os exemplos iniciais.
   */
  public getGoals(): StudyGoal[] {
    try {
      const rawData = localStorage.getItem(STORAGE_KEY);
      if (!rawData) {
        // Primeiro acesso: inicializa com os exemplos acolhedores
        this.saveGoals(SAMPLE_GOALS);
        return SAMPLE_GOALS;
      }
      const parsed = JSON.parse(rawData);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch (error) {
      console.error('Erro ao ler objetivos do LocalStorage:', error);
      return [];
    }
  }

  /**
   * Salva a lista completa de objetivos no LocalStorage.
   */
  public saveGoals(goals: StudyGoal[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    } catch (error) {
      console.error('Erro ao salvar objetivos no LocalStorage:', error);
    }
  }

  /**
   * Cadastra um novo objetivo de estudo e persiste no LocalStorage.
   */
  public addGoal(formData: GoalFormData): StudyGoal {
    const goals = this.getGoals();
    const newGoal: StudyGoal = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `goal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: formData.title.trim(),
      description: formData.description.trim(),
      deadline: formData.deadline,
      status: formData.status,
      createdAt: new Date().toISOString(),
    };

    const updatedGoals = [newGoal, ...goals];
    this.saveGoals(updatedGoals);
    return newGoal;
  }

  /**
   * Atualiza um objetivo existente.
   */
  public updateGoal(id: string, formData: Partial<GoalFormData>): StudyGoal | null {
    const goals = this.getGoals();
    const index = goals.findIndex((g) => g.id === id);
    if (index === -1) return null;

    const existingGoal = goals[index];
    const updatedGoal: StudyGoal = {
      ...existingGoal,
      title: formData.title !== undefined ? formData.title.trim() : existingGoal.title,
      description: formData.description !== undefined ? formData.description.trim() : existingGoal.description,
      deadline: formData.deadline !== undefined ? formData.deadline : existingGoal.deadline,
      status: formData.status !== undefined ? formData.status : existingGoal.status,
      updatedAt: new Date().toISOString(),
    };

    goals[index] = updatedGoal;
    this.saveGoals(goals);
    return updatedGoal;
  }

  /**
   * Altera rapidamente o status de um objetivo.
   */
  public toggleGoalStatus(id: string, nextStatus: StudyGoal['status']): StudyGoal | null {
    return this.updateGoal(id, { status: nextStatus });
  }

  /**
   * Exclui um objetivo pelo seu ID.
   */
  public deleteGoal(id: string): boolean {
    const goals = this.getGoals();
    const initialLength = goals.length;
    const filtered = goals.filter((g) => g.id !== id);
    if (filtered.length !== initialLength) {
      this.saveGoals(filtered);
      return true;
    }
    return false;
  }

  /**
   * Restaura os dados de exemplo recomendados para iniciantes.
   */
  public restoreSampleGoals(): StudyGoal[] {
    this.saveGoals(SAMPLE_GOALS);
    return SAMPLE_GOALS;
  }

  /**
   * Remove todos os objetivos cadastrados (para reset do usuário se desejar).
   */
  public clearAllGoals(): void {
    this.saveGoals([]);
  }
}

export const storageService = new StorageService();
