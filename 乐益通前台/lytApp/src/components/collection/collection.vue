<template lang="html">
  <div class="all_box collection">
    <div class="header_box">
      <header></header>
      <ul class="classification" :class="{local:localState}">
        <!--<v-touch v-on:tap="play">Tap me!</v-touch>-->
        <li v-for="(tab,$index) in tabs" :class="{active:active==$index}" @click="toggle($index)">
          {{tab.type}}
        </li>
      </ul>
    </div>
    <ul class="fictitious" v-show="showState">
      <li v-for="n in 10">
        <img src="" alt=""/>

        <div class="right_box">
          <h6>腾讯VIP会员卡21天卡腾讯VIP会员卡21天卡</h6>

          <p>购买腾讯VIP会员，登录官网即可购买腾讯VIP会员，登录官网即可购买腾讯VIP会员，登录官网即可购买腾讯VIP会员，登录官网即可</p>

          <div>
            <img src="./gold_icon@2x.png" alt=""/>
            <b>910</b>
            <span>￥1800</span>
            <em>已售2132</em>
          </div>
        </div>
      </li>
    </ul>
    <ul class="article" v-show="!showState">
      <li class="article_transverse">
        <div class="left_article">
          <p>中信乐益通官方微信正式上线了，随时了解您的积分情况。</p>
          <div class="article_bottom">
            <em>官方</em><em>推荐</em><span>2分钟前</span><img src="./eye@2x.png" alt=""/><b>2132</b>
          </div>
        </div>
        <img src="" alt="" class="right_article"/>
      </li>
      <li class="article_transverse">
        <div class="left_article">
          <p>中信乐益通官方微信正式上线了，随时了解您的积分情况。</p>
          <div class="article_bottom">
            <em>官方</em><em>推荐</em><span>2分钟前</span><img src="./eye@2x.png" alt=""/><b>2132</b>
          </div>
        </div>
        <img src="" alt="" class="right_article"/>
      </li>
      <li class="article_portrait">
        <h6>积分当钱花，就到麦当劳。积分当钱花，就到麦当劳。</h6>
        <div class="article_portrait_images">
          <img src="" alt=""/>
          <img src="" alt=""/>
          <img src="" alt=""/>
        </div>
        <div class="article_bottom">
          <em>麦当劳</em><span>2分钟前</span><img src="./eye@2x.png" alt=""/><b>2132</b>
        </div>
      </li>
      <li class="article_portrait">
        <h6>积分当钱花，就到麦当劳。积分当钱花，就到麦当劳。</h6>
        <div class="article_portrait_images">
          <img src="" alt=""/>
          <img src="" alt=""/>
          <img src="" alt=""/>
        </div>
        <div class="article_bottom">
          <em>麦当劳</em><span>2分钟前</span><img src="./eye@2x.png" alt=""/><b>2132</b>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  var ERR_OK = 0;
  export default {
    data: function () {
      return {
        tabs: [
          {
            type: '商品类'
          },
          {
            type: '文章类'
          }
        ],
        active: 0,
        showState: true,
        localState: false
      };
    },
    methods: {
      toggle: function($index) {
        this.active = $index;
        if (this.active === 0) {
          this.showState = true;
        }
        if (this.active === 1) {
          this.showState = false;
        }
      }
    },
    components: {},
    created: function() {
      this.$http.get('/api/userIntegral').then((response) => {
        response = response.body; // 通过response.josn来格式化json数据,这个返回的是promise对象
        if (response.errno === ERR_OK) {
          console.log(response.data);
        }
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../common/sass/min.scss'; /*引入外部scss文件*/
  .all_box{
    /*固定头部*/
    &.collection{

      .header_box{
        position:fixed;
        top:0;
        left:0;
        z-index:1;
        width:100%;
        header {
          height:1.23rem;
          background:dodgerblue;
        }
      }
      .classification{
        overflow:hidden;
        width:100%;
        height:0.8rem;
        background:#fff;
        @include border-1px-b(#dcdcdc);
        li{
          position:relative;
          top:0.02rem;
          margin-left:0.87rem;
          float:left;
          width:2.88rem;
          height:0.73rem;
          line-height:0.76rem;
          text-align:center;
          font-size:0.28rem;
          color:#666;
          &:last-child{
            margin-left:0;
           }
          &.active{
             color:#b80015;
             border-bottom:0.04rem solid #b80015;
           }
        }
      }
      /*商品类收藏*/
      .fictitious{
        margin-top:2.03rem;
      }
      /*虚拟类收藏*/
      .article{
        margin-top:2.03rem;
        .article_bottom{
          margin-bottom:0.3rem;
          em{
            display: inline-block;
            padding:0 0.05rem;
            margin-right:0.1rem;
            height:0.28rem;
            line-height:0.28rem;
            text-align:center;
            font-size:0.2rem;
            color:#ee320d;
            border:0.01rem solid #ee320d;
            border-radius:0.1rem;
          }
          span{
            font-size:0.24rem;
            color:#8b8b8b;
            font-family: "PingFang-SC-Medium";
          }
          img{
            position:relative;
            top:0.14rem;
            margin-left:1.2rem;
            width:0.44rem;
            height:0.44rem;
          }
          b{
            font-size:0.24rem;
            color:#8b8b8b;
            font-family: "HelvebcaNeueLTPro-Roman";
          }
        }
        /*横向排列*/
        .article_transverse{
          overflow:hidden;
          margin-left:0.32rem;
          @include border-1px-b(#dcdcdc);
          .left_article{
            float:left;
            width:4.48rem;
            p{
              margin:0.36rem 0;
              line-height:0.46rem;
              font-size:0.34rem;
              color:#242424;
              font-family: "PingFang-SC-Medium";
            }
          }
          .right_article{
            float:left;
            margin:0.4rem 0 0 0.42rem;
            width:2.07rem;
            height:1.4rem;
            background:deepskyblue;
          }
        }
        /*竖向排列*/
        .article_portrait{
          overflow:hidden;
          margin-left:0.32rem;
          @include border-1px-b(#dcdcdc);
          h6{
            margin-top:0.36rem;
            width:6.96rem;
            font-size:0.34rem;
            color:#242424;
            font-family: "PingFang-SC-Medium";
          }
          .article_portrait_images{
            overflow:hidden;
            margin-top:0.36rem;
            img{
              float:left;
              margin-right:0.32rem;
              width:2.07rem;
              height:1.4rem;
              background:deepskyblue;
            }
          }
          .article_bottom{
            img{
              margin-left:4.1rem;
            }
          }
        }
      }
    }
  }
</style>
