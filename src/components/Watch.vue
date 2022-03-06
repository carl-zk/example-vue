<script>
import TemplateRef from "./TemplateRef.vue";

export default {
  data() {
    return {
      question: "",
      answer: "questions usually contain a question mark. ;-)",
    };
  },
  watch: {
    question(newQuestion, oldQuestion) {
      if (newQuestion.indexOf("?") > -1) {
        this.getAnswer();
      }
    },
  },
  methods: {
    async getAnswer() {
      this.answer = "Thinking...";
      try {
        const res = await fetch("https://yesno.wtf/api");
        this.answer = (await res.json()).answer;
      } catch (error) {
        this.answer = "Error! Could not reach the API. " + error;
      }
    },
  },
  components: { TemplateRef },
};
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
  <TemplateRef />
</template>
