<script setup>
import { ref, computed } from "vue";
import { useFetch } from "./fetch";
import { inject } from "vue";

// const i18n = inject("i18n");

const baseUrl = "https://jsonplaceholder.typicode.com/todos/";
const id = ref("1");
const url = computed(() => baseUrl + id.value);

const { data, error, retry } = useFetch(url);
</script>

<template>
  <!-- <p>{{ i18n.greetings.hello }}</p> -->
  Load post id:
  <button v-for="i in 5" @click="id = i" :key="i">{{ i }}</button>

  <div v-if="error">
    <p>Oops! Error encountered: {{ error.message }}</p>
    <button @click="retry">Retry</button>
  </div>

  <div v-else-if="data">
    Data loaded:
    <pre>{{ data }}</pre>
  </div>

  <div v-else>Loading...</div>
</template>
