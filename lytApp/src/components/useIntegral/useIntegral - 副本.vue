<template lang="html">
  <div class="all_box">
    <!--<div id="header">头部</div>-->
    <div id="wrapper">
      <div id="scroller">
        <div class="banner"></div>
        <ul class="main_icon">
          <li>
            <router-link to="/chargeFlow">
              <img src="./chongliuliang_icon@2x.png" alt=""/>

              <p>充流量</p>
            </router-link>
          </li>
          <li>
            <router-link to="/mileage">
              <img src="./duilicheng-icon@2x.png" alt=""/>

              <p>兑里程</p>
            </router-link>
          </li>
          <li>
            <router-link to="/chargeBill">
              <img src="./chonghuafei_icon@2x.png" alt=""/>

              <p>充话费</p>
            </router-link>
          </li>
        </ul>
        <div class="line"></div>
        <ul class="commodityPush">
          <li v-for="n in 3">
            <router-link to="/transfer">
              <div>
                <h5>一分抢好货</h5>
                <img src="" alt=""/>
              </div>
              <p>限时限兑抢好货</p>
            </router-link>
          </li>
        </ul>
        <div class="line"></div>
        <ul class="classification" :class="{local:localState}">
          <li v-for="(tab,$index) in tabs" :class="{active:active==$index}" @click="toggle($index)">
            {{tab.type}}
          </li>
        </ul>
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
        <ul class="entity" v-show="!showState">
          <li v-for="n in 10">
            <img src="" alt=""/>

            <div class="right_box">
              <h6>腾讯VIP会员卡22天卡腾讯VIP会员卡21天卡</h6>

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
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
//  import $ from 'jquery';
//  import '../../../static/js/scrollfix.js';
//  import IScroll from '../../../static/js/iscroll.min.js';
  var ERR_OK = 0;
  export default {
    data: function () {
      return {
        tabs: [
          {
            type: '虚拟卡券'
          },
          {
            type: '实物商品'
          }
        ],
        active: 0,
        showState: true,
        localState: false
      };
    },
    methods: {
      play: function() {
        console.log(1234);
      },
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
//    mounted: function() {
//      var myScroll = new IScroll('#wrapper', {
//        scrollX: true,
//        // 上下左右滚动都生效的时候使用
//        freeScroll: true,
//        // 启用tap事件
//        click: true
//      });
//      document.addEventListener('touchmove', function (e) {
//        e.preventDefault();
//      }, false);
//      console.log(myScroll);
//    },
    created: function() {
//      $(function () {
// //    var fixHeader = $('.nav_top');
// //    var scrollDoc = $('.all_box');
// //    var contntBox = $('.classification');
// //    contntBox.scrollFix({distanceTop: 0, scrollDoc: scrollDoc, fixHeader: fixHeader});
//        var classBox = $('.classification');
//        var offsetT = classBox.offset().top;
// //    console.log(offsetT);
//        $(window).scroll(function () {
//          if ($(this).scrollTop() > offsetT) {
// //        console.log($(this).scrollTop());
//            if ($('.classification').hasClass('local')) {
//              return false;
//            } else {
//              $('.classification').addClass('local');
//            }
//          } else {
//            $('.classification').removeClass('local');
//          }
//        });
//      });
      this.$http.get('/api/userIntegral').then((response) => {
        response = response.body; // 通过response.josn来格式化json数据,这个返回的是promise对象
        if (response.errno === ERR_OK) {
          console.log(response.data);
        }
      });
    },
    components: {}
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../common/sass/min.scss'; /*引入外部scss文件*/
  .all_box{
    #header {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      padding: 0;
      width: 100%;
      height: 1.23rem;
      line-height: 1.23rem;
      background: #f3f3f3;
      text-align: center;
      font-size: 0.4rem;
      color: #000;
      font-weight: bold;
    }

    #footer {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0;
      z-index: 2;
      width: 100%;
      height: 0.98rem;
      background: #f3f3f3;
      border-top: 0.01rem solid #dcdcdc;
    }

    #wrapper {
      overflow: hidden;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 100%;
    }

    #scroller {
      position: absolute;
      z-index: 1;
      /*这个属性只用于iOS (iPhone和iPad)。当你点击一个链接或者通过Javascript定义的可点击元素的时候，它就会出现一个半透明的灰色背景。要重设这个表现，你可以设置-webkit-tap-highlight-color为任何颜色。*/
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      width: 100%;
      -webkit-transform: translateZ(0);
      -moz-transform: translateZ(0);
      -ms-transform: translateZ(0);
      -o-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-text-size-adjust: none;
      -moz-text-size-adjust: none;
      -ms-text-size-adjust: none;
      -o-text-size-adjust: none;
      text-size-adjust: none;
    }
    /*overflow: auto;*/
    font-family:"微软雅黑";
    background:#fff;
    em{
      font-style:normal;
    }
    header {
      height:1.23rem;
      background:dodgerblue;
    }
    .banner{
      height:3rem;
      background:yellow;
    }
    #slider{
      img{
        height:3rem;
        background:yellow;
      }
    }
    .main_icon{
      overflow:hidden;
      li{
        float:left;
        margin:0.3rem 0 0 1.21rem;
        width:0.88rem;
        img{
          width:0.88rem;
          height:0.88rem;
        }
        p{
          margin:0.15rem 0 0.3rem 0;
          text-align:center;
          font-size:0.28rem;
          color:#666666;
        }
      }
    }
    .line{
      height:0.2rem;
      background:#f3f3f3;
    }
    .commodityPush{
      overflow:hidden;
      li{
        float:left;
        width:2.5rem;
        &:last-child{
           &:after{
             border:none;
           }
         }
        @include border-1px-r(#dcdcdc);
        div{
          overflow:hidden;
          h5{
            float:left;
            margin:0.2rem 0.2rem 0 0.2rem;
            width:0.28rem;
            line-height:0.32rem;
            text-align:center;
            font-size:0.28rem;
            color:#242424;
          }
          img{
            float:left;
            margin:0.2rem 0;
            width:1.5rem;
            height:2.13rem;
            background:dodgerblue;
          }
        }
        p{
          margin-bottom:0.2rem;
          text-align:center;
          font-size:0.22rem;
          color:#8b8b8b;
        }
      }
    }
    .classification{
      overflow:hidden;
      width:100%;
      height:0.8rem;
      background:#fff;
      @include border-1px-b(#dcdcdc);
      &.local{
        position:fixed;
        top:0;
        left:0;
        z-index:2
       }
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
    .fictitious,.entity{
      li{
        overflow:hidden;
        margin-left:0.32rem;
        @include border-1px-b(#dcdcdc);
        img{
          float:left;
          margin:0.4rem 0.32rem 0.4rem 0;
          width:2.04rem;
          height:2.04rem;
          background:deepskyblue;
        }
        .right_box{
          float:left;
          width:4.5rem;
          h6{
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            width:4.5rem;
            margin:0.4rem 0 0.2rem 0;
            font-size:0.34rem;
            color:#242424;
          }
          p{
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            width:4.5rem;
            line-height:0.36rem;
            font-size:0.28rem;
            color:#787878;
          }
          div{
            margin-top:0.45rem;
            img{
              margin:0.13rem 0 0 0;
              width:0.2rem;
              height:0.2rem;
              background:none;
            }
            b{
              margin-left:0.08rem;
              font-size:0.4rem;
              font-family: "ArialMT";
              color:#b80015;
            }
            span{
              margin-left:0.08rem;
              text-decoration:line-through;
              font-size:0.24rem;
              color:#b4b4b4;
            }
            em{
              margin-left:1.44rem;
              font-size:0.24rem;
              color:#b4b4b4;
            }
          }
        }
      }
    }
  }
</style>
