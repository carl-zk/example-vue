import { Position } from "../../entity/entities";
import { canMove, CellStatus, PlayMap } from "./entity";
import PriorityQueue from "java-like-lib-ts/src/java/util/PriorityQueue";

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
 * Heuristically Search 启发式搜索
 */
export class AutoPushBox2 {
  visitedSet: Set<String>;
  pq: PriorityQueue<Status>;

  constructor(start: Status) {
    this.visitedSet = new Set<String>();
    this.pq = new PriorityQueue<Status>((a, b) => a.weight - b.weight);
    this.pq.push(start)
    this.visitedSet.add(start.key);
  }

  solve() {
    let step = 1000000
    while (!this.pq.isEmpty() && step-- > 0) {
      let s = this.pq.poll();

      for (let dir of dirs) {
        let x = s.curX + dir[0], y = s.curY + dir[1];
        let nx = s.curX + dir[0] * 2, ny = s.curY + dir[1] * 2;
        if (canMove(x, y, nx, ny, s.st)) {
          // console.log("can move", x, y, nx, ny);
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
              weight: weightOf(x, y, s.targetsLocation, nextStatus) - 100 * newScore,
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

export function weightOf(i: number, j: number, targetsLocation: number[][], st: CellStatus[][]) {
  let cur = [i, j]
  let res = 0
  for (let p of targetsLocation) {
    if ((CellStatus.Box & st[p[0]][p[1]]) == 0) {
      res = res + distance(cur, p)
    }
  }
  return res
}

function distance(p: number[], q: number[]): number {
  return Math.pow(p[0] - q[0], 2) + Math.pow(p[1] - q[1], 2)
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
