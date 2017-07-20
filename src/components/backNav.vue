<template>
  	<div class="pageTitle">
	  <span v-text="title"></span>
	  <div class="back" @click="goback"></div>
	</div>
</template>

<script>

export default {
  name: '',
  data () {
    return {
    	
    }
  },
  components:{
    
  },
  methods:{
    goback:function(){
      console.log(1)
      this.$router.go(-1)
    },
  },          
  mounted:function(){
    

  },
  props:['title']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>


</style>
