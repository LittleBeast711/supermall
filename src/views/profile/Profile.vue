<template>
  <div id="profile">
    <nav-bar class="profile-nav"><div slot="center">Profile</div></nav-bar>
    <UserInfo />
    <profile-account />
    <list-view :list-data="orderList" class="list"></list-view>
    <list-view :list-data="serviceList" class="list"></list-view>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

import UserInfo from "./childComps/UserInfo";
import ProfileAccount from "./childComps/ProfileAccount";
import ListView from "./childComps/ListView";

export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    ProfileAccount,
    ListView,
  },
  data() {
    return {
      orderList: [
        { icon: "message.svg", info: "我的消息" },
        { icon: "pointer.svg", info: "积分商城" },
        { icon: "vip.svg", info: "会员卡" },
      ],
      serviceList: [
        { icon: "cart.svg", info: "我的购物车" },
        {
          icon: "download.svg",
          info: "下载购物APP",
        },
      ],
    };
  },
};
</script>

<style scoped>
#profile {
  background-color: #eee;
}
.profile-nav {
  background-image: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
.list {
  margin-top: 12px;
}
</style>