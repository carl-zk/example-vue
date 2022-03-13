export interface PlayMap {
  map: number[][], // 二维数组，0代表不可抵达区域，1代表目标（要被推到的地方），2代表普通路径（可以走的），3代表墙，4代表箱子
  start: { // player start at position 
    i: number,
    j: number
  }
}

export enum CellStatus {
  Block = 1, // 不可达
  Wall = 1 << 5, // 墙 32
  Target = 1 << 1, // 目标 2
  Path = 1 << 2, // 路 4
  Box = 1 << 3, // 箱子 8
  TargetBox = Target | Box, // 目标和箱子重叠 10
  PathBox = Path | Box, // 路和箱子 12
  Pikachu = 1 << 4,
  PathPikachu = Path | Pikachu, // 皮卡丘和路 20
  TargetPikachu = Target | Pikachu, // 皮卡丘和目标 18
}

export namespace CellStatus {
  export function statusOf(v: number) {
    switch (v) {
      case 0: return CellStatus.Block;
      case 1: return CellStatus.Target;
      case 2: return CellStatus.Path;
      case 3: return CellStatus.Wall;
      case 4: return CellStatus.Box | CellStatus.Path;
      default: return CellStatus.Block;
    }
  }
}

export const blockStatus = CellStatus.Block | CellStatus.Box | CellStatus.Wall

/**
 * 是否可移动
 * @param i 下一格 row
 * @param j 下一格 col
 * @param p 下下格 row
 * @param q 下下格 col
 */
export function canMove(i: number, j: number, p: number, q: number, boardMap: CellStatus[][]) {
  if (!isValidIndex(i, j, boardMap)) {
    return false;
  }
  if ((boardMap[i][j] & CellStatus.Block) != 0
    || (boardMap[i][j] & CellStatus.Wall) != 0) {
    return false;
  }
  if ((boardMap[i][j] & CellStatus.Box) != 0) {
    if (!isValidIndex(p, q, boardMap) || (boardMap[p][q] & blockStatus) != 0) {
      return false;
    }
  }
  return true;
}

function isValidIndex(r: number, c: number, boardMap: CellStatus[][]) {
  return 0 <= r && r < boardMap.length && 0 <= c && c < boardMap[0].length
}

