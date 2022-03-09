<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { Position } from '../entity/entities';

const boardX = ref(0)
const boardY = ref(0)

const x = ref(0)
const y = ref(0)

const p = reactive({ x: 0, y: 0 })

const pos = computed(() => {

})

function move(e: MouseEvent) {
  x.value = e.clientX
  y.value = e.clientY
}



onMounted(() => {
  calcBoardPosition()
})

function calcBoardPosition() {
  boardX.value = document.querySelector('.board')!.getBoundingClientRect().left
  boardY.value = document.querySelector('.board')!.getBoundingClientRect().top
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
  <div class="board" @mousemove="move"></div>
</template>

<style scoped>
.board {
  position: absolute;
  top: 50%;
  left: 40%;
  /* right: 50%; */
  height: 500px;
  width: 500px;
  background-color: palegoldenrod;
  text-align: center;
}
</style>