const list = new Vue({
  el: "#list",
  data: {
    query: "",
    fromDate: "",
    toDate: "",
    fromTime: "",
    toTime: "",
    data: [],
    rawData: {},
    checked: 0,
  },
  async beforeMount() {
    const res = await $.ajax(
      "https://dsscommunity.staj.fun/api/admin/admins/lists"
    );

    this.rawData = res.data;
    this.data = res.data.data;
  },
  mounted() {
    window.addEventListener("set-date", (e) => {
      this[e.detail.id] = e.detail.date;
    });
    window.addEventListener("set-time", (e) => {
      this[e.detail.id] = e.detail.time;
    });
  },
  methods: {
    checkUnit(e) {
      if (e.target.checked) {
        this.checked++;
      } else {
        this.checked--;
      }
    },
  },
});
