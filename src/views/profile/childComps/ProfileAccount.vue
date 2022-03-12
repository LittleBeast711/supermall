<template>
  <section class="account">
    <div class="account-item">
      <div class="number"><span class="balance">0.00</span>元</div>
      <div class="account-info">我的余额</div>
    </div>
    <div class="account-item">
      <div class="number"><span class="balance">0</span>个</div>
      <div class="account-info">我的优惠</div>
    </div>
    <div class="account-item">
      <div class="number"><span class="balance">0</span>分</div>
      <div class="account-info">我的积分</div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProfileAccount",
  //这个后续会修改，余额、优惠、积分都会传一些参数
};
</script>

<style scoped>
.account {
  display: flex;
}
.account-item {
  width: 100%;
  background-color: #fff;
  margin-right: 1px;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);

  color: #666;
  font-size: 13px;
  padding: 18px;
}
.account-item:last-of-type {
  margin-right: 0;
  border: 0;
}
.account-item .balance {
  font-size: 26px;
  font-weight: 700;
  color: #ff5f3e;
  padding: 5px;
}
.account-info {
  margin-top: 6px;
}
</style>