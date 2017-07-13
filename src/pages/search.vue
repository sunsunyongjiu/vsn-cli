<template>
	<div class="index-page">
		<search
		v-model="searchValue"
		:placeholder="placeholder"
		position="absolute"
    	:auto-fixed="autoFixed"
    	@on-cancel="submit"    
	    auto-scroll-to-top
	    cancel-text="搜索"
	    ref="search"
	    ></search>
	    <div></div>
	    <my-nav :items="imgList"></my-nav>
	    
	</div>
  
</template>

<script>
import myNav from '../components/nav'
import { Search} from 'vux'
export default {
  name: '',
  data () {
    return {
    	autoFixed:false,
    	imgList:[],
    	placeholder:'请搜索',
    	searchValue:'',
    	value:''
    }
  },
  components:{
    myNav,
    Search
  },
  methods:{
    init:function(){
    	this.placeholder=this.$route.query.search
    	//获取搜索结果
    	this.$http.get(this.$Api('/home/searchProdList'),{params: { 'searchStr': this.placeholder }}).then((response) => {
    		let list=response.data.data
    		
		  	for(let n=0;n<list.length;n++){
		  		
		  		this.imgList.push(list[n])
		  	}
		  	
		}, (response) => {
		  // error callback
		});
    },
    submit:function(){
    	this.placeholder=this.searchValue 
    	this.$http.get(this.$Api('/home/searchProdList'),{params: { 'searchStr': this.searchValue }}).then((response) => {
    		this.imgList=response.data.data
    		
		}, (response) => {
		  // error callback
		});
    }
  },          
  mounted:function(){
    
    this.init()
  },
  computed:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>


</style>
