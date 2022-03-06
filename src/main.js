import { createApp } from "vue";
import App from "./App.vue";
import formInputBind from "./components/FormInputBind.vue";
import Watch from "./components/Watch.vue";
import UseFancyList from "./components/UseFancyList.vue";
import i18nPlugin from "./plugins/i18n";

const useFancyApp = createApp(UseFancyList);
useFancyApp.mount("#fancyList");
createApp(Watch).mount("#watch");
createApp(formInputBind).mount("#formInputBind");
const app = createApp(App);

app.directive("focus", {
  mounted: function (el) {
    el.focus();
  },
});

app.use(i18nPlugin, {
  greetings: {
    hello: "Bonjour!",
  },
});

app.mount("#app");
