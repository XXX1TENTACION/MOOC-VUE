<template>
  <div class="header"> 
    <div class="header-wrapper">
      <div class="info">
        <div class="info-wrapper">
          <!-- 商家头像 -->
          <div class="avatar">
            <img width="64" height="64" :src='seller.avatar'/>
          </div>
          <!-- 商家信息 -->
          <div class="detail">
            <div class="title">
              <div class="banner"></div>
              <p class="name">{{ seller.name }}</p>
            </div>
            <div class="delivery">
              <span class="text">{{ seller.description }}/</span>
              <span class="text">{{ seller.deliveryTime }}分钟送达</span>
            </div>
            <div class="discount" v-if="seller.supports">
              <!-- <div :class="iconClass[seller.supports[0].type]"></div> -->
              <icon :type="seller.supports[0].type"></icon>
              <p class="disdetail">{{ seller.supports[0].description }}</p>
            </div>
          </div>
        </div>
        <!-- 点击按钮弹出遮罩层 -->
        <div class="btn" v-if="seller.supports" @click="isShow = true">
          <p class="count">{{ seller.supports.length }}个</p>
          <i class="icon-keyboard_arrow_right icon"></i>
        </div>
      </div>
      <!-- 公告 -->
      <div class="bulletin" @click="isShow = true">
        <div class="icon"></div>
        <p class="desc">{{ seller.bulletin }}</p>
        <i class="icon-keyboard_arrow_right arrow"></i>
      </div>
      <!-- 背景图片 -->
      <div class="backimg">
        <img width="100%" height="100%" :src="seller.avatar"/>
      </div>
      <!-- 遮罩层 -->
      <transition>
        <div class="cover" v-show="isShow">
          <div class="cover-wrapper clearfix">
            <div class="content">
                <h1 class="title">{{ seller.name }}</h1>
                <star :size=48 :score="seller.score" class="star-wrapper"></star>
                <div class="content-wrapper">
                  <div class="discount-info">
                    <div class="dis-header">
                      <div class="line"></div>
                      <div class="text">优惠信息</div>
                      <div class="line"></div>
                    </div>
                    <ul class="dis-list" v-if="seller.supports">
                      <li class="dis-item" v-for="item in seller.supports" :key="item.$index">
                        <!-- <div class="icon" :class="iconClass[item.type]"></div> -->
                        <icon :type="item.type"></icon>
                        <div class="dis-type">{{ item.description }}</div>
                      </li>
                    </ul>
                  </div>
                  <div class="blt">
                    <div class="blt-header">
                      <div class="line"></div>
                      <div class="text">商家公告</div>
                      <div class="line"></div>
                    </div>
                    <p class="blt-text">{{ seller.bulletin }}</p>
                  </div>
                </div>
            </div>
          </div>
          <div class="close" @click="isShow = false">
            <i class="icon-close"></i>
          </div>
        </div>
      </transition>
    </div>
  </div> 
