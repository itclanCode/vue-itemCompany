<template lang="html">
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img v-bind:src="seller.avatar" width="64" height="64"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name" v-text="seller.name"></span>
        </div>
        <div class="description" v-cloak>{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="support">
          <!--页面加载完后，如果数据没有过来，这厘米昂的seller是undefined，如果再往下执行 seller.supports[0]就会报错-->
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data: function () {
      return {};
    },
    props: { // 可以是数组也可以是对象，用来接收来自父组件的数据
      seller: {
        type: Object
      }
    },
    components: {}
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .header{
    color:#fff;
    background:red;
  }
</style>
