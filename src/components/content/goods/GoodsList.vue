<template>
  <grid-view>
    <goods-list-item
      v-for="(item, index) in goods"
      :goods-item="item"
      :key="index"
    />
  </grid-view>
</template>

<script>
import GridView from "@/components/common/gridview/GridView";
import GoodsListItem from "./GoodsListItem.vue";

export default {
  name: "Goods",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsListItem,
    GridView,
  },
};
</script>

<style scoped>
</style>