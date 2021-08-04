<template>
  <section class="filters">
    <div class="filters__search">
      <input
        v-model="query"
        type="text"
        name="search"
        id="search"
        placeholder="Поиск"
        @input="search"
      />
      <button class="filters__search-btn" @click="clearQuery"></button>
    </div>
    <div class="filters__date-time">
      <label for="from-date" class="filters__label">Начиная с:</label>
      <input type="date" name="from-date" id="fromDate" v-model="fromDate" />
    </div>
    <div class="filters__date-time">
      <label for="to-date" class="filters__label">до:</label>
      <input type="date" name="to-date" id="toDate" v-model="toDate" />
    </div>
    <div class="filters__checked">
      Выбрано: <span>{{ checkedCount }}</span>
    </div>
    <button class="filters__btn filters__btn--min-width">
      Выгрузить в Excel
    </button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      fromDate: "",
      fromTime: "",
      toDate: "",
      toTime: "",
    };
  },
  props: {
    searchCallback: {
      type: Function,
      default: () => {},
    },
    checkedCount: {
      type: [String, Number],
      default: "0",
    },
    orderByLogin: {
      type: String,
      default: "asc",
    },
  },
  methods: {
    search() {
      const query = this.formQuery();
      this.searchCallback(query);
    },

    clearQuery() {
      this.query = "";
    },
    formQuery() {
      let query = "user_login_order=" + this.orderByLogin;
      if (this.query) {
        query = query + "&search=" + this.query;
      }
      if (this.fromDate || this.fromTime) {
        const time = this.fromDate
          ? new Date(this.fromDate + " " + this.fromTime)
          : new Date(this.fromTime);

        query = query + "&last_login_from=" + time.toISOString();
      }
      console.log(query);
      return query;
    },
  },
};
</script>
