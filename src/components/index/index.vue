<template>
  <div> 
    <Header></Header>
    <navbar></navbar>
    <router-view/>
  </div> 
</template>
<script>
import Header from '../common/header'
import navbar from '../common/navbar'
export default {
  name : 'index',
  data () {
    return {
    };
  },
  components:{ navbar,Header },
  mounted(){
  }

}
</script>
<style  scoped>
</style>