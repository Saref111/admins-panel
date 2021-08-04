<template>
  <section class="user-list">
    <FiltersPlain :checkedCount="checked" />
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
              @input="checkUnit"
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
            <time :datetime="action.datetime" class="user-list__time">{{
              $moment(action.datetime).format("DD MMMM YYYY hh:mm")
            }}</time>
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
            <dl
              v-if="action.type === 'admin_change'"
              class="user-list__actions"
            >
              <div
                v-if="action.action.fields.permissions_declined"
                class="user-list__action-wrapper"
              >
                Администратор удален:

                <a href="#" class="user-list__action-link"
                  >id{{ action.target_id + "(" + action.user_name + ")" }}</a
                >
              </div>
              <div
                v-if="action.action.fields.permissions_granted"
                class="user-list__action-wrapper"
              >
                Администратор приглашен:

                <a href="#" class="user-list__action-link"
                  >id{{ action.target_id + "(" + action.user_name + ")" }}</a
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
      checked: 0,
    };
  },
  async beforeMount() {
    const r = await this.$$.ajax(
      "https://dsscommunity.staj.fun/api/admin/admins/1/action-history"
    );
    this.actions = r.data.map((it) => {
      it.action = JSON.parse(it.action);
      return it;
    });
    return;
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
