<template lang="html">
  <div class="all_box explain">
    <p v-for="(explain,$index) in explains">{{$index+1}}. {{explain}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
              explains: [
                '移动、联通、电信流量包全国通用，当月有效。联通同面值流量包每月限兑换3次，移动、电信流量包不限兑换次数。',
                '为保证充值成功，请正确选择运营商及流量包型，务必填写正确手机号码，错选、错填造成的损失自行承担。本兑换暂不支持177号段手机号。',
                '本兑换将会在24小时内到帐，成功交易不可撤销。交易成功流量未到情况，请拨打4008-8848-20电话咨询',
                '可通过订单查询功能，查询历史兑换记录（交易流水号，即为我的乐益通-账户明细中该笔交易的系统流水号）。'
              ]
            };
        },
        components: {}
    };
</script>

<style lang="scss" rel="stylesheet/scss">
  .all_box{
    &.explain{
      p{
        margin:0 0.32rem 0.18rem 0.32rem;
        line-height:0.46rem;
        font-size:0.28rem;
        color:#787878;
        font-family: "PingFang-SC-Medium";
        &:nth-child(1){
           margin-top:0.5rem;
         }
        &:nth-child(5){
           margin-bottom:0.28rem;
         }
      }
      span{
        margin-left:0.74rem;
        font-size:0.24rem;
        color:#787878;
        font-family:"PingFang-SC-Medium";
      }
     }
  }
</style>
