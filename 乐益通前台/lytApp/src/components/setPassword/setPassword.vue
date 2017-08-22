<template lang="html">
  <div class="login set_password">
    <img src="../../common/images/u8.png"/>
    <p class="title">中信易家</p>
    <div class="password_box">
      <input type="password" maxlength="16" placeholder="设置密码，长度为6~16位数字、字母、下划线" v-if="typeState" @keyup="passwordChange" v-model="password"/>
      <input type="text" class="password" placeholder="设置密码，长度为6~16位数字、字母、下划线" v-else @keyup="passwordChange" v-model="password"/>
      <span v-show="passwordState" @click="passwordClear">x</span>
      <em v-show="passwordState" @click="passwordShow"></em>
    </div>
    <div class="button" @click="check" :class="{click_sure:clickState}">{{loginWord}}</div>
    <div class="footer">
      <span>注册即表示您同意</span>
      <router-link to="/register">《中信e家商城服务协议》</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        // 密码框内容
        password: '',
        // 密码框显示状态
        typeState: true,
        // 密码框删除按钮状态
        passwordState: false,
        // 登录文字
        loginWord: '注册',
        // 登录按钮状态
        clickState: false,
        postPassword: ''
      };
    },
    methods: {
      // 密码框输入内容显示删除按钮、登录按钮可用，没有就隐藏、登录按钮禁用。
      passwordChange() {
        // 有密码 删除按钮显示
        if (this.password.length > 0) {
          this.passwordState = true;
          this.clickState = true;
        } else {
          // 没有密码 删除按钮隐藏，登录按钮置灰
          this.passwordState = false;
          this.clickState = false;
        }
      },
      // 点击删除按钮，清空密码框内容 ，隐藏删除按钮
      passwordClear() {
        this.password = '';
        this.passwordState = false;
        this.clickState = false;
      },
      // 密码显示切换
      passwordShow() {
        this.typeState = !this.typeState;
      },
      // 点击登录，进行校验
      check() {
        // 按钮可用的状态是全部内容都填写了 执行下面操作
        if (this.clickState) {
          // 验证密码格式
          let passwordReg = /^[_0-9a-z]{6,16}$/i;
          if (passwordReg.test(this.password)) {
            console.log('密码格式正确');
            this.loginWord = '注册成功，即将跳转';
            this.postPassword = this.password;
            console.log(this.postPassword);
            setTimeout(() => {
              console.log(100);
              this.loginWord = '跳转';// 箭头函数可以让`setTimeout`里面的`this`，绑定定义时所在的作用域，而不是指向运行时所在的作用域。
              // 通过在 Vue 根实例的 router 配置传入 router 实例，下面这些属性成员会被注入到每个子组件($router)
              // $router 是当前作用域的
              this.$router.push('home');
            }, 1000);
          } else if (this.password.length < 6) {
            console.log('密码小于6位数请重新设置');
          } else {
            console.log('密码格式不正确');
          }
        } else {
          window.confirm('按钮不可用');
          return false;
        }
      }
    }
  };
</script>

<style lang="scss">
  .login{
    &.set_password{
      .password_box{
        margin-top:1rem;
        width:6rem;
        input{
          width:6rem;
        }
      }
    }
  }
</style>
