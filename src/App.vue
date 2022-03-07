<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function toHome() {
  router.push("/")
}

</script>

<template>
  <button @click="toHome">Home</button>
  <p>
    <router-link to="/hello">hello</router-link>
    <br />
    <router-link to="/addName">addName</router-link>
  </p>

  <router-view></router-view>
</template>