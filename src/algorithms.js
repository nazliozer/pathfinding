const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export const dfs = (board, startRow, startCol, destRow, destCol) => {
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

export const aStar = (board, sridx, scidx, dridx, dcidx) => {
  const calculateHeuristic = (row, col) => {
    return Math.abs(row - dridx) + Math.abs(col - dcidx);
  };

  const visited = [];
  const openSet = [];
  openSet.push([sridx, scidx]);

  const gScore = {};
  const fScore = {};

  gScore[`${sridx}-${scidx}`] = 0;
  fScore[`${sridx}-${scidx}`] = calculateHeuristic(sridx, scidx);

  while (openSet.length) {
    let cur = openSet.reduce((minNode, node) => {
      return fScore[`${node[0]}-${node[1]}`] <
        fScore[`${minNode[0]}-${minNode[1]}`]
        ? node
        : minNode;
    });

    openSet.splice(openSet.indexOf(cur), 1);
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
            const tentativeGScore = gScore[`${cur[0]}-${cur[1]}`] + 1;

            if (
              !gScore[`${newRow}-${newCol}`] ||
              tentativeGScore < gScore[`${newRow}-${newCol}`]
            ) {
              nextSquare.prev = cur;
              gScore[`${newRow}-${newCol}`] = tentativeGScore;
              fScore[`${newRow}-${newCol}`] =
                tentativeGScore + calculateHeuristic(newRow, newCol);

              if (
                !openSet.some(
                  (node) => node[0] === newRow && node[1] === newCol
                )
              ) {
                openSet.push([newRow, newCol]);
              }
            }
          }
        }
      }
    }
  }
};

export const dijkstra = (board, sridx, scidx, dridx, dcidx) => {
  const visited = [];
  const distances = [];

  for (let i = 0; i < board.length; i++) {
    distances.push(Array(board[0].length).fill(Infinity));
  }

  distances[sridx][scidx] = 0;
  visited.push([sridx, scidx]);

  const queue = [[sridx, scidx]];

  while (queue.length) {
    let cur = queue.shift();
    let curRow = cur[0];
    let curCol = cur[1];

    if (curRow === dridx && curCol === dcidx) {
      return visited;
    }

    for (const direction of directions) {
      const newRow = curRow + direction[0];
      const newCol = curCol + direction[1];

      if (
        newRow >= 0 &&
        newRow < board.length &&
        newCol >= 0 &&
        newCol < board[0].length
      ) {
        let nextDist = distances[curRow][curCol] + 1;

        if (
          nextDist < distances[newRow][newCol] &&
          !board[newRow][newCol].isWall
        ) {
          distances[newRow][newCol] = nextDist;
          board[newRow][newCol].prev = [curRow, curCol];
          visited.push([newRow, newCol]);
          queue.push([newRow, newCol]);
        }
      }
    }
  }
  return visited;
};
