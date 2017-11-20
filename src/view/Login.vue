<template>
  <div class="container bg-white">
    <!--头部-->
    <HeaderComponent :showBackBtn = showBackBtn :shouMeunBtn = shouMeunBtn hearderTitle="登录"></HeaderComponent>

    <!--logo-->
    <div class="logo"><img src="../assets/images/portraito.png" alt=""></div>

    <!--账户登录-->
    <div v-if="loginType == 'account'" class="font24 p-l-md p-r-md">
      <!--账号-->
      <div class="group"><label class="font32 iconfont icon-shouji" for="account"></label><input type="text" id="account" placeholder="请输入账号"><i></i></div>

      <!--密码-->
      <div class="group">
        <div class="relative">
          <label class="font32 iconfont icon-201" for="password"></label><input type="password" id="password" minlength="6" maxlength="18" placeholder="请输入密码"><i></i>
        </div>

        <!--忘记密码-->
        <router-link class="forget" to="/ForgotPsd">找回密码</router-link>
      </div>
    </div>

    <!--短信登录-->
    <div v-if="loginType == 'sms'" class="font24 p-l-md p-r-md">
      <!--账号-->
      <div class="group"><label class="font32 iconfont icon-shouji" for="phone"></label><input type="tel" maxlength="11" id="phone" placeholder="请输入手机号"><i></i></div>

      <!--验证码-->
      <div class="group">
        <div class="relative">
          <label class="font32 iconfont icon-yanzhengma" for="code"></label><input type="tel" maxlength="4" id="code" placeholder="请输入验证码"><i></i>
        </div>

        <!--发送按钮-->
        <mt-button v-if="!sendState" class="send pink-btn" type="danger" @click.native="sendVerificationCode">点击发送验证码</mt-button>

        <mt-button plain v-if="sendState" class="send" type="danger">{{countDown}} 秒后重新发送</mt-button>
      </div>
    </div>

    <!--提交按钮-->
    <div class="p-l-md p-r-md m-t-lg">
      <mt-button class="pink-btn" size="large" type="danger" @click.native="submitLogin">登录</mt-button>
    </div>

    <p class="font24 txtC m-t-md"><router-link class="pink" to="/Register">没有账号,马上注册</router-link></p>

    <p class="font24 txtC m-t-md"><a class="pink" href="javascript:;" @click="handoverLogin">手机验证登录</a></p>

  </div>

</template>

<script>
  import HeaderComponent from '../components/HeaderComponent'
  import {isValEmpty,regPhone} from  '../assets/js/regex'
  export default {
    name: 'Login',
    components: {HeaderComponent},
    data () {
      return {
        showBackBtn: true, //不显示头部回退按钮
        shouMeunBtn: false, //显示头部右侧功能按钮
        loginType: 'account', //登录方式 ： 账户/短信
        sendState: false, //发送验证码状态
        countDown: 60 //发送验证码倒计时
      }
    },
    methods: {
      //切换登录
      handoverLogin () {
        if (this.loginType == 'account') {
          this.loginType = 'sms';
          event.target.innerText = '手机验证登录'
        }else {
          this.loginType = 'account';
          event.target.innerText = '账号登录'
        }
      },

      //点击发送验证码
      sendVerificationCode () {
        const phone = document.getElementById('phone').value;
        if (!regPhone(phone)) { //是否输入正确的手机号
          this.sendState = true;
          let timeDown = setInterval(() => { //定时器发送验证码时间递减
            if (parseInt(this.countDown) > 0) { //判断时间是否变成0
              this.countDown -= 1;
            }else {
              this.sendState = false;
              this.countDown = 60;
              clearInterval(timeDown);
            }
          }, 1000)

          //发送验证码
          this.$axios.post('/api/api/send_message',{tel: phone, type: 0}).then(response => {
            this.$Toast({message: response.data.msg, duration: 1800});
          }).catch(error => {})
        }else {
          this.$Toast({message: '请输入正确手机号！', duration: 1800});
        }
      },

      //确认登录
      submitLogin () {
        if (this.loginType == 'account') { //判断登录方式
          this.accountLogin();
        }else {
          this.smsLogin();
        }
       },

      //账号登录
      accountLogin () {
        const account = document.getElementById('account'); //账号
        const password = document.getElementById('password'); //密码

        if (isValEmpty(account.value)) {
          this.$Toast({message: '请输入账号', duration: 1800});
          account.focus();
        }else if (isValEmpty(password.value)) {
          this.$Toast({message: '请输入密码', duration: 1800});
          password.focus();
        }else {
          //提交登录
          this.$Indicator.open({text: '登录中...', spinnerType: 'fading-circle'});
          this.$axios.post('/api/api/login',{phone: account.value, password: password.value}).then(response => {
            this.$Indicator.close();
            this.$Toast({message: response.data.msg, duration: 1800});

            if (parseInt(response.data.status) == 1) { //status == 1 成功
              sessionStorage.setItem('loginToken', response.data.data.phone);  //保存登录用户
              setTimeout(() => {window.location.href = '/';},1800)
            }
          }).catch(error => {this.$Indicator.close()})
        }
      },

      //短信登录
      smsLogin () {
        const phone = document.getElementById('phone'); //手机号
        const code = document.getElementById('code'); //验证码

        if (regPhone(phone.value)) {
          this.$Toast({message: '请输入正确的手机号', duration: 1800});
          phone.focus();
        }else if (isValEmpty(code.value)) {
          this.$Toast({message: '请输入验证码', duration: 1800});
          code.focus();
        }else {
          //提交登录
          this.$Indicator.open({text: '登录中...', spinnerType: 'fading-circle'});
          this.$axios.post('/api/api/login',{phone: phone.value, password: code.value, type: '1'}).then(response => {
            this.$Indicator.close();
            this.$Toast({message: response.data.msg, duration: 1800});
            if (parseInt(response.data.status) == 2) { //status == 1 成功
              sessionStorage.setItem('loginToken', response.data.data.phone);  //保存登录用户
              setTimeout(() => {window.location.href = '/';},1800)
            }
          }).catch(error => {this.$Indicator.close()})
        }
      }
    },
    mounted () {
      document.getElementsByTagName('html')[0].style.height = 100 + '%';
      document.body.style.height = 100 + '%';
      document.getElementById('app').style.height = 100 + '%'
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/login";
</style>
