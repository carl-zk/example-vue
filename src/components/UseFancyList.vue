<script>
import FancyList from "./FancyList.vue";
import FetchApp from "./FetchApp.vue";

export default {
  components: { FancyList, FetchApp },
};
</script>

<template>
  <FetchApp />
  <FancyList :api-url="url">
    <template #item="{ body, username, likes }">
      <div>
        <p>{{ body }}</p>
        <p>author: {{ username }} | {{ likes }} likes</p>
      </div>
    </template>
  </FancyList>
</template>
