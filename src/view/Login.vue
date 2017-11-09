<template>
  <div class="container bg-white">
    <!--头部-->
    <HeaderComponent :showBackBtn = showBackBtn :shouMeunBtn = shouMeunBtn hearderTitle="登录"></HeaderComponent>

    <!--logo-->
    <div class="logo"><img src="../assets/images/portraito.png" alt=""></div>

    <div class="font24 p-l-md p-r-md">
      <form action="">
        <!--账号-->
        <div class="group"><label class="font32 fa fa-user" for="account"></label><input type="text" id="account" placeholder="请输入账号"><i></i></div>

        <!--密码-->
        <div class="group"><label class="font32 fa fa-unlock-alt" for="password"></label><input type="password" id="password" placeholder="请输入密码"><i></i></div>
      </form>
    </div>

    <!--提交按钮-->
    <div class="p-l-md p-r-md m-t-lg">
      <mt-button size="large" type="danger">登录</mt-button>
    </div>

    <p class="font24 txtC m-t-md"><router-link class="pink" to="">没有账号,马上注册</router-link></p>

    <p class="font24 txtC m-t-md"><router-link class="pink" to="">手机验证登录</router-link></p>

  </div>

</template>

<script>
  import HeaderComponent from '../components/HeaderComponent'
  export default {
    name: 'Login',
    components: {HeaderComponent},
    data () {
      return {
        showBackBtn: true, //不显示头部回退按钮
        shouMeunBtn: false //显示头部右侧功能按钮
      }
    },
    methods: {

    },
    created () {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/login";
</style>
