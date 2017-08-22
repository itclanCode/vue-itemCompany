<template>
	<div class="all_box detail">
		<div id="wrapper" v-show="useIntegral">
			<div id="scroller">
				<div class="many">
					<!--轮播-->
          <div class="container">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <img class="swiper-slide" v-for="banner in banners" :src="checkImg(banner.imagePath)" alt=""/>
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>
					<!--轮播结束-->
					<section>
						<ul class="seTop">
							<li class="retainbb">
								<div class="manTop">
									<span>
										<img src="./gold_icon@2x.png"/>
										<b>{{goodDetails.mallIntegralPrice}}</b>
										<i>￥{{goodDetails.marketPrice}}</i>
									</span>

									<span>已售{{goodDetails.virtualSales}}</span>

								</div>
							</li>
							<li class="retainbb">
								<div class="manTwo">
									<h6>{{goodDetails.name1}}</h6>
									<p v-html="goodDetails.name2"></p>
								</div>
							</li>
							<li>
								<div class="manLast"><i></i>温馨提示：本品不支持退换货。</div>
							</li>
						</ul>
            <h5 class="retainbb">购买须知</h5>
						<ul class="seFoo explain" v-html="notice"></ul>
					</section>
				</div>
			</div>
      <div id="footer">
        <ul>
          <!--<li>-->
          <li @tap="changePay">
            <!--<router-link to="/order">-->
            <b>立即购买</b>
            <!--</router-link>-->
          </li>
        </ul>
      </div>
		</div>
    <img class="center_icon" src="./center.gif" alt="" v-show="centerShow"/>
	</div>
