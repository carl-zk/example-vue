<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive, computed } from 'vue';
import { AutoPushBox, AutoPushBox2, cloneOf, keyOf, weightOf, canMove } from './algorithm';
import { CellStatus, mapList, blockStatus } from './entity';

// 当前皮卡丘位置
const pos = { x: 4, y: 6 }
const boardMap: CellStatus[][] = reactive([])
// 第 n 关
const pk = ref(0)
// 目标个数
let goal = 0
// 推解路径
const path: number[][] = reactive([])
// 路径下标
const idx = ref(0)

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

/**
 * 初始化地图
 * @param i 第i关
 */
function initBoard(i: number): void {
  while (path.length > 0) {
    path.pop()
  }
  boardMap.length = 0
  // pikachu position
  pos.x = mapList[i].start.i
  pos.y = mapList[i].start.j
  goal = 0;
  const mp = mapList[i].map
  for (let r = 0; r < mp.length; r++) {
    boardMap[r] = []
    for (let c = 0; c < mp[0].length; c++) {
      if (mp[r][c] == 1 || mp[r][c] == 5) {
        goal++;
      }
      boardMap[r].push(CellStatus.statusOf(mp[r][c]))
    }
  }
  boardMap[pos.x][pos.y] = boardMap[pos.x][pos.y] | CellStatus.Pikachu
}

function move(dx: number, dy: number): void {
  const i = pos.x + dx, j = pos.y + dy
  const p = pos.x + (dx * 2), q = pos.y + (dy * 2)
  if (!canMove(i, j, p, q, boardMap)) {
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

  setTimeout(checkWin, 100)
}

function checkWin(): void {
  if (got() == goal) {
    alert('恭喜！进入下一关：' + (pk.value + 2))
    pk.value = (pk.value + 1) % mapList.length;
    initBoard(pk.value)
  }
}

function got(): number {
  return document.querySelectorAll(".type14").length
}

function idOf(i: number, j: number): string {
  return '_' + ((i << 5) + j)
}

function autoSolve(): void {
  initBoard(pk.value)

  let targets: number[][] = []
  for (let i = 0; i < boardMap.length; i++) {
    for (let j = 0; j < boardMap[0].length; j++) {
      if ((CellStatus.Target & boardMap[i][j]) != 0) {
        targets.push([i, j])
      }
    }
  }

  let autoPush = new AutoPushBox2({
    st: cloneOf(boardMap),
    curX: pos.x,
    curY: pos.y,
    target: goal,
    score: got(),
    key: keyOf(boardMap),
    path: [],
    weight: weightOf(pos.x, pos.y, targets, boardMap, got()),
    targetsLocation: targets
  })

  let p = autoPush.solve()!

  for (let x of p) {
    path.push(x)
  }

  idx.value = 0
  setInterval(() => {
    if (idx.value < path.length) {
      let i = idx.value
      move(path[i][0], path[i][1])
      idx.value++
    }
  }, 50)
}

function moveNext() {
  move(path[idx.value][0], path[idx.value][1])
  idx.value++;
}

function directionOf(dx: number, dy: number) {
  return dx == 0 ? dy == 1 ? '→' : '←' : dx == 1 ? '↓' : '↑'
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside
        width="20%"
        class="demo-shadow"
        :style="{ boxShadow: `var(--el-box-shadow-base)`, 'min-height': '600px' }"
      >
        <el-select v-model="pk" @change="initBoard(pk)">
          <el-option v-for="i in mapList.length" :key="i" :value="i - 1" :label="'第' + i + '关'">
            <span style="float">第{{ i }}关</span>
          </el-option>
        </el-select>
        <el-button
          @click="autoSolve"
          :style="{ display: 'block', margin: `10px`, position: `relative`, left: `0px` }"
        >自动求解</el-button>

        <div :style="{ display: path.length > 0 ? '' : 'none' }">
          <p>推理路径</p>
          <p>{{ path.length }}</p>
          <ol class="pathList">
            <li
              v-for="(v, i) in path"
              :style="{ 'background-color': i == idx ? '#ddd' : '' }"
            >{{ directionOf(v[0], v[1]) }}</li>
          </ol>
        </div>

        <!-- <el-button
          id="nextStep"
          @click="moveNext"
          :style="{ display: 'flow-right', margin: `10px, 0px, 10px, auto`, position: `absolute` }"
        >下一步</el-button>-->
      </el-aside>
      <!-- <hr width="1" size="auto" /> -->
      <el-container>
        <el-header
          :style="{ positoin: 'fixed', top: '0', backgroundColor: `lightblue`, color: `white`, padding: '0' }"
        >
          <h1
            :style="{ display: 'inline-block', 'text-align': 'center', 'text-shadow': `2px 2px 4px #000000`, fontSize: '38px', height: 'inherit', margin: '0', padding: '4px' }"
          >推箱子</h1>
        </el-header>
        <el-main>
          <div
            class="box"
            :style="{ height: (boardMap.length * 50) + 'px', width: (boardMap[0]?.length * 50) + 'px' }"
          >
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
ul.pathList {
  list-style-type: "none";
  margin: 0;
  padding: 0;
}

.pathList li {
  text-align: "center";
  background-color: "grey";
}

ol li:hover {
  background-color: #ddd;
}
.box {
  overflow: show;
  margin: 15vh auto 0;
  height: 600px;
  width: 600px;
  position: fixed;
  top: 0;
  left: 50%;
}

.box div {
  float: left;
  width: 50px;
  height: 50px;
  background-size: 100% 100%;
  // cursor: pointer;
}
.type1 {
  // block

  background-image: url("./img/wall.jpg");
}
.type2 {
  // target
  @extend .type4;
  opacity: 0.5;
}
.type4 {
  // path
  box-sizing: border-box;
  border: 1px solid rgba(221, 228, 236, 0.5);
  background-color: #3266cc;
  // background-color: white;
}
.type8 {
  /*箱子*/

  //
  // background-color: #cca71a;
  background-image: url("./img/box.png");
}
.type16 {
  background-image: url("./img/player.png");
}
.type32 {
  /*墙*/
  background-color: rgba(7, 17, 27, 0.8);
  background-image: url("./img/wall.jpg");
}
.type6 {
  /*目标+路*/
  @extend .type2;
  @extend .type4;
}
.type12 {
  // box + path
  @extend .type4;
  @extend .type8;
}
.type14 {
  // @extend .type2;
  // @extend .type4;
  // @extend .type8;
  background-image: url("./img/over_box.png");
}
.type20 {
  @extend .type4;
  @extend .type16;
}
.type22 {
  @extend .type2;
  @extend .type4;
  @extend .type16;
}

.demo-shadow {
  height: auto;
  width: 20%;
}
</style>