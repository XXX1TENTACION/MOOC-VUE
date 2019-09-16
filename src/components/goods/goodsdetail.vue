<template>
  <div class="goodsDetail" ref="goodsDetail">
    <div class="detail-wrapper">
      <!-- 大图片 -->
      <div class="img-wrapper">
        <img :src="goods.image" height="375" width="100%"/>
      </div>
      <!-- 食品信息 -->
      <div class="info border-bottom">
        <h1 class="name">{{ goods.name }}</h1>
        <div class="sell">
          <span class="count">月售{{ goods.sellCount }}份</span>
          <span>好评率{{ goods.rating }}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{ goods.price }}</span>
          <span class="old" v-if="goods.oldPrice">￥{{ goods.oldPrice }}</span>
        </div>
        <!-- 加入购物车按钮 -->
        <div class="car">
          <span class="text">加入购物车</span>
        </div>
      </div>
      <div class="blank border-bottom"></div>
      <!-- 商品介绍 -->
      <div v-if="goods.info">
        <div class="introduce border-bottom" >
          <h1 class="header">商品介绍</h1>
          <p class="int-text" >{{ goods.info }}</p>
        </div>
        <div class="blank border-bottom"></div>
      </div>
      <foodRatings :ratings="goods.ratings"></foodRatings>
      <shopcar></shopcar>
    </div> 
  </div> 
</template>
<script>
import BScroll from 'better-scroll'
import foodRatings from '../common/foodratings'
import shopcar from '../common/shopcar'
export default {
  name : 'goodsdetail',
  components:{ foodRatings,shopcar },
  data () {
    return {
      goods:{}
    };
  },
  created(){
    let goods = []
    this.$http.get('/api/goods').then((res)=>{
      if(res.body.errno === 0){
        goods = res.body.data
        this.goodsList = res.body.data
        this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.goodsDetail,{
          click:true
        })
      })
      }
      goods.forEach((type) => {
        type.foods.forEach((food) => {
          if( food.name === this.$route.params.name ){
            this.goods = food
          }
        })
      })
    }) 
  }
}
</script>
<style lang="scss" scoped>
@import url('../../../static/css/border-1px.css');
.goodsDetail{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
}
.border-bottom{
  border-color:rgba(7,17,27,0.1);
}
.info{
  padding: 18px;
  position: relative;
  .name{
    font-size: 14px;
    font-weight: 700;
    line-height: 14px;
    color:rgb(7,17,27);
  }
  .sell{
    margin: 8px 0 18px 0;
    font-size: 10px;
    line-height: 10px;
    color: rgb(147,153,159);
    .count{
      margin-right: 12px;
    }
  }
  .price{
    .now{
      font-size: 14px;
      line-height: 24px;
      font-weight: 700;
      color: rgb(240,20,20);
    }
    .old{
      text-decoration: line-through;
      font-weight: 700;
      font-size: 10px;
      line-height: 24px;
      color: rgb(147,153,159);
    }
  }
  .car{
    position: absolute;
    bottom: 18px;
    right: 18px;
    width: 74px;
    height: 24px;
    background-color: rgb(0,160,220);
    border-radius: 12px;
    text-align: center;
    box-sizing: border-box;
    padding: 3px 6px;
    .text{
      font-size: 10px;
      color: rgb(255,255,255)
    }
  }
}
.blank{
  height: 16px;
  background-color: #f3f5f7;
}
.introduce{
  padding: 18px;
  .header{
    font-size: 14px;
    line-height: 14px;
    font-weight: 200;
    color: #07111b;
  }
  .int-text{
    margin: 6px 8px;
    font-size: 12px;
    line-height: 24px;
    font-weight: 200;
    color: rgb(77,85,93);
  }
}
</style>