<template>
    <div class="carcontrol">
      <transition>
      <i class="icon-remove_circle_outline icon" v-if="getCountById[food.name] > 0" @click="decrease"></i>                    
      </transition>
      <span class="num" v-if="getCountById[food.name] > 0">{{ getCountById[food.name] }}</span>
      <i class="icon-add_circle icon" @click="addcount"></i>
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
      <div class="ball" v-if="flag" ref="ball"></div>
      </transition>
    </div>
</template>
<script>
import { mapMutations,mapGetters } from 'vuex'
export default {
  name : 'carcontrol',
  props:["food"],
  data () {
    return {
      flag: false,
      count: 1
    };
  },
  computed:{
    ...mapGetters(["getCountById"])

  },
  methods:{
    ...mapMutations(["addFoodToCar","decreaseFoodFromCar","delFoodByCount"]),
    addcount(){
      let foodInfo = {
        name: this.food.name,
        price: this.food.price,
        count: this.count
      }
      this.addFoodToCar(foodInfo)
    },
    decrease(){
      this.decreaseFoodFromCar(this.food.name)
      this.delFoodByCount()
    },
    beforeEnter(el){
      el.style.opacity = "1"
      el.style.transform = "translate(0,0)"
    },
    enter(el,done){
      //获取小球相对于视口的位置
      let ballTop = this.$refs.ball.getBoundingClientRect().top
      let ballLeft = this.$refs.ball.getBoundingClientRect().left
      //获取购物车相对于视口的位置
      let car = document.getElementById("car")
      let carTop = car.getBoundingClientRect().top
      let carLeft = car.getBoundingClientRect().left
      //计算相对位置的差值
      let diffLeft = carLeft - ballLeft
      let diffTop = carTop - ballTop
      el.offsetWidth
      el.style.transform = `translate(${diffLeft}px,${diffTop}px)`
      el.style.transition = "all 1s ease"
      done()
    },
    afterEnter(el){
      el.style.opacity = "0"
      this.flag = !this.flag
    }
  },

}
</script>
<style lang="scss" scoped>
@import url('../../../static/css/style.css');
.v-enter,.v-leave-to{
  opacity: 0;
}
.v-enter-active,.v-leave-active{
  transition: all 0.5s;
}
.carcontrol{
  position: absolute;
  bottom:18px;
  right: 0;
  font-size: 0;
  .icon{
    font-size: 24px;
    line-height: 24px;
    color:rgb(0,160,220);
    padding: 5px;
  }
  .num{
    font-size: 10px;
    line-height: 24px;
    color: rgb(147,153,159);
    margin: 0 2px;
    vertical-align: top;
  }
  .ball{
    width: 16px;
    height: 16px;
    position: absolute;
    right: 9px;
    bottom: 4px;
    background-color: rgb(240,20,20);
    border-radius: 50%;
  }
}
</style>