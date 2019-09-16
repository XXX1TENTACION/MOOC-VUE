<template>
  <div class="ratings" ref="ratings"> 
    <div class="wrapper">
      <div class="header">
        <div class="left">
          <p class="ava-scroe">{{ seller.score }}</p>
          <p class="ava-text">综合评分</p>
          <p class="rank">高于周边商家{{ seller.rankRate }}%</p>
        </div>
        <div class="right">
          <div class="service">
            <span class="text">服务态度</span>
            <star :size=24 :score="seller.serviceScore"></star>
            <span class="score">{{ seller.serviceScore }}</span>            
          </div>
          <div class="food">
            <span class="text">食品评分</span>
            <star :size=24 :score="seller.foodScore"></star>
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="time">
            <span class="text">送达时间</span>
            <span class="arrive-time">{{ seller.deliveryTime }}送达</span>
          </div>
        </div>
      </div>
      <div class="blank"></div>
      <ul class="ratings-wrapper">
        <li class="ratings-item" v-for="item in ratings" :key="item.$index">
          <div class="avatar">
            <img :src="item.avatar" width="28" height="28"/>
          </div>
          <div class="desc">
            <div class="user">
              <span class="user-name">{{ item.username }}</span>
              <span class="time">{{ item.rateTime | dataFomate }}</span>
            </div>
            <div class="star">
              <star :size=24 :score="item.score"></star>
              <span class="detime">{{ item.deliveryTime }}分钟送达</span>
            </div>
            <p class="content">{{ item.text }}</p>
            <div class="recommend">
              <i class="icon" :class=" item.rateType === 0 ? 'icon-thumb_up' : 'icon-thumb_down' "></i>
              <ul class="rec-list">
                <li class="rec-item" v-for="rec in item.recommend" :key="rec.$index">
                  <span class="foodname">{{ rec }}</span>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div> 
</template>
<script>
import BScroll from 'better-scroll'
import star from '../common/star'
export default {
  name : 'ratings',
  components: { star },
  data () {
    return {
      seller:{},
      ratings:[]
    };
  },
  mounted(){
    this.$http.get('/api/seller').then((res) => {
      if(res.body.errno === 0){
        this.seller = res.body.data
      }
    })
    this.$http.get('/api/ratings').then((res) => {
      if(res.body.errno === 0){
        this.ratings = res.body.data
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings,{
            click:true
          })
        })
      }
    })
  }

}
</script>
<style lang="scss" scoped>
@import url('../../../static/css/style.css');
.ratings{
  position: absolute;
  width: 100%;
  top: 176px;
  left: 0;
  bottom: 0;
  overflow: hidden;
}
.header{
  display: flex;
  padding: 18px 0;
  .left{
    text-align: center;
    flex: 0 0 136.5px; 
    border-right: 1px solid rgba(7,17,27,0.1);
    .ava-scroe{
      font-size: 24px;
      line-height: 28px;
      color: rgb(255,153,0);
      margin-bottom: 6px;
    }
    .ava-text{
      font-size: 12px;
      line-height: 12px;
      color: rgb(7,17,27);
      margin-bottom: 8px;
    }
    .rank{
      font-size: 10px;
      line-height: 10px;
      color: rgb(147,153,159);
      margin-bottom: 6px;
    }
  }
  .right{
    padding: 0 24px;
    .text{
      font-size: 12px;
      line-height: 18px;
      color: rgb(7,17,27);
      margin-right: 12px;
    }
    .score{
      font-size: 12px;
      line-height: 18px;
      color: rgb(255,153,0);
      margin-left: 12px;
    }
    .service{
      display: flex;
      align-items: center;
    }
    .food{
      display: flex;
      align-items: center;
      margin: 8px 0;
    }
    .arrive-time{
      font-size: 12px;
      line-height: 18px;
      color: rgb(147,153,159);
    }
  }
}
.blank{
  height: 18px;
  background-color: #f3f5f7;
  border-top: 1px solid rgba(7,17,27,0.1);
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.ratings-wrapper{
  padding: 0 18px;
  .ratings-item{
    display: flex;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    .avatar{
      flex: 0 0 28px;
      width: 28px;
      height: 28px;
      flex: 0 0 28px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 12px;
    }
    .desc{
      flex: 1;
      .user{
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
        .user-name{
          font-size: 10px;
          line-height: 12px;
          color: rgb(7,17,27);
        }
        .time{
          font-size: 10px;
          line-height: 12px;
          font-weight: 200;
          color: rgb(147,153,159);
        }
      }
      .star{
        display: flex;
        margin-bottom: 6px;
        .detime{
          font-size: 10px;
          line-height: 12px;
          font-weight: 200;
          color: rgb(147,153,159);
          margin-left: 6px;
        }
      }
      .content{
        font-size: 12px;
        line-height: 18px;
        color: rgb(7,17,27);
        margin-bottom: 8px;
      }
      .recommend{
        display: flex;
        .rec-list{
          // display: flex;
          .foodname{
            display: inline-block;
            padding: 0 6px;
            border: 1px solid rgba(7,17,27,0.1);
            border-radius: 2px;
            font-size: 10px;
            line-height: 16px;
            color: rgb(147,153,159);
            max-width: 70px;
            min-width: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>