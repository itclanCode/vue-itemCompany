<template lang="html">
  <div class="validate_message">
    <my-header headerTitle=" "></my-header>
    <scroller lock-x ref="mode" height="-42%" style="background: #F2F4F8;">
      <div id="wrapper">
        <b>短信验证码</b>
        <div class="phone_box">
          <span>验证码发送至</span>
          <p>134 9999 9999</p>
        </div>
        <div class="send_message">
          <a href="javascript:;" class="retainb">重新发送</a>
          <div>
            <span>没有收到短信</span>
            <p>获取语音验证码</p>
          </div>
        </div>
        <div class="message">
          <div class="retainb" :class="{selected:focusState == i}" v-for="i in 4">
            <input type="text" maxlength="1" autofocus="autofocus" @focus="focusF(i)"/>
          </div>
          <p>
            <span>请输入正确的验证码</span>
            <img src="./sigh.png" alt=""/>
          </p>
        </div>
        <a class="click_btn" href="javascript:;">登录</a>
      </div>
    </scroller>
  </div>
</template>

<script type="text/ecmascript-6">
  // 引用公用的头部
  import header from '../common/header';
  import {Scroller,Loading} from 'vux';
  export default {
    data: function () {
      return {
        // 选中状态
        focusState:0,
        // 提示文字显示状态
        cueState:false,
        // 提示内容
        cueText:'',
        // 手机号
        phone:'',
        // 点击下一步状态
        clickState:0
      };
    },
    components: {
      // 公用的头部
      myHeader:header,
      // 滚动
      Scroller:Scroller
    },
    computed:{

    },
    methods:{
      // 当获取焦点时,检测一下手机号
      focusF:function(i){
        this.focusState = i;
      },
      // 清空手机号，隐藏提示
      clear:function(){
        // 清空手机号
        this.phone = '';
        // 隐藏提示
        this.cueState = false;
        // 隐藏删除键
        this.deleteState = false;
      },
      // 点击进行下一步
      next:function(){
        if(this.clickState == 1){
          console.log(111);
          this.router.push('validateMessage');
        }
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .validate_message{
    #wrapper{
      min-height:12.46rem;
      background:#fff;
      font-family: PingFangSC-Regular;
      b{
        display:block;
        padding:0.8rem 0 0.6rem;
        text-align:center;
        font-size:0.42rem;
        color:#000;
      }
      .phone_box{
        overflow: hidden;
        margin:0 auto;
        width:4.41rem;
        height:0.48rem;
        line-height:0.48rem;
        span{
          float:left;
          margin-right:0.15rem;
          font-size: 0.3rem;
          color: #858C9E;
        }
        p{
          float:left;
          font-size: 0.34rem;
          color: #000;
        }
      }
      .send_message{
        display: flex;
        justify-content: space-between;
        margin:0 auto;
        margin-top:0.22rem;
        margin-bottom:0.29rem;
        width:4.6rem;
        a{
          width:2rem;
          height:0.7rem;
          line-height:0.7rem;
          text-align:center;
        }
        div{
          text-align: right;
          span{
            display: block;
            height:0.37rem;
            line-height:0.37rem;
            font-size:0.26rem;
            color:#5e6678;
          }
          p{
            height:0.4rem;
            line-height:0.4rem;
            font-size:0.28rem;
            color:#ff5900;
          }
        }
      }
      .message{
        overflow:hidden;
        margin-left:1.45rem;
        height:1.62rem;
        div{
          float:left;
          margin-right:0.2rem;
          &::after{
            border-radius:0;
           }
          input{
            width:1rem;
            height:1rem;
            line-height:1rem;
            text-align: center;
            font-size:0.5rem;
            color:#000;
            font-family: PingFangSC-Medium;
          }
          &.selected{
            &::after{
              border:1px solid #ff5900;
            }
            input{
              color:#ff5900;
            }
          }
        }
        p{
          float:left;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top:0.2rem;
          width:4.6rem;
          span{
            height:0.4rem;
            line-height:0.4rem;
            font-size:0.28rem;
            color:#ff5900;
          }
          img{
            width:0.31rem;
            height:0.31rem;
          }
        }
      }
      .click_btn{
        display: block;
        margin:0.3rem 0.5rem 0;
        height:0.88rem;
        line-height:0.88rem;
        text-align: center;
        background:#abb4cb;
        font-size:0.32rem;
        color:#fff;
        font-family: PingFangSC-Medium;
        border-radius:0.04rem;
        &.selected{
           background:#ff5900;
         }
      }
     }
  }
</style>
