<template>
  <div class="goods" >
    <div class="goods-wrapper">
      <!-- 左边的类型列表 -->
        <div class="typelist" ref="typemenu">
          <ul class="list">
            <li class="list-item" v-for="item in goodsList" :key="item.$index">
              <div class="bottom">
                <icon :type="item.type" v-if="item.type > 0" class="move"></icon>
                <span class="text">{{ item.name }}</span>
              </div>
            </li>
          </ul>
        </div>
      <!-- 右边的食品列表 -->
        <div class="foods-wrapper" ref="foodmenu">
          <ul class="foods-list">
            <li class="foods-item" v-for="item in goodsList" :key="item.$index">
              <!-- 食品分类标题 -->
              <div class="title">
                <span class="title-name">{{ item.name }}</span>
              </div>
              <div class="content" v-for="food in item.foods" :key="food.$index">
                <!-- 食品图片 -->
                <div class="img">
                  <img :src="food.icon" width="56" height="56"/>
                </div>
                <!-- 食品信息 -->
                <div class="info"  @click="toDetail(food.name)">
                  <h1 class="name">{{ food.name }}</h1>
                  <div class="desc">
                    <span class="text" v-if="food.description">{{ food.description }}</span>
                  </div>
                  <div class="sell">
                    <span class="sellsounts">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span v-if="food.oldPrice" class="oldprice">￥{{ food.oldPrice }}</span>
                  </div>
                </div>
                <!-- 增加减少按钮 -->
                <carcontrol :food="food"></carcontrol>
              </div>
            </li>
          </ul>
        </div>
        <!-- 购物车 -->
        <shopcar></shopcar>
    </div>
  </div> 
</template>
<script>
import BScroll from 'better-scroll'
import icon from '../common/icon'
import shopcar from '../common/shopcar'
import carcontrol from '../common/carcontrol'
export default {
  name : 'goods',
  components:{ icon,shopcar,carcontrol},
  data () {
    return {
      goodsList:[],
      iconClass:['decrease','dis','special','invoice','guarantee'],
    };
  },
  created(){
    this.$http.get('/api/goods').then((res)=>{
      if(res.body.errno === 0){
        this.goodsList = res.body.data
        this.$nextTick(()=>{
          this.typeScroll = new BScroll(this.$refs.typemenu,{
            click:true
          })
          this.foodScroll = new BScroll(this.$refs.foodmenu,{
            click:true
          })
        })
      } 
    })
   
  },
  computed:{
    // seletedFoods(){
    //   //seletedFoods里面是所有被选中的食品的信息，里面包含被选的次数count
    //   let seletedFoods = [];
    //   this.goodsList.forEach((foodtype)=>{
    //     foodtype.foods.forEach((food)=>{
    //       if(food.count){
    //         seletedFoods.push(food)
    //       }
    //     })
    //   })
    //   return seletedFoods
    // }
  },
  methods:{
    toDetail(name){
      this.$router.push(`/goods/${name}`)
    }
  }

}
</script>
<style lang="scss" scoped>
@import url('../../../static/css/style.css');
.goods-wrapper{
  display: flex;
  width: 100%;
  position: absolute;
  top: 176px;
  left: 0;
  bottom:46px;
  overflow: hidden;
}
.typelist{
  flex: 0 0 80px;
  
  .list-item{
    height: 54px;
    padding: 0 12px;
    background-color: #f3f5f7;
  }
  .bottom{
    display: flex;
    height: 53px;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .list-item:last-child .bottom{
    border-bottom: 0;
  }
  .text{
    font-size: 12px;
    line-height: 14px;
    font-weight: 200;
    color: rgb(77,85,93);
    // vertical-align: middle;
  }
}
.foods-wrapper{
  flex: 1;
}
.foods-item{
  .title{
    height: 26px;
    background-color: #f3f5f7;
    border-left: 2px solid #d9dde1;
    .title-name{
      font-size: 12px;
      line-height: 26px;
      color:rgb(147,153,159);
      margin-left: 14px;
    }
  }
  .content{
    margin: 18px;
    display: flex;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    position: relative;
    &:last-child{
      border-bottom: 0;
    }
    .img{
      flex: 0 0 56px;
      margin-right: 10px;
    }
    .info{
      margin-top: 2px;
      .name{
        font-size: 14px;
        line-height: 14px;
        color: rgb(7,17,27);
      }
      .desc{
        margin: 8px 0;
        line-height: 12px;
      }
      .text{
        font-size: 10px;
        // line-height: 10px;
        color: rgb(147,153,159);
        
      }
      .sell{
        font-size: 10px;
        line-height: 10px;
        color: rgb(147,153,159);
        .sellcounts{
          margin-right:12px; 
        }
      }
      .price{
        margin-top: 10px;
        .now{
          font-size: 14px;
          font-weight: 700;
          color: rgb(240,20,20);
          line-height: 24px;
          margin-right: 8px;
        }
        .oldprice{
          font-size: 10px;
          font-weight: 700;
          line-height: 24px;
          color: rgb(147,153,159);
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>