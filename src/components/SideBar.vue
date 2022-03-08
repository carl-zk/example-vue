<script lang="ts" setup>
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
import { routes } from '../router/routes'
</script>

<template>
  <el-menu default-active="2" router>
    <el-menu-item v-for="(r, index) in routes" :key="index" :index="r.path">
      <el-icon>
        <document />
      </el-icon>
      <span>{{ r.name }}</span>
    </el-menu-item>
  </el-menu>
</template>

