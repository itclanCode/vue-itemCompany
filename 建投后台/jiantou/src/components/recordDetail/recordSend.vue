<template lang="html">
  <div class="record_other_bottom">
    <b>联系手机号</b>
    <div class="phone_box">{{data.inventedProductToMobile}}</div>
    <!--短信发送中-->
    <p v-if="dataList.state == 5" class="contact">如超过24小时未收到兑换码短信请联系 <a href="javascript:;">中信建投客服</a></p>
    <!--如果短信已经发送就显示-->
    <b v-if="dataList.state == 6">发送文案</b>
    <p v-if="dataList.state == 6" class="text">{{data.remark}}</p>
    <b v-if="dataList.state == 6">发送时间</b>
    <p v-if="dataList.state == 6" class="time">{{data.finishTime}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data: function () {
      return {
        // 根据积分记录id获取详情
        data: ''
      };
    },
    props: ["dataList"],
    components: {},
    created: function () {
      var that = this;
      // 根据积分记录id获取详情
      jsonp('/user/getIntegralLogInfoUCL',
        function (data) {
          console.log(data);
          if (data.resultCode == 200) {
            that.data = data.resultBody;
            console.log(that.data);
          }
        },
        {
          scoreId: that.dataList.scoreId
        }
      );
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .record_other_bottom{
  b{
    margin:0.44rem 0 0.22rem;
    display: block;
    text-align: center;
    font-size: 0.3rem;
    color: #858C9E;
    font-family: PingFangTC-Medium;
  }
  .phone_box{
    margin-bottom:0.44rem;
    display: flex;
    justify-content: center;
    font-size: 0.34rem;
    color: #333;
  }
  .contact,.text,.time{
    line-height: 0.38rem;
    text-align: center;
    font-size: 0.3rem;
    color: #333;
    font-family: PingFangTC-Regular;
  a{
    color: #2d68ff;
  }
  }
  .contact{
    width: 4.7rem;
    margin-left: 1.4rem;
  }
  .text{
    width:6.9rem;
    margin-left:0.3rem;
    letter-spacing:0.01rem;
  }
  .time{
    width:2.02rem;
    margin-left:2.76rem;
  }
  }
</style>
