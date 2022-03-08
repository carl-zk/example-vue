<script lang="ts" setup>
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
import { computed } from 'vue';
import { routes } from '../router/routes'

const menuRoutes = computed(() => {
  return routes.filter(item => !item.meta?.hidden)
})
</script>

<template>
  <el-menu default-active="2" router>
    <el-menu-item v-for="(r, index) in menuRoutes" :key="index" :index="r.path">
      <el-icon>
        <document />
      </el-icon>
      <span>{{ r.path }}</span>
    </el-menu-item>
  </el-menu>
</template>

