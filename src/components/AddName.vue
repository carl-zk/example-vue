<script setup lang="ts">
import { reactive, ref, watch } from 'vue'

interface Person {
  name: String,
  isStudent: boolean
}

const msg = 'type name and mark who is student'
const personName = ref('')
const personArr = reactive(Array<Person>())

watch(personArr, (newpersonArr) => {
  console.log('personArr.length : ' + newpersonArr.length)
})

function insert() {
  personArr.push({
    name: personName.value,
    isStudent: false
  })
  personName.value = ''
}

function mark(p: Person) {
  p.isStudent = !p.isStudent
}

function remove(index: number) {
  personArr.splice(index, 1)
}
</script>

<template>
  <h2 v-html="msg"></h2>
  <input type="text" v-model="personName" @keyup.enter="insert" />
  <ul>
    <li
      v-for="(item, index) in personArr"
      :key="index"
      :class="{ isStudent: item.isStudent }"
      @click="mark(item)"
      @contextmenu.prevent.stop="remove(index)"
    >{{ item }}</li>
  </ul>
</template>

<style>
.isStudent {
  color: red;
}
li:hover {
  cursor: pointer;
  user-select: none;
}
</style>