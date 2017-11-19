<template>
  <div class="container bg-white">
    <!--头部-->
    <HeaderComponent :showBackBtn = showBackBtn :shouMeunBtn = shouMeunBtn hearderTitle="找回密码"></HeaderComponent>

    <div class="font24 p-l-md p-r-md m-t-lg">
      <!--手机号-->
      <div class="group"><label class="font32 fa fa-user" for="phone"></label><input type="text" id="phone" v-model="phone" placeholder="请输入手机号"><i></i></div>

      <!--验证码-->
      <div class="group">
        <div class="relative">
          <label class="font32 fa fa-barcode" for="code"></label><input type="text" v-model="code" maxlength="4" id="code" placeholder="请输入验证码"><i></i>
        </div>

        <!--发送按钮-->
        <mt-button v-if="!sendState" class="send pink-btn" type="danger" @click.native="sendVerificationCode">点击发送验证码</mt-button>

        <mt-button plain v-if="sendState" class="send" type="danger">{{countDown}} 秒后重新发送</mt-button>
      </div>
    </div>

    <!--下一步按钮-->
    <div class="p-l-md p-r-md m-t-lg">
      <mt-button class="pink-btn" size="large" type="danger" @click.native="">下一步</mt-button>
    </div>
  </div>

</template>

<script>
  import HeaderComponent from '../../components/HeaderComponent'
  import {isValEmpty,regPhone} from '../../assets/js/regex'
  export default {
    name: 'ForgotPsd',
    components: {HeaderComponent},
    data () {
      return {
        showBackBtn: true, //不显示头部回退按钮
        shouMeunBtn: false, //显示头部右侧功能按钮
        sendState: false, //发送验证码状态
        countDown: 60, //发送验证码倒计时
        phone: '', //手机号
        code: '' //验证码
      }
    },
    methods: {
      //点击发送验证码
      sendVerificationCode () {
        if (!regPhone(this.phone)) { //是否输入正确的手机号
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
            this.$axios.post('/api/api/send_message',{tel: phone, type: 2}).then(response => {
              this.$Toast({message: response.data.msg, duration: 1800});
            }).catch(error => {})
        }else {
          this.$Toast({message: '请输入正确手机号！', duration: 1800});
        }
      },

      //判断验证码是否正确
      regexCode () {
//        if () {
//
//        }
      },

      //点击下一步
      nextStep () {
        if (regPhone(this.phone)) {
          this.$Toast({message: '请输入正确的手机号!',duration: 1800});
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
  @import "../../assets/css/login";
</style>
