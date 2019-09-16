<template>
  <div class="ratings" >
    <div class="ratings-wrapper">
      <div class="header">
        <h1 class="title">商品评价</h1>
        <ul class="typeList">
          <li class="type-item1">
            <span class="all">全部</span>
            <span class="all-count" >{{ ratings.length }}</span>
          </li>
          <li class="type-item2">
            <span class="intro">推荐</span>
            <span class="intro-count" >{{ introCount }}</span>
          </li>
          <li class="type-item3">
            <span class="bad">吐槽</span>
            <span class="bad-count" >{{ badCount }}</span>
          </li>
        </ul>
        <div class="check">
          <i class="icon-check_circle icon"></i>
          <span class="only">只看有内容的评价</span>
        </div>
      </div>
      <div class="content" v-if="ratings.length">
        <ul class="content-wrapper">
          <li class="rating-item" v-for="item in ratings" :key="item.$index">
            <div class="time-wrapper">
              <div class="time">
                <span>{{ item.rateTime | dataFomate }}</span>
              </div>
              <div class="user">
                <p class="user-name">{{ item.username }}</p>
                <div class="avatar">
                  <img :src="item.avatar" width="12" height="12" />                  
                </div>
              </div>
            </div>
            <div class="container" v-if="item.text">
              <i class="icon" :class="ratingType"></i>
              <span class="text">{{ item.text }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div> 
</template>
<script>
export default {
  name : 'foodratings',
  props:{
    ratings:{
      type:Array,
      default:function(){
          return []
      }
    },
  },
  data () {
    return {
      
    };
  },
  computed:{
    introCount(){
      let introCount = 0
      this.ratings.forEach((item) => {
        if(item.rateType === 0){
          introCount++
        }
      })
      return introCount
    },
    badCount(){
      let badCount = 0
      this.ratings.forEach((item) => {
        if(item.rateType === 1){
          badCount++
        }
      })
      return badCount
    },
    ratingType(){
      let ratingType = ""
      this.ratings.forEach((item) =>{
        if(item.rateType){
          ratingType = "icon-thumb_up"
        }else{
          ratingType = "icon-thumb_down"
        }
      })
      return ratingType
    }
  },
  methods:{
  }
}
</script>
<style lang="scss" scoped>
@import url('../../../static/css/style.css');
.header{
  padding: 18px 18px 0 18px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
  .title{
    font-size: 14px;
    font-weight: 200;
    line-height: 14px;
    color: black;
    margin-bottom:6px;
  }
  .typeList{
    display: flex;
    padding: 12px 0 18px 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    .type-item1{
      padding: 8px 12px;
      background-color: rgb(0,160,220);
      border-radius: 2px;
      font-size: 0;
      color: rgb(255,255,255);
      .all{
        font-size: 12px;
        line-height: 16px;
        margin-right: 4px;
      }
      .all-count{
        font-size: 8px;
        line-height: 16px;
      }
    }
    .type-item2{
      padding: 8px 12px;
      border-radius: 2px;
      font-size: 0;
      background-color: rgba(0,160,220,0.2);
      color: rgb(77,85,93);
      margin-left: 8px;
      .intro{
        font-size: 12px;
        line-height: 16px;
        margin-right: 4px;
      }
      .intro-count{
        font-size: 8px;
        line-height: 16px;
      }
    }
    .type-item3{
      padding: 8px 12px;
      border-radius: 2px;
      font-size: 0;
      margin-left: 8px;
      background-color: rgba(77,85,93,0.2);
      color: rgb(77,85,93);
      .bad{
        font-size: 12px;
        line-height: 16px;
        margin-right: 4px;
      }
      .bad-count{
        font-size: 8px;
        line-height: 16px;
      }
    }
  }
  .check{
    margin: 12px;
    font-size: 0;
    .icon{
      font-size: 24px;
      line-height: 24px;
      margin-right: 4px;
      color:rgb(147,153,159);
      vertical-align: middle;
    }
    .only{
      font-size: 12px;
      line-height: 24px;
      color: rgb(147,153,159);
      vertical-align: middle;
    }
  }
}
 .content-wrapper{
    padding: 0 18px;
    .rating-item{
      padding: 16px;
      min-height: 50px;
      border-bottom: 1px solid rgba(7,17,27,0.1);
    }
    .time-wrapper{
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      .time{
        font-size: 10px;
        line-height: 12px;
        color: rgb(147,153,159);
      }
      .user{
        display: flex;
        .user-name{
          font-size: 10px;
          line-height: 12px;
          color: rgb(147,153,159);
          margin-right: 6px;
        }
        .avatar{
          width: 12px;
          height: 12px;
          border-radius: 50%;
          overflow: hidden;
        }
      }
      .container{
        .icon{
          font-size: 12px;
          line-height: 24px;
        }
        .text{
          font-size: 12px;
          line-height: 16px;
          color: rgb(7,17,27);
        }
      }
    }
  }
</style>