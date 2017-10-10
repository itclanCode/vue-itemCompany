<template lang="html">
  <div class="all_box mileage">
    <!--<div id="header">头部</div>-->
    <div id="wrapper">
      <div id="scroller">
        <img src="./baoqian.png" alt=""/>
        <p>亲，移动端暂不支持该项服务哦～</p>
        <p>请登录<a>www.ecashback.com.cn</a>完成操作</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
</script>

<style lang="scss" rel="stylesheet/scss">
  .all_box{
    &.mileage {
     text-align:center;
      #wrapper {
        /*top: 1.23rem;*/
        background: #f3f3f3;
      }
      img{
        margin:0.8rem 0;
        width:1.8rem;
        height:1.8rem;
      }
      p{
        margin-bottom:0.22rem;
        font-size:0.28rem;
        color:#666;
        font-family: "PingFang-SC-Medium";
        a{
          color:#7ac700;
        }
      }
    }
  }
</style>
