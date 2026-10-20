
import { useEffect, useState } from 'react'
import { solveKnightTour } from './solver'
import type { Position } from './solver'
import './App.css'

const BOARD_SIZES = [5, 6, 7, 8]

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

function key(position: Position): string {
  return `${position.row}-${position.col}`
}

function isInside(position: Position, size: number): boolean {
  return (
    position.row >= 0 &&
    position.row < size &&
    position.col >= 0 &&
    position.col < size
  )
}

function getValidMoves(
  position: Position,
  visited: Position[],
  size: number,
): Position[] {
  return MOVES
    .map((move) => ({
      row: position.row + move.row,
      col: position.col + move.col,
    }))
    .filter(
      (next) =>
        isInside(next, size) &&
        !visited.some((square) => key(square) === key(next)),
    )
}

function getUnreachableSquares(
  current: Position | undefined,
  visited: Position[],
  size: number,
): Set<string> {
  if (!current) return new Set()

  const visitedKeys = new Set(visited.map(key))
  const reachable = new Set<string>([key(current)])
  const queue: Position[] = [current]
  let head = 0

  while (head < queue.length) {
    const position = queue[head++]

    for (const move of MOVES) {
      const next = {
        row: position.row + move.row,
        col: position.col + move.col,
      }

      if (!isInside(next, size)) continue

      const nextKey = key(next)

      if (visitedKeys.has(nextKey)) continue
      if (reachable.has(nextKey)) continue

      reachable.add(nextKey)
      queue.push(next)
    }
  }

  const unreachable = new Set<string>()

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
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
  const [boardSize, setBoardSize] = useState(8)
  const [history, setHistory] = useState<Position[]>([])
  const [retrocessos, setRetrocessos] = useState(0)

  const [solutionPath, setSolutionPath] =
    useState<Position[] | null>(null)
  const [animationIndex, setAnimationIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(500)
  const [showHints, setShowHints] = useState(true)

  const totalSquares = boardSize * boardSize

  const current = history[history.length - 1]
  const visited = history

  const validMoves = current
    ? getValidMoves(current, visited, boardSize)
    : []

  const visitedKeys = new Set(visited.map(key))
  const validKeys = new Set(validMoves.map(key))

  const unreachableKeys = getUnreachableSquares(
    current,
    visited,
    boardSize,
  )

  const casasNaoAlcancadas = unreachableKeys.size
  const completed = history.length === totalSquares

  const resolving =
    solutionPath !== null &&
    animationIndex < solutionPath.length

  const stuck =
    Boolean(current) &&
    validMoves.length === 0 &&
    !completed

  const [showRules, setShowRules] = useState(false)

  // Executa a solução um movimento por vez.
  useEffect(() => {
    if (!isPlaying || !solutionPath) return

    if (animationIndex >= solutionPath.length) {
      setIsPlaying(false)
      return
    }

    const timer = window.setTimeout(() => {
      const nextPosition = solutionPath[animationIndex]

      setHistory((previous) => [...previous, nextPosition])
      setAnimationIndex((previous) => previous + 1)
    }, speed)

    return () => window.clearTimeout(timer)
  }, [isPlaying, solutionPath, animationIndex, speed])

  // Fecha o modal de regras com a tecla Esc.
  useEffect(() => {
    if (!showRules) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setShowRules(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showRules])

  function restart() {
    setHistory([])
    setRetrocessos(0)
    setIsPlaying(false)
    setSolutionPath(null)
    setAnimationIndex(0)
  }

  function changeBoardSize(value: string) {
    const nextSize = Number(value)

    if (!BOARD_SIZES.includes(nextSize) || nextSize === boardSize) {
      return
    }

    // Uma nova dimensão exige uma nova partida.
    restart()
    setBoardSize(nextSize)
  }

  function handleSquareClick(position: Position) {
    // Evita interferência manual durante uma resolução,
    // inclusive quando ela está pausada.
    if (completed || resolving) return

    if (!current) {
      setHistory([position])
      return
    }

    if (validKeys.has(key(position))) {
      setHistory((previous) => [...previous, position])
    }
  }

  function undo() {
    if (history.length === 0 || resolving) return

    setIsPlaying(false)
    setSolutionPath(null)
    setAnimationIndex(0)

    setHistory((previous) => previous.slice(0, -1))
    setRetrocessos((previous) => previous + 1)
  }

  function solveAutomatically() {
    if (completed || resolving || isPlaying) return

    const initialPath: Position[] = history.length > 0
      ? history.map((position) => ({ ...position }))
      : [{ row: 0, col: 0 }]

    const result = solveKnightTour(initialPath, boardSize)

    if (!result) {
      window.alert(
        'Não foi encontrada uma solução para esta sequência de movimentos.',
      )
      return
    }

    setHistory(initialPath)
    setSolutionPath(result)
    setAnimationIndex(initialPath.length)
    setIsPlaying(true)
  }

  function cancelResolution() {
    setIsPlaying(false)
    setSolutionPath(null)
    setAnimationIndex(0)
  }

  return (
    <main className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-icon">♞</span>
          <span>KNIGHT'S TOUR</span>
        </div>

        <div className="topbar-actions">
          <button
            type="button"
            className="rules-button"
            onClick={() => setShowRules(true)}
          >
            <span aria-hidden="true">ⓘ</span>
            Como jogar
          </button>
          
          <span className="version">PUZZLE · 01</span>
        </div>
      </header>

      <section className="hero">
        <p className="eyebrow">DESAFIO DE LÓGICA</p>

        <h1>Uma jogada de cada vez.</h1>

        <p className="subtitle">
          Visite todas as casas do tabuleiro usando apenas
          os movimentos do cavalo. Sem repetir nenhuma casa.
        </p>
      </section>

      <section className="game-layout">
        <div className="board-panel">
          <div className="board-heading">
            <div>
              <span className="panel-label">TABULEIRO</span>
              <h2>
                {boardSize} × {boardSize}
              </h2>
            </div>

            <span className="move-count">
              {String(history.length).padStart(2, '0')} / {totalSquares}
            </span>
          </div>

          <div className="board-size-control">
            <label htmlFor="board-size">Tamanho do tabuleiro</label>

            <select
              id="board-size"
              className="board-size-select"
              value={boardSize}
              onChange={(event) => changeBoardSize(event.target.value)}
            >
              {BOARD_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size} × {size}{size === 8 ? ' (Clássico)' : ''}
                </option>
              ))}
            </select>
          </div>

          <div
            className="board"
            role="group"
            aria-label={`Tabuleiro ${boardSize} por ${boardSize}`}
            style={{
              gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${boardSize}, minmax(0, 1fr))`,
            }}
          >

            {Array.from({ length: boardSize }, (_, row) =>
              Array.from({ length: boardSize }, (_, col) => {
                const position = { row, col }
                const squareKey = key(position)

                const visitIndex = history.findIndex(
                  (square) => key(square) === squareKey,
                )

                const isVisited = visitedKeys.has(squareKey)
                const isCurrent =
                  current !== undefined &&
                  key(current) === squareKey

                const isValid = validKeys.has(squareKey)
                const isUnreachable = unreachableKeys.has(squareKey)
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
                      resolving ||
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
                    {isCurrent ? (
                      <span className="knight">♞</span>
                    ) : isVisited ? (
                      <span className="visit-number">
                        {visitIndex + 1}
                      </span>
                    ) : isValid && showHints ? (
                      <span className="hint-dot" />
                    ) : null}
                  </button>
                )
              }),
            )}
          </div>

          <div className="board-coordinates">
            <span>{boardSize} × {boardSize}</span>
            <span>{totalSquares} CASAS</span>
          </div>
        </div>

        <aside className="sidebar">
          <div className="status-card">
            <span className="panel-label">SUA JORNADA</span>

            <div className="progress-number">
              {Math.round((history.length / totalSquares) * 100)}
              <small>%</small>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${(history.length / totalSquares) * 100}%`,
                }}
              />
            </div>

            <div className="progress-caption">
              <span>Casas visitadas</span>
              <strong>{history.length} de {totalSquares}</strong>
            </div>

            <div className="stat-divider" />

            <div className="stat-row">
              <span>Casas restantes</span>
              <strong>{totalSquares - history.length}</strong>
            </div>

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

            <button
              className={`toggle-button ${showHints ? 'active' : ''}`}
              onClick={() => setShowHints((value) => !value)}
            >
              <span>{showHints ? '◉' : '○'}</span>
              Mostrar dicas
              <span className="toggle-state">
                {showHints ? 'ON' : 'OFF'}
              </span>
            </button>

            <button className="primary-button" onClick={restart}>
              ↻ &nbsp; Novo jogo
            </button>

            <button
              className="secondary-button"
              onClick={undo}
              disabled={history.length === 0 || resolving}
            >
              ↶ &nbsp; Desfazer jogada
            </button>

            <button
              className="primary-button"
              onClick={solveAutomatically}
              disabled={completed || resolving || isPlaying}
            >
              ♞ &nbsp; Resolver passo a passo
            </button>

            {resolving && (
              <>
                <button
                  className="secondary-button"
                  onClick={() => setIsPlaying((value) => !value)}
                >
                  {isPlaying
                    ? 'Ⅱ  Pausar resolução'
                    : '▶  Continuar resolução'}
                </button>

                <div className="speed-control">
                  <label htmlFor="solver-speed">
                    Velocidade da resolução
                  </label>

                  <select
                    id="solver-speed"
                    value={speed}
                    onChange={(event) =>
                      setSpeed(Number(event.target.value))
                    }
                    disabled={isPlaying}
                  >
                    <option value={100}>Muito rápida</option>
                    <option value={300}>Rápida</option>
                    <option value={500}>Normal</option>
                    <option value={1000}>Lenta</option>
                    <option value={1500}>Muito lenta</option>
                  </select>
                </div>

                <button
                  className="secondary-button"
                  onClick={cancelResolution}
                >
                  ■ &nbsp; Cancelar resolução
                </button>
              </>
            )}
          </div>

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

      {showRules && (
        <div
    className="rules-overlay"
    onClick={() => setShowRules(false)}
  >
    <section
      className="rules-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rules-title"
      onClick={(event) => event.stopPropagation()}
    >
      <header className="rules-modal-header">
        <div className="rules-modal-heading">
          <span className="rules-icon" aria-hidden="true">
            ♞
          </span>

          <div>
            <span className="panel-label">KNIGHT'S TOUR</span>
            <h2 id="rules-title">Como jogar</h2>
          </div>
        </div>

        <button
          type="button"
          className="rules-close"
          onClick={() => setShowRules(false)}
          aria-label="Fechar regras"
          autoFocus
        >
          ×
        </button>
      </header>

      <div className="rules-content">
        <p className="rules-intro">
          Seu objetivo é percorrer o tabuleiro inteiro usando
          os movimentos do cavalo, sem visitar nenhuma casa
          mais de uma vez.
        </p>

        <div className="rule-item">
          <span className="rule-number">01</span>
          <div>
            <h3>O movimento do cavalo</h3>
            <p>
              O cavalo se movimenta em formato de L:
              duas casas em uma direção e uma casa
              perpendicular. Ele pode saltar sobre outras peças.
            </p>
          </div>
        </div>

        <div className="rule-item">
          <span className="rule-number">02</span>
          <div>
            <h3>Comece sua jornada</h3>
            <p>
              Clique em qualquer casa para posicionar o cavalo.
              Depois, escolha uma das casas destacadas para
              realizar cada movimento.
            </p>
          </div>
        </div>

        <div className="rule-item">
          <span className="rule-number">03</span>
          <div>
            <h3>Não repita casas</h3>
            <p>
              Cada casa só pode ser visitada uma vez. Planeje
              sua rota para não ficar sem movimentos antes
              de completar o tabuleiro.
            </p>
          </div>
        </div>

        <div className="rule-item">
          <span className="rule-number">04</span>
          <div>
            <h3>Escolha a dificuldade</h3>
            <p>
              Você pode jogar em tabuleiros de 5×5, 6×6,
              7×7 ou 8×8. Quanto maior o tabuleiro, mais casas
              você precisará percorrer.
            </p>
          </div>
        </div>

        <div className="rule-item">
          <span className="rule-number">05</span>
          <div>
            <h3>Use os controles</h3>
            <p>
              Ative ou desative as dicas, desfaça uma jogada
              ou use a resolução automática para acompanhar
              uma solução passo a passo. Você também pode
              pausar e ajustar a velocidade da resolução.
            </p>
          </div>
        </div>

        <div className="rules-tip">
          <span aria-hidden="true">✦</span>
          <p>
            <strong>Dica estratégica:</strong> observe quantos
            movimentos ainda restam em cada região do tabuleiro.
            Evitar becos sem saída é fundamental para concluir
            o desafio.
          </p>
        </div>
      </div>

      <footer className="rules-modal-footer">
        <button
          type="button"
          className="primary-button"
          onClick={() => setShowRules(false)}
        >
          Entendi, vamos jogar!
        </button>
      </footer>
    </section>
        </div>
      )}

      <footer className="footer">
        <span>KNIGHT'S TOUR © 2026</span>
        <span>UM DESAFIO DE PACIÊNCIA E ESTRATÉGIA</span>
      </footer>
    </main>
  )
}

export default App
