# DOCUMENTAÇÃO: GOOGLE AI STUDIO - PROJETO | STUDYFLOW

## AULA 01: DA IDÉIA AO CÓDIGO: DESENVOLVA COM AGENTES DE AI

A aplicação **StudyFlow** foi criada com foco em usabilidade acolhedora, organização visual e suporte a estudantes iniciantes.

**O que foi implementado:**

  - Gerenciamento Completo de Objetivos (CRUD):
    
    - **Cadastro e Edição:** Formulário intuitivo com validações em tempo real para título, descrição, prazo (com seletor de data) e seleção de status (Não iniciado,Em andamento ou Concluído).
      
    - **Listagem em Cartões:** Apresentação clara de cada objetivo com distinção visual de status, prazo formatado em português (ex:"30 de 2026") e alertas de proximidade (Vence hoje,Faltam X dias,Atrasado).
      
    - **Avanço Rápido de Status:** Clique direto no selo do cartão para avançar o objetivo (Não iniciado➔Em andamento➔Concluído).
      
    - **Exclusão Segura:** Modal de confirmação para prevenir exclusões acidentais.
      
  - **Métricas e Progresso do Estudante:**
    
    - Painel de estatísticas com contagem total de objetivos cadastrados, divididos por status (Não iniciados,Em andamento,Concluídos).
      
    - Barra de progresso interativa com porcentagem de conclusão e mensagens motivacionais para incentivar a constância nos estudos.
      
  - **Filtros, Busca e Ordenação:**
    
    - Abas para filtrar por status com contadores numéricos individuais.
      
    - Campo de busca em tempo real por título ou anotações.
      
    - Ordenação por prazo mais próximo, prazo mais distante ou metas mais recentes.
      
  - **Persistência no LocalStorage:**
    
    - Serviço dedicado (src/services/storageService.ts) que preserva todas as alterações mesmo após recarregar ou fechar o navegador.
     
    - Suporte a restauração de exemplos práticos acolhedores para quem está começando.
      
  - **Estrutura Técnica e Arquitetura:**
    
    - **TypeScript:** Tipagem estrita em **src/types/goal.ts**.
      
    - **Componentização modular:** ```bash Cabeçalho, Estatísticas de gols, Barra de filtro de objetivo, Cartão de Objetivo, FormulárioModal de Meta, Modal de exclusão de meta, Estado vazio e Rodapé.```
      
    - **Design responsivo:** Adaptado para celulares, tablets e computadores com Tailwind CSS e tipografia legível.
     
    - **Backend zero:** Operação 100% no cliente nesta v1.
