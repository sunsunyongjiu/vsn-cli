<template>
  <div id="app">
    <view-box ref="viewBox">
      <transition name="fade" mode="out-in" appear>
        <router-view transition="back" keep-alive>
        </router-view>
      </transition>
    </view-box>
  </div>
</template>
<script>
import { ViewBox } from 'vux'
import { mapGetters } from 'vuex'
import Apis from './configers/Api'
export default {
  name: 'app',
  components: {
    ViewBox
  },
  mounted: function() {
    let _this=this
    Apis.getServerTime().then(data => {
      console.log(data.serverTime)
      this.$store.dispatch({ type: 'setTime', data: data.serverTime })
    });
    // 获取屏幕宽度,高度
    let scWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let scheight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    let screen={
      width:scWidth,
      height:scheight
    }
    this.$store.dispatch({ type: 'setScreen', data: screen })
    let serverTimeInter=setInterval(function(){
      _this.$store.dispatch({ type: 'changeTime'})
    },1000)
    window.onpopstate = () => {
      if (!this.allowBack) { //    这个allowBack 是存在vuex里面的变量
        history.go(1)
        // this.$store.dispatch({ type: 'setPayConfirmShow', data: true })
      }
      
    }
  },
  computed: {
    // 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters({
      allowBack: 'getallowBack',
      goHome: 'getHome',
      pathHome: 'getPathHome'
    })
  },
}

</script>
<style lang="less">
@import 'assets/css/global.less';
@import 'assets/css/iconfont.css';
#app {
  font-family: Arial, chinese !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw !important;
}

// css重铸
body,
html {
  height: 100%;
  // overflow: hidden;
}

body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
input,
textarea,
p,
blockquote,
th,
td {
  margin: 0;
  padding: 0
}

table {
  border-collapse: collapse;
  border-spacing: 0
}

fieldset,
img {
  border: 0
}

address,
caption,
cite,
code,
dfn,
em,
strong,
th,
var {
  font-style: normal;
  font-weight: normal
}

ol,
ul {
  list-style: none
}

caption,
th {
  text-align: left
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: normal
}

q:before,
q:after {
  content: ''
}

abbr,
acronym {
  border: 0;
  font-variant: normal
}

sup {
  vertical-align: text-top
}

sub {
  vertical-align: text-bottom
}

input,
textarea,
select {
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit
}

input,
textarea,
select {
  *font-size: 100%
}

button {
  font-family: Arial, chinese !important;
}

</style>
