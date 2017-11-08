<template>
  <!--底部菜单-->
  <footer class="footer font24">
    <router-link :class="activeClass == 'home' ? 'active' : ''" to=""><span><i class="fa-home"></i> 首页</span></router-link>
    <router-link :class="activeClass == 'category' ? 'active' : ''" to=""><span><i class="fa-server"></i> 分类</span></router-link>
    <router-link :class="activeClass == 'find' ? 'active' : ''" to=""><span><i class="fa-map-marker"></i> 发现</span></router-link>
    <router-link :class="activeClass == 'user' ? 'active' : ''" to=""><span><i class="fa-user"></i> 我的</span></router-link>
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
