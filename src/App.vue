<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import SideBar from './components/SideBar.vue'

const router = useRouter()
const route = useRoute()

</script>

<template>
  <el-row>
    <el-col :span="4">
      <SideBar />
    </el-col>

    <el-col :span="20" class="router-view-container">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.router-view-container {
  position: relative;
}
</style>