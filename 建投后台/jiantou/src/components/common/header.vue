<template lang="html">
  <header id="my_header">
    <div class="retainbb">
      <img @click="back" src="./left_arrow.png" alt=""/>
      <h3>{{headerName}}</h3>
      <!--积分记录，利用分发slot进行-->
      <slot></slot>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    data: function () {
      return {

      };
    },
    components: {},
    props:['headerTitle'],
    computed:{
      headerName:function(){
        if(this.headerTitle){
          return this.headerTitle;
        }else{
          return '积分商城';
        }
      }
    },
    methods:{
      back:function(){
        // 返回上一界面
        this.$router.back();
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  #my_header{
    /*position:fixed;*/
    /*top:0;*/
    /*left:0;*/
    width:100%;
    /*z-index:5;*/
    div{
      position:relative;
      width:100%;
      height:0.88rem;
      line-height:0.94rem;
      text-align: center;
      background:#fff;
      img{
        position: absolute;
        top:0.26rem;
        left:0.26rem;
        width:0.38rem;
        height:0.38rem;
      }
      h3{
        font-size:0.32rem;
        color:#666;
        font-family: PingFangTC-Medium;
      }
      a{
        position:absolute;
        top:0.02rem;
        right:0.26rem;
        font-size:0.28rem;
        color:#666;
        font-family: PingFangTC-Medium;
      }
    }
  }
</style>
