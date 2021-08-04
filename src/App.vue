<template>
  <div id="app">
    <AdminsList url="https://dsscommunity.staj.fun/api/admin/admins/lists" />
  </div>
</template>

<script>
import AdminsList from "./components/AdminsList.vue";

export default {
  name: "App",
  components: {
    AdminsList,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
