<template>
  <div class="box">
    <!--头部-->
    <header class="personal font30">
      <div class="setting"><router-link class="iconfont icon-shezhi" :to="'/Setting/' + $store.state.token"></router-link></div>

      <div class="info">
        <!--头像-->
        <div class="portrait">
          <img :src="portraito" alt="">
        </div>

        <!--昵称-->
        <div class="autograph">
          <p class="weight">{{list.nickname}}</p>
          <p class="font22">{{list.information}}</p>
        </div>
      </div>

    </header>

    <!--工具-->
    <div class="tool font26">
      <a href="javascript:;"><i class="iconfont icon-shoucang"></i>收藏</a>
      <a href="javascript:;"><i  class="iconfont icon-pinglun"></i>评价</a>
      <a href="javascript:;"><i class="iconfont icon-lingdang"></i>消息</a>
    </div>

    <!--信息-->
    <div class="cell font26">
      <!--优惠券-->
      <a href="javascript:;"><span class="iconfont icon-youhuiquan">优惠券 <i class="icon icon-iconfontqianjin"></i></span></a>

      <!--钱-->
      <a href="javascript:;"><span class="iconfont icon-qian">钱 <i class="icon icon-iconfontqianjin"></i></span></a>
    </div>

    <!--设置-->
    <div class="cell m-t-lg font26">
      <router-link :to="'/Setting/' + $store.state.token"><span class="iconfont icon-shezhi" >设置 <i class="icon icon-iconfontqianjin"></i></span></router-link>
    </div>

    <!--底部菜单-->
    <FooterComponent activeClass="user"></FooterComponent>
  </div>
</template>

<script>
  import portraito from '../../assets/images/portraito.jpg'

  export default {
    name: 'Index',
    components: {
      FooterComponent: resolve => {require(['../../components/FooterComponent.vue'], resolve)}, //公共站底组件
    },
    data () {
      return {
        list: [],
        portraito: ''
      }
    },
    methods: {},
    created () {
      //获取基本信息
      this.$axios.post('/api/personal', {id: this.$store.state.token}).then(response => {
        this.list = response.data.data;
        this.portraito =this.$imageBasicUrl + this.list.head || portraito;
      })
    }
  }
</script>
<style lang="scss" scoped>
  .box {
    min-height: 100vh;
    background: #efeff4;

    .personal {
      padding: 0.2rem;
      color: white;
      background: #FA729A;

      .setting {
        height: 0.66rem;
        text-align: right;
      }

      .info {
        line-height: 1.12rem;

        .portrait {
          display: inline-block;
          width: 1.12rem;
          height: 1.12rem;
          vertical-align: middle;

          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }

        .autograph {
          display: inline-block;
          width: 70%;
          line-height: 0.38rem;
          margin-left: 0.14rem;
          vertical-align: middle;

          p {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }
    }

    .tool {
      margin: 0.2rem 0;
      background: white;
      overflow: hidden;

      a {
        width: 33.33%;
        float: left;
        padding: 0.12rem 0;
        line-height: 0.38rem;
        text-align: center;

        i {
          display: inline-block;
          width: 100%;
          font-weight: 600;
        }
      }

      a:active {
        background: #E9E9E9;
      }
    }

    .cell {
      background: white;

      a {
        display: block;
        padding-left: 0.2rem;
        line-height: 0.7rem;

        span {
          display: block;
          padding: 0 0.22rem 0 0.58rem;
          position: relative;
          border-top: 1px solid #dcdcdc;

          &:before,&::before {
            position: absolute;
            left: 0.22rem;
          }

          i {
            float: right;
            color: #b8bbbf;
            font-style: normal;
          }
        }

        span.icon-qian:before, span.icon-qian::before {
          color: #FA729A;
        }

        span.icon-shezhi:before, span.icon-shezhi::before {
          color: #50b4f9;
        }
      }

      a:first-child span {
        border-top: none;
      }

      a:active {
        background: #E9E9E9;
      }
    }
  }
</style>
