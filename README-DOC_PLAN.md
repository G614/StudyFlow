# DOCUMENTAÇÃO: GOOGLE IA STUDIO - PROJETO | STUDYFLOW

## AULA 01 - DA IDÉIA AO CÓDIGO: DESENVOLVA COM AGENTES DE IA

Como especialista em produtos digitais educacionais, apresento a estruturação do **StudyFlow (v1)** com foco em usabilidade pedagógica, baixa sobrecarga cognitiva e validação rápida de valor para quem está dando os primeiros passos na rotina de estudos.

**1. Problema que o aplicativo resolve**

Estudantes iniciantes frequentemente enfrentam paralisia por sobrecarga, desorganização e sensação de falta de progresso. Os principais problemas atacados nesta primeira versão são:

- **Falta de clareza nas metas:** Metas de estudo abstratas (ex.: "estudar matemática") geram procrastinação. O aplicativo estimula a transformação de intenções em metas acionáveis com título, detalhamento e prazo definido.

- **Sobrecarga de ferramentas complexas:** Ferramentas robustas de produtividade (como Notion, Trello ou Jira) possuem curvas de aprendizado íngremes e excesso de configurações que dispersam a atenção do estudante iniciante.
  
- **Perda de referência e ritmo:** Sem um registro centralizado e de fácil consulta, o estudante perde prazos, esquece em qual etapa parou e perde a motivação pela ausência de um ciclo de feedback visual de conclusão.

**2. Público principal**
   
- **Estudantes Iniciantes / Autodidatas:** Pessoas ingressando no ensino superior, cursos técnicos, certificações, vestibulares/concursos ou aprendendo programação/idiomas por conta própria.

- **Características comportamentais:**
     - Baixa maturidade na gestão de tempo e priorização.
     - Necessidade de reforço positivo visual para manter a constância.
     - Preferem interfaces limpas, diretas e acessíveis sem necessidade de tutoriais extensos.

**3. Requisitos funcionais**

**Código**	   **Requisito Funcional**	         **Descrição Detalhada**

**RF-01**	     **Cadastro de Objetivo**	         O sistema deve permitir que o estudante adicione um novo objetivo informando: **Título** (obrigatório, texto curto), **Descrição** (opcional, orientações ou links úteis), **Prazo** (obrigatório, seletor de data) e **Estado inicial** (padrão: "Não iniciado").

**RF-02**	     **Visualização e Listagem**	     O sistema deve exibir todos os objetivos em uma lista ou painel visual claro, apresentando título, resumo da descrição, data limite e uma indicação visual do status (ex.: Não iniciado, Em andamento, Concluído). Deve indicar visualmente se o prazo está vencido ou próximo.

**RF-03**	     **Edição de Objetivo**	           O estudante deve poder alterar qualquer campo de um objetivo existente (título, descrição, prazo ou status).

**RF-04**	     **Mudança Rápida de Status**	     O estudante deve conseguir alterar o status do objetivo de forma ágil (ex.: transição direta para "Concluído" ao finalizar uma sessão de estudo).

**RF-05	       **Exclusão de Objetivo**	         O sistema deve permitir remover um objetivo, solicitando uma confirmação prévia para evitar perdas acidentais.

**RF-06**	     **Persistência de Dados**	       Todos os registros criados, editados ou excluídos devem ser persistidos localmente (ex.: **armazenamento local**), garantindo que a recarga do navegador ou o fechamento da aba mantenha o estado exato dos dados.

**4. Critérios para testar a primeira versão (Critérios de Aceite)**

Para homologar a primeira versão e validar que o experimento entrega valor sem atritos, utilizaremos os seguintes cenários de teste:

**4.1. Fluxo de Criação (Happy Path & Validações)**

   - **Teste 1.1:** Tentar salvar um objetivo sem preencher o título ou o prazo.
  
         - Resultado esperado: O sistema bloqueia a submissão e sinaliza claramente os campos obrigatórios.
      
   - **Teste 1.2:** Preencher todos os campos válidos e submeter.
  
         - Resultado esperado: O objetivo aparece imediatamente na lista com os dados corretos e status inicial atribuído.
     
**4.2. Fluxo de Visualização e Prazos**
      
   - **Teste 2.1:** Cadastrar um objetivo com prazo para hoje, um para o futuro e outro com data retroativa.
    
         - Resultado esperado:A interface formata as datas amigavelmente (ex.: dd/mm/aaaa) e destaca visualmente os itens vencidos/em alerta sem poluição visual.
     
   - **Teste 2.2:** Testar o estado vazio (Estado vazio).
     
         - Resultado esperado: Quando não houver objetivos, o aplicativo exibe uma mensagem acolhedora com incentivo para cadastrar a primeira meta (evitando uma tela em branco fria).
     
**4.3. Fluxo de Edição e Atualização**

   - Teste 3.1: Editar o título e adiar o prazo de um objetivo.
     
         - Resultado esperado: As novas informações são refletidas na interface sem duplicar o cartão.
     
**Teste 3.2:** Marcar um objetivo como "Concluído".

         - Resultado esperado: O status visual muda com distinção clara (ex.: texto tachado suave ou badge verde de sucesso), proporcionando sensação de dever cumprido.
         
**4.4. Fluxo de Exclusão**

   - Teste 4.1: Clicar em excluir e cancelar a ação na confirmação.
     
         - Resultado esperado:O item permanece intacto na lista.
     
   - Teste 4.2: Clicar em excluir e confirmar.
     
         - Resultado esperado: O item desaparece instantaneamente da listagem.
     
**4.5. Teste de Persistência e Resiliência**

   - Teste 5.1: Cadastrar 3 objetivos, alterar o status de um deles para "Concluído", editar o prazo de outro e atualizar a página (F5 / Ctrl+R / fechar e reabrir).
     
         - Resultado esperado: Todos os dados e estados são restaurados exatamente como foram deixados.
