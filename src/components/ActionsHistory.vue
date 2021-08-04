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
            <dl class="user-list__actions">
              <div class="user-list__action-wrapper">
                Создан тип отчета:

                <a href="#" class="user-list__action-link">Название типа</a>
              </div>
              <div class="user-list__action-wrapper">
                Телефон:

                <a
                  href="tel:12312312"
                  class="user-list__action-link user-list__action-link--tel"
                  >123123123</a
                >
              </div>
              <div class="user-list__action-wrapper">Добавлено фото</div>
              <div class="user-list__action-wrapper">Удалено фото</div>
              <div class="user-list__action-wrapper">
                Имя <del>Ivan</del> <ins>John</ins>
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
      actions: [
        {
          id: 1,
          datetime: {
            ___$isLiteral: true,
            ___$string: "undefined()",
          },
          type: "user_change",
          target_id: 1,
          user_name: "Пётр",
          action: {
            fields: {
              phone: {
                new: "+38098000000",
              },
              photo: "added",
              name: {
                old: "Иван",
                new: "Пётр",
              },
            },
          },
        },
        {
          id: 2,
          datetime: {
            ___$isLiteral: true,
            ___$string: "undefined()",
          },
          type: "user_blocked",
          user_name: "Пётр",
          action: {
            target_id: 1,
          },
        },
        {
          id: 3,
          datetime: {
            ___$isLiteral: true,
            ___$string: "undefined()",
          },
          type: "user_change",
          target_id: 1,
          user_name: "Пётр",
          action: {
            fields: {
              photo: "removed",
              name: {
                new: "Иван",
              },
            },
          },
        },
        {
          id: 4,
          datetime: {
            ___$isLiteral: true,
            ___$string: "undefined()",
          },
          type: "user_change",
          target_id: 12,
          user_name: "Имя админ - ник админа",
          action: {
            fields: {
              permissions_granted: "Приглашение админа",
              permissions_declined: "Удаление админа",
            },
          },
        },
      ],
    };
  },
};
</script>
