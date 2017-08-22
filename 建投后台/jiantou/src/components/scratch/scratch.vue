<template lang="html">
  <div class="index_home">
    <my-header :headerTitle="headerName">
      <router-link :to="{path:'record'}">积分记录</router-link>
    </my-header>
    <scroller lock-x ref="mode" height="-42%" style="background: #F2F4F8;">
      <div>
        <div id="wrapper">
          <div class="box">
            <div class="top_tetl">试试你的手气吧</div>

            <div class="ggl" id="top">
              <img class="gglImg" src="static/images/img/winning@2x.png" alt=""/>

              <div class="info" id="prize">
                <div class="notWin">
                  <span>很遗憾 未中奖</span>
                  <span>祝下次好运</span>
                </div>
                <div class="Win">
                  <span>恭喜你 中奖了</span>
                </div>
              </div>
              <canvas id="c1" class="canvas"></canvas>
            </div>
            <div class="describe_box">
              <div v-show="isTrue == 1" :class="{show_animate:isTrue == 1 && clickShow}" class="describe">
                <p>已中奖品</p>

                <p>{{shopName}}</p>
              </div>
              <div class="btn" :class="{show_animate:clickShow}" @click="btnClick">{{clickText}}</div>
            </div>
            <div class="explain">
              <div class="text">
                <i><img src="static/images/img/11.png" alt=""></i>

                <p class="textOne">1. 获得实物奖励的用户，请填写可联系的手机号，客服人员将在3个工作日内与您联系兑奖事宜。</p>

                <p class="textTwo">2. 在此期间请您保持手机畅通，如有疑问，请致电<span>中信乐益通客服电话4000095558转3</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script type="TEXT/ECMASCRIPT-6">
  // 请求公用的头部
  import header from '../common/header';
  import {Scroller} from 'vux';
  export default {
    data: function () {
      return {
        // 获取头名称
        headerName: this.$route.query.headerTitle,
        // 获取商品id
        productId: this.$route.query.productId,
        // 获取商品名称
        shopName: this.$route.query.shopName,
        // 获取商品价格
        mallIntegralPrice: this.$route.query.mallIntegralPrice,
        // 中奖状态
        isTrue: 0,
        // 中奖纪录id
        winningLogId: '',
        // 按钮显示隐藏
        clickShow: false,
        // 按钮的点击状态
        clickState: false,
        // 按钮的显示信息
        clickText: '确定'
      };
    },
    components: {
      myHeader: header,
      //公共处理滚动条
      Scroller: Scroller
    },
    methods: {
      // 获取抽奖数据
      scratchData: function () {
        var that = this;
        console.log(that.productId);
        console.log(that.mallIntegralPrice);
        // 获取中奖信息(当用户进行刮奖的时候再请求相应的数据，改变图片)
        jsonp('/product/luckDrawUCL',
          function (data) {
            console.log(data);
            if (data.resultCode == 200) {
              console.log(data.resultBody);
              // 如果获取内容不为空就是中奖了
              if (data.resultBody != null) {
                that.isTrue = 1;
                // 点击按钮信息改变
                that.clickText = '填写兑换手机号';
                // 设置中奖纪录id
                that.winningLogId = data.resultBody;
                console.log(that.isTrue)
              } else {
                that.isTrue = 0;
                console.log(that.isTrue)
              }
              // 初始化所有数据并且随机产生奖品
              that.initialize();
            }
          },
          {
            // 商品id
            id: that.productId,
            // 商品当前价格
            productPrice: that.mallIntegralPrice,
          }
        )
      },
      // 当用户进行刮奖的时候再请求相应的数据，改变图片
      initialize: function () {
        var that = this;
        console.log(this.isTrue);
        if (this.isTrue == 1) {
          console.log('中奖');
          $(".gglImg").attr('src', 'static/images/img/winning@2x.png');
          $(".Win").css({"display": "block"})
        } else {
          console.log('未中奖');
          $(".gglImg").attr('src', 'static/images/img/notWinning@2x.png');
          $(".notWin").css({"display": "block"})
        }
      },
      // 点击按钮事件
      btnClick: function () {
        // 判断按钮是否可以点击
        if (this.clickState) {
          if (this.isTrue == 1) {
            this.$router.push({
              name: 'validatePhone',
              query: {
                // 中奖纪录id
                winningLogId: this.winningLogId,
                // 商品名称
                shopName:this.shopName
              }
            });
          } else if (this.isTrue == 0) {
            this.$router.push('/');
          }
        }
      }
    },
    created:function() {

    },
    mounted: function () {
      // 更新滚动条
      this.$nextTick(() => {
        this.$refs.mode.reset();
      });
      var that = this;
      // 控制刮卡次数
      var t = 1;
      var c1;       //画布
      var ctx;      //画笔
      var ismousedown;  //标志用户鼠标按下标识变为true，鼠标抬起标识变为false
      var isOk = 0;     //标志用户是否已经刮开了一半以上
      var fontem = parseInt(window.getComputedStyle(document.documentElement, null)["font-size"]);//这是为了不同分辨率上配合@media自动调节刮的宽度
      var img = new Image();
      img.src = 'static/images/img/coat.png';
      // 当图片加载完成，进行初始化
      img.onload = function(){
        //初始化
        initCanvas();
      };
      // canvas 标签
      c1 = document.getElementById("c1");

      //这里很关键，canvas自带两个属性width、height,我理解为画布的分辨率，跟style中的width、height意义不同。
      //最好设置成跟画布在页面中的实际大小一样
      //不然canvas中的坐标跟鼠标的坐标无法匹配
      c1.width = c1.clientWidth;
      c1.height = c1.clientHeight;
      // 创建一个在画布上绘图的环境
      ctx = c1.getContext("2d");

      //PC端的处理
      c1.addEventListener("mousemove", eventMove, false);
      c1.addEventListener("mousedown", eventDown, false);
      c1.addEventListener("mouseup", eventUp, false);

      //移动端的处理
      c1.addEventListener('touchstart', eventDown, false);
      c1.addEventListener('touchend', eventUp, false);
      c1.addEventListener('touchmove', eventMove, false);



      //初始化画布，画灰色的矩形铺满
      function initCanvas() {
        //网上的做法是给canvas设置一张背景图片，我这里的做法是直接在canvas下面另外放了个div。
        // 设置或返回如何将一个源图像（新的）绘制到目标图像（已有）上
        ctx.globalCompositeOperation = "source-over";
        // 在canvas上放一张图片（图片地址，水平方向位置，垂直方向位置）
        ctx.drawImage(img,-10,0);
        // 使用canvas绘制文字
        ctx.font = ".4rem/1.5 Tahoma,Microsoft YaHei,Apple LiGothic medium,Helvetica,Arial,PingFangSC-Regular";
        // 设置文本的位置
        ctx.textAlign = "center";
        // 绘制实心文字
        ctx.fillText("用力刮开涂层", c1.width / 2, 65);

        //把这个属性设为这个就可以做出圆形橡皮擦的效果
        //有些老的手机自带浏览器不支持destination-out,下面的代码中有修复的方法
        // 在源图像外显示目标图像，只有源图像外的目标图像会显示，源图像是透明的
        ctx.globalCompositeOperation = 'destination-out';
      }

      //鼠标按下 和 触摸开始
      function eventDown(e) {
        e.preventDefault();
        // 鼠标按下
        ismousedown = true;
      }

      //鼠标抬起 和 触摸结束
      function eventUp(e) {
        e.preventDefault();

        //复制画布上指定矩形的像素数据，通过putImageData()将图像数据放回画布
        var a = ctx.getImageData(0, 0, c1.width, c1.height);
        var j = 0;
        for (var i = 3; i < a.data.length; i += 4) {
          if (a.data[i] == 0)j++;
        }
        // 如果刮开区域大于一半且是第一次刮，请求相关数据
        if (j >= a.data.length / 32 && isOk == 0) {
          isOk = 1;
          //当被刮开的区域等于一半时，则可以获取数据，处理结果
          that.scratchData();
          // 显示展示内容
          that.clickShow = true;
          // 按钮变为可点击状态
          that.clickState = true;
        }
        // 鼠标抬起
        ismousedown = false;
      }

      //鼠标移动 和 触摸移动
      function eventMove(e) {
        e.preventDefault();
        // 当鼠标点下后
        if (ismousedown) {
          // 手机上触摸点的列表
          if (e.changedTouches) {
            e = e.changedTouches[e.changedTouches.length - 1];
          }
          // 获取显示中奖未中奖盒子的上偏移量
          var topY = document.getElementById("top").offsetTop;
//        console.log('this is topY===', topY);
          // canvas的左偏移量
          var oX = c1.offsetLeft + fontem / 2,
            // canvas的上偏移量+中奖未中奖盒子的上偏移量
            oY = c1.offsetTop + topY;
//        console.log('this is fontem===', fontem);
          var x = (e.clientX + document.body.scrollLeft || e.pageX) - oX || 0,
            y = (e.clientY + document.body.scrollTop || e.pageY) - oY || 0;

          //画360度的弧线，就是一个圆，因为设置了ctx.globalCompositeOperation = 'destination-out';
          //画出来是透明的
          // 在一个画布中开始子路径的一个新集合
          ctx.beginPath();
          // 圆中心坐标x,y,半径，起始角，结束角，true逆时针绘图，false顺时针绘图
          ctx.arc(x, y, fontem / 2, 0, Math.PI * 2, true);

          //下面3行代码是为了修复部分手机浏览器不支持destination-out
          //我也不是很清楚这样做的原理是什么
          c1.style.display = 'none';
          c1.offsetHeight;
          c1.style.display = 'inherit';
          // 填充当前图像
          ctx.fill();
        }

        // 如果是刮完一半了，就把canvas的宽度设置为0
        if (isOk) {
          $("#c1").css({"width": "0"})
        }
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "scratch.scss";
</style>
