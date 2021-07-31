const list = new Vue({
  el: "#list",
  data: {
    query: "",
    beginDate: "",
    endDate: "",
    beginTime: "",
    endTime: "",
    data: [],
    rawData: {},
  },
  async beforeMount() {
    const res = await $.ajax(
      "https://dsscommunity.staj.fun/api/admin/admins/lists"
    );

    this.rawData = res.data;
    this.data = res.data.data;
  },
  methods: {
    set(e) {
      this.beginDate = e.target.value;
    },
  },
});
