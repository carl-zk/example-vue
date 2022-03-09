<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { Position } from '../entity/entities';

const p = reactive({ x: 0, y: 0 })

const pos = computed(() => {

})

function move(dx: number, dy: number) {

}

</script>

<template>
  <a class="rec"></a>
</template>

<style scoped>
.rec {
  height: 50px;
  width: 50px;
  background-color: powderblue;
}
</style>