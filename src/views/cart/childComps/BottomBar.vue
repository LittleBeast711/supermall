<template>
  <div class="bottom-menu">
    <CheckButton
      class="select-all"
      :is-checked="isSelectAll"
      @checkBtnClick="checkBtnClick"
    />
    <span>全选</span>
    <span class="total-price">合计：￥{{ totalPrice }}</span>
    <span class="buy-product">结账：({{ totalCount }})</span>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "BottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartCount", "cartList"]),
    totalPrice() {
      return (
        this.cartList
          //过滤器 被选中的
          .filter((item) => {
            return item.checked;
          })
          //累加器
          .reduce((preValue, item) => {
            return preValue + item.count * item.price;
            //0是传递给参数的初始值，此处是价格初始值默认为0
          }, 0)
          //toFixed限制小数点位数 为2
          .toFixed(2)
      );
    },
    totalCount() {
      return this.cartList.filter((item) => item.checked === true).length;
    },
    isSelectAll() {
      //找出没有被选中的
      // return !this.cartList.filter((item) => !item.checked).length;
      if (this.cartList.length === 0) return false;
      return !this.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkBtnClick() {
      // 1.有未被选中的内容，则全部选中
      if (!this.isSelectAll) {
        this.cartList.forEach((item) => {
          item.checked = true;
        });
      }
      // 2.都被选中了，取消掉
      else {
        this.cartList.forEach((item) => {
          item.checked = false;
        });
      }
    },
  },
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}
.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}
.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}
.bottom-menu .buy-product {
  background-image: linear-gradient(
    to right,
    #ff8177 0%,
    #ff867a 0%,
    #ff8c7f 21%,
    #f99185 52%,
    #cf556c 78%,
    #b12a5b 100%
  );
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>