<template>
  <section class="pagination">
    <ul class="pagination__list">
      <li
        v-for="(page, index) in getPagination"
        class="pagination__item"
        :class="{
          'pagination__item--current': page === data.current_page,
          'pagination__item--dots': !page.url,
        }"
        :key="index"
      >
        <a :href="page.url" :data-page="page" class="pagination__link">{{
          page.label
        }}</a>
      </li>
    </ul>
    <a
      v-if="data.next_page_url"
      :href="data.next_page_url"
      class="pagination__more-btn"
      >Дальше</a
    >
  </section>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    getPagination() {
      let reply = [];
      if (this.data.links) {
        reply = [...this.data.links];
        reply.shift();
        reply.pop();
      }
      return reply;
    },
  },
};
</script>
