<template lang="html">
  <div class="all_box exchange">
    <header></header>
    <div class="exchange_top">
      <p>
        <b>{{integral}}</b>
        <span>乐益通积分</span>
      </p>
      <img src="./jiantou_icon@2x.png" alt=""/>
      <p>
        <b>{{integral/integralRate}}</b>
        <span>吉祥积分</span>
      </p>
    </div>
    <div class="exchange_center">
      <div class="exchange_integral">
        <span>汇出积分</span>
        <p>汇出积分按整数倍加减</p>
        <ul>
          <li @click="minus">-</li>
          <li>{{integral}}</li>
          <li @click="plus">+</li>
        </ul>
      </div>
      <div class="exchange_member">
        <span>会员卡号</span>
       <!-- 通过$event.target来监听事件源-->
        <input ref="input" type="text" placeholder="请输入“如意俱乐部”会员卡号" v-model="member" @focus="clearMember"/>
      </div>
      <div class="exchange_name">
        <span>中文姓名</span>
        <input type="text" placeholder="请输入中文姓名" v-model="name" @focus="clearName"/>
      </div>
    </div>
    <div class="exchange_bottom">
      <p>预计到账时间五个工作日，届时请于航空公司查询。</p>
      <button @click="exchange">兑换</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
              // 积分数
              integral: 1000,
              // 积分汇率
              integralRate: 100,
              // 会员名
              member: '',
              // 姓名
              name: ''
            };
        },
        mounted: function() {},
        methods: {
          plus: function() {
            this.integral = this.integral + 1000;
          },
          minus: function() {
            if (this.integral > 1000) {
              this.integral = this.integral - 1000;
            }
          },
          clearMember: function() {
            this.member = '';
//            console.log(this.$refs.input.value);
//            this.$refs.input.value = '';
          },
          clearName: function() {
            this.name = '';
          },
          exchange: function() {
            if (this.member !== '' && this.name !== '') {
              // 如果卡号和姓名不为空的话将卡号姓名积分数传给后台
              console.log(this.member);
            } else {
              console.log('卡号或者姓名不正确！');
            }
          }
        },
        components: {},
        created: function() {}
    };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../common/sass/min.scss'; /*引入外部scss文件*/
  .all_box{
    &.exchange{
       height:100%;
       background:#f3f3f3;
      .exchange_top{
        overflow:hidden;
        height:1.9rem;
        @include border-1px-b(#dcdcdc);
        p{
          float:left;
          margin:0.52rem 0 0 1.36rem;
          text-align:center;
          &:last-child{
            margin-left:0.74rem;
           }
          b{
            display:block;
            margin-bottom:0.22rem;
            font-size:0.4rem;
            color:#7ac700;
            font-family:"";
          }
          span{
            font-size:0.3rem;
            color:#242424;
            font-family:"PingFang-SC-Medium";
          }
        }
        img{
          float:left;
          margin:0.86rem 0 0 0.74rem;
          width:0.7rem;
          height:0.22rem;
        }
      }
      .exchange_center{
        position:relative;
        overflow:hidden;
        padding-left:0.32rem;
        background:#fff;
        @include border-1px-b(#dcdcdc);
        .exchange_integral{
          overflow: hidden;
          @include border-1px-b(#dcdcdc);
          span{
            display: block;
            margin:0.22rem 0 0.14rem;
            font-size:0.3rem;
            color:#242424;
            font-family: "PingFang-SC-Medium";
          }
          p{
            margin-bottom:0.22rem;
            font-size:0.24rem;
            color:#8b8b8b;
            font-family: "PingFang-SC-Medium";
          }
          ul{
            position:absolute;
            top:0.35rem;
            right:0.32rem;
            overflow:hidden;
            height:0.4rem;
            line-height:0.4rem;
            border:0.01rem solid #dcdcdc;
            border-radius:0.1rem;
            li{
              float:left;
              width:0.3rem;
              text-align:center;
              color:#666;
              &:nth-child(2){
                width:0.93rem;
                font-size:0.32rem;
                color:#242424;
                font-family: "HelveticaNeueLTPro-Roman";
                border-left:0.01rem solid #dcdcdc;
                border-right:0.01rem solid #dcdcdc;
               }
            }
          }
        }
        input{
          width:4.2rem;
          font-size:0.3rem;
          color:#242424;
          font-family: "PingFang-SC-Medium";
        &::-webkit-input-placeholder {
           font-size:0.28rem;
           font-family:"PingFang-SC-Medium";
           color: #8b8b8b;
         }
        &:-moz-placeholder {/* Firefox 18- */
           font-size:0.28rem;
           color: #8b8b8b;
         }

        &::-moz-placeholder{/* Firefox 19+ */
           font-size:0.28rem;
           color: #8b8b8b;
         }

        &:-ms-input-placeholder {
           font-size:0.28rem;
           color: #8b8b8b;
         }
        }
        .exchange_member,.exchange_name{
          height:0.9rem;
          line-height:0.9rem;
          @include border-1px-b(#dcdcdc);
          span{
            margin-right:0.34rem;
            font-size:0.3rem;
            color:#242424;
            font-family: "PingFang-SC-Medium";
          }
        }
        .exchange_name{
          border::none;
        }
      }
      .exchange_bottom{
        margin-left:0.32rem;
        height:7rem;
        p{
          margin:0.3rem 0 0.6rem 0;
          font-size:0.26rem;
          color:#666;
          font-family:"PingFang-SC-Medium";
        }
        button{
          margin-left:0;
          background:#d7000f;
        }
      }
     }
  }
</style>
