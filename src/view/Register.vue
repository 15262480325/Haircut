<template>
  <div class="container bg-white">
    <!--头部-->
    <HeaderComponent :showBackBtn = showBackBtn :shouMeunBtn = shouMeunBtn hearderTitle="注册"></HeaderComponent>

    <div class="font24 p-l-md p-r-md m-t-lg">
      <!--手机号-->
      <div class="group"><label class="font32 fa fa-user" for="phone"></label><input type="text" id="phone" placeholder="请输入手机号"><i></i></div>

      <!--密码-->
      <div class="group"><label class="font32 fa fa-unlock-alt" for="password"></label><input type="password" id="password" placeholder="请输入密码"><i></i></div>

      <!--验证码-->
      <div class="group">
        <div class="relative">
          <label class="font32 fa fa-barcode" for="code"></label><input type="text" id="code" placeholder="请输入验证码"><i></i>
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

    <p class="font24 txtR p-md"><router-link class="pink" to="">已有账号</router-link></p>
  </div>

</template>

<script>
  import HeaderComponent from '../components/HeaderComponent'
  import {isValEmpty,regPhone} from  '../assets/js/regex'
  export default {
    name: 'Register',
    components: {HeaderComponent},
    data () {
      return {
        showBackBtn: true, //不显示头部回退按钮
        shouMeunBtn: false, //显示头部右侧功能按钮
        sendState: false, //发送验证码状态
        countDown: 60 //发送验证码倒计时
      }
    },
    methods: {
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
            this.$axios.post('/api/api/send_message',{tel: phone, type: '2'}).then(response => {
              this.$Toast({message: response.data.msg, duration: 1800});
            }).catch(error => {})
        }else {
          this.$Toast({message: '请输入正确手机号！', duration: 1800});
        }
      },

      //确认登录
      submitLogin () {
        const phone = document.getElementById('phone'); //手机号
        const password = document.getElementById('password'); //密码
        const code = document.getElementById('code'); //验证码

        if (regPhone(phone.value)) {
          this.$Toast({message: '请输入正确的手机号', duration: 1800});
          phone.focus();
        }else if (isValEmpty(password.value)) {
          this.$Toast({message: '请输入密码', duration: 1800});
          password.focus();
        }else if (isValEmpty(code.value)) {
          this.$Toast({message: '请输入验证码', duration: 1800});
          code.focus();
        }else {
          //提交注册
          this.$Indicator.open({text: '注册中...', spinnerType: 'fading-circle'});
          this.$axios.post('/api/api/register',{phone: phone.value, password: password.value, verify: code.value}).then(response => {
            this.$Indicator.close();
            this.$Toast({message: response.data.msg, duration: 1800});
            setTimeout(() => {window.location.href = '/';},1800)
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
