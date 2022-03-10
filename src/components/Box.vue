<script setup lang="ts">
import { ref, reactive, computed, toRefs, Ref, watch } from 'vue';
import { Position } from '../entity/entities';

const props = defineProps<{
  x: number,
  y: number
}>()

// const i = ref(props.x)
// const j = ref(props.y)

// watch(props, (newP) => {
//   // console.log(newP.x, newP.y)
//   // console.log(props.x, props.y)
//   // i.value = props.x.value
//   // j.value = props.y.value
//   // console.log(i, j)
// })

</script>

<template>
  <div class="rec" :style="{ left: x, right: y }">
    <p>
      {{ x }}
      {{ y }}
    </p>
  </div>
</template>

<style scoped>
.rec {
  height: 50px;
  width: 50px;
  background-color: powderblue;
  position: relative;
  margin: 0;
  border: 1px solid #73ad21;
}
</style>