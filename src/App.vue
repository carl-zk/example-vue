<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import SideBar from './components/SideBar.vue'

const router = useRouter()
const route = useRoute()

function toHome() {
  router.push("/")
}

</script>

<template>
  <el-row>
    <el-col :span="4">
      <SideBar />
    </el-col>

    <el-col :span="20">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>