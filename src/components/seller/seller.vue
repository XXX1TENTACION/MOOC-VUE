<template>
  <div class="seller" ref="seller"> 
    <div class="seller-wrapper">
      <div class="head">
        <h1 class="name">{{ seller.name }}</h1>
        <div class="star">
          <star :size=36 :score="seller.score"></star>
          <div class="num">
            <span class="rank counts">({{ seller.ratingCount }})</span>
            <span class="counts">月售{{ seller.sellCount }}单</span>
          </div>
        </div>
        <ul class="info">
          <li class="info-list">
            <div class="common">
              <span>起送价</span>
            </div>
            <div class="common2">
              <span class="price">{{ seller.minPrice }}</span>
              <span  class="text">元</span>
            </div>
          </li>
          <li class="info-list">
            <div class="common">
              <span>商家配送</span>
            </div>
            <div class="common2">
              <span class="price">{{ seller.deliveryPrice }}</span>
              <span class="text">元</span>
            </div>
          </li>
          <li class="info-list">
            <div class="common">
              <span>平均配送时间</span>
            </div>
            <div class="common2">
              <span class="price">{{ seller.deliveryPrice }}</span>
              <span class="text">分钟</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="blank"></div>
      <div class="bulletin">
        <h1 class="title">活动与公告</h1>
        <p class="content">{{ seller.bulletin }}</p>
        <ul class="blt-list">
          <li class="blt-item" v-for="item in seller.supports " :key="item.$index">
            <icon :type="item.type"></icon>
            <div class="type">{{ item.description }}</div>
          </li>
        </ul>
      </div>
      <div class="blank"></div>
      <div class="realpic">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="move">
          <ul class="pic-list" ref="ul">
            <li v-for="item in seller.pics" :key="item.$index" class="pic-item">
              <img :src="item" width="120" height="90"/>
            </li>
          </ul>
        </div>
      </div>
      <div class="blank"></div>
      <div class="infos">
        <h1 class="title">商家信息</h1>
        <ul class="info-list">
          <li class="info-item" v-for="item in seller.infos" :key="item.$index">
            <div class="text">
              <span>{{ item }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div> 
</template>
<script>
import BScroll from 'better-scroll'
import star from '../common/star'
import icon from '../common/icon'
export default {
  name : 'sellers',
  components:{ star,icon },
  data () {
    return {
      seller:{}
    };
  },
  created(){
    this.$http.get('/api/seller').then((res) => {
      if(res.body.errno === 0){
        this.seller = res.body.data
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.seller,{
            click:true
          })
          this.moveScroll = new BScroll(this.$refs.move,{
            scrollX:true,
            eventPassthrough:"vertical"
          })
        })
      }
    })
  },
  mounted(){
    this.$refs.ul.style.width = 120 * 5 + "px"
  }

}
</script>
<style lang="scss" scoped>
.seller{
  position: absolute;
  width: 100%;
  top: 176px;
  left: 0;
  bottom: 0;
  overflow: hidden;
}
.head{
  padding: 18px;
  .name{
    font-size: 14px;
    line-height: 14px;
    color: rgb(7,17,27);
  }
  .star{
    display: flex;
    margin: 8px 0 18px 0;
    .num{
      margin-left: 8px;
      font-size: 0;
      .counts{
        font-size: 10px;
        line-height: 18px;
        color: (77,85,93);
      }
      .rank{
        margin-right: 12px;
      }
    }
  }
  .info{
    padding: 18px 0;
    border-top: 1px solid rgba(7,17,27,0.1);
    display: flex;
    .info-list{
      flex: 1;
      border-right: 1px solid rgba(7,17,27,0.1);
      &:last-child{
        border-right: 0;
      }
      .common{
        font-size: 10px;
        line-height: 10px;
        color: rgb(147,153,159);
        margin-bottom: 4px;
        text-align: center;
      }
      .common2{
        text-align: center;
        font-size: 0;
        color: rgb(7,17,27);
        .price{
          font-size: 24px;
          line-height: 24px;
        }
        .text{
          font-size: 10px;
          line-height: 24px;
        }
      }
    }
  }

}
.blank{
  height: 16px;
  background-color: #f3f5f7;
  border-bottom: 1px solid rgba(7,17,27,0.1);
  border-top: 1px solid rgba(7,17,27,0.1);
}
.bulletin{
  padding: 18px 18px 0 18px;
  .title{
    font-size: 14px;
    line-height: 14px;
    color: rgb(7,17,27);
  }
  .content{
    font-size: 12px;
    font-weight: 200;
    line-height: 24px;
    color: rgb(240,20,20);
    margin: 8px 12px 16px 12px;
  }
  .blt-item{
    border-top: 1px solid rgba(7,17,27,0.1);
    padding: 16px 12px;
    display: flex;
    align-items: center;
    .type{
      font-size: 12px;
      line-height: 16px;
      font-weight: 200;
      color: rgb(7,17,27);
      margin-left: 6px;
    }
  }
}
.realpic{
  padding: 18px 0 18px 18px;
  .title{
    font-size: 14px;
    line-height: 14px;
    color: rgb(7,17,27);
    margin-bottom: 12px;
  }
  .pic-list{
    display: flex;
    .pic-item{
      margin-right: 6px;
    }
  }
}
.infos{
  padding: 18px 18px 0 18px;
  .title{
    font-size: 14px;
    line-height: 14px;
    color: rgb(7,17,27);
    margin-bottom: 12px;
  }
  .info-item{
    padding: 16px 12px;
    border-top: 1px solid rgba(7,17,27,0.1);
    .text{
      font-size: 12px;
      font-weight: 200;
      line-height: 16px;
      color: rgb(7,17,27);
    }
  }
}
</style>