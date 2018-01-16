<template>
  <div>
    <div class="mubu" v-if="show"></div>
    <!-- <back :title="pageTitle"></back>  -->
    <my-nav :items="myBoutique"></my-nav>
  </div>
</template>



<script>
import myNav from '../components/navs'
import back from '../components/backNav'
export default {
  
  components: {
    myNav,
    back
  },
  data () {
    return {
      pageTitle:this.$route.query.title,
      id:this.$route.query.id,
      myBoutique:[],
      show:true
    }
  },
  methods: {
    init:function(){
      this.$vux.loading.show({
       text: 'loading'
      })
      //获取精品推荐列表
      this.$http.get(this.$Api('/home/getProdListByCategory'),{params: { 'id': this.id }}).then((response) => {
          this.myBoutique=JSON.parse(response.bodyText).data
          this.$vux.loading.hide()
          this.show=false
      }, (response) => {
          // error callback
      });
    }
  },
  mounted:function(){
    this.init()
  }
}
</script>
<style lang='less' scoped>

</style>