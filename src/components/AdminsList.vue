<template>
  <section class="user-list">
    <admin-filter
      :checkedCount="checked"
      :search-callback="search"
      :orderByLogin="orderByLogin"
    />
    <div class="user-list__table">
      <div class="user-list__tr user-list__tr--heading">
        <div class="user-list__th user-list__th--id">
          <input
            class="user-list__checkbox user-list__checkbox--all"
            type="checkbox"
            name="all-checked"
            id="all-checked"
            @change="setAllCheckboxes"
          />
          <label
            for="all-checked"
            class="user-list__th-label user-list__th-label--checkbox"
          >
            ID
          </label>
        </div>
        <div class="user-list__th user-list__th--user">
          <span class="user-list__th-label"> Пользователь </span>
        </div>
        <div class="user-list__th user-list__th--mail">
          <span class="user-list__th-label"> Почта </span>
        </div>
        <div class="user-list__th user-list__th--tel">
          <span class="user-list__th-label"> Телефон </span>
        </div>
        <div class="user-list__th user-list__th--date">
          <span class="user-list__th-label">
            <button
              value="desc"
              class="user-list__sort-btn user-list__sort-btn--increment"
              :class="{
                'user-list__sort-btn--active': orderByLogin === 'desc',
              }"
              @click="setOrderByLogin"
            ></button>
            <button
              value="asc"
              @click="setOrderByLogin"
              :class="{ 'user-list__sort-btn--active': orderByLogin === 'asc' }"
              class="user-list__sort-btn user-list__sort-btn--decrement"
            ></button>
            Дата послед. входа
          </span>
        </div>
      </div>
      <div class="user-list__wrapper">
        <div v-for="admin in data" :key="admin.id" class="user-list__tr">
          <div class="user-list__td user-list__td--pt">
            <input
              class="user-list__checkbox"
              type="checkbox"
              name="admins"
              :id="'check-' + admin.id"
              @input="checkUnit"
            />
            <label :for="'check-' + admin.id" class="user-list__checkbox-label">
            </label>
            <a class="user-list__link"> {{ admin.id }} </a>
          </div>
          <div class="user-list__td">
            <div class="user-list__avatar">
              <img src="" alt="" />
            </div>

            <p class="user-list__name">
              {{ admin.user_name }}
              <span>{{ admin.name }}</span>
            </p>
          </div>
          <div class="user-list__td">
            <a
              class="user-list__contact-info"
              :href="'mailto:' + admin.email"
              >{{ admin.email }}</a
            >
          </div>
          <div class="user-list__td">
            <a class="user-list__contact-info" :href="'tel:' + admin.phone">{{
              admin.phone.startsWith("+") ? admin.phone : "+" + admin.phone
            }}</a>
          </div>
          <div
            class="
              user-list__td
              user-list__td--date-admin
              user-list__td--wrap
              user-list__td--small-text
            "
          >
            <time datetime="2020-07-12 23:45" class="user-list__time"
              >{{ $moment(admin.lastLoginAt).format("DD MMM YYYY hh:mm") }}
            </time>
            день назад
          </div>
        </div>
      </div>
    </div>
    <Pagination :data="rawData" />
  </section>
</template>

<script>
import adminFilters from "./Filters.vue";
import pag from "./Pagination.vue";

export default {
  name: 'AdminList',
  props: {
    url: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      query: "",
      fromDate: "",
      fromTime: "",
      toDate: "",
      toTime: "",
      data: [],
      rawData: {},
      checked: 0,
      orderByLogin: "acs",
    };
  },
  async beforeMount() {
    const query = "user_login_order=asc";
    const res = await this.sendRequest(query);

    this.rawData = res.data;
    this.data = res.data.data;
  },
  methods: {
    checkUnit(e) {
      this.checked = 0;
      e.target
        .closest("section")
        .querySelectorAll("[name='admins']")
        .forEach((it) => {
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
    async search(query) {
      const resp = await this.sendRequest(query);
      this.rawData = resp.data;
      this.data = resp.data.data;
    },
    async sendRequest(query) {
      const resp = await this.$$.ajax(this.url + "?" + query, {
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      return { ...resp };
    },
    setOrderByLogin(e) {
      this.orderByLogin = e.target.value;
      const query = this.formQuery();
      this.sendRequest(query);
    },
  },
  components: {
    "admin-filter": adminFilters,
    Pagination: pag,
  },
};
</script>
