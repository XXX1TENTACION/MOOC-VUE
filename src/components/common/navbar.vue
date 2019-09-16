<template>
  <div class="navbar border-bottom"> 
    <ul class="navbar-list">
      <router-link to="/goods" tag="li" class="navbar-item" :class="{'active':$route.path === '/goods'}">首页</router-link>
      <router-link to="/seller" tag="li" class="navbar-item" :class="{'active':$route.path === '/seller'}">商家</router-link>
      <router-link to="/ratings" tag="li" class="navbar-item" :class="{'active':$route.path === '/ratings'}">评价</router-link>
    </ul>
  </div> 
</template>
<script>
export default {
  name : 'navbar',
  data () {
    return {
    };
  },

}
</script>
<style lang="scss" scoped>
@import url('../../../static/css/border-1px.css');
.border-bottom::before{
  border-color:rgba(7,17,27,0.1)
}
.navbar-list{
  display: flex;
  height: 40px;
  align-items: center;
  .navbar-item{
    flex: 1;
    text-align: center;
    padding: 5px;
    font-size: 14px;
    line-height: 14px;
    color: rgb(77,85,93);
  }
}
.navbar-list .active{
  color: rgb(240,20,20);
}

</style>