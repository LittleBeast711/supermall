<template>
  <div class="check-button" :class="{ check: isChecked }" @click="selectItem">
    <img src="../../../assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    selectItem() {
      this.$emit("checkBtnClick");
    },
  },
};
</script>

<style scoped>
.check-button {
  position: relative;
  margin: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
  background-color: #eee;
  cursor: pointer;
}

.check {
  background-color: #c39;
  border-color: #c39;
}
</style>