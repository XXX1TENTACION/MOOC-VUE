<template>
  <div class="satr-wrapper">
    <ul class="star-list" :class="starType">
      <li class="star-item" v-for="item in starList" :key="item.$index" :class="item"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'star',
  props:["size","score"],
  data() { 
    return {
       
    }
  },
  computed:{
    starType(){
      return "star-"+this.size
    },
     starList(){
      let starList = []
      //0.5以下当作半颗心，0，5及以上当作一颗心
      let score = Math.floor(this.score*2)/2
      //判断是否含有小数，有小数算作半颗心
      let point = score % 1 !== 0
      //去除整数部分
      let intager = parseInt(score)
      for(let i=0 ;i<intager;i++){
        starList.push("on")
      }
      if(point){
        starList.push("half")
      }
      while(starList.length < 5){
        starList.push("off")
      }
      return starList
    }
   
  },
  
 }
</script>

<style lang="scss" scoped>
.star-list{
  font-size: 0;
}
.star-item{
  display: inline-block;
}
.star-48 .star-item{
    width: 20px;
    height: 19px;
    margin-right: 22px;
    
}  
.star-48 .on{
  background: url('./images/star48_on@2x.png') no-repeat;
  background-size: cover;
}
.star-48 .half{
  background: url('./images/star48_half@2x.png') no-repeat;
  background-size: cover;
}  
.star-48 .off{
  background: url('./images/star48_off@2x.png') no-repeat;
  background-size: cover;
}
.star-36 .star-item{
    width: 15px;
    height: 15px;
    margin-right: 16px;
}  
.star-36 .on{
  background: url('./images/star36_on@2x.png') no-repeat;
  background-size: cover;
}
.star-36 .half{
  background: url('./images/star36_half@2x.png') no-repeat;
  background-size: cover;
}  
.star-36 .off{
  background: url('./images/star36_off@2x.png') no-repeat;
  background-size: cover;
}
.star-24 .star-item{
    width: 10px;
    height: 10px;
    margin-right: 3px;
}  
.star-24 .on{
  background: url('./images/star24_on@2x.png') no-repeat;
  background-size: cover;
}
.star-24 .half{
  background: url('./images/star24_half@2x.png') no-repeat;
  background-size: cover;
}  
.star-24 .off{
  background: url('./images/star24_off@2x.png') no-repeat;
  background-size: cover;
}

.star-item:last-child{
  margin: 0;
} 

</style>