<template>
  <!--底部菜单-->
  <header :class="hearderFixed ? 'header fixed font24' : 'header font24'">
    <div class="relative">
      <a v-if="showBackBtn" class="back mintui mintui-back"  @click="goBack"></a>
      <span class="inline">{{hearderTitle}}</span>
      <a v-if="shouMeunBtn" class="meun" href="javascript:;" @click="clickEvent"><i :class="icon"></i> {{meunTitle}}</a>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'HeaderComponent',
    props: {
      'hearderFixed': { //公共头部是否绝对定位
        type: Boolean,
        default: true
      },
      'hearderTitle': { //公共头部文字
        type: String,
        required: true,
      },
      'showBackBtn': { //回退按钮
        type: Boolean,
        default: false
      },
      'shouMeunBtn': { //公共头部右侧功能按钮
        type: Boolean,
      },
      'icon': { //公共头部右侧功能按钮图标
        type: String
      },
      'meunTitle': { //公共头部右侧功能按钮文字
        type: String
      },
      'clickEvent': { //公共头部右侧功能按钮点击触发的事件
        type: Function
      }
    },
    methods: {
      goBack () {
        this.$router.back();
      }
    }
  }
</script>
