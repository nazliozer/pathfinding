const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export const dfsR = (board, startRow, startCol, destRow, destCol) => {
  const visited = [];
  let found = false;
  const dfsHelper = (row, col, prev = null) => {
    if (row < 0 || col < 0 || row >= board.length || col >= board[0].length)
      return;

    const curSquare = board[row][col];
    if (curSquare.visited || curSquare.isWall || found) return;

    curSquare.prev = prev;
    curSquare.visited = true;
    visited.push([row, col]);

    if (row === destRow && col === destCol) {
      found = true;
      return;
    }

    for (const dir of directions) {
      const nextRow = row + dir[0];
      const nextCol = col + dir[1];
      dfsHelper(nextRow, nextCol, [row, col]);
    }
  };

  dfsHelper(startRow, startCol);
  return visited;
};

export const bfs = (board, sridx, scidx, dridx, dcidx) => {
  const visited = [];
  const queue = [];
  queue.push([sridx, scidx]);

  while (queue.length) {
    let cur = queue.shift();
    let curSquare = board[cur[0]][cur[1]];

    if (cur[0] === dridx && cur[1] === dcidx) {
      visited.push(cur);
      return visited;
    }

    if (!curSquare.visited && !curSquare.isWall) {
      curSquare.visited = true;
      visited.push(cur);
      for (const direction of directions) {
        const newRow = cur[0] + direction[0];
        const newCol = cur[1] + direction[1];

        if (
          newRow >= 0 &&
          newRow < board.length &&
          newCol >= 0 &&
          newCol < board[0].length
        ) {
          let nextSquare = board[newRow][newCol];

          if (!nextSquare.visited) {
            nextSquare.prev = cur;
            queue.push([newRow, newCol]);
          }
        }
      }
    }
  }
};
