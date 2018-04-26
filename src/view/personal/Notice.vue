<template>
  <div class="container">
    <!--头部-->
    <HeaderComponent hearderFixed :showBackBtn = "true" hearderTitle="消息中心"></HeaderComponent>

    <!--消息列表-->
    <ul class="notice font24">
      <li>
        <p class="overflow-point">去理发上线啦</p>
        <p class="clamp gray font22">亲,去理发平台上线啦,大盆友小盆友快来体验一下哦,好多优惠活动等你来哟!</p>
        <p class="txtR gray font22"><a class="iconfont icon-sanjiaoxing-down" href="javascript:;">更多</a>2018-09-09</p>
      </li>

      <li>
        <p class="overflow-point">去理发上线啦</p>
        <p class="clamp gray font22">亲,去理发平台上线啦,大盆友小盆友快来体验一下哦,好多优惠活动等你来哟!</p>
        <p class="txtR gray font22"><a class="iconfont icon-sanjiaoxing-down" href="javascript:;">更多</a>2018-09-09</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Notice',
    components: {
      HeaderComponent: resolve => {require(['../../components/HeaderComponent.vue'], resolve)}, //公共头部组件
    },
    data () {
      return {

      }
    },
    methods: {

    },
    created () {

    }
  }
</script>
<style lang="scss" scoped>
  .container {
    min-height: 100vh;

    .notice {
      padding: 0 0.2rem;

      li {
        padding: 0.12rem 0.18rem;
        margin-top: 0.2rem;
        border-radius: 0.08rem;
        background: white;
        border: 1px solid #ede9e9;

        p.clamp {
          display: -webkit-box;
          margin: 0.12rem 0;
          word-break: break-all;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        a {
          position: relative;
          float: left;
          padding-right: 0.28rem;
          color: #333;
          font-size: 0.24rem;
        }

        a:before {
          position: absolute;
          right: 0;
          top: 14%;
          color: #999;
        }
      }
    }
  }
</style>
