<template>
  <div class="container bg-white">
    <!--头部-->
    <HeaderComponent :showBackBtn = "true" hearderTitle="邮箱"></HeaderComponent>

    <div class="font24 p-l-md p-r-md m-t-lg">
      <!--手机号-->
      <div class="group"><label class="font32 iconfont icon-youjian"></label><input type="tel" v-model="email" placeholder="请输入邮箱"><i></i></div>

      <!--验证码-->
      <div class="group">
        <div class="relative">
          <label class="font32 iconfont icon-yanzhengma"></label><input type="text" v-model="code" maxlength="8" placeholder="请输入验证码"><i></i>
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
  import {regEmail} from '../../assets/js/regex'
  export default {
    name: 'Email',
    components: {
      HeaderComponent: resolve => {require(['../../components/HeaderComponent.vue'], resolve)}, //公共头部组件
    },
    data () {
      return {
        sendState: false, //发送验证码状态
        countDown: 60, //发送验证码倒计时
        email: '', //手机号
        code: '' //验证码
      }
    },
    methods: {
      //点击发送验证码
      sendVerificationCode () {
        if (!regEmail(this.email)) {
            this.sendState = true;
            let timeDown = setInterval(() => { //定时器发送验证码时间递减
              if (this.countDown -- <= 0) { //判断时间是否变成0
                clearInterval(timeDown);
                this.sendState = false;
                this.countDown = 60;
              }
            }, 1000)

          //发送验证码
            this.$axios.post('/send_email_code', 'email='+this.email+'').then(response => {
              this.$Toast({message: response.data.msg, duration: 1800});
            }).catch(error => {})
        }else {
          this.$Toast({message: '请输入正确邮箱！', duration: 1800});
        }
      },

      //更改联系方式
      changePhone () {
        if (regEmail(this.email)) {
          this.$Toast({message: '请输入正确的邮箱!',duration: 1800});
        }else if (this.code === '') {
          this.$Toast({message: '请输入验证码！', duration: 1800});
        }else {
          this.$Indicator.open({text: '提交中...', spinnerType: 'fading-circle'});
          this.$axios.post('/upgrade_email',{uid: this.$store.state.token, email: this.email, verify: this.code}).then(response => {
            this.$Indicator.close();
            this.$Toast({message: response.data.msg, duration: 1800});
            if (parseInt(response.data.status) === 1) {
              setTimeout(() => {this.$router.push({name: 'Setting', params: {id: this.$store.state.token}})},1800)
            }
          }).catch(error => {this.$Indicator.close();})
        }
      }
    },
    created () {
      //获取邮箱
      this.$axios.post('/personal', {id: this.$store.state.token}).then(response => {
        this.email = response.data.data.email;
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/login";
</style>
