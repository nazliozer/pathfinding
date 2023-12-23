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
      // Destination reached
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
        let nextDist = distances[curRow][curCol] + 1; // Assuming uniform edge weights

        if (
          nextDist < distances[newRow][newCol] &&
          !board[newRow][newCol].isWall
        ) {
          distances[newRow][newCol] = nextDist;
          board[newRow][newCol].prev = [curRow, curCol]; // Update the prev property
          visited.push([newRow, newCol]);
          queue.push([newRow, newCol]);
        }
      }
    }
  }

  // If the destination is not reachable, return the visited array so far
  return visited;
};

export const astar = (board, sridx, scidx, dridx, dcidx) => {
  const visited = [];
  const openSet = [];
  const startNode = board[sridx][scidx];
  const goalNode = board[dridx][dcidx];

  startNode.g = 0;
  startNode.h = heuristic(sridx, scidx, dridx, dcidx);
  startNode.f = startNode.g + startNode.h;

  openSet.push(startNode);

  while (openSet.length) {
    // Find the node with the lowest f value in the open set
    let currentNode = openSet.reduce((minNode, node) =>
      node.f < minNode.f ? node : minNode
    );

    if (currentNode === goalNode) {
      // Goal reached, no need to continue searching
      visited.push([currentNode.row, currentNode.col]);
      break;
    }

    openSet.splice(openSet.indexOf(currentNode), 1);
    visited.push([currentNode.row, currentNode.col]);

    for (const direction of directions) {
      const newRow = currentNode.row + direction[0];
      const newCol = currentNode.col + direction[1];

      if (
        newRow >= 0 &&
        newRow < board.length &&
        newCol >= 0 &&
        newCol < board[0].length
      ) {
        let neighbor = board[newRow][newCol];

        if (
          !neighbor.isWall &&
          !visited.some((node) => node[0] === newRow && node[1] === newCol)
        ) {
          let tentativeG = currentNode.g + 1; // Assuming cost of moving from one cell to another is 1

          if (!openSet.includes(neighbor) || tentativeG < neighbor.g) {
            neighbor.prev = currentNode;
            neighbor.g = tentativeG;
            neighbor.h = heuristic(newRow, newCol, dridx, dcidx);
            neighbor.f = neighbor.g + neighbor.h;

            if (!openSet.includes(neighbor)) {
              openSet.push(neighbor);
            }
          }
        }
      }
    }
  }

  return visited;
};
const heuristic = (startRow, startCol, goalRow, goalCol) => {
  return Math.abs(startRow - goalRow) + Math.abs(startCol - goalCol);
};
