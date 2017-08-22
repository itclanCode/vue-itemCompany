<template lang="html">
  <div class="validate_phone">
    <my-header headerTitle=" "></my-header>
    <scroller lock-x ref="mode" height="-42%" style="background: #F2F4F8;">
      <div id="wrapper">
        <b>验证兑换手机号</b>
        <div class="input_phone retainbb">
          <input type="text" placeholder="请输入您的手机号" autofocus="autofocus" maxlength="13" @keyup="phoneCheck" v-model="phone" @focus="focusF"/>
          <i @click="clear" v-show="deleteState"></i>
        </div>
        <div class="input_prompt" v-show="cueState">
          <em></em>
          <p>{{cueText}}</p>
        </div>
        <a href="javascript:;" :class="{selected:clickState == 1}" @click="next">下一步</a>
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
        // 获取中奖纪录id
        winningLogId:this.$route.query.winningLogId,
        // 获取商品名称
        shopName: this.$route.query.shopName,
        // 删除键的状态
        deleteState:false,
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
      focusF:function(e){
        this.phoneCheck(e);
      },
      // 键盘输入的时候执行检测手机号的方法
      phoneCheck:function(e){
        // 验证手机格式
        var isChinaMobile = /^134[0-8]\d{7}$|^(13[5-9]|147|15[0-27-9]|178|18[2-478])\d{8}$/; // 中国移动
        var isChinaUnion = /^(13[0-2]|145|15[56]|176|18[56])\d{8}$/; // 中国联通
        var isChinaTelcom = /^(133|153|177|18[019])\d{8}$/; // 中国电信
        // 将数字转化为字符串
        this.phone = this.phone.toString();
        // 这里注意判断的时候要把空格去掉但是显示的时候要有空格
        var phone = this.phone.replace(/\s/g,'');
        // console.log(phone);
        if(phone.length > 0){
          // 显示删除键
          this.deleteState = true;
          // 判断是否是正确的手机号
          if(isChinaMobile.test(phone)||isChinaUnion.test(phone)||isChinaTelcom.test(phone)){
            // 隐藏提示信息
            this.cueState = false;
            // 兑换按钮可点击
            this.clickState = 1;
          }else{
            // 显示提示信息
            this.cueState = true;
            // 改变提示内容
            this.cueText = "您输入的手机号有误！";
            // 兑换按钮不可点击
            this.clickState = 0;
          }
        }else{
          // 显示提示信息
          this.cueState = true;
          // 提示不能为空
          this.cueText = '您输入的手机号不能为空！';
          // 兑换按钮不可点击
          this.clickState = 0;
        }
        if(phone.length < 12){
          // 如果不是删除键测添加空格
          if(e.keyCode != 8){
            console.log(this.phone);
            if(this.phone.length == 3 || this.phone.length == 8){
              this.phone = this.phone + ' ';
            }else{
              this.phone = this.phone;
            }
          }
          console.log(phone.length);
        }
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
          // 如果能够进行下一步，跳转短信验证码页面
          this.$router.push({
            path:'validateMessage',
            query:{
              // 手机号
              phone:this.phone,
              // 中奖纪录id
              winningLogId:this.winningLogId,
              // 商品名称
              shopName:this.shopName
            }
          });
        }
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .validate_phone{
    #wrapper{
      min-height:12.46rem;
      background:#fff;
      font-family: PingFangSC-Regular;
      b{
        display:block;
        padding:0.8rem 0 1.71rem;
        text-align:center;
        font-size:0.42rem;
        color:#000;
      }
      .input_phone{
        overflow:hidden;
        margin:0 0.5rem;
        input{
          float:left;
          margin-bottom:0.2rem;
          height:0.56rem;
          line-height:0.56rem;
          font-size:0.4rem;
          color:#000;
          &::-webkit-input-placeholder {
             font-size:0.34rem;
             color: #B1B6C0;
             font-family: PingFangSC-Light;
           }
          &:-moz-placeholder {/* Firefox 18- */
             font-size:0.34rem;
             color: #B1B6C0;
             font-family: PingFangSC-Light;
           }

          &::-moz-placeholder{/* Firefox 19+ */
             font-size:0.34rem;
             color: #B1B6C0;
             font-family: PingFangSC-Light;
           }

          &:-ms-input-placeholder {
             font-size:0.34rem;
             color: #B1B6C0;
             font-family: PingFangSC-Light;
           }
        }
        i{
          float:right;
          margin:0.16rem 0.02rem 0 0;
          width:0.31rem;
          height:0.31rem;
          background:url('delete.png') no-repeat;
          background-size:100%;
        }
      }
      .input_prompt{
        margin:0.1rem 0 0 0.5rem;
        display:flex;
        align-items:center;
        em{
          width:0.31rem;
          height:0.31rem;
          background:url('sigh.png') no-repeat;
          background-size:100%;
        }
        p{
          margin-left:0.16rem;
          height:0.4rem;
          line-height:0.4rem;
          font-size:0.28rem;
          color:#ff5900;
        }
      }
      a{
        margin:0 auto;
        margin-top:1.2rem;
        display:block;
        width:6.5rem;
        height:0.88rem;
        line-height:0.88rem;
        text-align:center;
        border-radius:0.04rem;
        background:#abb4cb;
        font-size:0.32rem;
        color:#fff;
        font-family: PingFangSC-Medium;
        &.selected{
          background:#ff5900;
         }
      }
    }
  }
</style>
