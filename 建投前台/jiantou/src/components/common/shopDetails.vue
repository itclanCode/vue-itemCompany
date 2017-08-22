<template lang="html">
  <div class="shop_details">
    <my-header :headerTitle="headerName">
      <router-link :to="{path:'record',query:{headerTitle:'积分记录'}}">积分记录</router-link>
    </my-header>
    <scroller lock-x @on-scroll="updateScroll" ref="mode" height="-90%" style="background: #F2F4F8;">
      <div id="wrapper" v-show="!showLoading">
        <img class="banner" :src="imgUrl(dataInfo.infoImgUrl)" alt=""/>
        <h4>运营商</h4>
        <div class="describe retainbb">{{serviceProvider.name}}</div>
        <h5>物品</h5>
        <div class="describe retainbb">{{dataInfo.name2}}</div>
        <!--如果是充话费和充流量才显示-->
        <h6>手机号</h6>
        <div class="input_box">
          <div class="retainbb">
            <input type="number" maxlength="11" placeholder="请输入手机号" @focus="focusF" @keyup="phoneCheck" @blur="blurF" v-model="phone"/>
          </div>
        </div>
        <div v-show="cueState" class="prompt retainbb">
          <p v-html="cueText"></p>
        </div>
        <p class="explain">{{dataInfo.description}}</p>
        <div class="explain_details">
          <img src="./exclamatory_icon.png" alt=""/>
          <!--level2 行情的商品详情说明-->
          <div v-if="dataTypeId == 1">
            <p>
              1.  兑换时间为交易日9:30-15:30，非交易日不能兑换；
            </p>
            <p>
              2.  Level2的生效顺序，按获得level2(兑换、领取或购买）的顺序依次顺延；
            </p>
            <p>
              3.  1个月level2行情的有效期为30天；3个月有效期为90天；6个月有效期为180天；1年有效期为360天；
            </p>
            <p>
              4.  level2权限仅限此手机账户使用。
            </p>
          </div>
          <!--充话费 的商品详情说明-->
          <div v-if="dataTypeId == 2">
            <p>
              1.	兑换话费时请选择对应的运营商，否则将视为无效充值；
            </p>
            <p>
              2.	用户可以自行选择为自己的手机号码或他人的手机号码兑换，充值以填写的手机号为准；
            </p>
            <p>
              3.	话费一经兑换不接受退换，如有疑问，请致电<span>中信乐益通客服电话4000095558转3；</span>
            </p>
            <p>
              4.	以上说明及解释权归中信建投证券所有。
            </p>
          </div>
          <!--充流量 的商品详情说明-->
          <div v-if="dataTypeId == 3">
            <p>
              1.	兑换成功后，流量将在3-5个工作日到账，流量当月生效，次月清零。每月25日15:00后至当月月底兑换的流量，将统一在下月初进行充值；
            </p>
            <p>
              2.	兑换流量时请选择对应的运营商，否则将视为无效充值；
            </p>
            <p>
              3.	用户可以自行选择为自己的手机号码或他人的手机号码兑换，充值以填写的手机号为准；
            </p>
            <p>
              4.	话费一经兑换不接受退换；
            </p>
            <p>
              5.	如存在手机号停机、欠费、身份资料不全等情况将导致流量充值失败，建议在手机状态正常的情况下进行流量兑换，如有疑问，请致电<span>中信乐益通客服电话4000095558转3；</span>
            </p>
            <p>
              6.	以上说明及解释权归中信建投证券所有。
            </p>
          </div>
          <!--视频会员 的兑换后说明-->
          <div v-if="dataTypeId == 4">
            <p>
              1.	会员卡兑换码短信将发送至用户APP注册手机号上；
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
              6.	本礼品一经兑换不接受退换，如有疑问，请致电<span>中信乐益通客服电话4000095558转3；</span>
            </p>
            <p>
              7.	以上说明及解释权归中信建投证券所有。
            </p>
          </div>
          <!--京东E卡 的兑换后说明-->
          <div v-if="dataTypeId == 5">
            <p>
              1.  京东E卡兑换码短信将发送至用户APP注册手机号上；
            </p>
            <p>
              2.	京东E卡不记名、不挂失、不计息、不兑换，可在京东商城网站/APP内使用，仅用于购买京东自营商品，订单金额中使用京东E卡支付的部分，将不开具发票；
            </p>
            <p>
              3.	京东E卡，是由京东商城发行的经预付卡商委备案的单用途商业预付卡，兑换成功后会告知卡号密码，请妥善保管，卡密使用后将失效，不能多次使用；
            </p>
            <p>
              4.	请注意卡密的保密性，如发生盗用、泄露、遗失等问题不予调换与退款；
            </p>
            <p>
              5.	有效期：收到兑换码短信之日起36个月；
            </p>
            <p>
              6.	本礼品一经兑换不接受退换，如有疑问，请致电<span>中信乐益通客服电话4000095558转3；</span>
            </p>
            <p>
              7.	以上说明及解释权归中信建投证券所有。
            </p>
          </div>
          <!--抽奖 的兑换后说明-->
          <div v-if="dataTypeId == 6">
            <p>
              1.  每次抽奖消耗2积分；
            </p>
            <p>
              2.  每位用户（以注册手机号为准）每天最多抽奖5次，次日可再参加；
            </p>
            <p>
              3.  用户中奖信息可在“积分记录”中查询；
            </p>
            <p>
              4.  如中奖，客服人员将在3个工作日内与您联系兑奖事宜；
            </p>
            <p>
              5.  本活动最终解释权归中信建投证券股份有限公司所有。
            </p>
          </div>
        </div>
      </div>
      <!--加载图标-->
      <loading v-model="showLoading"></loading>
    </scroller>
    <!--支付弹框-->
    <div class="pay_box" v-show="show">
      <p class="retainbb" v-if="integralState">是否兑换</p>
      <p class="retainbb" v-if="!integralState">您的积分不足 去赚积分 ></p>
      <b>物品</b>
      <em>{{dataInfo.name2}}</em>
      <div>
        <img src="./money_icon.png" alt=""/>
        <span>{{dataInfo.mallIntegralPrice}}</span>
      </div>
    </div>
    <!--遮罩层-->
    <div class="mask" v-show="show"></div>
    <footer v-show="!show">
      <img src="./money_icon.png" alt="" v-if="isSellOut != 1"/>
      <img src="./money_icon_over.png" alt="" v-if="isSellOut == 1"/>
      <span>{{dataInfo.mallIntegralPrice}}</span>
      <a class="exchange" href="javascript:;" :class="{selected:isSellOut == 1}" @click="exchange">{{isSellOut == 1?'已售罄':'兑换'}}</a>
    </footer>
    <footer v-show="show">
      <a v-if="integralState" class="cancel" href="javascript:;" @click="close">取消</a>
      <router-link :to="{path:'rechargeState',query:{headerTitle:headerName,productId:productId,mallIntegralPrice:dataInfo.mallIntegralPrice,productName:dataInfo.name2,dataTypeId:dataTypeId,toMobile:phone}}" v-if="integralState&&dataTypeId != 6" class="determine">确定</router-link>
      <!--抽奖的兑换状态-->
      <router-link :to="{path:'scratch',query:{headerTitle:headerName,productId:productId,shopName:dataInfo.name2,mallIntegralPrice:dataInfo.mallIntegralPrice,dataTypeId:dataTypeId}}" v-if="integralState&&dataTypeId == 6" class="determine">确定</router-link>
      <!--积分不足的时候显示确定按钮-->
      <a class="determine" v-if="!integralState" href="javascript:;" @click="close">确定</a>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  // 引用公用头部
  import header from '../common/header';
  import {Swiper,Scroller,Loading} from 'vux';
    export default {
        data: function () {
            return {
              // 获取头名称
              headerName:this.$route.query.headerTitle,
              // 获取商品类型id
              dataTypeId:this.$route.query.dataTypeId,
              // 获取商品id
              productId:this.$route.query.productId,
              // 获取商品售罄、未售罄状态
              isSellOut:this.$route.query.isSellOut,
              // 遮罩层、支付弹框显示或隐藏
              show:false,
              // 积分余额充足\不足状态
              integralState:false,
              // 商品信息
              dataInfo:'',
              // 服务商
              serviceProvider:'',
              // 个人信息
              user:'',
              // 个人积分余额
              validScore:0,
              // 输入手机号
              phone:'',
              // 输入号码提示的状态
              cueState:0,
              // 提示信息
              cueText:'您输入的手机号不能为空！',
              // 点击兑换时的状态
              clickState:0,
              // 加载图标显示\隐藏
              showLoading:true
            };
        },
        components: {
          // 公用头部
          myHeader: header,
          // 滚动
          Scroller:Scroller,
          // 加载图标
          Loading:Loading
        },
        computed:{

        },
        methods:{
          // 更新滚动条方法
          updateScroll:function(){
//        console.log(1);
            this.$refs.mode.reset();
          },
          // 处理图片路径
          imgUrl:function(url){
            if(url != undefined){
              return projectUrl + url;
            }
          },
          // 键盘输入的时候执行检测手机号的方法
          phoneCheck:function(){
            // 验证手机格式
            var isChinaMobile = /^134[0-8]\d{7}$|^(13[5-9]|147|15[0-27-9]|178|18[2-478])\d{8}$/; // 中国移动
            var isChinaUnion = /^(13[0-2]|145|15[56]|176|18[56])\d{8}$/; // 中国联通
            var isChinaTelcom = /^(133|153|177|18[019])\d{8}$/; // 中国电信
            // 将数字转化为字符串
            this.phone = this.phone.toString();
            if(this.phone.length > 0){
              // 判断是否是正确的手机号
              if(isChinaMobile.test(this.phone)||isChinaUnion.test(this.phone)||isChinaTelcom.test(this.phone)){
                // 隐藏提示信息
                this.cueState = 0;
                // 兑换按钮可点击
                this.clickState = 1;
              }else{
                // 显示提示信息
                this.cueState = 1;
                // 改变提示内容
                this.cueText = "您输入的手机号有误！";
                // 兑换按钮不可点击
                this.clickState = 0;
              }
            }else{
              // 显示提示信息
              this.cueState = 1;
              // 提示不能为空
              this.cueText = '您输入的手机号不能为空！';
              // 兑换按钮不可点击
              this.clickState = 0;
            }
          },
          // 获取焦点的时候清除手机号和相应的提示信息
          focusF:function(){
            // 将数字转化为字符串
            this.phone = this.phone.toString();
            if(this.phone.length > 0){
              // 请空phone输入框
              this.phone = '';
              // 隐藏提示内容
              this.cueState = 0;
            }else{
              // 显示提示信息
              this.cueState = 1;
            }
          },
          // 当失去焦点的时候进行检测，如果正确隐藏提示信息
          blurF:function(){

          },
          // 点击兑换显示支付弹窗
          exchange:function(){
            // 将数字转化为字符串
            this.phone = this.phone.toString();
            // 如果商品未售罄弹出弹框,加载图标隐藏后
            if (this.isSellOut != 1 && this.showLoading == false) {
              // 如果输入的手机号正确可以点击兑换，否则显示提示信息
              if (this.clickState == 1) {
                // 显示弹框
                this.show = true;
                // 如果积分余额不足的话
                if (this.dataInfo.mallIntegralPrice < this.validScore) {
                  this.integralState = true;
                }
              } else if (this.phone.length == 0) {
                // 显示提示信息
                this.cueState = 1;
                // 提示不能为空
                this.cueText = '您输入的手机号不能为空！';
              }
            }
          },
          // 如果积分不足点击确定进行关闭
          close:function(){
            // 隐藏弹框和遮罩层
            this.show = false;
          }
        },
        created:function(){
          var that = this;
          // 获取个人相关信息
          // 请求用户个人信息
          jsonp('/user/getInfoUCL',
            function(data){
              console.log(data);
              if(data.resultCode == 200&&data.resultBody != 0){
                that.user = JSON.parse(data.resultBody);
                console.log(that.user);
                that.validScore = that.user.validScore;
              }else{
                console.log('用户个人基本信息接口问题' + data.resultCode)
              }
            }
          );
          console.log(that.$route.query.productId);
          console.log(that.$route.query.dataTypeId);
          // 通过首页传过来的商品id请求数据
          jsonp('/product/getListByIsShow',
            function (data) {
              if (data.resultCode == 200) {
                console.log(data);
                // 商品详细信息
                that.dataInfo = data.resultBody[0];
                // 服务商信息
                if(that.dataInfo.serviceProvider != null){
                  that.serviceProvider = that.dataInfo.serviceProvider;
                }
                // 显示内容，隐藏加载图标
                that.showLoading = false;
              } else {
                console.log('level行情数据接口问题' + data.resultCode);
              }
            },
            {
              productId: that.productId
            }
          )
        },
        mounted:function(){
          // 更新滚动条
          this.$nextTick(() => {
            this.$refs.mode.reset();
          })
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
  .shop_details{
    overflow: hidden;
    height:100%;
    font-family: PingFangTC-Regular;
    footer{
      position: fixed;
      left:0;
      bottom:0;
      z-index: 3;
      display:flex;
      width:100%;
      height:1rem;
      align-items: center;
      background:#fff;
      img{
        margin:0 0.1rem 0 0.3rem;
        width:0.26rem;
        height:0.26rem;
      }
      span{
        font-size:0.4rem;
        color:#666;
        font-family: PingFangTC-Medium;
      }
      a{
        height:1rem;
        line-height:1rem;
        text-align:center;
        font-size:0.32rem;
        color:#fff;
        font-family: PingFangTC-Medium;
        &.exchange{
           position:absolute;
           right:0;
           width:2.4rem;
           background:#FF5900;
          &.selected{
            background:#666;
           }
         }
        &.cancel,&.determine{
          flex:1;
        }
        &.cancel{
          background:#666;
         }
        &.determine{
          background:#FF5900;
         }
      }
    }
    .pay_box{
      position:fixed;
      bottom:0.92rem;
      left:0;
      z-index:3;
      width:100%;
      background:#fff;
      p{
        height:1.06rem;
        line-height:1.06rem;
        text-align: center;
        font-size: 0.32rem;
        color: #FF5900;
        font-family: PingFangTC-Medium;
      }
      b{
        display: block;
        margin:0.27rem 0 0.2rem;
        height:0.36rem;
        line-height:0.36rem;
        text-align: center;
        font-size: 0.3rem;
        color: #858C9E;
        font-family: PingFangTC-Medium;
      }
      em{
        display: block;
        height:0.36rem;
        line-height:0.36rem;
        text-align: center;
        font-size:0.3rem;
        color:#333;
      }
      div{
        display: flex;
        margin:0.5rem 0 0.6rem;
        align-items: center;
        justify-content: center;
        height:0.4rem;
        img{
          margin-right:0.1rem;
          width:0.26rem;
          height:0.26rem;
        }
        span{
          font-size:0.4rem;
          color:#666;
          font-family: PingFangTC-Medium;
        }
      }
    }
    .mask{
      position:fixed;
      top:0;
      left:0;
      z-index:2;
      width:100%;
      height:100%;
      background: rgba(0,0,0,0.50);
    }
    #wrapper{
      .banner{
        display: block;
        width:100%;
        height:3rem;
      }
      h4,h5,h6{
        padding:0.38rem 0 0 0.3rem;
        height:0.36rem;
        line-height:0.36rem;
        background:#fff;
        font-size: 0.3rem;
        color: #333;
        font-family: PingFangTC-Medium;
      }
      .describe{
        padding:0.2rem 0 0.2rem 0.3rem;
        background:#fff;
        font-size:0.32rem;
        color:#333;
      }
      h5,h6{
        padding-top:0.19rem;
      }
      .input_box{
        padding:0.2rem 0 0 0.3rem;
        background:#fff;
        div{
          width:6.9rem;
          height:0.68rem;
          &:after{
            background:#666;
           }
          input{
            width:3.8rem;
            height:0.5rem;
            line-height:0.5rem;
            font-size:0.48rem;
            color:#333;
            font-family: PingFangTC-Medium;
            &::-webkit-input-placeholder {
              font-size:0.4rem;
              /*font-family:"PingFang-SC-Medium";*/
              color: #8b8b8b;
             }
            &:-moz-placeholder {/* Firefox 18- */
              font-size:0.4rem;
              color: #8b8b8b;
             }

            &::-moz-placeholder{/* Firefox 19+ */
              font-size:0.4rem;
              color: #8b8b8b;
             }

            &:-ms-input-placeholder {
              font-size:0.4rem;
              color: #8b8b8b;
             }
          }
        }
      }
      .prompt{
        p{
          padding:0.19rem 0.3rem 0.4rem;
          width:6.9rem;
          line-height:0.42rem;
          background:#fff;
          font-size:0.3rem;
          color: #FF3D00;
        }
      }
      .explain{
        padding:0.19rem 0.3rem 0.4rem 0.3rem;
        line-height:0.42rem;
        background:#fff;
        word-wrap:break-word;
        font-size:0.3rem;
        color:#333;
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
