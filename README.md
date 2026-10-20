# ♞ Knight's Tour — Desafio do Cavalo

<p align="center">
  Um desafio de lógica, estratégia e programação inspirado no movimento do cavalo no xadrez.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</p>

<p align="center">
  <a href="https://github.com/RicardoSpicka/knight-tour">Repositório</a>
  ·
  <a href="https://github.com/RicardoSpicka/knight-tour/issues">Reportar problema</a>
</p>

---

## 📌 Sobre o projeto

O **Knight's Tour** é uma aplicação interativa baseada no problema matemático conhecido como *Passeio do Cavalo* (*Knight's Tour*), um desafio clássico relacionado à teoria dos grafos e à busca por caminhos.

O objetivo é movimentar um cavalo por um tabuleiro, visitando todas as casas sem repetir nenhuma, respeitando as regras tradicionais de movimentação do xadrez.

A aplicação permite explorar diferentes tamanhos de tabuleiro, acompanhar o progresso das jogadas e utilizar um solucionador automático para encontrar um percurso válido.

O projeto foi desenvolvido como parte da minha jornada de aprendizado em desenvolvimento de software, com foco na aplicação prática de **React, TypeScript, algoritmos, gerenciamento de estado e experiência do usuário**.

Mais do que construir uma interface, a proposta é transformar um problema lógico em uma experiência visual, interativa e compreensível.

## 🎯 Objetivos

- Aplicar conceitos de desenvolvimento frontend em uma aplicação funcional.
- Implementar e validar as regras de movimentação do cavalo.
- Trabalhar com gerenciamento de estado e histórico de jogadas.
- Desenvolver mecanismos de análise de conectividade do tabuleiro.
- Implementar um algoritmo de busca para resolver o Passeio do Cavalo.
- Aplicar técnicas de otimização de busca para melhorar a exploração dos movimentos.
- Praticar organização de código, validação de dados e experiência do usuário.
- Construir um projeto demonstrável para portfólio profissional.

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| ♞ Tabuleiro interativo | Permite jogar em tabuleiros de 5×5, 6×6, 7×7 e 8×8. |
| ♟️ Movimentação válida | Valida os movimentos do cavalo conforme as regras do xadrez. |
| 💡 Sugestões de movimentos | Destaca as casas disponíveis para a próxima jogada. |
| ↩️ Desfazer jogada | Permite retornar a uma posição anterior utilizando o histórico. |
| 🔄 Reiniciar partida | Reinicia o desafio para explorar uma nova sequência de movimentos. |
| 🚧 Detecção de becos sem saída | Identifica situações em que não há movimentos válidos disponíveis. |
| 🔴 Análise de casas isoladas | Identifica casas não visitadas que ficaram desconectadas das possibilidades de continuação da rota. |
| 🤖 Solucionador automático | Busca um percurso que visite todas as casas sem repetições. |
| ⏸️ Controle da resolução | Permite pausar e retomar a execução automática. |
| ⚡ Controle de velocidade | Permite ajustar a velocidade da animação da solução. |
| ❌ Cancelamento da resolução | Permite interromper a execução automática. |
| 📊 Acompanhamento do progresso | Apresenta informações sobre o andamento do desafio. |
| 🏆 Conclusão do desafio | Reconhece quando todas as casas foram visitadas. |
| 💬 Mensagens dinâmicas | Apresenta orientações e alertas conforme o estado da partida. |
| 📖 Como jogar | Disponibiliza um modal com as regras e orientações para utilizar a aplicação. |

## 🛠️ Tecnologias utilizadas

- **React** — construção da interface por meio de componentes.
- **TypeScript** — tipagem estática e maior previsibilidade no código.
- **Vite** — ambiente de desenvolvimento e ferramenta de build.
- **CSS3** — estilização do tabuleiro, dos controles e dos indicadores visuais.
- **Git e GitHub** — versionamento e hospedagem do código-fonte.

## 🧠 Conceitos e algoritmos aplicados

### 1. Lógica de movimentação

O movimento do cavalo é representado por deslocamentos que combinam duas casas em uma direção e uma casa na direção perpendicular.

A aplicação valida os movimentos, impedindo deslocamentos para fora dos limites do tabuleiro ou para casas que não correspondam a um movimento válido.

### 2. Gerenciamento de estado

O React controla informações como:

