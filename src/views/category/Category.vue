<template>
  <div id="category">
    <nav-bar class="category-nav"><div slot="center">Category</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <!-- TabMenu中引入了better-scroll，
    但是演示页面里失灵时不灵，貌似是版本问题，
    加上refresh也没什么成效，暂时搁置了 -->
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem" />
      <scroll
        class="tab-content"
        :probe-type="3"
        @scroll="contentScroll"
        ref="scroll"
      >
        <tab-content-category
          :subcategories="showSubcategory"
          @imgLoad="imgLoad"
        />
        <tab-control
          :titles="['流行', '新款', '精选']"
          @tabClick="tabClick"
          ref="tabControl2"
        />
        <tab-content-detail :category-detail="showCategoryDetail" />
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";
import TabControl from "@/components/content/tabControl/TabControl";

import TabMenu from "./childComps/TabMenu";
import TabContentCategory from "./childComps/TabContentCategory";
import TabContentDetail from "./childComps/TabContentDetail";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "@/network/category";

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    TabControl,
    TabMenu,
    TabContentCategory,
    TabContentDetail,
  },
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      isTabFixed: false,
      tabOffsetTop: 0,
      currentType: "pop",
    };
  },
  activateed() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y;
  },
  created() {
    this.getCategory();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
  methods: {
    getCategory() {
      getCategory().then((res) => {
        //1.获取分类的数据
        this.categories = res.data.category.list;
        //2.初始化每个分类的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              sell: [],
              new: [],
            },
          };
        }
        //3.默认展示第一个分类的数据
        this.getSubcategories(0);
      });
    },
    //2.根据分类栏目的下标去请求相应的数据
    getSubcategories(index) {
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then((res) => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this.getCategoryDetail("pop");
        this.getCategoryDetail("sell");
        this.getCategoryDetail("new");
      });
    },

    //3.根据类型请求相应的商品数据（pop、new、sell）
    getCategoryDetail(type) {
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then((res) => {
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    selectItem(index) {
      this.getSubcategories(index);
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    imgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    contentScroll(position) {
      this.isTabfixed = -position.y >= this.tabOffsetTop;
    },
  },
};
</script>

<style scoped>
#category {
  height: 100vh;
}
.category-nav {
  background-image: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
.content {
  overflow: hidden;

  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;

  display: flex;
}
.tab-content {
  position: absolute;

  right: 0;
  top: 20px;
  left: 100px;
  bottom: 49px;

  flex: 1;
}
</style>