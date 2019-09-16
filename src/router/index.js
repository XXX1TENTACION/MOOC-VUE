import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import index from '../components/index'
import goods from '../components/goods/goods'
import ratings from '../components/ratings/ratings'
import seller from '../components/seller/seller'
import goodsdetail from '../components/goods/goodsdetail'
export default new VueRouter({
  routes:[
    { path:'/', redirect:'/goods' ,component:index ,
      children:[
        { path:'goods', name:'goods' , component:goods },
        { path:'ratings', name:'ratings', component:ratings },
        { path:'seller', name:'seller', component:seller }
      ]
    },
    { path:'/goods/:name', name:'goodsdetail', component:goodsdetail }
    
  ]
})