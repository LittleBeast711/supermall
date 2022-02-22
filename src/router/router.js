import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }


const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')



export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/category',
      component: Category,
    },
    {
      path: '/cart',
      component: Cart,
    },
    {
      path: '/profile',
      component: Profile,
    }
  ]
})
