<template>
  <div id="app">
    <div class="login-container">
      <div class="login-form">
        <img class="login-logo" src="../../assets/img/logo.595745bd.png" alt="">
        <el-form ref="ruleForm" :model="loginForm" :rules="rules">
          <el-form-item prop="mobile">
            <span class="svg-container el-icon-mobile-phone" />
            <el-input v-model="loginForm.mobile" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container el-icon-unlock" />
            <el-input ref="pwd" v-model="loginForm.mobile" :type="passwordType" placeholder="请输入密码" />
            <span class="svg-containe">
              <svg-icon :icon-class="passwordType==='password' ? 'eye' : 'eye-open'" @click="pwd" />
            </span>
          </el-form-item>
          <el-form-item prop="yam">
            <span class="svg-container el-icon-mobile-phone" />
            <el-input v-model="loginForm.yam" placeholder="请输入验证码" />
            <span @click="code">
              <img :src="staticMap" alt=""></span>
          </el-form-item>
          <el-form-item class="btn">
            <el-button :loading="loading" class="loginBtn" style="width: 100%; color: #fff;border: none;background-color: #409eff; " @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { code } from '@/api/code'
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'Map',
  data() {
    return {
      loading: false,
      passwordType: 'password',
      staticMap: '',
      phone: '',
      token: '',
      loginForm: {
        mobile: 'admin',
        password: 'admin',
        yam: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        yam: [
          { required: true, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const id = uuidv4()
    this.token = id.toString().replace(/-/g, '')
    code(id).then(d => {
      if (d.data) {
        const blob = new Blob([d.data], { type: 'image/jpeg' })
        const Fr = new FileReader()
        Fr.readAsDataURL(blob)
        Fr.onload = (event) => {
          this.staticMap = event.target.result
        }
      }
    })
    // this.code(id)
  },
  methods: {
    pwd() {
      this.passwordType === 'password' ? this.passwordType = '' : this.passwordType = 'password'
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    code() {
      const id = uuidv4()
      code(id).then(d => {
        if (d.data) {
          const blob = new Blob([d.data], { type: 'image/jpeg' })
          const Fr = new FileReader()
          Fr.readAsDataURL(blob)
          Fr.onload = (event) => {
            this.staticMap = event.target.result
          }
        }
      })
    },
    async login() {
      try {
        this.loading = true
        await this.$store.dispatch('user/loginAction',
          {
            loginName: this.loginForm.mobile,
            password: this.loginForm.password,
            code: this.loginForm.yam,
            clientToken: this.token,
            loginType: 0
          })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #app{
    height: 100%;
    background-image: url(../../assets/img/background.be4fae7d.png);
    background-repeat: no-repeat;
    background-size: cover;

  }
  .login-container[data-v-26affb70] {
  position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;

}
.login-form{
  position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
}
.login-logo {
    position: absolute;
    width: 96px;
    height: 96px;
    top: -46px;
    left: 50%;
    margin-left: -48px;
}
::v-deep .el-form-item__content{
  display: flex;
  height: 52px;
  line-height: 52px;
  font-size: 14px;
  border: 1px solid #e2e2e2;
    border-radius: 4px;
    justify-content: center;
}
.svg-container{
  padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    line-height: 40px;
}
::v-deep .el-input input {
    height: 47px;
    background: transparent;
    border: 0;
    border-radius: 0;
    padding: 12px 5px 12px 15px;
    color: #999;
    caret-color: #999;
    -webkit-appearance: none;
}
.svg-container{
  padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    line-height: 40px;
}
.svg-containe{
  padding: 6px 5px 6px 15px;
  margin-right: 10px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    line-height: 40px;
}
.btn{
  background-color: #409eff;
}

</style>
