import Vue from "vue";
import App from "./App.vue";
import "../public/scss/style.scss";

window.moment.locale("ru");

Vue.config.productionTip = false;
Vue.prototype.$moment = window.moment;
Vue.prototype.$$ = window.jQuery;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
