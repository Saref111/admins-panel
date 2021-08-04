<template>
  <div id="app">
    <AdminsList url="https://dsscommunity.staj.fun/api/admin/admins/lists" />
    <!-- <Tabs></Tabs> -->
  </div>
</template>

<script>
import AdminsList from "./components/AdminsList.vue";
// import Tabs from "./components/Tabs.vue";

export default {
  name: "App",
  components: {
    AdminsList,
  },
};
</script>
