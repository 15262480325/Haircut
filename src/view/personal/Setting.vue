<template>
  <div class="box">
    <!--头部-->
    <HeaderComponent :hearderFixed = "false" :shouMeunBtn = "true" :showBackBtn = "true" hearderTitle="个人信息" icon="iconfont icon-wode" :clickEvent="toPersonal"></HeaderComponent>

    <div class="setting font24">
      <!--头像-->
      <router-link :to="'/Portrait/' + $store.state.loginState.token">
        <span>头像 <img v-if="portraito !== ''" :src="portraito"></span>
      </router-link>

      <!--账号-->
      <a>
        <span>账号 <label>{{list.phone}}</label></span>
      </a>

      <!--昵称-->
      <a href="javascript:;" @click="changeNickName">
        <span>昵称 <label>{{list.nickname || ''}}</label></span>
      </a>
    </div>

    <div class="setting m-t-lg font24">
      <!--联系方式-->
      <router-link :to="'/Contact/' + $store.state.loginState.token">
        <span>联系方式 <label>{{list.tel}}</label></span>
      </router-link>

      <!--邮箱-->
      <router-link :to="'/Email/' + $store.state.loginState.token">
        <span>邮箱 <label>{{list.email}}</label></span>
      </router-link>

      <!--性别-->
      <a href="javascript:;" @click="popupVisible = true">
        <span>性别 <label>{{parseInt(list.sex) === 0 ? '男' : parseInt(list.sex) === 1 ? '女' : list.sex}}</label></span>
      </a>

      <!--个性签名-->
      <a href="javascript:;" @click="changeInformatione">
        <span>个性签名 <label>{{list.information}}</label></span>
      </a>
    </div>

    <div class="setting m-t-lg font24">
      <router-link :to="'/ChangePass/' + $store.state.loginState.token">
        <span>修改密码</span>
      </router-link>

      <a href="javascript:;" @click="switchAccount">
        <span>切换账号</span>
      </a>
    </div>

    <div class="setting m-t-lg font24">
      <a href="javascript:;" @click="loginOut">
        <span>退出登录</span>
      </a>
    </div>

    <!--修改性别-->
    <mt-popup v-model="popupVisible" position="bottom" class="full">
      <p class="sex-title">性别</p>
      <mt-radio align="right" v-model="sexRadio" :options="[{label: '男',value: '0'},{label: '女',value: '1'}]" @change=""></mt-radio>
    </mt-popup>
  </div>
</template>

<script>
  import portraito from '../../assets/images/portraito.jpg'

  export default {
    name: 'Settings',
    components: {
      HeaderComponent: resolve => {require(['../../components/HeaderComponent.vue'], resolve)}, //公共头部组件
    },
    data () {
      return {
        portraito: '',
        list: [],
        sexRadio: '',
        popupVisible: false
      }
    },
    methods: {
      //回到个人中心
      toPersonal () {this.$router.push('/Personal/'+this.$store.state.loginState.token+'')},

      //修改昵称
      changeNickName () {
        this.$MessageBox.prompt('昵称','').then(({value}) => {
          if (value) {
            this.$Indicator.open({text: '修改中...', spinnerType: 'fading-circle'});
            this.$axios.post('/upgrade_nickname','uid='+this.$store.state.loginState.token+'&nickname='+value+'').then(response => {
              this.$Indicator.close();
              this.$Toast({message: response.data.msg, duration: 1800});
              if (parseInt(response.data.status) === 1) {
                this.list.nickname = response.data.nickname;
                this.$store.commit('changeNickName', response.data.nickname);
              }
            })
          }
        }).catch(error => {this.$Indicator.close();});
      },

      //修改个性签名
      changeInformatione () {
        this.$MessageBox.prompt('个性签名','').then(({value}) => {
          if (value) {
            this.$Indicator.open({text: '修改中...', spinnerType: 'fading-circle'});
            this.$axios.post('/set_information','uid='+this.$store.state.loginState.token+'&information='+value+'').then(response => {
              this.$Indicator.close();
              this.$Toast({message: response.data.msg, duration: 1800});
              if (parseInt(response.data.status) === 1) {
                this.list.information = response.data.information;
              }
            })
          }
        }).catch(error => {this.$Indicator.close();});
      },

      //切换账号
      switchAccount () {
        this.$store.commit('cancelLoginState');
        this.$router.push({ path: '/Login' })
      },

      //退出登录
      loginOut () {
        this.$store.commit('cancelLoginState');
        this.$router.push({ path: '/' })
      }
    },
    watch: {
      sexRadio (value,oldval) {
        this.popupVisible = false;
        this.$Indicator.open({text: '修改中...', spinnerType: 'fading-circle'});
        this.$axios.post('/upgrade_sex','uid='+this.$store.state.loginState.token+'&sex='+value+'').then(response => {
          this.$Indicator.close();
          this.$Toast({message: response.data.msg, duration: 1800});
          parseInt(response.data.status) === 1 ? this.list.sex = value : '';
        }).catch(error => {
          this.$Indicator.close();
        })
      }
    },
    created () {
      //获取基本信息
      this.$axios.post('/personal', {id: this.$store.state.loginState.token}).then(response => {
        this.list = response.data.data;
        this.portraito = this.$imageBasicUrl + this.list.head || portraito;
      })
    }
  }
</script>
<style lang="scss" scoped>
  .box {
    min-height: 100vh;
    background: #efeff4;

    .setting {
      background: #fff;

      a {
        display: block;
        line-height: 0.7rem;
        padding-left: 0.2rem;
      }

      a:active {
        background: #E9E9E9;
      }

      span {
        display: block;
        padding: 0 0.22rem;
        border-top: 1px solid #dcdcdc;
      }

      a:first-child span {
        border-top: none;
      }

      label {
        width: 70%;
        float: right;
        text-align: right;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 0.18rem;
        color: #B4B8AA;
      }

      img {
        width: 0.5rem;
        height: 0.5rem;
        float: right;
        margin-top: 0.1rem;
        border-radius: 50%;
      }
    }

    .sex-title {
      padding-top: 0.2rem;
      text-align: center;
      font-size: 0.28rem;
      color: #888;
    }
  }
</style>
