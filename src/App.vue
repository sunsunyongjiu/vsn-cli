<template>
  <div id="app">
    <router-view>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import 'assets/css/global.less';
@import 'assets/css/iconfont.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

// css重铸
body,html{height: 100%}
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td{margin:0;padding:0}
table{border-collapse:collapse;border-spacing:0}
fieldset,img{border:0}
address,caption,cite,code,dfn,em,strong,th,var{font-style:normal;font-weight:normal}
ol,ul{list-style:none}
caption,th{text-align:left}
h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}
q:before,q:after{content:''}
abbr,acronym{border:0;font-variant:normal}
sup{vertical-align:text-top}
sub{vertical-align:text-bottom}
input,textarea,select{font-family:inherit;font-size:inherit;font-weight:inherit}
input,textarea,select{*font-size:100%}


</style>
