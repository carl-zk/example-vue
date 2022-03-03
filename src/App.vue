<script>
import { nextTick } from "vue";
// import { debounce } from "lodash-es";

export default {
  // data() 返回的属性将会成为响应式的状态
  // 并且暴露在 `this` 上
  data() {
    return {
      count: 0,
      msg: "Hello",
      isButtonDisabled: true,
      objectOfAttrs: {
        id: "container",
        class: "wrapper",
      },
      // 深层响应
      deepObj: {
        nested: { count: 0 },
        arr: ["foo", "bar"],
      },
    };
  },

  // methods 是一些用来更改状态与触发更新的函数
  // 它们可以在模板中作为事件监听器绑定
  methods: {
    increment() {
      nextTick(() => {
        // 打印 count++ 后的值
        console.log("after dom updated: " + this.count);
      });
      this.count++;
    },
    calcId(id) {
      return id + 3;
    },
    formatDate(date) {
      return "格式化日期: " + date;
    },
    mutateDeeply() {
      this.deepObj.nested.count++;
      this.deepObj.arr.push("baz");
    },
  },

  // 生命周期钩子会在组件生命周期的各个不同阶段被调用
  // 例如这个函数就会在组件挂载完成后被调用
  mounted() {
    console.log(`The initial count is ${this.count}.`);
  },
  created() {
    // 有状态的方法
    // this.debouncedClick = _.debounce(this.click, 500);
  },
  unmounted() {
    // 组件卸载时清除
    // this.debouncedClick.cancel();
  },
};
</script>

<template>
  <button @click="increment">count is: {{ count }}</button>
  <br />
  <span>Message: {{ msg }}</span>
  <br />
  <button :disabled="isButtonDisabled">Buttion</button>
  <br />
  <!-- 一次绑定多个 attrs -->
  <div v-bind="objectOfAttrs">ff</div>
  <br />
  <span :title="calcId(2)">{{ formatDate(123) }}</span>
  <br />
  <span @click="mutateDeeply"
    >深层响应 click me： {{ deepObj.nested.count }}</span
  >
</template>