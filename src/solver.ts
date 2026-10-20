
export type Position = {
  row: number
  col: number
}

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

function getUnvisitedMoves(
  position: Position,
  visited: boolean[][],
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
        !visited[next.row][next.col],
    )
}

// Prioriza casas com menos saídas disponíveis.
function getDegree(
  position: Position,
  visited: boolean[][],
  size: number,
): number {
  return getUnvisitedMoves(position, visited, size).length
}

// Verifica se as casas restantes continuam conectadas.
function remainingSquaresConnected(
  current: Position,
  visited: boolean[][],
  size: number,
): boolean {
  const queue: Position[] = [current]
  const reached = new Set<string>([key(current)])
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

      if (reached.has(nextKey)) continue
      if (visited[next.row][next.col]) continue

      reached.add(nextKey)
      queue.push(next)
    }
  }

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (
        !visited[row][col] &&
        !reached.has(key({ row, col }))
      ) {
        return false
      }
    }
  }

  return true
}

function isValidPath(
  path: Position[],
  size: number,
): boolean {
  if (path.length === 0 || path.length > size * size) {
    return false
  }

  const seen = new Set<string>()

  for (let index = 0; index < path.length; index++) {
    const position = path[index]

    if (!isInside(position, size)) return false

    const positionKey = key(position)

    if (seen.has(positionKey)) return false
    seen.add(positionKey)

    if (index > 0) {
      const previous = path[index - 1]
      const rowDistance = Math.abs(position.row - previous.row)
      const colDistance = Math.abs(position.col - previous.col)

      const validKnightMove =
        (rowDistance === 2 && colDistance === 1) ||
        (rowDistance === 1 && colDistance === 2)

      if (!validKnightMove) return false
    }
  }

  return true
}

// Retorna uma solução completa ou null quando não encontra
// uma continuação para o caminho informado.
// O tamanho padrão 8 mantém compatibilidade com chamadas antigas.
export function solveKnightTour(
  initialPath: Position[],
  size = 8,
): Position[] | null {
  if (
    !Number.isInteger(size) ||
    size < 1 ||
    !isValidPath(initialPath, size)
  ) {
    return null
  }

  const path = initialPath.map((position) => ({ ...position }))

  const visited = Array.from(
    { length: size },
    () => Array<boolean>(size).fill(false),
  )

  for (const position of path) {
    visited[position.row][position.col] = true
  }

  if (path.length === size * size) {
    return path
  }

  const search = (): boolean => {
    if (path.length === size * size) {
      return true
    }

    const current = path[path.length - 1]

    const candidates = getUnvisitedMoves(
      current,
      visited,
      size,
    )

    // Heurística de Warnsdorff.
    candidates.sort(
      (a, b) =>
        getDegree(a, visited, size) -
        getDegree(b, visited, size),
    )

    for (const next of candidates) {
      visited[next.row][next.col] = true
      path.push(next)

      const connected =
        path.length === size * size ||
        remainingSquaresConnected(next, visited, size)

      if (connected && search()) {
        return true
      }

      path.pop()
      visited[next.row][next.col] = false
    }

    return false
  }

  return search() ? path : null
}
