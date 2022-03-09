<template>
  <div class="toast" v-show="isShow">
    <div>{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  // props: {
  //   msg: {
  //     type: String,
  //     default: "",
  //   },
  //   show: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  data() {
    return {
      msg: "",
      isShow: false,
    };
  },
  methods: {
    show(msg, duration = 1000) {
      this.isShow = true;
      this.msg = msg;

      setTimeout(() => {
        this.isShow = false;
        this.msg = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;

  color: aliceblue;
  background-color: rgba(0, 0, 0, 0.7);

  z-index: 10;
}
</style>