export const mapList: PlayMap[] = [
  {
    map: [
      [0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 3, 1, 3, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 3, 2, 3, 3, 3, 3, 0, 0],
      [0, 0, 3, 3, 3, 4, 2, 4, 1, 3, 0, 0],
      [0, 0, 3, 1, 2, 4, 2, 3, 3, 3, 0, 0],
      [0, 0, 3, 3, 3, 3, 4, 3, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 3, 1, 3, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0]
    ],
    start: { i: 4, j: 6 }
  },
  {
    map: [
      [0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0],
      [0, 0, 3, 2, 2, 2, 3, 0, 0, 0, 0, 0],
      [0, 0, 3, 2, 4, 4, 3, 0, 3, 3, 3, 0],
      [0, 0, 3, 2, 4, 2, 3, 0, 3, 1, 3, 0],
      [0, 0, 3, 3, 3, 2, 3, 3, 3, 1, 3, 0],
      [0, 0, 0, 3, 3, 2, 2, 2, 2, 1, 3, 0],
      [0, 0, 0, 3, 2, 2, 2, 3, 2, 2, 3, 0],
      [0, 0, 0, 3, 2, 2, 2, 3, 3, 3, 3, 0],
      [0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0]
    ],
    start: { i: 1, j: 3 }
  },
  {
    map: [
      [0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0],
      [0, 0, 3, 2, 2, 2, 2, 2, 3, 3, 3, 0],
      [0, 3, 3, 4, 3, 3, 3, 2, 2, 2, 3, 0],
      [0, 3, 2, 2, 2, 4, 2, 2, 4, 2, 3, 0],
      [0, 3, 2, 1, 1, 3, 2, 4, 2, 3, 3, 0],
      [0, 3, 3, 1, 1, 3, 2, 2, 2, 3, 0, 0],
      [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0]
    ],
    start: { i: 3, j: 3 }
  },
  {
    map: [
      [0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0],
      [0, 0, 0, 3, 3, 2, 2, 3, 0, 0, 0, 0],
      [0, 0, 0, 3, 2, 2, 4, 3, 0, 0, 0, 0],
      [0, 0, 0, 3, 3, 2, 2, 3, 3, 0, 0, 0],
      [0, 0, 0, 3, 3, 4, 4, 2, 3, 0, 0, 0],
      [0, 0, 0, 3, 1, 4, 2, 2, 3, 0, 0, 0],
      [0, 0, 0, 3, 1, 1, 2, 1, 3, 0, 0, 0],
      [0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0]
    ],
    start: { i: 2, j: 5 }
  },
  {
    map: [
      [0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0],
      [0, 0, 0, 3, 2, 2, 3, 3, 3, 0, 0, 0],
      [0, 0, 0, 3, 2, 4, 2, 2, 3, 0, 0, 0],
      [0, 0, 3, 3, 3, 2, 3, 2, 3, 3, 0, 0],
      [0, 0, 3, 1, 3, 2, 3, 2, 2, 3, 0, 0],
      [0, 0, 3, 1, 4, 2, 2, 3, 2, 3, 0, 0],
      [0, 0, 3, 1, 2, 2, 2, 4, 2, 3, 0, 0],
      [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0]
    ],
    start: { i: 1, j: 5 }
  },
  {
    map: [
      [0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0],
      [0, 0, 0, 3, 3, 2, 2, 3, 2, 2, 3, 0],
      [0, 0, 0, 3, 2, 2, 2, 3, 2, 2, 3, 0],
      [0, 0, 0, 3, 4, 2, 4, 2, 4, 2, 3, 0],
      [0, 0, 0, 3, 2, 4, 3, 3, 2, 2, 3, 0],
      [0, 3, 3, 3, 2, 4, 2, 3, 2, 3, 3, 0],
      [0, 3, 1, 1, 1, 1, 1, 2, 2, 3, 0, 0],
      [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0]
    ],
    start: { i: 1, j: 9 }
  },
  {
    map: [
      [0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0],
      [0, 0, 3, 3, 3, 2, 2, 2, 2, 3, 0, 0],
      [0, 3, 3, 1, 2, 4, 3, 3, 2, 3, 3, 0],
      [0, 3, 1, 1, 4, 2, 4, 2, 2, 2, 3, 0],
      [0, 3, 1, 1, 2, 4, 2, 4, 2, 3, 3, 0],
      [0, 3, 3, 3, 3, 3, 3, 2, 2, 3, 0, 0],
      [0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0]
    ],
    start: { i: 3, j: 9 }
  },
  {
    map: [
      [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
      [0, 0, 3, 2, 2, 3, 3, 2, 2, 2, 3, 0],
      [0, 0, 3, 2, 2, 2, 4, 2, 2, 2, 3, 0],
      [0, 0, 3, 4, 2, 3, 3, 3, 2, 4, 3, 0],
      [0, 0, 3, 2, 3, 1, 1, 1, 3, 2, 3, 0],
      [0, 3, 3, 2, 3, 1, 1, 1, 3, 2, 3, 3],
      [0, 3, 2, 4, 2, 2, 4, 2, 2, 4, 2, 3],
      [0, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3],
      [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    ],
    start: { i: 7, j: 10 }
  },
  {
    map: [
      [0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0],
      [0, 0, 0, 0, 3, 2, 2, 2, 2, 3, 0, 0],
      [0, 0, 3, 3, 3, 4, 4, 4, 2, 3, 0, 0],
      [0, 0, 3, 2, 2, 4, 1, 1, 2, 3, 0, 0],
      [0, 0, 3, 2, 4, 1, 1, 1, 3, 3, 0, 0],
      [0, 0, 3, 3, 3, 3, 2, 2, 3, 0, 0, 0],
      [0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0]
    ],
    start: { i: 3, j: 3 }
  },
  {
    map: [
      [0, 0, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3],
      [3, 3, 3, 2, 2, 3, 0, 0, 3, 2, 2, 2],
      [3, 3, 2, 4, 2, 3, 3, 3, 3, 4, 2, 2],
      [3, 3, 2, 2, 4, 1, 1, 1, 1, 2, 4, 2],
      [3, 3, 3, 2, 2, 2, 2, 3, 2, 2, 2, 3],
      [3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    ],
    start: { i: 4, j: 8 }
  }
];