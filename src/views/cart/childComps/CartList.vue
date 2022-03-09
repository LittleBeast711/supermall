<template>
  <div class="cart-list">
    <cart-list-item
      v-for="item in cartList"
      :key="item.iid"
      :item-info="item"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CartListItem from "./CartListItem.vue";

export default {
  name: "CartList",
  components: {
    CartListItem,
  },
  // props: {
  //   cartList: {
  //     type: Array,
  //     default() {
  //       return [];
  //     },
  //   },
  // },
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>

<style scoped>
</style>