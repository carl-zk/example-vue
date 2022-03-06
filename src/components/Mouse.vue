<script setup>
import { useMouse } from "./mouse.js";

const { x, y } = useMouse();
</script>

<template>mouse position is at: {{ x }}, {{ y }}</template>
