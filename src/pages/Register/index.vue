<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input v-model="phonenum" v-validate="{required:true,regex:/^1\d{10}$/}"
               :class="{invalid:errors.has('phonenum')}"
               name="phonenum" placeholder="请输入你的手机号"
               type="text">
        <span class="error-msg">{{ errors.first('phonenum') }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input v-model="code" v-validate="{required:true,regex:/^\d{6}$/}" :class="{invalid:errors.has('code')}"
               name="code"
               placeholder="请输入验证码" type="text">
        <button style="height: 30px;margin-left: 10px" @click="getCode(phonenum)">获取验证码</button>
        <span class="error-msg">{{ errors.first('code') }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input v-model="password" v-validate="{required:true,regex:/^[0-9A-Za-z]{6,18}$/}"
               :class="{invalid:errors.has('password')}"
               name="password"
               placeholder="请输入你的登录密码" type="password">
        <span class="error-msg">{{ errors.first('password') }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input v-model="password2" v-validate="{required:true,is:password}"
               :class="{invalid:errors.has('password2')}"
               name="password2"
               placeholder="请输入确认密码"
               type="password">
        <span class="error-msg">{{ errors.first('password2') }}</span>
      </div>
      <div class="controls">
        <input v-model="agree" v-validate="{ required: true, tongyi: true }" :class="{ invalid: errors.has('agree') }"
               name="agree"
               type="checkbox">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="commit">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      phonenum: '',
      code: '',
      password: '',
      password2: '',
      agree: false,


    }
  },
  methods: {
    //获取验证码
    async getCode(phonenum) {
      try {
        await this.$store.dispatch('getCode', phonenum)
        this.code = this.$store.state.user.code
      } catch (e) {
        console.log(e.message)
      }
    },
    //完成注册按钮
    async commit() {
      const success = await this.$validator.validateAll()
      if (success) {
        try {
          const {phonenum, code, password,} = this;
          await this.$store.dispatch('userRegister', {phone: phonenum, code, password})
          this.$router.push('login')
        } catch (e) {
          console.log(e.message)
        }
      }

    },
  },
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>