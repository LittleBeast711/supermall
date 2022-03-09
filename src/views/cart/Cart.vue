<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <div slot="center">Cart({{ cartCount }})</div>
    </nav-bar>
    <scroll :probe-type="3" ref="scroll" class="content" :pull-up-load="true">
      <cart-list class="cart-list" :cart-list="cartList" />
    </scroll>
    <bottom-bar />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";

import CartList from "./childComps/CartList";
import BottomBar from "./childComps/BottomBar";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    BottomBar,
    Scroll,
  },
  computed: {
    // cartList() {
    //   return this.$store.getters.cartList;
    // },
    // cartCount() {
    //   return this.$store.getters.cartCount;
    // },

    //两种写法
    ...mapGetters(["cartList", "cartCount"]),
    /***
     * ...mapGetters({
     *    count:'cartCount,
     *    list:'cartList,
     * })
     */
  },
  watch: {
    cartList: function () {
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    },
  },
};
</script>

<style scoped>
#cart {
  height: 100vh;
  position: relative;
}
.cart-nav {
  background-image: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 93px;
  left: 0;
  right: 0;
}
</style>