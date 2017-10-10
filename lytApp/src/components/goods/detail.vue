<template>
	<div class="all_detail">
		<div id="wrapper" v-show="useIntegral">
			<div id="scroller">
				<div class="many">
					<!--轮播-->
					<div class="container">
						<div class="swiper-container">
							<div class="swiper-wrapper">
								<img class="swiper-slide" v-for="banner in banners" :src="checkImg(banner.imagePath)" alt="" />
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
										<!--<img src="./gold_icon@2x.png"/>-->
										<b>{{goodDetails.mallIntegralPrice}}</b>
										<!--<i>￥{{goodDetails.marketPrice}}</i>-->
                    <i>积分</i>
									</span>

									<span>已售{{goodDetails.virtualSales}}</span>

								</div>
							</li>
							<li class="retainbb">
								<div class="manTwo">
									<h6>{{goodDetails.name1}}</h6>
									<!--<p v-html="goodDetails.name2"></p>-->
								</div>
							</li>
							<li>
								<div class="manLast">
									<img src="./tishi_icon@2x.png" alt="" />
									<p>温馨提示：本品不支持退换货。</p>
								</div>
							</li>
						</ul>
						<h5>购买须知</h5>
						<ul class="seFoo explain">
							<div>{{seFooText}}</div>
							<img v-for="seFooImg in seFooImgs" :src="checkImg(seFooImg)" alt="" />
						</ul>
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
		<div class="miss" v-show="miss">
			<img src="./baoqian.png" alt="" />
			<p>亲，目前没有此商品～</p>
		</div>
		<img class="center_icon" src="./center.gif" alt="" v-show="centerShow" />
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		data: function() {
			return {
				// 轮播图
				banners: '',
				// 全部显示或隐藏
				useIntegral: false,
				// 中间转场标志
				centerShow: false,
				// 缺醒页
				miss: false,
				// 数据
				goodDetails: '',
				// 商品id
				detailId: '',
				// 购买须知
				notice: '',
				// 购买须知文字
				seFooText: '',
				// 购买须知图片
				seFooImgs: [],
				// 没有此商品
				nothing: 0
			}
		},
		methods: {
			// 检查图片路径
			checkImg: function(img) {
				if(img != null) {
					return img.indexOf('http') == -1 ? projectUrl + img : img;
				}
			},
			// 关闭初始加载，显示内容
			assignment: function() {
				// 转场标志隐藏
				this.centerShow = false;
				// 调用android方法隐藏过渡动画
				//        window.android.hide();
				// 全部显示
				this.useIntegral = true;
			},
			// 创建滚动条
			pull: function() {
				//        var intervalTime = setInterval(function(){
				//          var seFooH = $('.seFoo').height();
				//          if(seFooH > 0){
				//            $('.seFoo').height(seFooH);
				//            setTimeout(function(){
				//              clearInterval(intervalTime);
				//              var myScroll = new IScroll('#wrapper', {
				//                // 显示横向滚动条
				////          scrollX: true,
				//                // 上下左右滚动都生效的时候使用
				//                freeScroll: true,
				//                // 启用tap事件
				//                tap: true,
				//                // 取消屏蔽默认事件
				//                preventDefault: false,
				////          scrollbars: false,//有滚动条
				//                mouseWheel: true,//允许滑轮滚动
				////	      fadeScrollbars: true,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果
				////        bounce:true,//边界反弹
				////	      interactiveScrollbars:true,//滚动条可以拖动
				//                shrinkScrollbars: 'clip',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.
				////        click: true ,// 允许点击事件
				////        keyBindings:true,//允许使用按键控制
				////        momentum:true// 允许有惯性滑动
				//              });
				//              console.log(myScroll);
				//              document.addEventListener('touchmove', function (e) {
				//                e.preventDefault();
				//              }, false);
				//            },100)
				//          }
				//        },10)
				var myScroll = new IScroll('#wrapper', {
					// 显示横向滚动条
					//          scrollX: true,
					// 上下左右滚动都生效的时候使用
					freeScroll: true,
					// 启用tap事件
					tap: true,
					// 取消屏蔽默认事件
					preventDefault: false,
					//          scrollbars: false,//有滚动条
					mouseWheel: true, //允许滑轮滚动
					//	      fadeScrollbars: true,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果
					//        bounce:true,//边界反弹
					//	      interactiveScrollbars:true,//滚动条可以拖动
					shrinkScrollbars: 'clip', // 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.
					//        click: true ,// 允许点击事件
					//        keyBindings:true,//允许使用按键控制
					//        momentum:true// 允许有惯性滑动
				});
				console.log(myScroll);
				document.addEventListener('touchmove', function(e) {
					e.preventDefault();
				}, false);
				setTimeout(function() {
					myScroll.refresh();
				}, 100);
				myScroll.on('scrollEnd', function() {
					myScroll.refresh();
				});
			},
			// 点击支付按钮
			changePay: function() {
				if(isAndroid) {
					// 调用android方法，获取支付页面并且把商品信息传给android
					//          window.alert(this.detailId);
					window.android.payment(this.goodDetails.name1, this.goodDetails.mallIntegralPrice, this.detailId);
				}
				if(isiOS) {
					// 调用ios方法，获取支付页面并且把商品信息传给ios
					window.nextAction(this.goodDetails.name1, this.goodDetails.mallIntegralPrice, this.detailId);
				}
			}
		},
		created: function() {
			//刚上来如果是从花积分首页调过来的显示过渡图标
			if(this.$route.query.show == 1) {
				this.centerShow = true;
			}
			var that = this;
			// 判断商品id来源，首页爆款来是通过原生方法获取id，花积分首页通过链接获取id
			if(this.$route.query.goodId !== undefined) {
				this.detailId = this.$route.query.goodId;
				//        window.alert(this.detailId);
			} else {
				if(isAndroid) {
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
			this.$http.post(projectUrl + '/productPicture/getListByProductId', {
				productId: this.detailId
			}, { emulateJSON: true }).then((response) => {
				response = response.body; // 通过response.josn来格式化json数据,这个返回的是promise对象
				console.log(response);
				if(response.resultCode == 200) {
					if(response.resultBody != null) {
						this.banners = response.resultBody;
					}
				} else {
					window.alert(response.resultCode);
				}
				return this.$http.post(projectUrl + '/product/getBasicsInfo', {
					productId: this.detailId
					// 如果emulateJSON 是true则向后台传的是字符串形式的参数，如果为false的话则向后台传的是对象形式的参数
				}, { emulateJSON: true })
			}).then((response) => { // 请求商品类型接口
				// 通过response.josn来格式化json数据,这个返回的是promise对象
				response = response.body;
				console.log(response);
				if(response.resultCode == 200) {
					if(response.resultBody == null) {
						// 如果数据为null，做个标记没有此商品
						that.nothing = 1;
					} else {
						// 填充数据
						this.goodDetails = response.resultBody;
					}
				} else {
					window.alert(response.resultCode);
				}
				// 返回promise对象，然后进行下一个请求（有先后顺序的ajax请求）
				return this.$http.post(projectUrl + '/product/getProductNotice', {
					productId: this.detailId
				}, { emulateJSON: true })
			}).then((response) => {
				response = response.body;
				console.log(response);
				if(response.resultCode == 200) {
					if(response.resultBody != null) {
						// 商品购买须知(详情)
						this.seFooText = response.resultBody.description;
						this.seFooImgs = response.resultBody.imagePath;
					}
				} else {
					window.alert(response.resultCode);
				}
			}).then(() => {
				// 判断有没有此商品，如果没有提示缺醒页
				if(that.nothing == 1) {
					setTimeout(function() {
						that.centerShow = false;
						that.useIntegral = false;
						that.miss = true;
					}, 0.4 * 1000);
				} else {
					setTimeout(function() {
						// 当数据加载完成后显示页面隐藏过渡动画
						// 从花积分首页进入商品详情页
						if(that.$route.query.show == 1) {
							that.assignment();
						} else {
							// 如果是从首页进来的，让他请求到轮播图再显示
							that.useIntegral = true;
						}
						that.pull();
					}, 0.4 * 1000);
				}
				setTimeout(function() {
					var mySwiper = new Swiper('.swiper-container', {
						// 横向滚动
						direction: 'horizontal',
						// 使轮播图循环滚动
						//            loop: true,
						// 自动切换的时间间隔
						//          autoplay:3000,
						// 滑动的速度
						speed: 200,
						// 如果需要分页器
						pagination: '.swiper-pagination',
						// 用户在操作完swiper之后自动切换不会停止，每次都会重新启动autoplay
						autoplayDisableOnInteraction: false,
						//修改swiper自己或子元素时，自动初始化swiper
						observer: true,
						//修改swiper的父元素时，自动初始化swiper
						observeParents: true
					});
					console.log(mySwiper);
				}, 0.6 * 1000)
			});
		},
		mounted: function() {},
		updated: function() {}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.all_box {
		&.detail {
			display: flex;
			flex-direction: column;
			height: 100%;
			width: 100%;
			b {
				font-weight: normal;
			}
			#wrapper {
				margin-bottom: 0.93rem;
				width: 100%;
				flex: 1;
				display: flex;
				#scroller {
					width: 100%;
					min-height: 100%;
					.many {
						width: 100%;
						.swiper-slide {
							width: 100%;
							height: 7.5rem !important;
						}
						.swiper-pagination-bullet-active {
							background: #b4b4b4;
						}
					}
					.container {
						.swiper-pagination-bullets {
							left: 2.48rem;
							bottom: .5rem;
							z-index: 10;
						}
					}
					section {
						width: 100% !important;
						display: flex;
						flex-direction: column;
						.seTop {
							overflow: hidden;
							background-color: #fff;
							margin-bottom: .2rem;
							padding-left: .32rem;
							li {
								>div {
									width: 100%;
								}
							}
							li:first-child {
								.manTop {
									display: flex;
									flex-direction: row;
									justify-content: space-between;
									align-items: stretch;
									padding: .25rem 0 .25rem 0;
									height: auto;
									span:first-child {
										display: flex;
										align-items: baseline;
										>img {
											height: .2rem;
											width: .2rem;
										}
										b {
											color: #d7000f;
											font-size: .4rem;
											/*font-family: "Arial-BoldMT";*/
											/*font-weight: 900;*/
											padding: 0 0.08rem 0 0.08rem;
										}
										i {
											/*text-decoration:line-through;*/
											color: #999;
											font-size: .22rem;
											/*font-family: "HelveticaNeueLPro-Roman";*/
										}
									}
									span:last-child {
										display: flex;
										align-items: center;
										padding-right: 0.32rem;
										color: #999;
										font-size: .22rem;
										/*font-family: "PingFang-SC-Medium";*/
									}
								}
							}
							li:nth-child(2) {
								.manTwo {
									display: flex;
									flex-direction: column;
									padding: .32rem 0 .32rem;
									h6 {
										overflow: hidden;
										text-overflow: ellipsis;
										display: -webkit-box;
										-webkit-line-clamp: 2;
										-webkit-box-orient: vertical;
										width: 95%;
										/*height:0.86rem;*/
										line-height: 0.43rem;
										font-size: .32rem;
										color: #242424;
										/*font-family:"PingFang-SC-Bold";*/
										font-weight: 900;
									}
									p {
										padding: 0.12rem 0.32rem 0 0;
										font-size: .26rem;
										color: #787878;
										overflow: hidden;
										/*font-family:"PingFang-SC-Medium";*/
										text-overflow: ellipsis;
										display: -webkit-box;
										-webkit-line-clamp: 2;
										-webkit-box-orient: vertical;
										height: 0.76rem;
										line-height: 0.38rem;
									}
								}
							}
							li:nth-child(3) {
								&:after {
									border: 0;
								}
								.manLast {
									display: flex;
									align-items: center;
									height: .28rem;
									padding: .32rem 0;
									img {
										height: .24rem;
										width: .24rem;
										/*background: url('./tishi_icon@2x.png') center 50% no-repeat;*/
										/*background-size:cover;*/
										margin-right: .08rem;
									}
									p {
										margin-top: 0.02rem;
										font-size: .26rem;
										color: #787878;
									}
								}
							}
						}
						h5 {
							display: flex;
							justify-content: center;
							padding: .28rem 0;
							color: #242424;
							background: #fff;
							font-size: .34rem;
							/*font-family:"PingFang-SC-Bold";*/
							font-weight: 900;
						}
						.seFoo {
							width: 100%;
							background-color: #fff;
							&.explain {
								img {
									width: 100%;
								}
							}
							div {
								padding: 0 0.32rem;
								word-break: break-word;
								line-height: 0.46rem;
								font-size: 0.28rem;
								color: #787878;
								text-indent: 0.6rem;
							}
						}
					}
				}
			}
			#footer {
				width: 100%;
				z-index: 100;
				background-color: #D7000F;
				li {
					width: 100%;
					b {
						display: flex;
						justify-content: center;
						padding: .32rem 0;
						width: 100%;
						color: #fff;
						font-size: .34rem;
						/*font-family:"PingFang-SC-Bold";*/
						font-weight: 900;
					}
				}
			}
		}
	}
</style>