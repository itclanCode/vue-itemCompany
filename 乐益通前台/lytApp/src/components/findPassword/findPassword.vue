<template lang="html">
  <div class="login">
    <img src="../../common/images/u8.png"/>
    <p class="title">中信易家</p>
    <div class="user_box">
      <input type="text" maxlength="11" class="user" placeholder="请输入注册手机号" @keyup="userChange" v-model="user"/>
      <span v-show="userState" @click="userClear">x</span>
    </div>
    <div class="verification_box">
      <input type="text" maxlength="6" class="verification" placeholder="短信验证码" @keyup="verificationChange" v-model="verification"/>
      <span v-show="verificationState" @click="verificationClear">x</span>
      <p :class="{sendBtn:sendState}" @click="sendMsg">{{verificationWord}}</p>
    </div>
    <div class="verification_box" v-if="verificationShow">
      <input type="text" maxlength="6" class="verification" placeholder="图片验证码" @keyup="imgChange" v-model="verificationImg"/>
      <span v-show="imgState" @click="imgClear">x</span>
      <p class="img_verification">{{verificationTwo}}</p>
    </div>
    <div class="button" @click="check" :class="{click_sure:clickState}">{{loginWord}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        // 用户名内容
        user: '',
        // 用户名删除按钮显示状态
        userState: false,
        // 发送短信按钮 样式状态
        sendState: false,
  // 假设注册状态
        registerState: false,
        // 短信验证码
        verification: '',
        // 短信验证码内容改变 删除按钮显示或隐藏
        verificationState: false,
        // 发送短信按钮内容
        verificationWord: '发送短信',
  // 假设短信验证码
        verificationTwo: '1234',
        // 短信验证码输入次数
        passwordNum: 5,
        // 图片验证码显示或者不显示
        verificationShow: false,
  // 假设图片验证码
        verificationOne: '1234',
        // 图片验证码
        verificationImg: '',
        // 图片验证码 删除按钮状态
        imgState: false,
        // 登录文字
        loginWord: '下一步',
        // 登录按钮状态
        clickState: false
      };
    },
    methods: {
      // 用户名输入显示删除按钮，没有就隐藏
      userChange() {
        // 当有内容时 删除按钮显示,短信发送按钮 可用
        if (this.user.length > 0) {
          this.userState = true;
          this.sendState = true;
          // 手机号有内容 短信验证码有内容
          if (this.verification > 0) {
            // 没有图片验证码,下一步按钮就可以点击
            if (this.verificationShow === false) {
              this.clickState = true;
            } else {
              // 有图片验证码 进行判断  且图片验证码输入框里面有内容时
              if (this.verificationImg > 0) {
                this.clickState = true;
              } else {
                this.clickState = false;
              }
            }
          } else {
            // 手机号有内容，短信验证码没内容 按钮置灰
            this.clickState = false;
          }
        } else {
          // 没有输入手机号的时候 删除按钮隐藏，短信发送按钮 禁用，下一步点击按钮禁用
          this.userState = false;
          this.sendState = false;
          this.clickState = false;
        }
      },
      // 点击删除按钮，清空输入框内容
      userClear() {
        // 清空用户名，隐藏删除按钮，禁用密码框，禁用登录按钮
        this.user = '';
        this.userState = false;
        this.sendState = false;
        this.clickState = false;
      },
      // 发送验证码
      sendMsg() {
        // 判断发送按钮的状态
        if (this.sendState) {
          // 验证手机号
          let phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
          if (phoneReg.test(this.user)) {
            console.log('手机格式正确');
            // 验证是否注册
            if (this.registerState) {
              console.log('已注册');
            } else {
              this.verificationWord = '倒计时';  // 未注册的话进行倒计时，然后获取短信验证码
            }
          } else {
            console.log('手机格式不正确');
          }
        } else {
          console.log('发送按钮不可点击，请输入手机号');
          return false;
        }
      },
      // 短信验证码内容改变
      verificationChange() {
        // 手机号有内容
        if (this.user.length > 0) {
          // 短信验证码有内容
          if (this.verification > 0) {
            this.verificationState = true;
            // 如果没有图片验证码的时候，输入短信验证码按钮可用
            if (this.verificationShow === false) {
              this.clickState = true;
            } else {
              // 有图片验证码 进行判断  且图片验证码输入框里面有内容时
              if (this.verificationImg > 0) {
                this.clickState = true;
              } else {
                this.clickState = false;
              }
            }
          } else {
            // 没内容的时候 隐藏删除按钮，下一步按钮不可用
            this.verificationState = false;
            this.clickState = false;
          }
        } else {
          console.log('请输入手机号');
          this.clickState = false;
        }
      },
      // 点击清空按钮 清空验证码，删除按钮隐藏  下一步按钮不可用
      verificationClear() {
        this.verification = '';
        this.verificationState = false;
        this.clickState = false;
      },
      // 图片验证码内容变化
      imgChange() {
        // 手机号有内容
        if (this.user.length > 0) {
          // 短信验证码有内容
          if (this.verification.length > 0) {
            // 图片验证码有内容
            if (this.verificationImg > 0) {
              this.imgState = true;
              this.clickState = true;
            } else {
              this.imgState = false;
              this.clickState = false;
            }
          } else {
            console.log('请输入短信验证码');
            this.clickState = false;
          }
        } else {
          console.log('请输入手机号');
          this.clickState = false;
        }
      },
      // 点击清除按钮 清除图片验证码内容 删除按钮隐藏
      imgClear() {
        this.verificationImg = '';
        this.imgState = false;
        this.clickState = false;
      },
      // 点击下一步，进行校验 (在前面做判断，判断是否都输入内容了，如果有一个没输入下一步按钮就不可用)
      check() {
        // 按钮可用的状态是全部内容都填写了 执行下面操作
        if (this.clickState) {
          // 验证手机格式
          let phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
          if (phoneReg.test(this.user)) {
            console.log('手机格式正确');
            // 如果没有图片验证码
            if (this.verificationShow === false) {
              // 短信验证码和后台传过来的短信验证码相同 即可注册
              if (this.verification === this.verificationOne) {
                console.log('手机，验证码都通过');
                this.loginWord = '修改密码，即将跳转';
                setTimeout(() => {
                  console.log(100);
                  this.loginWord = '跳转';// 箭头函数可以让`setTimeout`里面的`this`，绑定定义时所在的作用域，而不是指向运行时所在的作用域。
                  // 通过在 Vue 根实例的 router 配置传入 router 实例，下面这些属性成员会被注入到每个子组件($router)
                  // $router 是当前作用域的
                  this.$router.push('newPassword');
                }, 1000);
              } else {
                console.log('短信验证码不正确');
                this.passwordNum ++;
                console.log(this.passwordNum);
                // 注册的时候如果是大于3次出现图片验证码
                if (this.passwordNum > 2) {
                  this.verificationShow = true;
                  this.clickState = false;
                };
              }
            } else {  // 如果有图片验证码 就进行双层判断
              // 短信验证码正确
              if (this.verification === this.verificationOne) {
                // 图片验证码正确
                if (this.verificationImg === this.verificationTwo) {
                  console.log('手机，验证码都通过');
                  this.loginWord = '修改密码，即将跳转';
                  setTimeout(() => {
                    console.log(100);
                    this.loginWord = '跳转';// 箭头函数可以让`setTimeout`里面的`this`，绑定定义时所在的作用域，而不是指向运行时所在的作用域。
                    // 通过在 Vue 根实例的 router 配置传入 router 实例，下面这些属性成员会被注入到每个子组件($router)
                    // $router 是当前作用域的
                    this.$router.push('newPassword');
                  }, 1000);
                } else {
                  console.log('图片验证码不正确');
                }
              } else {
                console.log('短信验证码不正确');
              }
            }
          } else {
            console.log('手机格式不正确');
          }
        } else {
          console.log('按钮不可用');
          return false;
        }
      }
    }
  };
</script>

<style lang="scss">
</style>
