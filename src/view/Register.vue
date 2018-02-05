<template>
  <div class="container bg-white">
    <!--头部-->
    <HeaderComponent :showBackBtn = "true" hearderTitle="注册"></HeaderComponent>

    <div class="font24 p-l-md p-r-md m-t-lg">
      <!--手机号-->
      <div class="group"><label class="font32 iconfont icon-shouji"></label><input type="tel" maxlength="11" v-model="phone" placeholder="请输入手机号"><i></i></div>

      <!--密码-->
      <div class="group"><label class="font32 iconfont icon-201"></label><input type="password" v-model="password" placeholder="请输入密码"><i></i></div>

      <!--验证码-->
      <div class="group">
        <div class="relative">
          <label class="font32 iconfont icon-yanzhengma"></label><input type="tel" maxlength="4" v-model="verify" placeholder="请输入验证码"><i></i>
        </div>

        <!--发送按钮-->
        <mt-button v-if="!sendState" class="send pink-btn" type="danger" @click.native="sendVerificationCode">点击发送验证码</mt-button>

        <mt-button plain v-if="sendState" class="send" type="danger">{{countDown}} 秒后重新发送</mt-button>
      </div>
    </div>

    <!--提交按钮-->
    <div class="p-l-md p-r-md m-t-lg">
      <mt-button class="pink-btn" size="large" type="danger" @click.native="submitLogin">注册</mt-button>
    </div>

    <p class="font24 txtR p-md"><router-link class="pink" to="/Login">已有账号</router-link></p>
  </div>

</template>

<script>
  import {regPhone,regPassWord} from  '../assets/js/regex'
  export default {
    name: 'Register',
    components: {
      HeaderComponent: resolve => {require(['../components/HeaderComponent.vue'], resolve)}, //公共头部组件
    },
    data () {
      return {
        phone: '',
        password: '',
        verify: '',
        sendState: false, //发送验证码状态
        countDown: 60 //发送验证码倒计时
      }
    },
    methods: {
      //点击发送验证码
      sendVerificationCode () {
        if (!regPhone(this.phone)) { //是否输入正确的手机号
            this.sendState = true;
            let timeDown = setInterval(() => { //定时器发送验证码时间递减
              if (this.countDown -- <= 0) { //判断时间是否变成0
                clearInterval(timeDown);
                this.sendState = false;
                this.countDown = 60;
              }
            }, 1000)

          //发送验证码
            this.$axios.post('/api/api/send_message',{tel: this.phone, type: 1}).then(response => {
              this.$Toast({message: response.data.msg, duration: 1800});
            }).catch(error => {})
        }else {
          this.$Toast({message: '请输入正确手机号！', duration: 1800});
        }
      },

      //确认登录
      submitLogin () {
        if (regPhone(this.phone)) {
          this.$Toast({message: '请输入正确的手机号', duration: 1800});
        }else if (regPassWord(this.password)) {
          this.$Toast({message: '请输入6-18位包含字母数字的密码', duration: 1800});
        }else if (this.verify === '') {
          this.$Toast({message: '请输入验证码', duration: 1800});
        }else {
          //提交注册
          this.$Indicator.open({text: '注册中...', spinnerType: 'fading-circle'});
          this.$axios.post('/api/api/register',{phone: this.phone, password: this.password, verify: this.verify}).then(response => {
            this.$Indicator.close();
            this.$Toast({message: response.data.msg, duration: 1800});
            console.log(response.data);
            if (parseInt(response.data.status) === 1) { //status == 1 注册成功
              setTimeout(() => {window.location.href = '/Login';},1800)
            }
          }).catch(error => {this.$Indicator.close()})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/login";
</style>
