import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView';
import Cart from '../views/Cart.vue'
import Order from '../views/Order.vue'

const routes = [
  {
    path:'/',
    component : HomeView
  },
  {
    path:'/cart',
    component: Cart
  },
  {
    path:'/orders',
    component : Order
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
