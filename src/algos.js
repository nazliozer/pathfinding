const NOT_VISITED = 0;
const VISITED = 1;
const WALL = 2;
const START = 3;
const FINISH = 4;

export const dfs = (board, startRow, startCol, destRow, destCol) => {
  const visited = [];
  const next = [];
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  next.push([startRow, startCol]);

  while (next.length) {
    let cur = next.pop();
    let curSquare = board[cur[0]][cur[1]];

    if (curSquare.state == FINISH) {
      return visited;
    }

    if (curSquare.state == NOT_VISITED) {
      curSquare.state = VISITED;
      visited.push(cur);

      for (const direction of directions) {
        const newRow = startRow + direction[0];
        const newCol = startCol + direction[1];

        if (
          newRow >= 0 &&
          newRow < board.length &&
          newCol >= 0 &&
          newCol < board[0].length
        ) {
          let nextSquare = board[newRow][newCol];

          if (nextSquare.state == NOT_VISITED) {
            nextSquare.prev = cur;
            next.push([newRow, newCol]);
          }
        }
      }
    }
  }
};
