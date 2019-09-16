<template>
  <div> 
    <div :class="iconClass[type]"></div>
  </div> 
</template>
<script>
export default {
  name : 'icon',
  props:["type"],
  data () {
    return {
       iconClass:['decrease','dis','special','invoice','guarantee'],
    };
  },

}
</script>
<style lang="scss" scoped>
// 动态设置icon图标的样式
.decrease{
  width: 12px;
  height: 12px;
  background: url('./images/decrease_1@2x.png') no-repeat;
  background-size: cover;
  margin-right: 4px;
}
.dis{
  width: 12px;
  height: 12px;
  background: url('./images/discount_1@2x.png') no-repeat;
  background-size: cover;
  margin-right: 4px;

}
.special{
  width: 12px;
  height: 12px;
  background: url('./images/special_1@2x.png') no-repeat;
  background-size: cover;
  margin-right: 4px;

}
.invoice{
  width: 12px;
  height: 12px;
  background: url('./images/invoice_1@2x.png') no-repeat;
  background-size: cover;
  margin-right: 4px;

}
.guarantee{
  width: 12px;
  height: 12px;
  background: url('./images/guarantee_1@2x.png') no-repeat;
  background-size: cover;
  margin-right: 4px;
}
</style>