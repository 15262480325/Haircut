<template>
  <div class="container bg-white">
    <!--头部-->
    <HeaderComponent :showBackBtn = "true" hearderTitle="修改密码"></HeaderComponent>

    <div class="font24 p-l-md p-r-md m-t-lg">
      <!--原始密码-->
      <div class="group"><label class="font32 iconfont icon-201"></label><input type="password" v-model="originalPass" placeholder="请输入原始密码"><i></i></div>

      <!--新密码-->
      <div class="group"><label class="font32 iconfont icon-201"></label><input type="password" v-model="newPass" placeholder="请输入新密码"><i></i></div>

      <!--确认密码-->
      <div class="group"><label class="font32 iconfont icon-201"></label><input type="password" v-model="confirmPass" placeholder="请确认密码"><i></i></div>
    </div>

    <!--下一步按钮-->
    <div class="p-l-md p-r-md m-t-lg">
      <mt-button class="pink-btn" size="large" type="danger" @click.native="changePass">确认</mt-button>
    </div>
  </div>

</template>

<script>
  import {regPassWord} from '../../assets/js/regex'
  export default {
    name: 'ChangePass',
    components: {
      HeaderComponent: resolve => {require(['../../components/HeaderComponent.vue'], resolve)}, //公共头部组件
    },
    data () {
      return {
        account: '', //账号
        originalPass: '', //原始密码
        newPass: '', //新密码
        confirmPass: '', //确认密码
      }
    },
    methods: {
      //判断原密码是否正确
      async verifyPass () {
        this.$Indicator.open({text: '修改中...', spinnerType: 'fading-circle'});
        //判断原密码是否正确
        const loginStatus = await this.$axios.post('/login',{phone: this.account, password: this.originalPass});
        if (parseInt(loginStatus.data.status) === 1) {  //原密码正确修改密码
          this.$axios.post('/set_password',{phone: this.account, password: this.newPass, confirm_password: this.confirmPass}).then(response => {
            this.$Indicator.close();
            this.$Toast({message: response.data.msg, duration: 1800});
            if (parseInt(response.data.status) === 1) { //status == 1 成功
              this.$store.commit('cancelLoginState');
              setTimeout(() => {this.$router.replace({ path: '/Login' })},1800)
            }
          }).catch(error => {this.$Indicator.close()})
        }else {
          this.$Indicator.close();
          this.$Toast({message: '原密码错误！', duration: 1800});
        }
      },

      //修改密码
      changePass () {
        if (this.originalPass === '') {
          this.$Toast({message: '请输入原始密码！', duration: 1800});
        }else if (regPassWord(this.newPass)) {
          this.$Toast({message: '请输入6-18位包含字母数字的新密码', duration: 1800});
        }else if (this.confirmPass === '') {
          this.$Toast({message: '请确认密码！', duration: 1800});
        }else if (this.confirmPass !== this.newPass) {
          this.$Toast({message: '密码不一致！', duration: 1800});
        }else {
          this.verifyPass();
        }
      },
    },
    created () {
      //获取账号
      this.$axios.post('/personal', {id: this.$store.state.loginState.token}).then(response => {
        this.account = response.data.data.phone;
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/login";
</style>