</template>
<script type="text/ecmascript-6">
  export default {
    data: function () {
      return {
        // 轮播图
        banner: [],
        // 全部显示或隐藏
        useIntegral:false,
        // 中间转场标志
        centerShow:true,
        // 数据
        goodDetails:[],
        // 商品id
        detailId:'',
        // 购买须知
        notice:[]
      }
    },
    methods: {
      // 检查图片路径
      checkImg:function(img){
        return img.indexOf('http') == -1 ? '/loyaltyApp' + img : img;
      },
      // 关闭初始加载，显示内容
      assignment:function() {
        // 转场标志隐藏
        this.centerShow = false;
        // 全部显示
        this.useIntegral = true;
      },
      // 创建滚动条
      pull:function() {
        var myScroll = new IScroll('#wrapper', {
          // 显示横向滚动条
          scrollX: true,
          // 上下左右滚动都生效的时候使用
          freeScroll: true,
          // 启用tap事件
          tap: true,
          // 取消屏蔽默认事件
          preventDefault: false,
          //允许滑轮滚动
          mouseWheel: true
        });
        console.log(myScroll);
        document.addEventListener('touchmove', function (e) {
          e.preventDefault();
        }, false);
        setTimeout(function() {
          myScroll.refresh();
        },200);
      },
      // 点击支付按钮
      changePay: function () {
        if (isAndroid) {
          // 调用android方法，获取支付页面并且把商品信息传给android
//          window.alert(this.detailId);
          window.android.payment(this.goodDetails.name1, this.goodDetails.mallIntegralPrice,this.detailId);
        }
        if (isiOS) {
          // 调用ios方法，获取支付页面并且把商品信息传给ios
          window.nextAction(this.goodDetails.name1, this.goodDetails.mallIntegralPrice,this.detailId);
        }
      }
    },
    created: function () {
      var that = this;
      // 判断商品id来源，首页爆款来是通过原生方法获取id，花积分首页通过链接获取id
      if(this.$route.query.goodId !== undefined){
        this.detailId = this.$route.query.goodId;
//        window.alert(this.detailId);
      }else{
        if(isAndroid){
          this.detailId = window.android.setID();
//          window.alert(this.detailId);
        }
//        if(isiOS){
//          window.alert(111);
//          window.alert(window.sendId());
//          this.detailId = window.sendId();
//        }
      }
      // 请求商品轮播图
      this.$http.post('/loyaltyApp/productPicture/getListByProductId',{
        productId: this.detailId
      },{emulateJSON:true}).then((response) => {
        response = response.body; // 通过response.josn来格式化json数据,这个返回的是promise对象
        console.log(response);
          if (response.resultCode == 200) {
            this.banners = response.resultBody;
          }else{
            window.alert(response.resultCode);
          }
      })
      // 请求商品类型接口
      this.$http.post('/loyaltyApp/product/getBasicsInfo',{
        productId: this.detailId
        // 如果emulateJSON 是true则向后台传的是字符串形式的参数，如果为false的话则向后台传的是对象形式的参数
      },{emulateJSON:true}).then((response) => {
        // 通过response.josn来格式化json数据,这个返回的是promise对象
        response = response.body;
        console.log(response);
        if (response.resultCode == 200) {
          // 填充数据
          this.goodDetails = response.resultBody;
//          1s显示数据
          setTimeout(function() {
            that.assignment();
            that.pull();
          },0.8*1000);
          setTimeout(function() {
            var mySwiper = new Swiper ('.swiper-container', {
              // 横向滚动
              direction: 'horizontal',
              // 使轮播图循环滚动
//            loop: true,
              // 自动切换的时间间隔
//          autoplay:3000,
              // 滑动的速度
              speed:200,
              // 如果需要分页器
              pagination: '.swiper-pagination',
              // 用户在操作完swiper之后自动切换不会停止，每次都会重新启动autoplay
              autoplayDisableOnInteraction: false,
              //修改swiper自己或子元素时，自动初始化swiper
              observer:true,
              //修改swiper的父元素时，自动初始化swiper
              observeParents:true
            });
            console.log(mySwiper);
          },1000)
        }else{
          window.alert(response.resultCode);
        }
        // 返回promise对象，然后进行下一个请求（有先后顺序的ajax请求）
        return this.$http.post('/loyaltyApp/product/getDescriptionInfo',{
          productId: this.detailId
        },{emulateJSON:true}).then((response) =>{
          response = response.body;
          console.log(response);
          if(response.resultCode == 200){
            // 商品购买须知
            this.notice = response.resultBody.description;
          }else{
            window.alert(response.resultCode);
          }
        })
      });
    },
    mounted: function () {},
    updated: function () {}
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .all_box{
  &.detail{
    display:flex;
    flex-direction:column;
    height: 100%;
    width: 100%;
  b{
    font-weight:normal;
  }
  #wrapper{
    margin-bottom:0.93rem;
    width: 100% ;
    flex: 1;
    display:flex;
  #scroller{
    width: 100%;
  .many{
    width: 100%;
  .swiper-slide{
    width:100%;
    height:7.5rem !important;
  }
  }
  .container{
  .swiper-pagination-bullets{
    left:2.48rem;
    bottom:.5rem;
    z-index: 10;
  }
  }
  section{
    width: 100% !important;
    display:flex;
    flex-direction:column;
  .seTop{
    overflow: hidden;
    min-height: 3.67rem;
    background-color: #fff;
    margin-bottom: .2rem;
    padding-left: .32rem;
  li{
  >div{
     width: 100%;
   }

  }
  li:first-child{
  .manTop{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:stretch;
    padding: .25rem 0 .25rem 0;
    height: auto;
  span:first-child{
    display:flex;
    align-items:baseline;
  >img{
     height: .2rem;
     width: .2rem;
   }
  b{
    color: #d7000f;
    font-size: .4rem;
    font-family: "Arial-BoldMT";
    font-weight: 900;
    padding: 0 .24rem 0 .08rem;
  }
  i{
    text-decoration:line-through;
    color: #b4b4b4;
    font-size: .24rem;
    font-family: "HelveticaNeueLPro-Roman";
  }
  }
  span:last-child{
    display:flex;
    align-items:center;
    padding-right:0.32rem;
    color: #b4b4b4;
    font-size: .24rem;
    font-family: "PingFang-SC-Medium";
  }
  }
  }
  li:nth-child(2){
  .manTwo{
    display:flex;
    flex-direction:column;
    padding: .32rem 0 .32rem;
  h6{
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    width:50%;
    height:0.36rem;
    line-height:0.36rem;
    font-size: .34rem;
    color: #242424;
    font-family:"PingFang-SC-Bold";
    font-weight: 900;
  }
  p{
    padding:0.12rem 0.32rem 0 0;
    font-size: .26rem;
    color: #787878;
    overflow : hidden;
    font-family:"PingFang-SC-Medium";
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height:0.76rem;
    line-height:0.38rem;
  }
  }
  }
  li:nth-child(3){
    &:after{
      border:0;
     }
  .manLast{
    display:flex;
    align-items:center;
    font-size:.26rem;
    color:#787878;
    padding: .32rem 0;
  i{
    height: .24rem;
    width: .24rem;
    background: url('./tishi_icon@2x.png') center top no-repeat;
    background-size:cover;
    background-position:center;
    backgrond-attachment:fixed;
    margin-right: .08rem;
  }
  }
  }
  }
  h5{
    display:flex;
    justify-content:center;
    padding: .28rem 0;
    color: #242424;
    background:#fff;
    font-size: .34rem;
    font-family:"PingFang-SC-Bold";
    font-weight: 900;
  }
  .seFoo{
    width: 100%;
    background-color: #fff;
  }
  }
  }
  }
  #footer{
    width: 100%;
    z-index: 100;
    background-color: #D7000F;
  li{
    width: 100%;
  b{
    display:flex;
    justify-content:center;
    padding: .32rem;
    width: 100%;
    color: #fff;
    font-size: .34rem;
    font-family:"PingFang-SC-Bold";
    font-weight: 900;
  }
  }
  }
  }
  }
</style>
