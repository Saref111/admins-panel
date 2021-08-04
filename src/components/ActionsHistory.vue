<template>
  <section class="user-list">
    <FiltersPlain />
    <div class="user-list__table">
      <div class="user-list__tr user-list__tr--heading">
        <div class="user-list__th">
          <input
            class="user-list__checkbox user-list__checkbox--all"
            type="checkbox"
            name="all-checked"
            id="all-checked"
          />
          <label
            for="all-checked"
            class="user-list__th-label user-list__th-label--checkbox"
          >
          </label>
        </div>
        <div class="user-list__th user-list__th--date-first">
          <span class="user-list__th-label">
            <button
              class="user-list__sort-btn user-list__sort-btn--increment"
            ></button>
            <button
              class="user-list__sort-btn user-list__sort-btn--decrement"
            ></button>
            Дата создания
          </span>
        </div>
        <div class="user-list__th user-list__th--action">
          <span class="user-list__th-label"> Действие </span>
        </div>
      </div>
      <div class="user-list__wrapper">
        <div v-for="(action, idx) in actions" :key="idx" class="user-list__tr">
          <div class="user-list__td user-list__td--empty user-list__td--pt">
            <input
              class="user-list__checkbox"
              type="checkbox"
              name="admins"
              :id="'check-' + action.id"
            />
            <label
              :for="'check-' + action.id"
              class="user-list__checkbox-label"
            >
            </label>
          </div>
          <div
            class="
              user-list__td--date-first
              user-list__td
              user-list__td--wrap
              user-list__td--small-text
            "
          >
            <time datetime="2020-07-12 23:45" class="user-list__time"
              >12 июня 2020 23:45</time
            >
            день назад
          </div>
          <div class="user-list__td--action user-list__td">
            <dl v-if="action.type === 'user_change'" class="user-list__actions">
              <div class="user-list__action-wrapper">
                Изменен пользователь:

                <a href="#" class="user-list__action-link"
                  >id{{ action.target_id + "(" + action.user_name + ")" }}</a
                >
              </div>
              <div
                v-if="action.action.fields.phone"
                class="user-list__action-wrapper"
              >
                Телефон:

                <a
                  :href="'tel:' + action.action.fields.phone.new"
                  class="user-list__action-link user-list__action-link--tel"
                  >{{ action.action.fields.phone.new }}</a
                >
              </div>
              <div
                v-if="action.action.fields.photo === 'added'"
                class="user-list__action-wrapper"
              >
                Добавлено фото
              </div>
              <div
                v-if="action.action.fields.photo === 'removed'"
                class="user-list__action-wrapper"
              >
                Удалено фото
              </div>
              <div v-if="isName(action)" class="user-list__action-wrapper">
                Имя <del>{{ action.action.fields.name.old }}</del>
                <ins>{{ action.action.fields.name.new }}</ins>
              </div>
            </dl>
            <dl
              v-if="action.type === 'user_blocked'"
              class="user-list__actions"
            >
              <div class="user-list__action-wrapper">
                Пользователь заблокирован:

                <a href="#" class="user-list__action-link"
                  >id{{
                    action.action.target_id + "(" + action.user_name + ")"
                  }}</a
                >
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <Pagination :data="{}" />
  </section>
</template>

