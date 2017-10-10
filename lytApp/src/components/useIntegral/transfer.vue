<template lang="html">
  <div class="all_box explain transfer">
    <!--<div id="header">头部</div>-->
    <div id="wrapper">
      <div id="scroller">
        <p v-for="(explain,$index) in explains">{{$index+1}}. {{explain}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data: function () {
      return {
        explains: [
          '转账下限为100积分，积分实时到账。',
          '转账按照交易额的3%收取手续费，手续费内扣方式收取，不足1积分的部分向上取整为1积分；  例如，转出150积分，手续费为5积分，转入账户入账145积分。',
          '签约账户间转账不收取手续费。'
        ]
      };
    },
    components: {}
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .all_box{
    &.transfer{
      #wrapper{
        /*top:1.23rem;*/
        background:#fff;
        p{
          margin-top:0;
          &:first-child{
            margin-top:0.32rem;
           }
        }
      }
     }
  }
</style>
