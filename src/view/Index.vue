<template>
  <div class="container">
    <!--头部-->
    <HeaderComponent :showBackBtn = showBackBtn :shouMeunBtn = shouMeunBtn hearderTitle="剪头去" icon="fa fa-user-o" :meunTitle="loginToken != '' ? '你好 ' + loginToken : loginToken" :clickEvent="isLogin"></HeaderComponent>

    <!--轮播图-->
    <div class="swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></mt-swipe-item>
        <mt-swipe-item><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></mt-swipe-item>
        <mt-swipe-item><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></mt-swipe-item>
        <mt-swipe-item><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></mt-swipe-item>
      </mt-swipe>
    </div>

    <!--搜索-->
    <div class="search font24">
      <div class="search-g"><input type="text" placeholder="我要换个发型"><a class="mintui mintui-search font32" href="javascript:;"></a></div>
    </div>

    <!--最新活动-->
    <div class="list font24">
      <p class="list-title"><label>最新活动</label> <router-link class="darkpink fr" to="">更多 <i class="fa fa-angle-double-right"></i></router-link></p>

      <!--活动图片-->
      <ul class="list-item clearfix">
        <li class="seventy"><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></li>
        <li class="thirty"><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></li>
        <li class="thirty"><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></li>
        <li class="seventy"><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></li>
      </ul>
    </div>

    <!--优秀商家-->
    <div class="list font24">
      <p class="list-title"><label>优秀商家</label> <router-link class="darkpink fr" to="">更多 <i class="fa fa-angle-double-right"></i></router-link></p>

      <!--活动图片-->
      <ul class="list-item clearfix">
        <li class="one-third"><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></li>
        <li class="one-third"><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></li>
        <li class="one-third"><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></li>
        <li class="one-third"><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></li>
        <li class="one-third"><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></li>
        <li class="one-third"><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></li>
      </ul>
    </div>

    <!--优秀案例-->
    <div class="list font24">
      <p class="list-title"><label>优秀案例</label> <router-link class="darkpink fr" to="">更多 <i class="fa fa-angle-double-right"></i></router-link></p>

      <!--活动图片-->
      <ul class="list-item clearfix">
        <li class="seventy"><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></li>
        <li class="thirty"><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></li>
      </ul>
    </div>

    <!--最新加盟-->
    <div class="list font24">
      <p class="list-title"><label>最新加盟</label> <router-link class="darkpink fr" to="">更多 <i class="fa fa-angle-double-right"></i></router-link></p>

      <!--活动图片-->
      <div id="join" class="overflow-x">
        <ul id="joinItem" class="list-item clearfix">
          <li class="join-item"><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></li>
          <li class="join-item"><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></li>
          <li class="join-item"><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></li>
          <li class="join-item"><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></li>
          <li class="join-item"><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></li>
          <li class="join-item"><router-link to=""><img src="http://scimg.jb51.net/allimg/160531/13-16053114324L51.jpg" alt=""></router-link></li>
        </ul>
      </div>
    </div>

    <!--底部菜单-->
    <FooterComponent activeClass="home"></FooterComponent>
  </div>

</template>

<script>
  import FooterComponent from '../components/FooterComponent'
  import HeaderComponent from '../components/HeaderComponent'
  export default {
    name: 'Index',
    components: {FooterComponent,HeaderComponent},
    data () {
      return {
        showBackBtn: false, //不显示头部回退按钮
        shouMeunBtn: true, //显示头部右侧功能按钮
        loginToken: sessionStorage.getItem('loginToken') || '' //登录用户
      }
    },
    methods: {
      //头部右侧点击触发事件 判断是否登录
      isLogin () {
        let route = this.loginToken == '' ? '/#/Login' : '';
        window.location.href = route;
      }
    },
    mounted () {
      document.querySelector('#joinItem').style.width = 50 * document.querySelectorAll('.join-item').length +'%';
    },
    created () {}
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/index";
</style>
