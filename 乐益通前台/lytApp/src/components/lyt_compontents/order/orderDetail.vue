<template lang="html">
  <div class="all_box order_detail">
    <header></header>
    <div class="order_state" v-if="orderDetail.orderState === 1">
      <h6>订单完成</h6>
      <p>时间：{{orderDetail.time}}</p>
    </div>
    <div class="order_state fail" v-else-if="orderDetail.orderState === 2">
      <h6>交易关闭（已退款）</h6>
      <p>时间：{{orderDetail.time}}</p>
    </div>
    <div class="order_state cancel" v-else-if="orderDetail.orderState === 3">
      <h6>订单已取消</h6>
      <p>时间：{{orderDetail.time}}</p>
    </div>
    <!--个人信息-->
    <div class="orderInformation">
      <div class="order_num">
        <b>订单号：{{orderDetail.orderNum}}</b>
        <span v-if="orderDetail.tradeState === 1">交易完成</span>
        <span v-else-if="orderDetail.tradeState === 2">交易关闭</span>
        <span v-else-if="orderDetail.tradeState === 3">已取消</span>
      </div>
      <div class="user" v-if="orderDetail.judgeState === 1">
        <p>{{orderDetail.name}}</p>
        <p>{{orderDetail.phoneNum}}</p>
        <p>{{orderDetail.address}}</p>
      </div>
    </div>
    <!--虚拟商品信息-->
    <ul class="goodsInformation" v-if="orderDetail.judgeState !== 1">
      <li class="goodsInformation_top">
        <img class="goods_img" src="" :alt="orderDetail.img"/>
        <div>
          <h6>{{orderDetail.goodsName}}</h6>
          <p>
            <img src="./gold_icon@2x.png" alt=""/><span>{{orderDetail.goodsPrice}}</span><em>数量：{{orderDetail.goodsNum}}</em>
          </p>
        </div>
      </li>
      <li class="dummy_warning">
        <img src="./tishi_icon.png" alt=""/><b>温馨提示:本品不支持退换货</b>
      </li>
    </ul>
    <!--商品信息-->
    <ul class="goodsInformation">
      <li class="goodsInformation_top" v-if="orderDetail.judgeState === 1">
        <img class="goods_img" src="" :alt="orderDetail.img"/>
        <div>
          <h6>{{orderDetail.goodsName}}</h6>
          <p>
            <img src="./gold_icon@2x.png" alt=""/><span>{{orderDetail.goodsPrice}}</span><em>数量：{{orderDetail.goodsNum}}</em>
          </p>
        </div>
      </li>
      <li class="goodsInformation_top dummy" v-else>
        <b>兑换码{{orderDetail.redeem}}</b>
        <p>有效期至：{{orderDetail.time}}</p>
      </li>
      <li class="goodsInformation_center">
        <p>
          <span>商品积分</span><em>{{orderDetail.goodsIntegral}}积分</em>
        </p>
        <p>
          <span>快递</span><em>{{orderDetail.expressIntegral}}积分</em>
        </p>
      </li>
      <li class="goodsInformation_bottom">
        <span>实付</span><em>{{orderDetail.goodsIntegral+orderDetail.expressIntegral}}积分</em>
      </li>
    </ul>
    <!--其他信息-->
    <ul class="orderOther" :class="{otherHeight:orderDetail.judgeState !==1}">
      <p>
        <span>订单时间</span><em>{{orderDetail.time}}</em>
      </p>
      <p>
        <span>支付方式</span><em>{{orderDetail.payMethod}}</em>
      </p>
      <p v-if="orderDetail.judgeState === 1">
        <span>配送信息</span><em>{{orderDetail.dispatching}}</em>
      </p>
      <p v-if="orderDetail.judgeState === 1">
        <span>发票抬头</span><em>{{orderDetail.invoice}}</em>
      </p>
      <p v-if="orderDetail.judgeState === 1">
        <span>留言</span><em>{{orderDetail.message}}</em>
      </p>
    </ul>
    <ul class="orderBtn" v-if="orderDetail.judgeState === 1">
      <li @click="refund">申请退款</li>
      <li>取消订单</li>
    </ul>
    <footer>
      <ul>
        <li v-if="orderDetail.judgeState === 1">查看物流</li>
        <li :class="{orderCenter:orderDetail.judgeState !== 1}">商品评价</li>
        <li v-if="orderDetail.judgeState === 1">确认收货</li>
      </ul>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
              // 订单详情数据
              orderDetail: {
                time: '2012-03-21 13:00:02',
                // 订单状态
                orderState: 0,
                // 订单编号
                orderNum: 10111020075,
                // 交易状态
                tradeState: 1,
                // 判断实物商品还是虚拟商品
                judgeState: 1,
                // 姓名
                name: '赵金磊',
                // 电话号
                phoneNum: '159 0152 3741',
                // 地址
                address: '北京市丰台区神秘1号北京市丰台区神秘1号北京市丰台区神秘北京市丰台区神秘 1100060',
                // 商品图片
                img: '图片',
                // 兑换码
                redeem: 'AS8EES83213537112',
                // 商品名称
                goodsName: '新西兰羔羊肉 5公斤',
                // 商品价格
                goodsPrice: 910,
                // 商品数量
                goodsNum: 1,
                // 商品积分
                goodsIntegral: 2132,
                // 快递积分
                expressIntegral: 1,
                // 支付方式
                payMethod: '乐益通积分',
                // 配送信息
                dispatching: '快递免邮',
                // 发票抬头
                invoice: '中信易家公司',
                // 留言
                message: '快点哈！等着用'
              }
            };
        },
        methods: {
          // 实物类商品申请退款
          refund: function() {
            window.confirm('拨打400-010-0000申请退款');
          }
        },
        components: {}
    };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../common/sass/min.scss'; /*引入外部scss文件*/
  .all_box{
    &.order_detail{
       height: 100%;
       background: #f3f3f3;
      /*订单状态*/
      .order_state{
        overflow:hidden;
        padding-left:0.34rem;
        height:1.4rem;
        background:#7ac700;
        font-family: "PingFang-SC-Medium";
        h6{
          margin:0.34rem 0 0.17rem;
          font-size:0.4rem;
          color:#fff;
        }
        p{
          font-size:0.24rem;
          color:#fff;
        }
        &.fail{
          background:#d0010b;
         }
        &.cancel{
          background:#666;
         }
      }
      /*下面公用的左边名称样式 span*/
      span{
        font-size:0.28rem;
        color:#666;
        font-family: "PingFang-SC-Medium";
      }
      /*右侧具体数据样式 em*/
      em{
        float:right;
        margin-right:0.32rem;
        font-size:0.28rem;
        color:#242424;
        font-family: "PingFang-SC-Medium,HelveticaNeueLTPro-Roman";
      }
      /*个人信息*/
      .orderInformation{
        overflow:hidden;
        margin-bottom:0.2rem;
        padding-left:0.32rem;
        background:#fff;
        @include border-1px-b(#dcdcdc);
        .order_num{
          overflow:hidden;
          height:0.9rem;
          line-height:0.9rem;
          font-family: "PingFang-SC-Medium";
          b{
            font-size:0.3rem;
            color:#242424;
          }
          span{
            float:right;
            margin-right:0.32rem;
            font-size:0.26rem;
            color:#666;
          }
        }
        .user{
          p:nth-of-type(1){
            padding-top:0.45rem;
            margin-bottom:0.34rem;
          @include border-1px-t(#dcdcdc);
            font-size:0.34rem;
            color:#242424;
            font-family: "PingFang-SC-Bold";
          }
          p:nth-of-type(2),p:nth-of-type(3){
            font-size:0.28rem;
            color:#272727;
            font-family: "PingFang-SC-Medium";
          }
          p:nth-of-type(3){
            padding-right:0.2rem;
            margin:0.16rem 0 0.38rem;
            line-height:0.36rem;
            /*强制断字*/
            word-break: break-all;
          }
        }
      }
      /*商品信息*/
      .goodsInformation{
        padding-left:0.32rem;
        margin-bottom:0.2rem;
        background:#fff;
        @include border-1px-t(#dcdcdc);
        @include border-1px-b(#dcdcdc);
        .goodsInformation_top{
          overflow: hidden;
          @include border-1px-b(#dcdcdc);
          &.dummy{
            overflow:hidden;
            b{
              display: block;
              margin:0.32rem 0;
              font-size:0.34rem;
              color:#242424;
              font-family: "PingFang-SC-Medium";
            }
            p{
              margin-bottom:0.38rem;
              font-size:0.24rem;
              color:#666;
              font-family: "PingFang-SC-Medium";
            }
           }
          .goods_img{
            float:left;
            margin:0.2rem 0.32rem 0.2rem 0;
            width:1.06rem;
            height:1.06rem;
            background:deepskyblue;
          }
          div{
            float:left;
            width:5.8rem;
            h6{
              margin:0.29rem 0 0.27rem;
              font-size:0.33rem;
              color:#242424;
              font-family: "PingFang-SC-Bold";
            }
          }
          p{
            overflow:hidden;
            img{
              width:0.2rem;
              height:0.2rem;
            }
            span{
              margin-left:0.09rem;
              font-size:0.4rem;
              color:#b80015;
              font-family: "HelveticaNeueLTPro-Roman";
            }
            em{
              float:right;
              margin:0.06rem 0.32rem 0 0;
              font-size:0.28rem;
              color:#666;
              font-family: "PingFang-SC-Medium,HelveticaNeueLTPro-Roman";
            }
          }
        }
        .goodsInformation_center{
          overflow:hidden;
          @include border-1px-b(#dcdcdc);
          p{
            overflow:hidden;
          }
          p:nth-of-type(1){
            margin:0.44rem 0 0.28rem;
          }
          p:nth-of-type(2){
            margin-bottom:0.36rem;
          }
        }
        .goodsInformation_bottom{
          height:0.9rem;
          line-height:0.9rem;
          em{
            color:#4dafea;
          }
        }
        /*虚拟商品警告*/
        .dummy_warning{
          height:0.9rem;
          line-height:0.9rem;
          img{
            width:0.25rem;
            height:0.25rem;
            vertical-align: middle;
          }
          b{
            /*float:left;*/
            /*/!*对行内元素不起作用*!/*/
            /*transform:translateY(0.01rem);*/
            /*-ms-transform:translateY(0.01rem); 	/!* IE 9 *!/*/
            /*-moz-transform:translateY(0.01rem); 	/!* Firefox *!/*/
            /*-webkit-transform:translateY(0.01rem); /!* Safari 和 Chrome *!/*/
            /*-o-transform:translateY(0.01rem); 	/!* Opera *!/*/
            position:relative;
            top:0.01rem;
            margin-left:0.2rem;
            font-size:0.26rem;
            color:#666;
            font-family: "PingFang-SC-Medium";
          }
        }
      }
      /*其他信息*/
      .orderOther{
        overflow: hidden;
        padding-left:0.32rem;
        margin-bottom:0.2rem;
        background:#fff;
        @include border-1px-t(#dcdcdc);
        @include border-1px-b(#dcdcdc);
        p:nth-of-type(1){
          margin-top:0.5rem;
        }
        p{
          margin-bottom:0.3rem;
        }
        &.otherHeight{
           margin-bottom:2.4rem;
         }
      }
      /*相关按钮*/
      .orderBtn{
        height:5rem;
        background:#fff;
        li{
          height:0.9rem;
          line-height:0.9rem;
          text-align:center;
          font-size:0.32rem;
          color:#242424;
          font-family: "PingFang-SC-Bold";
          &:first-child{
            @include border-1px-b(#dcdcdc);
           }
        }
      }
      /*底部导航*/
      footer{
        position:fixed;
        bottom:0;
        left:0;
        width:100%;
        ul{
          overflow:hidden;
          height:0.97rem;
          background:#fff;
          @include border-1px-t(#dcdcdc);
          li{
            float:left;
            margin-top:0.23rem;
            width:2.5rem;
            height:0.5rem;
            line-height:0.5rem;
            text-align:center;
            font-size:0.32rem;
            color:#4dafea;
            font-family: "PingFang-SC-Bold";
            @include border-1px-r(#dcdcdc);
            &:last-child{
               &:after{
                 border:none;
               }
             }
            &.orderCenter{
               width:100%;
             }
          }
        }
      }
     }
  }
</style>
