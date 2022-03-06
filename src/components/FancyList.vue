<script>
import Mouse from "./Mouse.vue";

export default {
  data() {
    return {
      items: [
        { body: "llll", username: "lucy", likes: 30 },
        { body: "fdsdfs", username: "rose", likes: 50 },
      ],
    };
  },
  components: { Mouse },
};
</script>

<template>
  <Mouse />
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot name="item" v-bind="item"></slot>
    </li>
  </ul>
</template>
