<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="darkcyan">
      <img
        slot="item-icon"
        src="@/assets/img/tabbar/shouye1.png"
        alt=""
      />
      <img
        slot="item-icon-active"
        src="@/assets/img/tabbar/shouye2.png"
        alt=""
      />

      <div slot="item-text">Home</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="darkcyan">
      <img
        slot="item-icon"
        src="@/assets/img/tabbar/fenlei1.png"
        alt=""
      />
      <img
        slot="item-icon-active"
        src="@/assets/img/tabbar/fenlei2.png"
        alt=""
      />

      <div slot="item-text">Category</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="darkcyan">
      <img
        slot="item-icon"
        src="@/assets/img/tabbar/gouwuche1.png"
        alt=""
      />
      <img
        slot="item-icon-active"
        src="@/assets/img/tabbar/gouwuche2.png"
        alt=""
      />

      <div slot="item-text">Cart</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="darkcyan">
      <img slot="item-icon" src="@/assets/img/tabbar/wode1.png" alt="" />
      <img
        slot="item-icon-active"
        src="@/assets/img/tabbar/wode2.png"
        alt=""
      />

      <div slot="item-text">Profile</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "../../common/tabbar/TabBar";
import TabBarItem from "../../common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style>
</style>