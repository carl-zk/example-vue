<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive, computed } from 'vue';
import { AutoPushBox, cloneOf, keyOf } from './algri';
import { CellStatus, mapList } from './entity';

// 当前皮卡丘位置
const pos = { x: 4, y: 6 }
const boardMap: CellStatus[][] = reactive([])
// 第 n 关
const pk = ref(0)
// 目标个数
let goal = 0
// board 行宽
const blockStatus = CellStatus.Block | CellStatus.Box | CellStatus.Wall

const lister = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowLeft':
    case 'a': move(0, -1); break;
    case 'ArrowUp':
    case 'w': move(-1, 0); break;
    case 'ArrowRight':
    case 'd': move(0, 1); break;
    case 'ArrowDown':
    case 's': move(1, 0); break;
    default:
  }
}

onMounted(() => {
  initBoard(0)
  window.addEventListener("keydown", lister)
})

onUnmounted(() => {
  window.removeEventListener("keydown", lister)
})

function initBoard(i: number) {
  boardMap.length = 0
  // pikachu position
  pos.x = mapList[i].start.i
  pos.y = mapList[i].start.j
  goal = 0;
  const mp = mapList[i].map
  for (let r = 0; r < mp.length; r++) {
    boardMap[r] = []
    for (let c = 0; c < mp[0].length; c++) {
      if (mp[r][c] == 1) {
        goal++;
      }
      boardMap[r].push(CellStatus.statusOf(mp[r][c]))
    }
  }
  boardMap[pos.x][pos.y] = boardMap[pos.x][pos.y] | CellStatus.Pikachu
}

function move(dx: number, dy: number) {
  const i = pos.x + dx, j = pos.y + dy
  const p = pos.x + (dx * 2), q = pos.y + (dy * 2)
  if (!canMove(i, j, p, q)) {
    return;
  }
  boardMap[pos.x][pos.y] = boardMap[pos.x][pos.y] ^ CellStatus.Pikachu
  if ((boardMap[i][j] & CellStatus.Box) != 0) {
    boardMap[i][j] = boardMap[i][j] ^ CellStatus.Box
    boardMap[p][q] = boardMap[p][q] | CellStatus.Box
  }
  boardMap[i][j] = boardMap[i][j] | CellStatus.Pikachu
  pos.x = i;
  pos.y = j;

  setTimeout(checkWin, 500)
}

/**
 * 是否可移动
 * @param i 下一格 row
 * @param j 下一格 col
 * @param p 下下格 row
 * @param q 下下格 col
 */
function canMove(i: number, j: number, p: number, q: number) {
  if (!isValidIndex(i, j)) {
    return false;
  }
  if ((boardMap[i][j] & CellStatus.Block) != 0
    || (boardMap[i][j] & CellStatus.Wall) != 0) {
    return false;
  }
  if ((boardMap[i][j] & CellStatus.Box) != 0) {
    if (!isValidIndex(p, q) || (boardMap[p][q] & blockStatus) != 0) {
      return false;
    }
  }
  return true;
}

function isValidIndex(r: number, c: number) {
  return 0 <= r && r < boardMap.length && 0 <= c && c < boardMap[0].length
}

function idOf(i: number, j: number) {
  return '_' + (i * 12 + j)
}

function checkWin() {
  if (document.querySelectorAll(".type10").length == goal) {
    alert('恭喜！进入下一关：' + (pk.value + 2))
    pk.value = pk.value + 1;
    initBoard(pk.value)
  }
}

const path: number[][] = reactive([])
let idx: number

function autoSolve() {
  initBoard(pk.value)
  let autoPush = new AutoPushBox({
    st: cloneOf(boardMap),
    curX: pos.x,
    curY: pos.y,
    target: goal,
    score: document.querySelectorAll(".type10").length,
    key: keyOf(boardMap),
    path: []
  })
  let p = autoPush.solve()!
  path.length = 0
  for (let x of p) {
    path.push(x)
  }
  console.log(path.length)
  idx = 0
  // setTimeout(() => {
  //   for (let dir of path) {
  //     setTimeout(move, 2000, dir[0], dir[1])
  //   }
  // }, 100)
}

function moveNext() {
  move(path[idx][0], path[idx][1])
  idx++;
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="20%" class="demo-shadow" :style="{ boxShadow: `var(--el-box-shadow-base)` }">
        <el-select v-model="pk" @change="initBoard(pk)">
          <el-option v-for="i in mapList.length" :key="i" :value="i - 1" :label="'第' + i + '关'">
            <span style="float">第{{ i }}关</span>
          </el-option>
        </el-select>
        <el-button
          @click="autoSolve"
          :style="{ display: 'block', margin: `10px`, position: `relative`, left: `0px` }"
        >自动求解</el-button>
        <el-button
          id="nextStep"
          @click="moveNext"
          :style="{ display: 'flow-right', margin: `10px, 0px, 10px, auto`, position: `absolute` }"
        >下一步</el-button>
      </el-aside>
      <!-- <hr width="1" size="auto" /> -->
      <el-container>
        <el-header :style="{ backgroundColor: `lightblue`, color: `white`, padding: '0' }">
          <h1
            :style="{ display: 'inline-block', 'text-align': 'center', 'text-shadow': `2px 2px 4px #000000`, fontSize: '38px', height: 'inherit', margin: '0', padding: '4px' }"
          >推箱子</h1>
        </el-header>
        <el-main>
          <div class="box">
            <template v-for="(row, i) in boardMap">
              <div v-for="(p, j) in row" :key="idOf(i, j)" :id="idOf(i, j)" :class="['type' + p]"></div>
            </template>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.box {
  overflow: show;
  margin: 15vh auto 0;
  height: 480px;
  width: 480px;
}

.box div {
  float: left;
  width: 40px;
  height: 40px;
}
.type0 {
  // block
  background-color: #eee;
}
.type2 {
  // target
  /*要推的地方*/
  @extend .type4;
  opacity: 0.5;
}
.type4 {
  // path
  background-color: #3266cc;
}
.type32 {
  /*墙*/
  background-color: rgba(7, 17, 27, 0.8);
}
.type8 {
  /*箱子*/
  box-sizing: border-box;
  border: 1px solid rgba(7, 17, 27, 0.5);
  background-color: #cca71a;
}
.type10 {
  @extend .type2;
  @extend .type8;
}
.type12 {
  // box + path
  @extend .type4;
  @extend .type8;
}
.type16 {
  /*皮卡丘*/
  width: 40px;
  height: 40px;
  background: url("./img/pikachu.jpg") #3266cc;
  background-size: cover;
}
.type18 {
  @extend .type2;
  @extend .type16;
}
.type20 {
  @extend .type4;
  @extend .type16;
}
.demo-shadow {
  height: auto;
  width: 20%;
}
</style>