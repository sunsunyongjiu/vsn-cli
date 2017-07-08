<template>
  <div>
    <div class="pageTitle">
      <span v-text="pageTitle"></span>
      <div class="back" @click="goback"></div>
    </div>
    <my-nav :items="myBoutique"></my-nav>
  </div>
</template>



<script>
import myNav from '../components/nav'
export default {
  
  components: {
    myNav
  },
  data () {
    return {
      pageTitle:this.$route.query.title,
      myBoutique:[
        {
          src:require('../assets/imgs/women.png'),
          title:'上门取车保养',
          text:'全点维护，更换机油，定制服务',
          money:'165.00',
          change:'8000'
        },
        {
          src:require('../assets/imgs/radio.png'),
          title:'上门取车保养',
          text:'全点维护，更换机油，定制服务',
          money:'165.00',
          change:'8000'
        },
        {
          src:require('../assets/imgs/box.png'),
          title:'上门取车保养',
          text:'全点维护，更换机油，定制服务',
          money:'165.00',
          change:'8000'
        },
        {
          src:require('../assets/imgs/door.png'),
          title:'上门取车保养',
          text:'全点维护，更换机油，定制服务',
          money:'165.00',
          change:'8000'
        },
        
      ]
    }
  },
  methods: {
    goback:function(){
      this.$router.go(-1)
    }
  },
  mounted:function(){
    
  }
}
</script>
<style lang='less' scoped>

</style>