<template>
  <div class="container">
    <!--头部-->
    <HeaderComponent :shouMeunBtn = "true" hearderTitle="理发去" icon="iconfont icon-wode" :meunTitle="nickName !== '' ? '你好,' + nickName : ''" :clickEvent="isLogin"></HeaderComponent>

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
  import {mapState} from 'vuex'
  export default {
    name: 'Index',
    components: {
      HeaderComponent: resolve => {require(['../components/HeaderComponent.vue'], resolve)}, //公共头部组件
      FooterComponent: resolve => {require(['../components/FooterComponent.vue'], resolve)}, //公共站底组件
    },
    data () {
      return {

      }
    },
    computed: mapState({
      nickName: state => state.loginState.nickName
    }),
    methods: {
      //头部右侧点击触发事件 判断是否登录
      isLogin () {
        this.$store.state.loginState.token === '' ? this.$router.push({path: '/Login'}) : this.$router.push({path: '/Personal/'+this.$store.state.loginState.token+''});
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
