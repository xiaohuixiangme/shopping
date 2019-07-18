import Vue from 'vue'
import Router from 'vue-router'
import Cart from '@/views/Cart'
import GoodsList from '@/views/GoodsList'
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'
// import AddAddress from '@/views/AddAddress'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList

    },
    {
      path: '/address',
      name: 'Address',
      component: Address

    },
    {
      path: '/cart',
      name: 'Cart ',
      component: Cart 

    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    },
    // {
    //   path: '/addAddress',
    //   name: 'AddAddress',
    //   component: AddAddress
    // }
  ]
})