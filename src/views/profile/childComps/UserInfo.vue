<template>
  <div class="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <img
          src="../../../assets/img/profile/avatar.svg"
          class="privateImage left"
          alt=""
        />
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <img
              src="../../../assets/img/profile/phone.svg"
              class="icon-mobile"
              alt=""
            />
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <img
        src="../../../assets/img//common/arrow-left.svg"
        class="arrow right"
        alt=""
      />
    </a>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
};
</script>

<style scoped>
.user-info {
  background-image: var(--color-tint);
  padding: 15px;
  margin-top: -15px;
}
.privateImage {
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 50%;
}
.left {
  float: left;
}
.arrow {
  width: 15px;
  height: 15px;
  margin-top: 20px;
}
.login-info {
  color: #fff;
  margin: 10px 0 0 10px;
}
.phone {
  position: relative;

  font-size: 13px;
  margin-top: 5px;
  margin-left: 15px;
  font-weight: 300;
}
.icon-mobile {
  position: absolute;
  width: 20px;
  height: 16px;
  left: -20px;
  top: 0;
}
</style>