- Posição atual do cavalo.
- Casas visitadas e histórico de movimentos.
- Sugestões de jogadas.
- Progresso da partida.
- Estado da resolução automática, incluindo pausa e cancelamento.

Essa estrutura mantém a interface sincronizada com as ações do jogador e com a execução do solucionador.

### 3. Busca com backtracking

O solucionador utiliza **backtracking** para explorar sequências de movimentos possíveis.

Quando um caminho não permite completar o desafio, o algoritmo retorna a uma posição anterior e tenta uma alternativa. Essa abordagem permite explorar diferentes possibilidades até encontrar uma solução ou concluir que não foi possível encontrar uma dentro da busca realizada.

### 4. Heurística de Warnsdorff

Para orientar a escolha dos próximos movimentos, o algoritmo utiliza a **heurística de Warnsdorff**, que prioriza casas com menor quantidade de movimentos futuros disponíveis.

Essa estratégia ajuda a explorar primeiro caminhos que tendem a deixar menos opções restritas para o final do percurso, reduzindo a necessidade de retrocessos em muitos casos.

### 5. Análise de conectividade com BFS

A aplicação também utiliza uma busca em largura (*Breadth-First Search — BFS*) para analisar a conectividade entre as casas não visitadas.

Essa análise ajuda a identificar regiões que ficaram inacessíveis a partir da posição atual, oferecendo ao jogador informações úteis sobre possíveis problemas na rota.

A análise de conectividade auxilia a avaliação da partida, mas não substitui o solucionador completo.

## 🚀 Como executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado.
- npm, normalmente incluído na instalação do Node.js.
- Git, caso queira clonar o repositório.

### 1. Clonar o repositório

```bash
git clone https://github.com/RicardoSpicka/knight-tour.git
```

### 2. Acessar a pasta

```bash
cd knight-tour
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Iniciar o ambiente de desenvolvimento

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para abrir a aplicação no navegador, normalmente:

```text
http://localhost:5173
```

### 5. Verificar os tipos TypeScript

```bash
npx tsc --noEmit
```

### 6. Gerar a versão de produção

```bash
npm run build
```

Esse comando gera a versão otimizada da aplicação para distribuição no diretório `dist`.

## 🎮 Como jogar

1. Escolha o tamanho do tabuleiro.
2. Selecione uma casa para iniciar o desafio.
3. Observe as casas destacadas como movimentos válidos.
4. Escolha uma casa permitida para movimentar o cavalo.
5. Acompanhe o progresso e evite repetir casas.
6. Utilize as sugestões de movimentos para auxiliar suas decisões.
7. Se necessário, desfaça uma jogada e explore outra rota.
8. Experimente o solucionador automático e ajuste sua velocidade.
9. Procure visitar todas as casas do tabuleiro sem repetir nenhuma.

Para conhecer os controles e as regras, utilize o botão **Como jogar** disponível na interface.

## 🗺️ Próximas melhorias

- [ ] Publicar uma versão online para acesso direto pelo navegador.
- [ ] Ampliar os testes automatizados das regras de movimentação e do solucionador.
- [ ] Aprimorar a experiência em dispositivos móveis e diferentes resoluções.
- [ ] Adicionar estatísticas de desempenho e histórico de partidas.
- [ ] Explorar novos desafios e variações do problema do Passeio do Cavalo.

## 📚 Aprendizados

O desenvolvimento deste projeto explora a relação entre algoritmos e experiência do usuário, trabalhando com regras, validações, estados e feedback visual em tempo real.

A implementação do solucionador permite aplicar conceitos de **backtracking, heurísticas de busca e teoria dos grafos** em um problema prático, enquanto a interface demonstra como apresentar esses conceitos de forma interativa.

O projeto também reforça a importância de considerar as consequências de cada decisão: no Passeio do Cavalo, uma jogada pode ser válida individualmente e, ainda assim, comprometer a conclusão do percurso.

O Knight's Tour faz parte de uma iniciativa contínua de desenvolvimento de aplicações práticas para consolidar conhecimentos técnicos e construir um portfólio de software.

## 👨‍💻 Autor

**Ricardo Spicka**

Desenvolvedor em constante evolução, com interesse em lógica de programação, desenvolvimento de aplicações, algoritmos e construção de soluções tecnológicas.

<p align="center">
  <a href="https://github.com/RicardoSpicka">GitHub</a>
</p>

---

<p align="center">
  ♞ Desenvolvido com React, TypeScript e muita lógica.
</p>
