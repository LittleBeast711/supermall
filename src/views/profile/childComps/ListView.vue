<template>
  <div class="list">
    <div v-for="(item, index) in listData" :key="index" class="item">
      <span class="icon">
        <img :src="iconURL(item)" alt="" />
      </span>
      <div class="info">{{ item.info }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: {
    listData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    iconURL(item) {
      return require("@/assets/img/profile/" + item.icon);
    },
  },
};
</script>

<style scoped>
.list {
  background-color: #fff;
  font: 13px;
  color: #333;
}
.list .item {
  height: 44px;
  line-height: 44px;
  position: relative;
}
.item .icon {
  margin-top: 10px;
  position: absolute;
  left: 16px;
  top: -7px;
}
.icon img {
  width: 20px;
  height: 20px;
}
.item .info {
  margin-left: 40px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding-left: 5px;
}
.item:last-of-type .info {
  border-bottom: none;
}
</style>