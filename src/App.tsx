
import { useState } from 'react'
import './App.css'

// Representa uma posição no tabuleiro usando linha e coluna.
// Os índices começam em zero: a primeira casa é (0, 0).
type Position = {
  row: number
  col: number
}

// Define o tamanho do tabuleiro clássico: 8 linhas e 8 colunas.
const SIZE = 8

// Lista os oito deslocamentos possíveis do cavalo.
// O movimento sempre percorre duas casas em uma direção
// e uma casa na direção perpendicular, formando um "L".
const MOVES: Position[] = [
  { row: -2, col: -1 },
  { row: -2, col: 1 },
  { row: -1, col: -2 },
  { row: -1, col: 2 },
  { row: 1, col: -2 },
  { row: 1, col: 2 },
  { row: 2, col: -1 },
  { row: 2, col: 1 },
]

// Converte uma posição em uma chave textual única.
// Isso facilita comparar posições e verificar casas visitadas.
function key(position: Position): string {
  return `${position.row}-${position.col}`
}

// Verifica se a posição está dentro dos limites do tabuleiro.
// Impede que o cavalo se mova para fora das 64 casas.
function isInside(position: Position): boolean {
  return (
    position.row >= 0 &&
    position.row < SIZE &&
    position.col >= 0 &&
    position.col < SIZE
  )
}

// Calcula os movimentos permitidos a partir da posição atual.
// Uma casa só é válida se estiver dentro do tabuleiro
// e ainda não tiver sido visitada durante a partida.
function getValidMoves(
  position: Position,
  visited: Position[],
): Position[] {
  return MOVES
    .map((move) => ({
      row: position.row + move.row,
      col: position.col + move.col,
    }))
    .filter(
      (next) =>
        isInside(next) &&
        !visited.some((square) => key(square) === key(next)),
    )
}


function getUnreachableSquares(
  current: Position | undefined,
  visited: Position[],
): Set<string> {
  if (!current) return new Set()

  const visitedKeys = new Set(visited.map(key))
  const reachable = new Set<string>([key(current)])
  const queue: Position[] = [current]

  while (queue.length > 0) {
    const position = queue.shift()!

    for (const move of MOVES) {
      const next = {
        row: position.row + move.row,
        col: position.col + move.col,
      }

      if (!isInside(next)) continue

      const nextKey = key(next)

      if (visitedKeys.has(nextKey)) continue
      if (reachable.has(nextKey)) continue

      reachable.add(nextKey)
      queue.push(next)
    }
  }

  const unreachable = new Set<string>()

  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const squareKey = key({ row, col })

      if (
        !visitedKeys.has(squareKey) &&
        !reachable.has(squareKey)
      ) {
        unreachable.add(squareKey)
      }
    }
  }

  return unreachable
}

