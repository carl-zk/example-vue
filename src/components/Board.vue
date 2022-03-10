<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { Position } from '../entity/entities';
import Box from './Box.vue'

const boardX = ref(0)
const boardY = ref(0)

const x = ref(0)
const y = ref(0)

const p = reactive({ x: 0, y: 0 })

const pos = computed(() => {

})

const boxes: Position[][] = reactive([])


function move(e: MouseEvent) {
  x.value = e.clientX
  y.value = e.clientY
  // const box = document.getElementById('box')
  // box!.style.left = (e.clientX - boardX.value) + "px"
  // box!.style.top = (e.clientY - boardY.value) + "px"
}

onMounted(() => {
  window.onresize = calcBoardPosition
  calcBoardPosition()
  for (let i = 0; i < 10; i++) {
    boxes[i] = []
    for (let j = 0; j < 10; j++) {
      // boxes[i].push({ x: boardX.value + i * 50, y: boardY.value + j * 50 })
      boxes[i].push({ x: i, y: j })
    }
  }
  window.addEventListener("keyup", (e) => {
    if ("ArrowLeft" == e.key || "ArrowUp" == e.key || "ArrowRight" == e.key || "ArrowDown" == e.key) {
      console.log(e)
    }
  })
})

function calcBoardPosition() {
  boardX.value = document.querySelector('.board')!.getBoundingClientRect().left
  boardY.value = document.querySelector('.board')!.getBoundingClientRect().top
}

function press(e: KeyboardEvent) {
  console.log(e)
}

function cli(e: MouseEvent) {
  console.log(e)
}

</script>

<template>
  <p>
    {{ boardX }}
    {{ boardY }}
  </p>
  <p>
    {{ x }}
    {{ y }}
  </p>
  <div class="board" @mousemove="move">
    <div v-for="r in boxes">
      <div v-for="b in r">
        <Box :x="b.x" :y="b.y" @click="cli" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-rows: repeat(10, 10%);
  grid-template-columns: repeat(10, 10%);
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: auto;

  /* right: 50%; */
  height: 520px;
  width: 520px;
  background-color: palegoldenrod;
  /* text-align: center; */

  border: 3px solid #73ad21;
}
</style>