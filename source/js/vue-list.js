const ROUTES = {
  ADMINS: "https://dsscommunity.staj.fun/api/admin/admins/lists",
  USERS: "https://dsscommunity.staj.fun/api/admin/users/lists",
};
const getRoute = () => {
  const pageName = document.querySelector("MAIN").id;
  console.log(pageName);

  return ROUTES[pageName.toUpperCase()];
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
  },
  async beforeMount() {
    console.log(getRoute());
    const res = await $.ajax(getRoute(), {
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json; charset=utf-8",
      },
    });

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

      if (this.checked < 0) {
        this.checked = 0;
      }
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