function App() {
  // Guarda a sequência completa de posições percorridas.
  // A última posição do histórico representa o local atual do cavalo.
  const [history, setHistory] = useState<Position[]>([])
  const [retrocessos, setRetrocessos] = useState(0)

  // Controla a exibição das sugestões de movimentos válidos.
  const [showHints, setShowHints] = useState(true)

  // Recupera a posição atual do cavalo.
  // Antes da primeira jogada, ela ainda não existe.
  const current = history[history.length - 1]

  // O histórico também funciona como registro das casas visitadas.
  const visited = history

  // Calcula os próximos movimentos possíveis.
  const validMoves = current
    ? getValidMoves(current, visited)
    : []

  // Sets tornam rápidas as verificações de casas visitadas e válidas.
  const visitedKeys = new Set(visited.map(key))
  const validKeys = new Set(validMoves.map(key))

  const unreachableKeys = getUnreachableSquares(
    current,
    visited,
  )

  // Conta as casas que não podem mais ser alcançadas.
  const casasNaoAlcancadas = unreachableKeys.size

  // A partida termina quando todas as 64 casas são visitadas.
  const completed = history.length === SIZE * SIZE

  // Um beco sem saída ocorre quando ainda faltam casas,
  // mas nenhum movimento válido pode ser realizado.
  const stuck =
    Boolean(current) &&
    validMoves.length === 0 &&
    !completed

  // Processa o clique em uma casa do tabuleiro.
  function handleSquareClick(position: Position) {
    // Não permite jogadas depois da conclusão da partida.
    if (completed) return

    // Na primeira jogada, o jogador escolhe a posição inicial.
    if (!current) {
      setHistory([position])
      return
    }

    // Só aceita uma casa que esteja entre os movimentos válidos.
    // O histórico anterior é preservado para permitir desfazer.
    if (validKeys.has(key(position))) {
      setHistory((previous) => [...previous, position])
    }
  }

  // Reinicia a partida, removendo todas as posições registradas.
  function restart() {
    setHistory([])
    setRetrocessos(0)
  }

  // Remove a última posição do histórico.
  // Assim, o cavalo retorna à casa da jogada anterior.
  function undo() {
    if (history.length === 0) return

    setHistory((previous) => previous.slice(0, -1))
    setRetrocessos((previous) => previous + 1)
  }

  return (
    <main className="app">
      {/* Cabeçalho e identificação do jogo. */}
      <header className="topbar">
        <div className="brand">
          <span className="brand-icon">♞</span>
          <span>KNIGHT'S TOUR</span>
        </div>

        <span className="version">PUZZLE · 01</span>
      </header>

      {/* Apresentação das regras e do objetivo. */}
      <section className="hero">
        <p className="eyebrow">DESAFIO DE LÓGICA</p>

        <h1>
          Uma jogada de cada vez.
        </h1>

        <p className="subtitle">
          Visite todas as 64 casas do tabuleiro usando apenas
          os movimentos do cavalo. Sem repetir nenhuma casa.
        </p>
      </section>

      <section className="game-layout">
        <div className="board-panel">
          <div className="board-heading">
            <div>
              <span className="panel-label">TABULEIRO</span>
              <h2>Clássico 8 × 8</h2>
            </div>

            {/* Exibe quantas casas foram visitadas. */}
            <span className="move-count">
              {String(history.length).padStart(2, '0')} / 64
            </span>
          </div>

          {/* Gera dinamicamente as 64 casas do tabuleiro. */}
          <div
            className="board"
            role="group"
            aria-label="Tabuleiro do cavalo"
          >
            {Array.from({ length: SIZE }, (_, row) =>
              Array.from({ length: SIZE }, (_, col) => {
                const position = { row, col }
                const squareKey = key(position)

                // Identifica a posição da casa no histórico.
                // O índice + 1 será o número da jogada na interface.
                const visitIndex = history.findIndex(
                  (square) => key(square) === squareKey,
                )

                const isVisited = visitedKeys.has(squareKey)

                // Verifica se esta casa contém o cavalo atualmente.
                const isCurrent =
                  current && key(current) === squareKey

                // Identifica os destinos permitidos para o próximo movimento.
                const isValid = validKeys.has(squareKey)
                const isUnreachable = unreachableKeys.has(squareKey)

                // Alterna as cores para formar o padrão de xadrez.
                const dark = (row + col) % 2 === 1

                return (
                  <button
                    key={squareKey}
                      className={[
                        'square',
                        dark ? 'dark' : 'light',
                        isVisited ? 'visited' : '',
                        isCurrent ? 'current' : '',
                        isUnreachable ? 'unreachable' : '',
                        isValid && showHints ? 'hint' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    onClick={() => handleSquareClick(position)}
                    disabled={
                      completed ||
                      (Boolean(current) &&
                        !isValid &&
                        !isCurrent)
                    }
                    aria-label={`Linha ${row + 1}, coluna ${col + 1}${
                      isVisited
                        ? `, jogada ${visitIndex + 1}`
                        : ''
                    }`}
                  >
                    {/* Mostra a peça na posição atual. */}
                    {isCurrent ? (
                      <span className="knight">♞</span>
                    ) : isVisited ? (
                      // Numera as casas conforme a ordem da visita.
                      <span className="visit-number">
                        {visitIndex + 1}
                      </span>
                    ) : isValid && showHints ? (
                      // Um ponto indica um movimento permitido.
                      <span className="hint-dot" />
                    ) : null}
                  </button>
                )
              }),
            )}
          </div>

          <div className="board-coordinates">
            <span>8 × 8</span>
            <span>64 CASAS</span>
          </div>
        </div>

        {/* Painel lateral com progresso, controles e mensagens. */}
        <aside className="sidebar">
          <div className="status-card">
            <span className="panel-label">SUA JORNADA</span>

            {/* Calcula a porcentagem de casas visitadas. */}
            <div className="progress-number">
              {Math.round((history.length / 64) * 100)}
              <small>%</small>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${(history.length / 64) * 100}%`,
                }}
              />
            </div>

            <div className="progress-caption">
              <span>Casas visitadas</span>
              <strong>{history.length} de 64</strong>
            </div>

            <div className="stat-divider" />

            <div className="stat-row">
              <span>Casas restantes</span>
              <strong>{64 - history.length}</strong>
            </div>

            {/* A primeira posição define o início, não um movimento. */}
            <div className="stat-row">
              <span>Jogadas realizadas</span>
              <strong>{Math.max(0, history.length - 1)}</strong>
            </div>

            <div className="stat-row">
              <span>Retrocessos</span>
              <strong>{retrocessos}</strong>
            </div>
          </div>

          <div className="action-card">
            <span className="panel-label">CONTROLES</span>

            {/* Permite ligar ou desligar as dicas visuais. */}
            <button
              className={`toggle-button ${
                showHints ? 'active' : ''
              }`}
              onClick={() =>
                setShowHints((value) => !value)
              }
            >
              <span>{showHints ? '◉' : '○'}</span>
              Mostrar dicas
              <span className="toggle-state">
                {showHints ? 'ON' : 'OFF'}
              </span>
            </button>

            <button
              className="primary-button"
              onClick={restart}
            >
              ↻ &nbsp; Novo jogo
            </button>

            {/* Desabilita o botão quando não há jogada para desfazer. */}
            <button
              className="secondary-button"
              onClick={undo}
              disabled={history.length === 0}
            >
              ↶ &nbsp; Desfazer jogada
            </button>
          </div>

          {/* A mensagem varia conforme o estado da partida. */}   
          <div
            className={`message-card ${
              completed
                ? 'success'
                : stuck || casasNaoAlcancadas > 0
                  ? 'warning'
                  : ''
            }`}
          >
            <span className="message-icon">
              {completed
                ? '★'
                : stuck || casasNaoAlcancadas > 0
                  ? '!'
                  : '✦'}
            </span>
              
            <div>
              <strong>
                {completed
                  ? 'Desafio concluído!'
                  : stuck
                    ? 'Sem movimentos possíveis'
                    : casasNaoAlcancadas > 0
                      ? 'Casas não alcançadas'
                      : !current
                        ? 'Comece sua jornada'
                        : 'Continue explorando'}
              </strong>
                
              <p>
                {completed
                  ? 'Incrível! Você visitou todas as casas.'
                  : stuck
                    ? 'Você chegou a um beco sem saída. Tente outra rota.'
                    : casasNaoAlcancadas > 0
                      ? `${casasNaoAlcancadas} ${
                          casasNaoAlcancadas === 1
                            ? 'casa não pode mais'
                            : 'casas não podem mais'
                        } ser alcançada${casasNaoAlcancadas === 1 ? '' : 's'}. As casas estão marcadas em vermelho.`
                      : !current
                        ? 'Escolha uma casa para posicionar o cavalo.'
                        : 'Escolha uma das casas destacadas para avançar.'}
              </p>
            </div>
          </div>       
        </aside>
      </section>

      <footer className="footer">
        <span>KNIGHT'S TOUR © 2026</span>
        <span>UM DESAFIO DE PACIÊNCIA E ESTRATÉGIA</span>
      </footer>
    </main>
  )
}

export default App
