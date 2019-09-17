import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let foods = JSON.parse(localStorage.getItem('foods') || "[]")
export default new Vuex.Store({
  state:{
    foods
  },
  getters:{
    //{ name:count, name2:count2}
    getCountById(state){
      let obj = {}
      state.foods.forEach((item) => {
        obj[item.name] = item.count
      })
      return obj
    },
    //计算添加食品的总价
    totalPrice(state){
      let totalPrice = 0
      state.foods.forEach((item) => {
        totalPrice += parseInt(item.count) * parseInt(item.price)
      })
      return totalPrice
    },
    //计算添加食品的总数量
    totalCount(state){
      let totalCount = 0
      state.foods.forEach((item) => {
        totalCount += parseInt(item.count)
      })
      return totalCount
    }
  },
  mutations:{
    //点击增加按钮调用此函数
    addFoodToCar(state,foodInfo){
      let flag = false
      state.foods.some((item) => {
        if(item.name === foodInfo.name){
          item.count++
          flag = true
          return
        }
      })
      if(!flag){
        state.foods.push(foodInfo)
      }
      localStorage.setItem('foods',JSON.stringify(foods))
    },
    //点击按钮减少商品
    decreaseFoodFromCar(state,name){
      state.foods.some((item) => {
        if(item.name === name){
          item.count--
        }
      })
      localStorage.setItem('foods',JSON.stringify(foods))
    },
    //当count<=0时把记录从localStorage中删除
    delFoodByCount(state){
      state.foods.forEach((item,index) => {
        if(item.count <= 0){
          foods.splice(index,1)
        }
      })
      localStorage.setItem('foods',JSON.stringify(foods))
    }

  },
  actions:{

  }
})