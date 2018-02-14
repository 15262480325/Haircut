<template>
  <!--底部菜单-->
  <footer class="footer font24 clearfix">
    <router-link :class="activeClass == 'home' ? 'active' : ''" to="/"><span><i :class="activeClass == 'home' ? 'iconfont icon-shouye' : 'iconfont icon-home'"></i> 首页</span></router-link>
    <router-link :class="activeClass == 'category' ? 'active' : ''" to=""><span><i :class="activeClass == 'category' ? 'iconfont icon-leimupinleifenleileibie' : 'iconfont icon-leimupinleifenleileibie--'"></i> 分类</span></router-link>
    <router-link :class="activeClass == 'find' ? 'active' : ''" to=""><span><i :class="activeClass == 'find' ? 'iconfont icon-locationicon' : 'iconfont icon-location3dingwei3'"></i> 发现</span></router-link>
    <router-link :class="activeClass == 'user' ? 'active' : ''" :to="'/Personal/' + $store.state.token"><span><i :class="activeClass == 'find' ? 'iconfont icon-wode1' : 'iconfont icon-wode'"></i> 我的</span></router-link>
  </footer>
</template>

<script>
  export default {
    name: 'FooterComponent',
    props: {
      'activeClass': { //底部对应菜单高亮
        type: String,
        required: true,
      }
    }
  }
</script>
