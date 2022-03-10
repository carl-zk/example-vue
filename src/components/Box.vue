<script setup lang="ts">
import { ref, reactive, computed, toRefs, Ref, watch } from 'vue';
import { Position } from '../entity/entities';

const props = defineProps<{
  x: Ref,
  y: Ref
}>()

const i = ref(0)
const j = ref(0)

watch(props, () => {
  console.log(i)
  // console.log(props.x, props.y)
  // i.value = props.x.value
  // j.value = props.y.value
  // console.log(i, j)
})

</script>

<template>
  <div class="rec" :style="{ left: i, top: j }"></div>
</template>

<style scoped>
.rec {
  height: 50px;
  width: 50px;
  background-color: powderblue;
  position: absolute;
}
</style>