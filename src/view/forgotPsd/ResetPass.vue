<template>
  <div class="container bg-white">
    <!--头部-->
    <HeaderComponent :showBackBtn = "true" hearderTitle="重置密码"></HeaderComponent>

    <div class="font24 p-l-md p-r-md m-t-lg">
      <!--手机号-->
      <div class="group"><label class="font32 iconfont icon-shouji"></label><input type="tel" v-model="phone" placeholder="请输入手机号"><i></i></div>

      <!--密码-->
      <div class="group"><label class="font32 iconfont icon-201"></label><input type="password" v-model="password" placeholder="请输入密码"><i></i></div>

      <!--密码-->
      <div class="group"><label class="font32 iconfont icon-201"></label><input type="password" v-model="confirmPass" placeholder="请确认密码"><i></i></div>
    </div>

    <!--提交按钮-->
    <div class="p-l-md p-r-md m-t-lg">
      <mt-button class="pink-btn" size="large" type="danger" @click.native="resetPass">重置</mt-button>
    </div>
  </div>

</template>

<script>
  import {isValEmpty, regPhone, regPassWord} from  '../../assets/js/regex'
  export default {
    name: 'ResetPass',
    components: {
      HeaderComponent: resolve => {require(['../../components/HeaderComponent.vue'], resolve)}, //公共头部组件
    },
    data () {
      return {
        phone: '', //手机号
        password: '', //密码
        confirmPass: '', //确认密码
      }
    },
    methods: {
      //重置密码
      resetPass () {
        if (regPhone(this.phone)) {
          this.$Toast({message: '请输入正确的手机号', duration: 1800});
        }else if (regPassWord(this.password)) {
          this.$Toast({message: '请输入6-16位包含数字字母的密码', duration: 1800});
        }else if (isValEmpty(this.confirmPass)) {
          this.$Toast({message: '请确认密码', duration: 1800});
        }else if (this.confirmPass !== this.password) {
          this.$Toast({message: '密码不一致', duration: 1800});
        }else {
          this.$Indicator.open({text: '重置中...', spinnerType: 'fading-circle'});
          this.$axios.post('/api/api/set_password',{phone: this.phone, password: this.password, confirm_password	: this.confirmPass}).then(response => {
            this.$Indicator.close();
            this.$Toast({message: response.data.msg, duration: 1800});
            if (parseInt(response.data.status) === 1) {
              setTimeout(() => {window.location.href = '/Login';},1800)
            }
          }).catch(error => {this.$Indicator.close()})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/login";
</style>
