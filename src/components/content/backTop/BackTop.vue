<template>
  <div class="back-top" @click="topClick">
    <img src="../../../assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  methods: {
    topClick() {
      this.$emit("backTop");
    },
  },
};
</script>

<style scoped>
.back-top img {
  width: 50px;
  height: 50px;
}
</style>