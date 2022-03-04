<script>
export default {
  props: ["title"],
};
</script>

<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">放大文字</button>
  </div>
</template>