<script>
import Pagination from "./Pagination.vue";
import FiltersPlain from "./FiltersPlain.vue";
export default {
  components: {
    Pagination,
    FiltersPlain,
  },

  data() {
    return {
      actions: [],
      // actions: JSON.parse(
      //   '[{"id":6,"user_id":1,"type":"admin_changed","target_id":2,"action":"{"fields":{"permissions_declined":["\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u0442\u0438\u043f\u0430 \u043e\u0442\u0447\u0435\u0442\u0430","\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u0442\u0438\u043f\u0430 \u043e\u0442\u0447\u0435\u0442\u0430"]}}","created_at":"2021-08-04T11:41:23.000000Z","updated_at":"2021-08-04T11:41:23.000000Z","user_name":"Prof. Tristin Thompson Sr. Verla Reinger I - lazaro.romaguera"},{"id":5,"user_id":1,"type":"admin_changed","target_id":2,"action":"{"fields":{"permissions_granted":["\\u0421\\u043e\\u0437\\u0434\\u0430\\u043d\\u0438\\u0435 \\u0442\\u0438\\u043f\\u0430 \\u043e\\u0442\\u0447\\u0435\\u0442\\u0430","\\u0420\\u0435\\u0434\\u0430\\u043a\\u0442\\u0438\\u0440\\u043e\\u0432\\u0430\\u043d\\u0438\\u0435 \\u0448\\u0430\\u0433\\u0430","\\u0420\\u0435\\u0434\\u0430\\u043a\\u0442\\u0438\\u0440\\u043e\\u0432\\u0430\\u043d\\u0438\\u0435 \\u043f\\u043e\\u043b\\u0435\\u0439 \\u0432\\u043d\\u0443\\u0442\\u0440\\u0438 \\u0448\\u0430\\u0433\\u0430"]}}","created_at":"2021-08-04T10:35:34.000000Z","updated_at":"2021-08-04T10:35:34.000000Z","user_name":"Prof. Tristin Thompson Sr. Verla Reinger I - lazaro.romaguera"},{"id":4,"user_id":1,"type":"admin_changed","target_id":2,"action":"{"fields":{"permissions_declined":["\\u0420\\u0435\\u0434\\u0430\\u043a\\u0442\\u0438\\u0440\\u043e\\u0432\\u0430\\u043d\\u0438\\u0435 \\u0442\\u0438\\u043f\\u0430 \\u043e\\u0442\\u0447\\u0435\\u0442\\u0430"]}}","created_at":"2021-08-04T10:35:28.000000Z","updated_at":"2021-08-04T10:35:28.000000Z","user_name":"Prof. Tristin Thompson Sr. Verla Reinger I - lazaro.romaguera"},{"id":3,"user_id":1,"type":"admin_changed","target_id":2,"action":"{"fields":{"second_name":{"old":"Verla Reinger II","new":"Verla Reinger I"},"phone":{"old":"445-568-6348","new":"445-568-634"}}}","created_at":"2021-08-04T10:07:36.000000Z","updated_at":"2021-08-04T10:07:36.000000Z","user_name":"Prof. Tristin Thompson Sr. Verla Reinger I - lazaro.romaguera"},{"id":2,"user_id":1,"type":"user_change","target_id":2,"action":"{"fields":{"phone":{"old":"445-568-634","new":"445-568-6348"}}}","created_at":"2021-08-04T10:04:02.000000Z","updated_at":"2021-08-04T10:04:02.000000Z","user_name":"Prof. Tristin Thompson Sr."},{"id":1,"user_id":1,"type":"user_change","target_id":2,"action":"{"fields":{"phone":{"old":"445-568-6348","new":"445-568-634"}}}","created_at":"2021-08-04T09:45:59.000000Z","updated_at":"2021-08-04T09:45:59.000000Z","user_name":"Prof. Tristin Thompson Sr."}],"first_page_url":"http:\/\/dss\/admin\/admins\/1\/action-history?page=1","from":1,"last_page":1,"last_page_url":"http:\/\/dss\/admin\/admins\/1\/action-history?page=1","links":[{"url":null,"label":"« Previous","active":false},{"url":"http:\/\/dss\/admin\/admins\/1\/action-history?page=1","label":"1","active":true},{"url":null,"label":"Next »","active":false}],"next_page_url":null,"path":"http:\/\/dss\/admin\/admins\/1\/action-history","per_page":12,"prev_page_url":null,"to":6,"total":6}'
      // ),
    };
  },
  methods: {
    getType(type) {
      let reply = "";

      switch (true) {
        case type === "user_change":
          reply = "";
      }
      return reply;
    },
    isName(data) {
      return (
        data.action.fields &&
        data.action.fields.name &&
        data.action.fields.name.new &&
        data.action.fields.name.old
      );
    },
  },
};
</script>
