<template lang="html">
  <div class="recharge_state">
    <my-header :headerTitle="headerName">
      <router-link :to="{path:'record'}">积分记录</router-link>
    </my-header>
    <scroller lock-x ref="mode" height="-44%" style="background: #F2F4F8;">
      <div id="wrapper" v-show="!show">
        <b>{{stateText}}</b>
        <img class="img_state" src="./false.png" alt="" v-if="state == 0"/>
        <img class="img_state" src="./true.png" alt="" v-if="state == 1"/>
        <img class="img_state" src="./in_process.png" alt="" v-if="state == 2"/>
        <p class="explain" v-if="state == 1">您的{{productState}}已兑换成功！</p>
        <p class="explain" v-if="state == 0">您的{{productState}}兑换失败！</p>
        <p class="explain" v-if="state == 2">您的{{productState}}委托处理中！</p>
        <div class="true_button">
          <router-link to="/">确定</router-link>
        </div>
        <div class="explain_details">
          <img src="./exclamatory_icon.png" alt=""/>
          <!--level2 行情的兑换后说明-->
          <div v-if="dataTypeId == 1">
            <p>
              1.本礼品为中信建投“level2十档行情”，兑换成功后可登录资金账号查看十档行情及权限期限；
            </p>
            <p>
              2.level2功能介绍：极速行情——交易所数据专线直达，毫秒级实时逐笔刷新行情；十档行情——十档买卖盘口，看清卖盘抛压与买盘承接；委托队列——展示前50笔挂单，清楚区分主力与散户；逐笔明细——洞察每一笔成交单中每一个账户的真实情况；
            </p>
            <p>
              3.level2兑换成功会扣减相应积分，一经兑换不接受退换，如有疑问，可咨询在线客服或拨打客服热线95587；
            </p>
            <p>
              4.以上说明及解释权归中信建投证券所有。
            </p>
          </div>
          <!--充话费 的兑换后说明-->
          <div v-if="dataTypeId == 2">
            <p>
              1.	兑换成功后，话费将于24小时内到账；
            </p>
            <p>
              2.	礼品兑换成功会扣减相应积分；
            </p>
            <p>
              3.	兑换失败的原因有积分余额不够、商品已售罄、系统故障等；
            </p>
            <p>
              4.	本礼品一经兑换不接受退换，如有疑问，请致电<span>中信乐益通客服电话4000095558转3；</span>
            </p>
            <p>
              5.	以上说明及解释权归中信建投证券所有。
            </p>
          </div>
          <!--充流量 的兑换后说明-->
          <div v-if="dataTypeId == 3">
            <p>
              1.	兑换成功后，流量将在3-5个工作日到账，流量当月生效，次月清零。每月25日15:00后至当月月底兑换的流量，将统一在下月初进行充值；
            </p>
            <p>
              2.	礼品兑换成功会扣减相应积分；
            </p>
            <p>
              3.	兑换失败的原因有积分余额不够、商品已售罄、系统故障等；
            </p>
            <p>
              4.	存在手机号停机、欠费、身份资料不全等情况将导致流量充值失败，建议在手机状态正常的情况下进行流量兑换；
            </p>
            <p>
              5.	本礼品一经兑换不接受退换，如有疑问，请致电<span>中信乐益通客服电话4000095558转3；</span>
            </p>
            <p>
              6.	以上说明及解释权归中信建投证券所有。
            </p>
          </div>
          <!--视频会员 的兑换后说明-->
          <div v-if="dataTypeId == 4">
            <p>
              1.	兑换成功后，会员卡兑换码短信将于24小时内发送至用户APP注册手机号上，用户可自行完成充值；
            </p>
            <p>
              2.	请在激活有效期内激活会员卡，过期会员卡失效；
            </p>
            <p>
              3.	会员卡不可兑换现金；
            </p>
            <p>
              4.	请注意会员卡兑换码的保密性，如发生盗用、泄露、遗失等问题不予调换与退款；
            </p>
            <p>
              5.	有效期：收到兑换码短信之日起36个月；
            </p>
            <p>
              6.	兑换失败的原因有积分余额不够、商品已售罄、系统故障等；
            </p>
            <p>
              7.	本礼品一经兑换不接受退换，如有疑问，请致电<span>中信乐益通客服电话4000095558转3；</span>
            </p>
            <p>
              8.	以上说明及解释权归中信建投证券所有。
            </p>
          </div>
          <!--京东E卡 的兑换后说明-->
          <div v-if="dataTypeId == 5">
            <p>
              1.	京东E卡可购买京东商城自营电器、手机、百货、服饰、箱包、食品等众多商品；
            </p>
            <p>
              2.	礼品兑换成功会扣减相应积分；
            </p>
            <p>
              3.	有效期：收到兑换码短信之日起36个月；
            </p>
            <p>
              4.	兑换失败的原因有积分余额不够、商品已售罄、系统故障等；
            </p>
            <p>
              5.	本礼品一经兑换不接受退换，如有疑问，请致电<span>中信乐益通客服电话4000095558转3；</span>
            </p>
            <p>
              6.	以上说明及解释权归中信建投证券所有。
            </p>
          </div>
        </div>
      </div>
      <!--加载图标-->
      <loading v-model="show"></loading>
    </scroller>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './header';
  import {Scroller,Loading} from 'vux';
    export default {
        data: function () {
            return {
              // 获取头名称
              headerName:this.$route.query.headerTitle,
              // 获取商品类型id
              dataTypeId:this.$route.query.dataTypeId,
              // 获取商品id
              productId:this.$route.query.productId,
              // 获取商品名称
              productName:this.$route.query.productName,
              // 获取商品价格
              mallIntegralPrice:this.$route.query.mallIntegralPrice,
              // 获取手机号
              toMobile:this.$route.query.toMobile,
              // 获取到状态的数据
              state:'',
              // 加载图标的显示和隐藏
              show:true
            };
        },
        components: {
          // 引用公用的头部
          myHeader:header,
          // 引入滚动
          Scroller:Scroller,
          // 加载图标
          Loading:Loading
        },
        computed:{
          // 处理兑换的状态
          stateText:function(){
            if(this.state == 0){
              return '兑换失败';
            }else if(this.state == 1){
              return '兑换成功';
            }else{
              return '委托购买处理中';
            }
          },
          // 处理不同的商品状态
          productState:function(){
            if(this.dataTypeId == 1){
              return 'level II行情';
            }else if(this.dataTypeId == 2){
              return '充话费';
            }else if(this.dataTypeId == 3){
              return '充流量';
            }else if(this.dataTypeId == 4){
              return '视频会员';
            }else if(this.dataTypeId == 5){
              return '京东E卡';
            }else if(this.dataTypeId == 6){
              return '抽奖';
            }
          }
        },
        created:function(){
          var that = this;
          console.log(that.productId);
          console.log(that.mallIntegralPrice);
          console.log(that.toMobile);
          // 进入这个页面后请求兑换虚拟商品接口
          jsonp('/product/exchangeUCL',
            function(data){
              console.log(data);
              if(data.resultCode == 200){
                if(data.resultBody == '兑换失败'){
                  that.state = 0;
                }
                if(data.resultBody == null){
                  that.state = 1;
                }
              }else{
                // 委托处理中
                that.state = 2;
              }
              // 处理完数据之后隐藏加载图标显示相关内容
              that.show = false;
              // 更新滚动条
              that.$nextTick(()=>{
                that.$refs.mode.reset();
              })
            },
            {
              // 商品id
              id:that.productId,
              // 商品价格
              productPrice:that.mallIntegralPrice,
              // 手机号
              toMobile:that.toMobile
            }
          )
        },
        mounted:function(){
          this.$nextTick(()=>{
            this.$refs.mode.reset();
          })
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
  .recharge_state{
    overflow: hidden;
    height:100%;
    font-family: PingFangTC-Regular;
    #wrapper{
      b{
        display:block;
        padding:0.4rem 0 0.6rem;
        height:0.42rem;
        line-height:0.42rem;
        text-align: center;
        background:#fff;
        font-size: 0.4rem;
        color: #FF5900;
        font-family: PingFangTC-Medium;
      }
      .img_state{
        display: block;
        padding:0 3.02rem;
        width:1.46rem;
        height:1.9rem;
        background:#fff;
      }
      .explain{
        padding:0.56rem 0.4rem 0.6rem;
        width:6.7rem;
        line-height:0.36rem;
        text-align: center;
        font-size:0.3rem;
        color:#333;
        background:#fff;
        letter-spacing: 0.01rem;
      }
      .true_button{
        padding: 0 0.3rem 0.6rem;
        background:#fff;
        a{
          display: flex;
          width:6.9rem;
          height:0.88rem;
          align-items: center;
          justify-content: center;
          font-size:0.32rem;
          color:#fff;
          background: #FF5900;
          border-radius:0.02rem;
        }
      }
      .explain_details{
        overflow:hidden;
        width:100%;
        img{
          float:left;
          margin:0.48rem 0 0 0.3rem;
          width:0.28rem;
          height:0.28rem;
        }
        div{
          float:left;
          margin:0.4rem 0 0.4rem 0.1rem;
          width:6.52rem;
          p{
            line-height:0.42rem;
            font-size:0.3rem;
            color:#999;
            span{
              color:#2c66f9;
            }
          }
        }
      }
    }
  }
</style>
