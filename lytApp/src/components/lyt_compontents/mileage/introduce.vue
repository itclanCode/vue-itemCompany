<template lang="html">
  <div class="all_box mileage_introduce">
    <div id="header">头部</div>
    <div id="wrapper">
      <div id="scroller">
        <h6>{{aviation}}里程兑换说明</h6>
        <p v-for="(introduce,$index) in introduces">{{$index+1}}.{{introduce}}</p>
        <router-link to="/mileage/introduce/change">
          <button>下一步</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
              aviation: '吉祥航空',
              introduces: [
                '请正确填写“如意俱乐部”会员卡号，会员姓名为非必填选项。',
                '乐益通积分兑换为“如意俱乐部”积分后，将于5个工作日内充入到您的“如意俱乐部”会员账户，如兑换失败，则在5个工作日内返回到您的乐益通积分账户。',
                '积分兑换手续为1000：10，无手续费。即每1000个乐益通积分可兑换10点“如意俱乐部”积分，起兑点为1000乐益通积分。每笔按照1000的整数倍递增。',
                '“如意俱乐部”积分有效期为：积分入账当月起的24个月内有效。'
              ]
            };
        },
        components: {}
    };
</script>

<style lang="scss" rel="stylesheet/scss">
  .all_box{
    &.mileage_introduce{
      #wrapper{
        top:1.23rem;
      }
      h6{
        margin:0.5rem 0 0.3rem 0;
        text-align:center;
        font-size:0.34rem;
        color:#242424;
        font-family: "PingFang-SC-Blod";
      }
      p{
        margin:0 0.32rem 0.2rem 0.32rem;
        line-height:0.46rem;
        font-size:0.28rem;
        color:#787878;
        font-family: "PingFang-SC-Medium";
      }
      button{
        margin-top:4.56rem;
        background:#d0010b;
      }
     }
  }
</style>
