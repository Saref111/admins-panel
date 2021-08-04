import Vue from "vue";
import App from "./App.vue";
import "../public/scss/style.scss";
// import ActionsHistory from "../src/components/ActionsHistory.vue";

window.moment.locale("ru");

Vue.config.productionTip = false;
Vue.prototype.$moment = window.moment;
Vue.prototype.$$ = window.jQuery;

// Vue.component("ActionsHistory", ActionsHistory);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
