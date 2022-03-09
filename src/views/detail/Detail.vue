<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      :current-index="currentIndex"
      @titleClick="titleClick"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <detail-recommend-info ref="recommend" :recommend-list="recommendList" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @backTop="backTop" v-show="isShowBackTop" class="back-top" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import BackTop from "@/components/content/backTop/BackTop";
import Scroll from "@/components/common/scroll/Scroll";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "@/network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTopYs: [],
      currentIndex: 0,
      isShowBackTop: false,
    };
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求详情数据
    this.getDetail();
    //3.呃，这个是热门推荐的东西
    this.getRecommend();
  },
  mounted() {
    setTimeout(() => {
      this.getOffsetTop();
    }, 1000);
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    BackTop,
    Scroll,
  },
  methods: {
    //进入详情页
    getDetail() {
      getDetail(this.iid).then((res) => {
        const data = res.result;
        //1.获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages;

        //2获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        //3.创建店铺信息
        this.shop = new Shop(data.shopInfo);
        //4.保存商品的详细数据
        this.detailInfo = data.detailInfo;
        //5.获取参数的信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        //6.保存评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      });
    },
    //回到顶部的图标
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    //获取热门推荐的信息
    getRecommend() {
      getRecommend().then((res, error) => {
        if (error) return;
        this.recommendList = res.data.list;
      });
    },
    //导航栏相关点击页面的滚动
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    //加入购物车
    addToCart() {
      //1.获取购物车需要展示的信息
      const obj = {};
      obj.image = this.topImages[0];
      obj.title = this.goods.title;
      obj.desc = this.goods.desc;
      obj.price = this.goods.price;
      obj.iid = this.iid;

      //2.将商品添加到购物车
      this.$store.dispatch("addCart", obj).then((res) => {
        this.$toast.show(res);
      });
    },
    //获取各个元素的offsettop值
    getOffsetTop() {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      // eslint-disable-next-line
      // console.log(this.themeTopYs);
    },
    /*下面这个函数是scroll旧版本问题的修复，
     *但是目前的版本会自动刷新，貌似不加也不影响
     *
     *在第8行添加 @imageLoad="imageLoad"
     *同时DetailGoodsInfo内也要有相应修改
     */

    // imageLoad() {
    //   this.$refs.scroll.refresh();
    //   /***
    //    * 根据最新的数据，对应的DOM已经被渲染出来
    //    * 但是图片没有加载完成（现在获取的offsetTop是不包含图片的）
    //    *
    //    * offsetTop值不对的时候，都是因为图片出了问题
    //    */
    // },

    contentScroll(position) {
      //1.监听backTop的显示
      this.isShowBackTop = position.y < -1000;

      //2.滚动相应导航栏的变化
      this.themeTopYs.forEach((item, index) => {
        if (-position.y >= item && -position.y < this.themeTopYs[index + 1]) {
          if (this.currentIndex !== index) {
            this.currentIndex = index;
          }
        }
      });
      /**
         * 判断的方案:
         *  方案一:
         *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
         *    优点: 不需要引入其他的内容, 通过逻辑解决
         *    缺点: 判断条件过长, 并且不容易理解
         *  方案二:
         *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
         *    优点: 简洁明了, 便于理解
         *    缺点: 需要引入一个较大的int数字
         * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
         * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
         * 
         *         

         */
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  /* overflow: hidden; */

  position: absolute;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0;
}
.back-top {
  position: fixed;
  right: 10px;
  bottom: 60px;
}
</style>