<template>
  <transition>
    <div class="alertBox" v-show="show">
      <div class="alert-mask" v-show="isShowMask"></div>
      <transition :name="translate">
        <div class="box" :class="position" v-show="show">
          <img src="../../assets/imgs/tanhao.png" class="toast-tanhao"> 
          <div class="toastText font-14" v-html="text"></div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
        time:1500,
        show:false
    }
  },
  props: {
    value: Boolean,
    show: { // 是否显示此toast
      default: false
    },
    text: { // 提醒文字
      default: 'loading'
    },
    position: { // 提醒容器位置
      default: 'center'
    },
    isShowMask: { // 是否显示遮罩层
      default: true
    },
    // time: { // 显示时间
    //   default: 1500
    // },
    transition: { // 是否开启动画
      default: true
    }
  },
  created() { // 时间控制
    
    setTimeout(() => {
        
      this.show = false
    }, this.time)
   
  },
  computed: {
    translate() { // 根据props，生成相对应的动画
      if (!this.transition) {
        return ''
      } else {
        if (this.position === 'top') {
          return 'translate-top'
        } else if (this.position === 'middle') {
          return 'translate-middle'
        } else if (this.position === 'bottom') {
          return 'translate-bottom'
        }
      }
    },
    fadeIn() { // 同上
      if (!this.transition) {
        return ''
      } else {
        return 'fadeIn'
      }
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.$emit('input', true)
        this.$emit('on-show')
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.show = false
          this.$emit('input', false)
          this.$emit('on-hide')
        }, this.time)
      }
    },
    value (val) {
      this.show = val
    }
  }
}

</script>
<style scoped lang='less' scoped>
@import '../../assets/css/global.less';
.box {
  position: fixed;
  top: 50%;
  left: 50%;
  .px2vw(width, 250);
  .px2vw(height, 192);
  .px2vw(margin-left, -125);
  .px2vw(margin-top, -96);
  background: rgba(65, 65, 65, .8);
  border-radius: 4px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  z-index: 5000;
  color: #fff;
  .toast-tanhao {
    display: block;
    .px2vw(margin-top, 39);
    .px2vw(margin-bottom, 36);
    .px2vw(width, 57);
    .px2vw(height, 57);
    margin: 0 auto;
  }
}

.box.top {
  top: 50px;
  margin-top: 0;
}

.box.center {
  top: 50%;
  margin-top: -100px;
}

.box.bottom {
  top: auto;
  bottom: 50px;
  margin-top: 0;
}

.alert-mask {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, .8);
  z-index: 4999;
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity .3s;
}

.fadeIn-enter,
.fadeIn-leave-active {
  opacity: 0;
}

.translate-top-enter-active,
.translate-top-leave-active {
  transition: all 0.3s cubic-bezier(.36, .66, .04, 1);
}

.translate-top-enter,
.translate-top-leave-active {
  transform: translateY(-50%);
  opacity: 0;
}

.translate-middle-enter-active,
.translate-middle-leave-active {
  transition: all 0.3s cubic-bezier(.36, .66, .04, 1);
}

.translate-middle-enter,
.translate-middle-leave-active {
  transform: translateY(80%);
  opacity: 0;
}

.translate-bottom-enter-active,
.translate-bottom-leave-active {
  transition: all 0.3s cubic-bezier(.36, .66, .04, 1);
}

.translate-bottom-enter,
.translate-bottom-leave-active {
  transform: translateY(100%);
  opacity: 0;
}

</style>
