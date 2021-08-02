const ROUTES = {
  ADMINS: "https://dsscommunity.staj.fun/api/admin/admins/lists",
  USERS: "https://dsscommunity.staj.fun/api/admin/users/lists",
};
const getRoute = (query) => {
  const pageName = document.querySelector("MAIN").id;

  return query
    ? ROUTES[pageName.toUpperCase()] + "?" + query
    : ROUTES[pageName.toUpperCase()];
};

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
    orderByLogin: "asc",
  },
  async beforeMount() {
    const res = await this.sendRequest();

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
      this.checked = 0;
      document.querySelectorAll("[name='admins']").forEach((it) => {
        if (it.checked) {
          this.checked++;
        }
      });
    },
    setAllCheckboxes() {
      this.checked = 0;
    },
    handleIdClick(e) {
      console.log(e);
    },
    moment(args) {
      return moment(args);
    },
    async search() {
      if (this.query.length > 2) {
        const query = this.formQuery();
        const resp = await this.sendRequest(query);
        this.rawData = resp.data;
        this.data = resp.data.data;
      }
    },
    async sendRequest(query) {
      const resp = await $.ajax(getRoute(query), {
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      return { ...resp };
    },
    formQuery() {
      let query = "user_login_order=" + this.orderByLogin;
      if (this.query) {
        query = query + "&search=" + this.query;
      }
      return query;
    },
    setOrderByLogin(e) {
      this.orderByLogin = e.target.value;
      const query = this.formQuery();
      this.sendRequest(query);
    },
    clearQuery() {
      this.query = "";
    },
  },

  computed: {
    getPagination() {
      let reply = [];
      if (this.rawData.links) {
        reply = [...this.rawData.links];
        reply.shift();
        reply.pop();
      }
      return reply;
    },
  },
});
