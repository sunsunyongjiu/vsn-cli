<template>
  <div class="pageTitle">
    <span v-text="title" class="font-18"></span>
    <div class="back" @click="goback"></div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {

    }
  },
  components: {

  },
  methods: {
    goback: function() {
      if(this.go){
        this.$router.push({ path: this.go })
      }else{
        this.$router.go(-1)
      }
      console.log(1)
      
    },
  },
  mounted: function() {


  },
  props: ['title','go']
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
@import '../assets/css/global.less';

</style>
