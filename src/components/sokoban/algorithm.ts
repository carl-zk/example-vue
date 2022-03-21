import { blockStatus, CellStatus } from "./entity";
import PriorityQueue from "java-like-lib-ts/src/java/util/PriorityQueue";

interface Status {
  st: CellStatus[][];
  curX: number;
  curY: number;
  target: number; // 目的地个数
  score: number; // 命中目的地个数
  key: String;
  path: number[][];
  weight: number; // 权重
  targetsLocation: number[][];
}

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

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

export function isValidIndex(r: number, c: number, boardMap: CellStatus[][]) {
  return 0 <= r && r < boardMap.length && 0 <= c && c < boardMap[0].length
}

export function cloneOf(pm: CellStatus[][]) {
  let cloned: CellStatus[][] = [];
  for (let i = 0; i < pm.length; i++) {
    cloned[i] = [];
    for (let j = 0; j < pm[i].length; j++) {
      cloned[i].push(pm[i][j]);
    }
  }
  return cloned;
}

/**
 * Heuristically Search 启发式搜索
 */
export class AutoPushBox2 {
  private visitedSet: Set<String>;
  private pq: PriorityQueue<Status>;

  constructor(start: Status) {
    this.visitedSet = new Set<String>();
    this.pq = new PriorityQueue<Status>((a, b) => a.weight - b.weight);
    this.pq.push(start)
    this.visitedSet.add(start.key);
  }

  solve(): number[][] {
    let step = 1000000
    while (!this.pq.isEmpty() && step-- > 0) {
      let s = this.pq.poll();

      for (let dir of dirs) {
        let x = s.curX + dir[0], y = s.curY + dir[1];
        let nx = s.curX + dir[0] * 2, ny = s.curY + dir[1] * 2;
        if (canMove(x, y, nx, ny, s.st)) {
          let { nextStatus, newScore } = transfer(x, y, nx, ny, s)
          let key = keyOf(nextStatus);
          let path = s.path.slice(0, s.path.length);
          path.push(dir);

          if (newScore == s.target) {
            console.log("success");
            return path;
          }

          if (!this.visitedSet.has(key)) {
            this.visitedSet.add(key);
            this.pq.push({
              st: nextStatus,
              curX: x,
              curY: y,
              target: s.target,
              score: newScore,
              key: key,
              path: path,
              weight: weightOf(x, y, s.targetsLocation, nextStatus, newScore),
              targetsLocation: s.targetsLocation,
            });
          }
        }
      }
    }
    console.log("fail");
    return []
  }
}

/**
 * 状态转移
 * @param x next x
 * @param y next y
 * @param nx next next x
 * @param ny next next y
 * @param s from status
 */
export function transfer(x: number, y: number, nx: number, ny: number, s: Status): { nextStatus: CellStatus[][], newScore: number } {
  let nextStatus = cloneOf(s.st);
  let newScore = s.score;
  nextStatus[s.curX][s.curY] = nextStatus[s.curX][s.curY] ^ CellStatus.Pikachu;
  if ((nextStatus[x][y] & CellStatus.Box) != 0) {
    if ((nextStatus[x][y] & CellStatus.Target) != 0) {
      newScore--;
    }
    nextStatus[x][y] = nextStatus[x][y] ^ CellStatus.Box;
    nextStatus[nx][ny] = nextStatus[nx][ny] | CellStatus.Box;
    if ((nextStatus[nx][ny] & CellStatus.Target) != 0) {
      newScore++;
    }
  }
  nextStatus[x][y] = nextStatus[x][y] | CellStatus.Pikachu;
  return { nextStatus: nextStatus, newScore: newScore }
}

export function weightOf(i: number, j: number, targetsLocation: number[][], st: CellStatus[][], score: number = 0) {
  let cur = [i, j]
  let d = 0
  for (let p of targetsLocation) {
    if ((CellStatus.Box & st[p[0]][p[1]]) == 0) {
      d = d + distance(cur, p)
    }
  }
  return d - 2 * score
}

function distance(p: number[], q: number[]): number {
  return Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1])
}

/**
 * BFS
 */
export class AutoPushBox {
  step: number;
  visitedSet: Set<String>;
  statusList: Array<Status>;

  constructor(start: Status) {
    this.step = 0;
    this.visitedSet = new Set<String>();
    this.statusList = [start];
    this.visitedSet.add(start.key);
  }

  solve() {
    while (this.statusList.length > 0) {
      this.step++;
      // console.log("round", this.step, this.statusList.length);
      for (let n = this.statusList.length; n > 0; n--) {
        let s = this.statusList.shift()!;
        // console.log(s.curX, s.curY, s.target, s.score, s.key);
        for (let dir of dirs) {
          let x = s.curX + dir[0],
            y = s.curY + dir[1];
          let nx = s.curX + dir[0] * 2,
            ny = s.curY + dir[1] * 2;
          if (canMove(x, y, nx, ny, s.st)) {
            // console.log("can move", x, y, nx, ny);
            let nextStatus = cloneOf(s.st);
            let newScore = s.score;
            nextStatus[s.curX][s.curY] =
              nextStatus[s.curX][s.curY] ^ CellStatus.Pikachu;
            if ((nextStatus[x][y] & CellStatus.Box) != 0) {
              if ((nextStatus[x][y] & CellStatus.Target) != 0) {
                newScore--;
              }
              nextStatus[x][y] = nextStatus[x][y] ^ CellStatus.Box;
              nextStatus[nx][ny] = nextStatus[nx][ny] | CellStatus.Box;
              if ((nextStatus[nx][ny] & CellStatus.Target) != 0) {
                newScore++;
              }
            }
            nextStatus[x][y] = nextStatus[x][y] | CellStatus.Pikachu;

            let key = keyOf(nextStatus);
            let path = s.path.slice(0, s.path.length);
            path.push(dir);

            if (newScore == s.target) {
              this.statusList.length = 0;
              console.log("success");
              return path;
            }

            if (!this.visitedSet.has(key)) {
              this.visitedSet.add(key);
              this.statusList.push({
                st: nextStatus,
                curX: x,
                curY: y,
                target: s.target,
                score: newScore,
                key: key,
                path: path,
                weight: 0,
                targetsLocation: [],
              });
            }
          }
        }
      }
    }
    console.log("empty");
  }
}

export function keyOf(st: CellStatus[][]) {
  let key = "";
  for (let row of st) {
    for (let s of row) {
      key = key + "|" + s;
    }
  }
  return key;
}
