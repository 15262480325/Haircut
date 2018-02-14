<template>
  <div class="box">
    <!--头部-->
    <HeaderComponent :hearderFixed = "false" :shouMeunBtn = "true" :showBackBtn = "true" hearderTitle="个人信息" icon="iconfont icon-wode" :clickEvent="toPersonal"></HeaderComponent>

    <div class="setting font24">
      <!--头像-->
      <router-link :to="'/Portrait/' + $store.state.token">
        <span>头像 <img v-if="portraito !== ''" :src="portraito"></span>
      </router-link>

      <!--账号-->
      <a>
        <span>账号 <label>{{list.phone}}</label></span>
      </a>

      <!--昵称-->
      <a href="javascript:;" @click="changeBasicInfo('昵称','upgrade_nickname','nickname')">
        <span>昵称 <label>{{list.nickname || ''}}</label></span>
      </a>
    </div>

    <div class="setting m-t-lg font24">
      <!--联系方式-->
      <router-link :to="'/Contact/' + $store.state.token">
        <span>联系方式 <label>{{list.tel}}</label></span>
      </router-link>

      <!--邮箱-->
      <router-link :to="'/Email/' + $store.state.token">
        <span>邮箱 <label>{{list.email}}</label></span>
      </router-link>

      <!--性别-->
      <a href="javascript:;" @click="popupVisible = true">
        <span>性别 <label>{{parseInt(list.sex) === 0 ? '男' : parseInt(list.sex) === 1 ? '女' : list.sex}}</label></span>
      </a>

      <!--个性签名-->
      <a href="javascript:;" @click="changeBasicInfo('个性签名','set_information','information')">
        <span>个性签名 <label>{{list.information}}</label></span>
      </a>
    </div>

    <div class="setting m-t-lg font24">
      <router-link :to="'/ChangePass/' + $store.state.token">
        <span>修改密码</span>
      </router-link>

      <router-link to="/Login">
        <span>切换账号</span>
      </router-link>
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
      toPersonal () {window.location.href = '/Personal/'+this.$store.state.token+''},

      //修改昵称/个性签名
      changeBasicInfo (title,url,parameter) {
        this.$MessageBox.prompt(''+title+'','').then(({value}) => {
          if (value) {
            this.$Indicator.open({text: '修改中...', spinnerType: 'fading-circle'});
            this.$axios.post('/api/'+ url,'uid='+this.$store.state.token+'&'+parameter+'='+value+'').then(response => {
              this.$Indicator.close();
              this.$Toast({message: response.data.msg, duration: 1800});
              parseInt(response.data.status) === 1 ? this.list[parameter] = response.data.nickname || response.data.information : '';
            })
          }
        }).catch(error => {this.$Indicator.close();});
      },

      //退出登录
      loginOut () {
        window.localStorage.removeItem('account');
        window.localStorage.removeItem('head');
        window.sessionStorage.removeItem('loginToken');
        window.sessionStorage.removeItem('nickName');
        window.location.href = '/';
      }
    },
    watch: {
      sexRadio (value,oldval) {
        this.popupVisible = false;
        this.$Indicator.open({text: '修改中...', spinnerType: 'fading-circle'});
        this.$axios.post('/api/upgrade_sex','uid='+this.$store.state.token+'&sex='+value+'').then(response => {
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
