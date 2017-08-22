<template lang="html">
  <div class="record_prize_bottom">
    <!--状态3：中奖  状态4：未中奖-->
    <p class="winning" v-if="dataList.state == 3">恭喜您 中奖了</p>
    <p class="nothing" v-if="dataList.state == 4">很遗憾 未中奖祝下次好运</p>
    <img src="static/images/img/winning@2x.png" v-if="dataList.state == 3" alt=""/>
    <img src="static/images/img/notWinning@2x.png" v-if="dataList.state == 4" alt=""/>
    <!--中奖显示，不中奖不显示-->
    <div v-if="dataList.state == 3">
      <b>联系手机号</b>
      <div class="phone_box">{{data.inventedProductToMobile}}</div>
      <p class="describe">工作人员会在五个工作日内（节假日顺延）联系您。请您期间保持手机畅通。</p>
      <p class="contact">如在规定时间内未与您联系，请致电<a href="javascript:;">中信建投客服</a></p>
    </div>
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
      console.log(this.dataList);
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
  .record_prize_bottom{
    position:relative;
    .nothing,.winning{
      position: absolute;
      top:1.68rem;
      left:2.6rem;
      width: 2.34rem;
      line-height:0.46rem;
      text-align: center;
      color: #fff;
      font-size: 0.36rem;
      font-family: PingFangTC-Regular;
    }
    .winning{
      top:1.88rem;
    }
    img{
      margin:0.43rem 0 0.43rem 0.3rem;
      width:6.9rem;
      height:3.3rem;
    }
    b{
      display: block;
      text-align: center;
      font-size: 0.3rem;
      color: #858C9E;
      font-family: PingFangTC-Medium;
    }
    .phone_box{
      margin: 0.2rem 0 0.44rem;
      display: flex;
      justify-content: center;
      font-size: 0.34rem;
      color: #333;
    }
    .describe,.contact{
      width: 6.9rem;
      margin-left: 0.3rem;
      line-height: 0.38rem;
      text-align: center;
      font-size: 0.3rem;
      color: #333;
      font-family: PingFangTC-Regular;
      letter-spacing: 0.01rem;
      a{
        color: #2d68ff;
      }
    }
  }
</style>
