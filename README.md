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

O **Knight's Tour** é uma aplicação interativa baseada no problema matemático conhecido como *Passeio do Cavalo* (*Knight's Tour*), um desafio clássico de lógica e teoria dos grafos.

O objetivo é movimentar uma peça de cavalo por um tabuleiro de xadrez de 8 × 8 casas, respeitando as regras tradicionais do movimento e buscando visitar todas as 64 casas sem repetir nenhuma.

O projeto foi desenvolvido como parte da minha jornada de aprendizado em desenvolvimento de software, com foco na aplicação prática de **React, TypeScript, gerenciamento de estado e lógica de programação**.

Mais do que construir uma interface, a proposta é transformar um problema lógico em uma experiência visual, interativa e compreensível.

## 🎯 Objetivos

- Aplicar conceitos de desenvolvimento frontend em uma aplicação funcional.
- Implementar e validar regras de movimentação do cavalo.
- Trabalhar com estados, histórico de jogadas e atualização dinâmica da interface.
- Desenvolver mecanismos para identificar situações problemáticas durante a partida.
- Praticar organização de código, componentização visual e experiência do usuário.
- Construir um projeto demonstrável para portfólio profissional.

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| ♞ Tabuleiro interativo | Tabuleiro de xadrez com 64 casas. |
| ♟️ Movimentação válida | Permite movimentar o cavalo conforme as regras do xadrez. |
| 💡 Indicação de jogadas | Destaca as casas para as quais o cavalo pode se movimentar. |
| 📊 Acompanhamento da partida | Exibe informações sobre o progresso do desafio. |
| ↩️ Desfazer jogada | Permite voltar à posição anterior por meio do histórico. |
| 🔄 Reiniciar partida | Limpa o progresso para começar novamente. |
| 🚧 Detecção de becos sem saída | Identifica quando não existem movimentos válidos disponíveis. |
| 🔴 Identificação de casas isoladas | Destaca casas não visitadas que ficaram desconectadas da posição atual pela análise de conectividade. |
| 🏆 Conclusão do desafio | Reconhece quando todas as casas foram visitadas. |
| 📈 Contador de retrocessos | Registra quantas vezes o jogador utilizou a opção de desfazer. |
| 💬 Mensagens dinâmicas | Apresenta orientações e alertas conforme o estado da partida. |

## 🛠️ Tecnologias utilizadas

- **React** — construção da interface por meio de componentes.
- **TypeScript** — tipagem estática e maior previsibilidade no código.
- **Vite** — ambiente de desenvolvimento e ferramenta de build.
- **CSS3** — estilização do tabuleiro, dos controles e dos indicadores visuais.
- **Git e GitHub** — versionamento e publicação do código-fonte.

## 🧠 Conceitos aplicados

### Lógica de movimentação

O movimento do cavalo é representado por deslocamentos que combinam duas casas em uma direção e uma casa na direção perpendicular.

A aplicação valida cada movimento, impedindo que o jogador saia dos limites do tabuleiro ou escolha uma casa que não corresponda a um movimento válido.

### Gerenciamento de estado

O React controla informações como a posição atual do cavalo, o histórico de movimentos, as casas visitadas e os indicadores da partida.

### Análise de conectividade

O projeto utiliza uma busca em largura (*Breadth-First Search — BFS*) para identificar casas não visitadas que não podem mais ser alcançadas a partir da posição atual, considerando os caminhos disponíveis pelas casas não visitadas.

Essa análise auxilia o jogador a reconhecer possíveis problemas na rota. Ela não representa, por si só, um solucionador completo do problema do Passeio do Cavalo.

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

### 5. Gerar a versão de produção

```bash
npm run build
```

Esse comando gera a versão otimizada da aplicação para distribuição.

## 🎮 Como jogar

1. Escolha uma casa do tabuleiro para iniciar o desafio.
2. Observe as casas destacadas como movimentos válidos.
3. Selecione uma das casas permitidas para movimentar o cavalo.
4. Acompanhe as casas visitadas e os indicadores de progresso.
5. Utilize a opção de desfazer caso queira explorar outra rota.
6. Procure visitar todas as 64 casas sem repetir nenhuma.
7. Reinicie a partida para tentar uma nova sequência de movimentos.

**Dica:** planejar os próximos movimentos é importante. Uma jogada válida no momento pode limitar as possibilidades disponíveis mais adiante.

## 🗺️ Próximas melhorias

- [ ] Implementar um algoritmo capaz de encontrar uma solução completa para o Passeio do Cavalo.
- [ ] Adicionar um modo de resolução automática.
- [ ] Criar níveis de dificuldade e desafios personalizados.
- [ ] Desenvolver estatísticas de desempenho e histórico de partidas.
- [ ] Aprimorar a experiência em dispositivos móveis (responsividade).
- [ ] Ampliar os testes automatizados da lógica de movimentação.
- [ ] **Adicionar um botão de ajuda (`?`)** com as regras do jogo e uma legenda explicando as cores, os ícones e os indicadores da interface.
- [ ] **Realizar o deploy da aplicação na web**, disponibilizando uma versão pública e acessível pelo navegador.


## 📚 Aprendizados

O desenvolvimento deste projeto permite explorar a relação entre lógica de programação e experiência do usuário, trabalhando com regras, estados, validações e feedback visual em tempo real.

Também reforça a importância de antecipar consequências: no Passeio do Cavalo, uma movimentação pode ser válida individualmente e, ainda assim, comprometer a conclusão do desafio.

O projeto faz parte de uma iniciativa contínua de desenvolvimento de aplicações práticas para consolidar conhecimentos técnicos e construir um portfólio de software.

## 👨‍💻 Autor

**Ricardo Spicka**

Desenvolvedor em constante evolução, com interesse em lógica de programação, desenvolvimento de aplicações, resolução de problemas e construção de soluções tecnológicas.

<p align="center">
  <a href="https://github.com/RicardoSpicka">GitHub</a>
</p>

---

<p align="center">
  ♞ Desenvolvido com React, TypeScript e muita lógica.
</p>
