<template>
  <div class="shopcar">
    <div class="left">
      <div class="car">
        <div class="car-wrapper" :class="{'bg-color':totalCount > 0}">
          <i class="icon-shopping_cart icon" :class="{'actcolor':totalCount > 0 }" id="car"></i>
        </div>
        <div class="totalcount" v-if="totalCount > 0">{{ totalCount }}</div>
      </div>
      <div class="price">
        <div class="all-price">
          <span class="text" :class="{'actcolor': totalCount > 0}">￥{{ totalPrice }}</span>
        </div>
        <div class="delivery-price">
          <span  v-if="seller.deliveryPrice">另需配送费￥{{ seller.deliveryPrice }}元</span>
        </div>
      </div>
    </div>
    <div class="right" :class="{'minact': totalPrice >= seller.minPrice }">
      <span >{{ minPrice }}</span>
    </div> 
  </div> 
</template>
<script>
export default {
  name : 'shopcar',
  props:{
    selectedFoods:{
      type:Array,
      default:function(){
          return []
      }
    }
  },
  data () {
    return {
      seller:{},
    };
  },
  created(){
    this.$http.get('/api/seller').then((res)=>{
      if(res.body.errno === 0){
        this.seller = res.body.data
      }
    })
  },
  computed:{
    totalCount(){
      let totalCount = 0;
      this.selectedFoods.forEach((item)=>{
        totalCount += item.count
      })
      return totalCount
    },
    totalPrice(){
      let totalPrice = 0;
      this.selectedFoods.forEach((item)=>{
        totalPrice += item.count * item.price
      })
      return totalPrice
    },
    minPrice(){
      if(this.totalPrice === 0){
        return "￥"+this.seller.minPrice+"元起送"
      }else if(this.totalPrice > 0 && this.totalPrice <  this.seller.minPrice){
        let diff = this.seller.minPrice - this.totalPrice
        return "还差￥"+ diff +"元起送"
      }else{
        return "去结算"
      }
    },
  },
  


}
</script>
<style lang="scss" scoped>
@import url('../../../static/css/style.css');
.shopcar{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 98;
  height: 48px;
  display: flex;
  .left{
    flex:1;
    background-color: #141d27;
    display: flex;
    .car{
      position: relative;
      top:-10px;
      width: 56px;
      height: 56px;
      box-sizing: border-box;
      padding: 6px;
      margin-left: 12px;
      border-radius: 50%;
      background-color: #141d27;
    }
    .car-wrapper{
      width: 100%;
      height: 100%;
      background-color: #2b343c;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon{
        font-size: 24px;
        line-height: 24px;
        color: rgba(255,255,255,0.5);
      }
      .actcolor{
        color: rgb(255,255,255);
      }
    }
    .bg-color{
     background-color: #00a0dc;
    }
    .totalcount{
      position: absolute;
      right: 0;
      top: 0;
      width: 24px;
      border-radius: 7px;
      background-color: rgb(240,20,20);
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
      font-size: 9px;
      font-weight: 700;
      text-align: center;
      line-height: 16px;
      color: rgb(255,255,255);
    }
    .price{
      display: flex;
      margin-left: 18px;
      .all-price{
        flex:1;
        display: flex;
        align-items: center;
        .text{
          color: rgba(255,255,255,0.4);
          padding-right: 12px;
          font-size: 16px;
          font-weight: 700;
          line-height: 24px;
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .actcolor{
          color: rgb(255,255,255);
        }
      }
      .delivery-price{
        font-size: 12px;
        line-height: 48px;
        font-weight: 700;
        color:rgba(255,255,255,0.4);
        margin-left: 12px;
      }
    }
  }
  .right{
    flex: 0 0 105px;
    background-color: #2b333b;
    box-sizing: border-box;
    padding: 0 8px;
    font-size: 12px;
    line-height: 48px;
    font-weight: 700;
    color:rgba(255,255,255,0.4);
    text-align: center;
  }
  .minact{
    background-color: #00b43c;
    color: rgb(255,255,255);
  }
}
</style>