</template>
<script>
import star from './star'
import icon from './icon'
export default {
  name : 'Header',
  components:{ star,icon },
  data () {
    return {
      seller:{},
      isShow:false
    };
  },
  created(){
    this.$http.get('/api/seller').then((res) => {
      if(res.body.errno === 0){
        this.seller = res.body.data
      }
    })
    
  }

}
</script>
<style lang="scss" scoped>
@import url('../../../static/css/style.css');
.v-enter,.v-leave-to{
  opacity: 0;
}
.v-enter-active,.v-leave-active{
  transition: all 0.3s ease;
}
.header-wrapper{
  position: relative;
  overflow: hidden;
  background-color: rgba(7,17,27,0.5);
}
.info{
  padding: 24px 12px 18px 24px;
  position: relative;
  .info-wrapper{
    display: flex;
  }
  .avatar{
    border-radius: 4px;
    overflow: hidden;
  }
  .detail{
    margin-left: 16px;
    .title{
      margin-top: 2px;
      margin-bottom: 8px;
      display: flex;
    }
    .banner{
      width: 30px;
      height: 18px;
      background: url('./images/brand@2x.png') no-repeat;
      background-size: cover;
    }
    .name{
      font-size: 16px;
      line-height: 18px;
      color: rgb(255,255,255);
      font-weight: bold;
      margin-left: 6px;
    }
    .delivery{
      margin-bottom: 10px;
      font-size: 0;
    }
    .text{
      font-size: 12px;
      line-height: 12px;
      font-weight: 200;
      color: rgb(255,255,255);
    }
    .discount{
      display: flex;
      margin-bottom: 2px;
    }
    .disdetail{
      font-size: 10px;
      line-height: 12px;
      font-weight: 200;
      color: rgb(255,255,255);
    }
  }
  .btn{
    position: absolute;
    bottom: 18px;
    right: 12px;
    padding: 7px 8px;
    background-color: rgba(0,0,0,0.2);
    color: rgb(255,255,255);
    border-radius: 16px;
    font-size: 0;
    .count{
      font-size: 10px;
      line-height: 12px;
      font-weight: 200;
      margin-right: 2px;
      display: inline-block;
    }
    .icon{
      font-size: 12px;
    }
  }
}
.bulletin{
  height: 28px;
  background-color: rgba(7,17,27,0.2);
  padding: 0 12px;
  display: flex;
  align-items: center;
  .icon{
    width: 27px;
    height: 12px;
    background: url('./images/bulletin@2x.png') no-repeat;
    background-size: cover;
    margin-right: 4px;
    line-height: 28px;
  }
  .desc{
    max-width: 370px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 4px;
    line-height: 28px;
    font-size: 10px;
    font-weight: 200;
    color: rgb(255,255,255);
  }
  .arrow{
    line-height: 26px;
    color: rgb(255,255,255);
  }
}
.backimg{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(10px);
}
.cover{
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: auto;
  top: 0;
  left: 0;
  background-color: rgba(7,17,27,0.8);
  z-index: 99;
  color: rgb(255 , 255 , 255);
  .cover-wrapper{
    min-height: 100%;
  }
  .content{
    padding-bottom: 64px;
    margin-top:64px;
  }
  .clearfix::after,.clearfix::before{
    content: '';
    display: block;
    line-height: 0;
    height: 0;
    font-size: 0;
    clear: both;
    overflow:  hidden;
  }
  .title{
   font-size: 16px;
   font-weight: 700;
   line-height: 16px;
   color: rgb(255,255,255);
   text-align: center;
  }
  .star-wrapper{
    text-align: center;
    margin: 16px 0 28px 0;
  }
  .content-wrapper{
    margin:0 36px; 
  }
  .dis-header{
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  }
  .line{
    flex: 1;
    height: 0;
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }
  .text{
    font-size: 14px;
    line-height: 14px;
    font-weight: 700;
    color: rgb(255 , 255 , 255);
    margin: 0 12px;
  }
  .dis-list{
    padding: 0 12px;
    margin-bottom: 28px;
    .dis-item{
      display: flex;
      margin-bottom: 12px;
      align-items: center;
      &:last-child{
        margin-bottom: 0;
      }
    }
    .dis-type{
      flex:1;
      font-size: 12px;
      line-height: 12px;
      font-weight: 200;
      color: rgb(255 , 255 , 255);
    }
  }
  .blt{
    .blt-header{
      display: flex;
      align-items: center;
      margin-bottom: 24px;
    }
    .blt-text{
      padding: 0 12px;
      font-size: 12px;
      line-height: 24px;
      font-weight: 200;
      color: rgb(255,255,255);
    }
  }
  .close{
    margin: -64px auto 0 auto;
    position: relative;
    clear: both;
    text-align: center;
    width: 32px;
    height: 32px;
    font-size: 32px;
  }
}
</style>


    