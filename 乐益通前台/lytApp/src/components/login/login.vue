<template lang="html">
  <div class="login">
    <img src="../../common/images/u8.png"/>
    <p class="title">中信易家</p>
    <div class="user_box">
      <input type="text" maxlength="11" class="user" placeholder="手机号" @keyup="userChange" v-model="user"/>
      <span v-show="userState" @click="userClear">x</span>
    </div>
    <div class="password_box">
      <input type="password" maxlength="15" placeholder="登录密码" v-if="typeState" @keyup="passwordChange" v-model="password"/>
      <input type="text" class="password" placeholder="登录密码" v-else @keyup="passwordChange" v-model="password"/>
      <span v-show="passwordState" @click="passwordClear">x</span>
      <em v-show="passwordState" @click="passwordShow"></em>
    </div>
    <div class="verification_box" v-if="verificationShow">
      <input type="text" maxlength="6" class="verification" placeholder="验证码" @keyup="verificationChange" v-model="verification"/>
      <span v-show="verificationState" @click="verificationClear">x</span>
      <p class="img_verification">{{verificationOne}}</p>
    </div>
    <div class="button" @click="check" :class="{click_sure:clickState}">{{loginWord}}</div>
    <div class="other">
      <router-link to="/freeLogin" class="free_password">免密登录</router-link>
      <router-link to="/findPassword" class="forget_password">忘记密码</router-link>
    </div>
    <div class="footer">
      <span>还没账号？赶紧去</span>
      <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        // 用户名内容
        user: '',
        // 密码框内容
        password: '',
        // 用户名删除按钮显示状态
        userState: false,
        // 密码框显示状态
        typeState: true,
        // 密码框删除按钮状态
        passwordState: false,
// 假设密码
        passwordOne: '123456',
// 注册状态
        registerState: true,
        // 输入密码次数
        passwordNum: 0,
        // 验证码
        verification: '',
        // 验证码显示或者不显示
        verificationShow: false,
        // 验证码内容改变 删除按钮显示或隐藏
        verificationState: false,
