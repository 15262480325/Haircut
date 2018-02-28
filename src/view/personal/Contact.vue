<template>
  <div class="container bg-white">
    <!--头部-->
    <HeaderComponent :showBackBtn = "true" hearderTitle="联系方式"></HeaderComponent>

    <div class="font24 p-l-md p-r-md m-t-lg">
      <!--手机号-->
      <div class="group"><label class="font32 iconfont icon-shouji"></label><input type="tel" v-model="phone" placeholder="请输入手机号"><i></i></div>

      <!--验证码-->
      <div class="group">
        <div class="relative">
          <label class="font32 iconfont icon-yanzhengma"></label><input type="text" v-model="code" maxlength="4" placeholder="请输入验证码"><i></i>
        </div>

        <!--发送按钮-->
        <mt-button v-if="!sendState" class="send pink-btn" type="danger" @click.native="sendVerificationCode">点击发送验证码</mt-button>

        <mt-button plain v-if="sendState" class="send" type="danger">{{countDown}} 秒后重新发送</mt-button>
      </div>
    </div>

    <!--下一步按钮-->
    <div class="p-l-md p-r-md m-t-lg">
      <mt-button class="pink-btn" size="large" type="danger" @click.native="changePhone">确定</mt-button>
    </div>
  </div>

</template>

<script>
  import {regPhone} from '../../assets/js/regex'
  export default {
    name: 'Contact',
    components: {
      HeaderComponent: resolve => {require(['../../components/HeaderComponent.vue'], resolve)}, //公共头部组件
    },
    data () {
      return {
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
              if (this.countDown -- <= 0) { //判断时间是否变成0
                clearInterval(timeDown);
                this.sendState = false;
                this.countDown = 60;
              }
            }, 1000)

          //发送验证码
            this.$axios.post('/send_message',{tel: this.phone}).then(response => {
              this.$Toast({message: response.data.msg, duration: 1800});
            }).catch(error => {})
        }else {
          this.$Toast({message: '请输入正确手机号！', duration: 1800});
        }
      },

      //更改联系方式
      changePhone () {
        if (regPhone(this.phone)) {
          this.$Toast({message: '请输入正确的手机号!',duration: 1800});
        }else if (this.code === '') {
          this.$Toast({message: '请输入验证码！', duration: 1800});
        }else {
          this.$Indicator.open({text: '提交中...', spinnerType: 'fading-circle'});
          this.$axios.post('/upgrade_phone',{uid: this.$store.state.token, phone: this.phone, verify: this.code}).then(response => {
            this.$Indicator.close();
            this.$Toast({message: response.data.msg, duration: 1800});
            if (parseInt(response.data.status) === 1) {
              setTimeout(() => {window.location.href = '/Setting/'+this.$store.state.token+''},1800)
            }
          }).catch(error => {this.$Indicator.close();})
        }
      }
    },
    created () {
      //获取联系方式
      this.$axios.post('/personal', {id: this.$store.state.token}).then(response => {
        this.phone = response.data.data.phone;
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/login";
</style>
