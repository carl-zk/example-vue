<script>
export default {
  data() {
    return {
      list: ["a", "b", "c"],
    };
  },
  mounted() {
    this.$refs.input.focus();
    console.log(this.$refs.items);
  },
};
</script>

<template>
  <input ref="input" placeholder="default focus" />
  <ul>
    <li v-for="item in list" ref="items" :key="item.id">
      {{ item }}
    </li>
  </ul>
</template>
