<script>
import { nextTick } from "vue";
import BlogPost from "./components/BlogPost.vue";
import myComponent from "./components/MyComponent.vue";
import MyComponent from "./components/MyComponent.vue";
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
      isActive: true,
      error: null,
      posts: [
        { id: 1, title: "my journey with vue" },
        { id: 2, title: "my journey with vue" },
        { id: 3, title: "my journey with vue" },
      ],
      postFontSize: 1,
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
  // 计算属性，属性更新才会重新计算
  computed: {
    publishedBooksMessage() {
      return this.deepObj.arr.length > 0 ? "YES" : "NO";
    },
    classObject() {
      return {
        active: this.isActive && !this.error,
        "text-danger": this.error && this.error.type === "false",
      };
    },
  },
  components: { BlogPost, MyComponent },
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
  <br />
  <span>{{ publishedBooksMessage }}</span>
  <br />
  <!-- 类与样式绑定 -->
  <div :class="classObject">lalala</div>
  <br />
  <div :style="{ fontSize: postFontSize + 'em' }">
    <BlogPost title="我的博客" />
    <BlogPost
      @enlarge-text="postFontSize += 0.1"
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
    />
  </div>
  <br />
  <MyComponent class="baz boo"></MyComponent>
</template>