// 假设验证码
        verificationOne: '1234',
        // 登录文字
        loginWord: '登录',
        // 登录按钮状态
        clickState: false
      };
    },
    methods: {
      // 用户名输入显示删除按钮，没有就隐藏
      userChange() {
        // 手机号有内容时 删除按钮显示
        if (this.user.length > 0) {
          this.userState = true;
          // 密码框有内容
          if (this.password.length > 0) {
            // 没有图片验证码 可点击登录按钮
            if (this.verificationShow === false) {
              this.clickState = true;
            } else {
              // 有图片验证码 登陆按钮可用
              if (this.verification > 0) {
                this.clickState = true;
              } else {
                this.clickState = false;
              }
            }
          } else {
            // 手机号有内容，密码框没内容 按钮置灰
            this.clickState = false;
          }
        } else {
          // 没有内容时 删除按钮隐藏
          this.userState = false;
          this.clickState = false;
        }
      },
      // 点击删除按钮，清空输入框内容
      userClear() {
        // 清空用户名，隐藏删除按钮，禁用登录按钮
        this.user = '';
        this.userState = false;
        this.clickState = false;
      },
      // 密码框输入内容显示删除按钮、登录按钮可用，没有就隐藏、登录按钮禁用。
      passwordChange() {
        // 有手机号
        if (this.user.length > 0) {
          // 有密码 删除按钮显示
          if (this.password.length > 0) {
            this.passwordState = true;
            // 没有图片验证码 可点击登录按钮
            if (this.verificationShow === false) {
              this.clickState = true;
            } else {
              // 有图片验证码 且验证码框里有内容 登陆按钮可用
              if (this.verification > 0) {
                this.clickState = true;
              } else {
                this.clickState = false;
              }
            }
          } else {
            // 没有密码 删除按钮隐藏，登录按钮置灰
            this.passwordState = false;
            this.clickState = false;
          }
        } else {
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
      // 验证码内容改变
      verificationChange() {
        // 有手机号
        if (this.user.length > 0) {
          // 有密码
          if (this.password.length > 0) {
            // 有图片验证码 且验证码框里有内容 登陆按钮可用
            if (this.verification > 0) {
              this.verificationState = true;
              this.clickState = true;
            } else {
              this.verificationState = false;
              this.clickState = false;
            }
          } else {
            // 没有密码，登录按钮置灰
            this.clickState = false;
          }
        } else {
          // 没有手机号
          this.clickState = false;
        }
      },
      // 点击清空按钮 清空验证码，删除按钮隐藏
      verificationClear() {
        this.verification = '';
        this.verificationState = false;
        this.clickState = false;
      },
      // 点击登录，进行校验
      check() {
        // 按钮可用的状态是全部内容都填写了 执行下面操作
        if (this.clickState) {
          // 验证手机格式
          let phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
          if (phoneReg.test(this.user)) {
            console.log('手机格式正确');
            // 如果没有图片验证码
            if (this.verificationShow === false) {
              // 密码和后台传过来的密码相同 即可登陆
              if (this.password === this.passwordOne) {
                console.log('手机，密码都通过');
                this.loginWord = '登录成功，即将跳转';
                let that = this; // 第一层里面的this指的是vue这个对象，再有方法时里面的this就改变了，需要有一个承接
                setTimeout(() => {
                  console.log(100);
                  that.loginWord = '跳转';
                }, 1000);
              } else {
                console.log('密码不正确');
                this.passwordNum ++;
                console.log(this.passwordNum);
                // 登录的时候如果是大于5次出现图片验证码
                if (this.passwordNum > 4) {
                  this.verificationShow = true;
                  this.clickState = false;
                };
              }
            } else {  // 如果有图片验证码 就进行双层判断
              // 密码正确
              if (this.password === this.passwordOne) {
                // 图片验证码正确
                if (this.verification === this.verificationOne) {
                  console.log('手机，验证码都通过');
                  this.loginWord = '登录成功，即将跳转';
                  let that = this; // 第一层里面的this指的是vue这个对象，再有方法时里面的this就改变了，需要有一个承接
                  setTimeout(() => {
                    console.log(100);
                    that.loginWord = '跳转';
                  }, 1000);
                } else {
                  console.log('图片验证码不正确');
                }
              } else {
                console.log('密码不正确');
              }
            }
          } else {
            window.confirm('您输入的手机号格式不正确！');
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
    width:100%;
    height:100%;
    text-align:center;
    img{
      margin-top:40px;
      width:100px;
    }
    .title{
      margin-top:0.2rem;
      font-size:0.3rem;
    }
    .user_box,.password_box,.verification_box{
      position:relative;
      margin:0 auto;
      width:5.2rem;
      height:0.7rem;
      input{
        display:block;
        padding-left:0.2rem;
        width:5rem;
        height:0.66rem;
        border:0.01rem solid #ccc;
        border-radius:0.05rem;
        font-size:0.3rem;
      &.verification{
         width:3rem;
       }
      }
      span{
        position:absolute;
        top:0.2rem;
        right:0.5rem;
        width:0.3rem;
        height:0.3rem;
        line-height:0.3rem;
        border-radius:50%;
        background:#717171;
        color:#fff;
        font-size:0.2rem;
      }
      em{
        position:absolute;
        top:0.22rem;
        right:0.1rem;
        width:0.3rem;
        height:0.25rem;
        background:url(../../common/images/u69.png) no-repeat;
        background-size:100%;
      }
    }
    .user_box{
      margin-top:1rem;
      span{
        right:0.1rem;
      }
    }
    .password_box{
      margin-top:0.3rem;
    }
    .verification_box{
      overflow:hidden;
      margin-top:0.3rem;
      input{
        float:left;
      }
      span{
        right:2.1rem;
      }
      p{
        float:right;
        width:1.5rem;
        height:0.66rem;
        line-height:0.66rem;
        border:0.01rem solid #ccc;
        border-radius:0.05rem;
        background:#ccc;
        color:#fff;
        font-size:0.3rem;
        &.sendBtn{
           background:#000;
         }
        &.img_verification{
           background:#fff;
           color:#ccc;
         }
      }
    }
    .button{
      margin:0.3rem auto 0;
      width:5rem;
      height:0.6rem;
      line-height:0.6rem;
      text-align:center;
      background:#ccc;
      border-radius:0.05rem;
      font-size:0.3rem;
      &.click_sure{
        background:dodgerblue;
        color:#fff;
      }
    }
    .other{
      margin:0.3rem auto 0;
      height:0.3rem;
      a{
        font-size:0.25rem;
        color:dodgerblue;
        &.free_password{
          float:left;
          margin-left:1rem;
        }
        &.forget_password{
          float:right;
          margin-right:1rem;
        }
      }
    }
    .footer{
      margin-top:4rem;
      font-size:0.25rem;
      a{
        color:dodgerblue;
        font-size:0.3rem;
        text-decoration:underline;
      }
    }
  }
</style>
