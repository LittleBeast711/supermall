<template>
  <div class="grid-view" ref="gridview">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GridView",
  props: {
    cols: {
      type: Number,
      default: 2,
    },
    hMargin: {
      type: Number,
      default: 8,
    },
    vMargin: {
      type: Number,
      default: 8,
    },
    itemSpace: {
      type: Number,
      default: 8,
    },
    lineSpace: {
      type: Number,
      default: 8,
    },
  },
  methods: {
    autoLayOut() {
      // 1.获取gridEl和children
      // 注: 这里为什么不用document.querySelector呢?
      // 答: 因为如果在项目中, 多处都用到了grid-view, 那么这里就不确定获取的是哪一个了.
      let gridEl = this.$refs.gridview;
      let children = gridEl.children;

      //2.设置gridEl的内边距
      gridEl.style.padding = `${this.vMargin}px ${this.hMargin}px `;

      //3.计算item的高度
      let itemWidth =
        (gridEl.clientWidth -
          2 * this.hMargin -
          (this.cols - 1) * this.itemSpace) /
        this.cols;
      for (let i = 0; i < children.length; i++) {
        let item = children[i];
        item.style.width = itemWidth + "px";
        if ((i + 1) % this.cols !== 0) {
          item.style.marginRight = this.itemSpace + "px";
        }
        if (i >= this.cols) {
          item.style.marginTop = this.lineSpace + "px";
        }
      }
    },
  },
};
</script>

<style scoped>
/**呃，这个GridView，
个人感觉应该和GoodsList的功能一样，
不明白为什么会写
这个组件里面主要是对goodslistitem每一个小模块进行大小的控制
*/
.grid-view {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>