<template>
  <div class="change-picBox-uploadBox">
    <input id="id" type="file" @change="handleFileChange" ref="inputer" />
    <label for="id"></label>
    <img :src="dataUrl" />
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      dataUrl: ''
    }
  },
  components: {

  },
  props: {
    value: {
      // 绑定默认的value prop
      default: undefined
    },
  },
  methods: {
    imgPreview(file) {
      let self = this;
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          self.dataUrl = this.result;
        }
      }
    },
    handleFileChange(e) {
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.file = inputDOM.files[0];
      this.errText = '';

      let size = Math.floor(this.file.size / 1024);
      // if (size > ...) {
      //   // 这里可以加个文件大小控制
      //   return false
      // }

      // 触发这个组件对象的input事件
      this.$emit('input', this.file);

      // 这里就可以获取到文件的名字了
      this.fileName = this.file.name;
      this.file = inputDOM.files[0];
      console.log(this.file)
      // 在获取到文件对象进行预览就行了！
      this.imgPreview(this.file);
      // 这里加个回调也是可以的
      this.onChange && this.onChange(this.file, inputDOM.value);

    },
  },
  mounted: function() {


  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' scoped>
@import '../assets/css/global.less';
.change-picBox-uploadBox {
  position: relative;
  border: 1px dashed #878787;
  .px2vw(height, 66);
  .px2vw(width, 66);
  input {
    position: absolute;
    left: -9999px;
  }
  img{
  	width: 100%;height: 100%;
  }
  label {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10
  }
}

</style>
