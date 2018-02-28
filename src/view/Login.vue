<template>
  <div class="container bg-white">
    <!--头部-->
    <HeaderComponent :showBackBtn = "true" hearderTitle="登录"></HeaderComponent>

    <!--logo-->
    <div class="logo"><img :src="$store.state.head"></div>

    <!--账户登录-->
    <div v-if="loginType === 'account'" class="font24 p-l-md p-r-md">
      <form id="accountForm">
        <!--账号-->
        <div class="group"><label class="font32 iconfont icon-shouji"></label><input type="text" name="phone" v-model="account" placeholder="请输入账号" autocomplete="off"><i></i></div>

        <!--密码-->
        <div class="group">
          <div class="relative">
            <label class="font32 iconfont icon-201"></label><input type="password" name="password" v-model="password" minlength="6" maxlength="18" placeholder="请输入密码"><i></i>
          </div>

          <!--忘记密码-->
          <router-link class="forget" to="/ForgotPsd">找回密码</router-link>
        </div>
      </form>
    </div>

    <!--短信登录-->
    <div v-if="loginType === 'sms'" class="font24 p-l-md p-r-md">
      <form id="smsForm" action="">
        <input type="hidden" name="type" value="1">

        <!--账号-->
        <div class="group"><label class="font32 iconfont icon-shouji"></label><input type="tel" maxlength="11" name="phone" v-model="phone" placeholder="请输入手机号"><i></i></div>

        <!--验证码-->
        <div class="group">
          <div class="relative">
            <label class="font32 iconfont icon-yanzhengma"></label><input type="tel" maxlength="4" name="password" v-model="code" placeholder="请输入验证码"><i></i>
          </div>

          <!--发送按钮-->
          <mt-button v-if="!sendState" class="send pink-btn" type="danger" @click.native="sendVerificationCode($event)">点击发送验证码</mt-button>

          <mt-button plain v-if="sendState" class="send" type="danger">{{countDown}} 秒后重新发送</mt-button>
        </div>
      </form>
    </div>

    <!--提交按钮-->
    <div class="p-l-md p-r-md m-t-lg">
      <mt-button class="pink-btn" size="large" type="danger" @click.native="submitLogin">登录</mt-button>
    </div>

    <p class="font24 txtC m-t-md"><router-link class="pink" to="/Register">没有账号,马上注册</router-link></p>

    <p class="font24 txtC m-t-md">
      <a v-if="loginType === 'account'" class="pink" href="javascript:;" @click="loginType = 'sms'">手机验证登录</a>
      <a v-if="loginType === 'sms'" class="pink" href="javascript:;" @click="loginType = 'account'">账号登录</a>
    </p>
  </div>

</template>

<script>
  import {regPhone} from  '../assets/js/regex'
  export default {
    name: 'Login',
    components: {
      HeaderComponent: resolve => {require(['../components/HeaderComponent.vue'], resolve)}, //公共头部组件
    },
    data () {
      return {
        loginType: 'account', //登录方式 ： 账户/短信
        account: this.$store.state.account,
        password: '',
        phone: '',
        code: '',
        sendState: false, //发送验证码状态
        countDown: 60 //发送验证码倒计时
      }
    },
    methods: {
      //点击发送验证码
      sendVerificationCode (event) {
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
          this.$axios.post('/send_message',{tel: this.phone, type: 0}).then(response => {
            this.$Toast({message: response.data.msg, duration: 1800});
          }).catch(error => {})
        }else {
          this.$Toast({message: '请输入正确手机号！', duration: 1800});
        }
        event.preventDefault();
      },

      //登录方法
      loginRequest (form) {
        this.$Indicator.open({text: '登录中...', spinnerType: 'fading-circle'});
        this.$axios.post('/login', new FormData(document.getElementById(form))).then(response => {
          this.$Indicator.close();
          this.$Toast({message: response.data.msg, duration: 1800});
          if (parseInt(response.data.status) === 1) { //status == 1 成功
            this.$store.commit('saveAccount', response.data.data);
            setTimeout(() => {this.$router.push({ path: '/' })}, 1800)
          }
        }).catch(error => {this.$Indicator.close()})
      },

      //验证账号登录
      accountLogin () {
        if (this.account === '') {
          this.$Toast({message: '请输入账号', duration: 1800});
        }else if (this.password === '') {
          this.$Toast({message: '请输入密码', duration: 1800});
        }else {
          this.loginRequest('accountForm');
        }
      },

      //短信登录
      smsLogin () {
        if (regPhone(this.phone)) {
          this.$Toast({message: '请输入正确的手机号', duration: 1800});
        }else if (this.code === '') {
          this.$Toast({message: '请输入验证码', duration: 1800});
        }else {
          this.loginRequest('smsForm');
        }
      },

      //确认登录
      submitLogin () {
        if (this.loginType === 'account') { //判断登录方式
          this.accountLogin();
        }else {
          this.smsLogin();
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/login";
</style>
