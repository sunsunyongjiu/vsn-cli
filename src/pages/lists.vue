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
        
        
      ]
    }
  },
  methods: {
    goback:function(){
      this.$router.go(-1)
    },
    init:function(){
      //获取精品推荐列表
      this.$http.get(this.$Api('/home/getCommendProdList')).then((response) => {
          console.log(JSON.parse(response.bodyText))
          let lists=JSON.parse(response.bodyText).data
          for(let n=0;n<lists.length;n++){
            this.$http.get(this.$Api('/img/bigImg'),{params: {'imgUrl':lists[n].pic}}).then((response) => {
              let img={
                prod_id:lists[n].prod_id,
                name:lists[n].name,
                brief:lists[n].brief,
                small_pic:lists[n].small_pic,
                pic:response.url,
                price:lists[n].price,
                cash:lists[n].cash,
                is_hot:lists[n].is_hot
              }
              this.myBoutique.push(img)
            });
            
          }
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