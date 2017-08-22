<template lang="html">
  <div class="validate_message">
    <my-header headerTitle=" "></my-header>
    <scroller lock-x ref="mode" height="-42%" style="background: #F2F4F8;">
      <div id="wrapper">
        <b>短信验证码</b>
        <div class="phone_box">
          <span>验证码发送至</span>
          <p>{{phone}}</p>
        </div>
        <div class="send_message" :class="{selected:cueRight}">
          <a href="javascript:;" class="retainb" @click="messageAgin(10)">{{timeText}}</a>
          <div v-show="cueRight">
            <span>没有收到短信</span>
            <p>获取语音验证码</p>
          </div>
        </div>
        <div class="message">
          <input type="text" maxlength="4" :class="{selected:changeColor}" @focus="focusF" @blur="blurF" @keydown="keyDownF" @keyup="keyUpF" v-focus="focusStatus" v-model="message"/>
          <div class="retainb" :class="{selected:divState == i}" v-for="i in 4"></div>
          <p v-show="cueState">
            <span>请输入正确的短信验证码</span>
            <img src="./sigh.png" alt=""/>
          </p>
        </div>
        <a class="click_btn" :class="{selected:clickState}" href="javascript:;" @click="next">兑换</a>
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
        // 获取上一个手机号
        phone:this.$route.query.phone,
        // 获取中奖纪录id
        winningLogId:this.$route.query.winningLogId,
        // 获取商品名称
        shopName: this.$route.query.shopName,
        // 改变input的默认样式
        changeColor:false,
        // 选中状态
        focusStatus:true,
        // div选中状态
        divState:1,
        // 提示文字显示状态
        cueState:false,
        // 提示文字信息
        cueText:'',
        // 右侧提示收到未收到短信状态
        cueRight:false,
        // 短信验证码
        message:'',
        // 数据获取的短信验证码
        messageDate:1234,
        // 倒计时文字
        timeText:'10s后重发',
        // 点击下一步状态
        clickState:false
      };
    },
    components: {
      // 公用的头部
      myHeader:header,
      // 滚动
      Scroller:Scroller
    },
    // 自定义指令
    directives:{
      focus:{
        inserted: function (el, {value}) {
          if (value) {
            el.focus();
          }
        }
      }
    },
    computed:{

    },
    methods:{
      // 当获取焦点时,改变光标颜色
      focusF:function(){
        console.log(this.message.length);
        if(this.message.length < 4){
          // 显示提示文字
          this.cueState = true;
        }
      },
      //当失去焦点的时候立刻让获取焦点
      blurF:function(){
        this.focusStatus = true;
      },
      // 键盘按下的时候，input的光标隐藏
      keyDownF:function(){
        if(this.message.length > -1){
          this.changeColor = true;
        }
      },
      keyUpF:function(){
        // 如果有空格，删除空格
        if(/\s/g.test(this.message)){
          this.message = this.message.replace(/\s/g,'');
        }
        // 键盘抬起的时候，如果位数小于0，则显示光标
        if(this.message.toString().length == 0){
          this.changeColor = false;
        }
        // 改变div显示的样式
        this.divState = this.message.toString().length + 1;
        // 如果短信验证码正确
        console.log(this.message.length);
        if(this.message.length > 3){
          // 提示短信验证码有误信息隐藏
          this.cueState = false;
          // 兑换按钮变为可点击状态
          this.clickState = true;
        }else{
          this.cueState = true;
        }
      // if(this.message.toString().length > 3){
      //    this.message = this.message.toString().substr(0,4);
      // }
      },
      // 获取验证码
      getMessage:function(){
        var that = this;
        console.log(that.phone.replace(/\s/g,''));
        // 进来后获取短信验证码
        jsonp('/winningLog/sendMobCode',
          function(data){
            console.log(data);
            if(data.resultCode == 200){
              // 进行倒计时
              var timer = null;
              var timeF = function(time,total){
                clearTimeout(timer);
                timer = setTimeout(function(){
                  if(time <= total && time > 0){
                    time = time - 1;
//                    console.log(time);
                    that.timeText = time + 's后重发';
                    timeF(time,total);
                  }else if(time == 0){
                    that.timeText = '重新发送';
                    // 显示右侧提示文字
                    that.cueRight = true;
                  }
                },1000)
              }
              timeF(10,10);
            }
          },
          {
            mobile:that.phone.replace(/\s/g,'')
          }
        )
      },
      // 点击重新获取验证码
      messageAgin:function(time){
        if(this.timeText == '重新发送'){
          this.timeText = time + 's后重发';
          // 右侧提示文字消失
          this.cueRight = false;
          // 重新获取短信验证码
          this.getMessage();
        }
      },
      // 点击进兑换
      next:function(){
        var that = this;
        if(this.clickState){
          jsonp('/winningLog/verificationMobCode',
            function(data){
              console.log(data);
              if(data.resultCode == 200){
                if(data.resultBody == null){
                  that.$router.push({
                    path:'scratchTrue',
                    query:{
                      // 手机号
                      phone:that.phone,
                      // 商品名称
                      shopName:that.shopName,
                    }
                  });
                }else{
                  // 显示提示信息
                  that.cueState = true;
                  console.log(data.resultBody);
                }
              }
            },
            {
              // 短信验证码
              code:that.message,
              // 中奖纪录id
              winningLogId:that.winningLogId
            }
          )
        }
      }
    },
    created:function(){
      // 进入页面获取短信验证码
      this.getMessage();
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
        justify-content: center;
        margin:0 auto;
        margin-top:0.22rem;
        margin-bottom:0.29rem;
        width:4.6rem;
        height:0.77rem;
        &.selected{
          justify-content: space-between;
         }
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
        position: relative;
        overflow:hidden;
        margin-left:1.45rem;
        height:1.62rem;
        input{
          position: absolute;
          top:0;
          left:0;
          z-index: 2;
          padding-left:0.5rem;
          height:1rem;
          line-height:1rem;
          background:transparent;
          letter-spacing: 0.9rem;
          font-size:0.5rem;
          color:#ff5900;
          font-family: PingFangSC-Medium;
          &.selected{
            /*让光标隐藏*/
            padding-left:0.36rem;
            color:transparent;
            text-shadow: 0 0 0 #000;
           }
        }
        div{
          float:left;
          margin-right:0.2rem;
          width:1rem;
          height:1rem;
          &::after{
            border-radius:0;
           }
          &.selected{
            &::after{
              border:1px solid #ff5900;
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
