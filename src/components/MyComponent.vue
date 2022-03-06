<script>
export default {
  data() {
    return {
      awesome: true,
      ok: true,
      items: [{ msg: "foo" }, { msg: "bar" }],
      numbers: [1, 2, 3, 4, 5],
      name: "Vue.js",
    };
  },
  computed: {
    eventNumbers() {
      return this.numbers.filter((n) => n % 2 == 0);
    },
  },
  methods: {
    greet(event) {
      alert(`Hello ${this.name}!`);
      if (event) {
        alert(event.target.tagName);
      }
    },
  },
};
</script>

<template>
  <p class="foo bar">Hi</p>
  <br />
  <template v-if="ok">
    <!-- 条件渲染 -->
    <button @click="awesome = !awesome">Toggle</button>
    <h1 v-if="awesome">Vue is awesome</h1>
    <h1 v-else>On no 😢</h1>
    <h3 v-show="!awesome">lalala</h3>
    <li v-for="(item, index) in items" :key="index">{{ item.msg }}</li>
  </template>
  <ul>
    <template v-for="item in items" :key="item.id">
      <li>{{ item.msg }}</li>
      <li class="divider" role="presentation"></li>
    </template>
  </ul>

  <li v-for="n in eventNumbers" :key="n.id">{{ n }}</li>

  <button @click="greet">Greet</button>
</template>
