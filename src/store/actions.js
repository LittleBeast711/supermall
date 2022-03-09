export default {
  addCart(context, payload) {
    //payload新添加的商品

    //eslint-disable-next-line
    return new Promise((resolve, reject) => {
      //查找之前数组中是否有该商品
      // let oldObj = context.cartList.find(item => item.iid === payload.iid)
      let oldObj = null
      context.state.cartList.forEach((item) => {
        if (item.iid === payload.iid) {
          oldObj = item
        }
      });

      //判断oldObj
      if (oldObj) {
        // oldObj.count += 1
        context.commit('addCounter', oldObj)
        resolve('当前商品数量加一')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('addToCart', payload)
        resolve('添加新的商品')
      }
    })
  }
}