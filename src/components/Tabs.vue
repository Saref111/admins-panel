<template>
  <main class="page-main">
    <section class="breadcrumbs">
      <ul class="breadcrumbs__list">
        <li class="breadcrumbs__item">
          <a href="#" class="breadcrumbs__link">Пользователи</a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">Имя пользователя</a>
        </li>
      </ul>
    </section>
    <section class="user-tabs">
      <div class="user-tabs__controls">
        <ul class="user-tabs__list">
          <li class="user-tabs__item user-tabs__item--current">
            <button class="user-tabs__button">Общие данные</button>
          </li>
          <li class="user-tabs__item">
            <button class="user-tabs__button">Все отчеты</button>
          </li>
          <li class="user-tabs__item">
            <button class="user-tabs__button">История входов</button>
          </li>
        </ul>
        <button
          data-id="1123123"
          data-action="123131"
          class="user-tabs__block-button"
        >
          Заблокировать пользователя
        </button>
      </div>
      <ul class="user-tabs__tabs-list">
        <li class="tab">
          <ActionsHistory />
        </li>
        <li class="tab">
          <!-- <ActionsHistory /> -->
        </li>
        <li class="tab">
          <ActionsHistory />
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import ActionsHistory from "./ActionsHistory.vue";
export default {
  components: {
    ActionsHistory,
  },
};
</script>
