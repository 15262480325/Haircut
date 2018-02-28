<template>
  <div class="box">
    <!--头部-->
    <HeaderComponent :hearderFixed = "false" :showBackBtn = "true" hearderTitle="个人头像"></HeaderComponent>

    <!--头像-->
    <div class="portrait">
      <div class="portrait-lg"></div>

      <div class="portrait-xs"><img :src="portraito" alt=""></div>
    </div>

    <div class="btn font22">
      <label for="album"><input type="file" name="image" id="album" accept="image/*" @change="changePortrait($event)">从相册选一张</label>

      <label for="camera"><input type="file" name="image" id="camera" accept="image/*" capture="camera" @change="changePortrait($event)">拍一张帅照</label>
    </div>
  </div>
</template>

<script>
  import portraito from '../../assets/images/portraito.jpg'

  export default {
    name: 'Portrait',
    components: {
      HeaderComponent: resolve => {require(['../../components/HeaderComponent.vue'], resolve)}, //公共头部组件
    },
    data () {
      return {
        portraito: '',
      }
    },
    methods: {
      //修改头像
      changePortrait (event) {
        this.$Indicator.open({text: '修改中...', spinnerType: 'fading-circle'});
        let formDate = new FormData();
        formDate.append('uid',this.$store.state.token);
        formDate.append('image',event.target.files[0]);
        this.$axios.post('/upgrade_head', formDate).then(response => {
          this.$Indicator.close();
          this.$Toast({message: response.data.msg, duration: 1800});
          if (parseInt(response.data.status) === 1) {
            this.$store.commit('changePortraito', response.data.fullpath);
            setTimeout(() => {setTimeout(() => {this.$router.push({name: 'Setting', params: {id: this.$store.state.token}})},1800)}, 1800)
          }else {
            event.target.value= '';
          }
        }).catch(error => {this.$Indicator.close(); event.target.value= ''})
      }
    },
    created () {
      //获取基本信息
      this.$axios.post('/personal', {id: this.$store.state.token}).then(response => {
        this.list = response.data.data;
        this.portraito = this.$imageBasicUrl + this.list.head || portraito;
        document.styleSheets[0].addRule('.portrait-lg:before','background-image: url('+this.portraito+')');
      })
    }
  }
</script>
<style lang="scss" scoped>
  .box {
    min-height: 100vh;

    .portrait {
      position: relative;
      height: 45vh;

      .portrait-lg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        z-index: 2;
      }

      .portrait-lg:before {
        width: 100%;
        height: 100%;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        -webkit-filter: blur(10px);
        filter: blur(10px);
        background-repeat: no-repeat;
        background-position: left top;
        background-size: 100% auto;
      }

      .portrait-xs {
        width: 1.6rem;
        height: 1.6rem;
        position: absolute;
        left: 50%;
        margin-left: -0.8rem;
        bottom: -0.6rem;
        border: 2px solid #fff;
        z-index: 4;
        overflow: hidden;

        img {
          display: block;
          width: 100%;
          min-height: 1.6rem;
        }
      }
    }

    .btn {
      margin-top: 1rem;
      text-align: center;

      input {
        display: none;
      }

      label {
        display: inline-block;
        width: 76%;
        line-height: 0.55rem;
        border: 1px solid #dcdcdc;
      }

      label:first-child {
        margin-bottom: 0.42rem;
      }
    }
  }
</style>
