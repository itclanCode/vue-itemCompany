<template lang="html">
  <div class="all_box order">
    <!--<div id="header">头部</div>-->
    <div id="wrapper" v-show="useIntegral">
      <div id="scroller">
        <div id="PullDown" class="scroller-pullDown hide">
          <div>
            <img src="./top.gif" />
            <!--<span id="pullDown-msg" class="pull-down-msg">下拉刷新</span>-->
          </div>
        </div>
        <ul class="order_list">
          <li v-for="(getListByUserIdCL,$index) in getListByUserIdCLS" :key="$index">
            <div class="detail_top retainbb">
              <img :src="path" v-lazy="checkImg(getListByUserIdCL.product == null?'':getListByUserIdCL.product.masterImg)"  onerror="javascript:this.src='./static/images/default.png';" alt=""/>
              <div class="detail_right">
                <h6>{{getListByUserIdCL.product == null?'错误情况':getListByUserIdCL.product.name1}}</h6>
                <p>订单编号：{{getListByUserIdCL.orderSn}}</p>
                <p>下单时间：{{format(getListByUserIdCL.createTime,'yyyy.MM.dd HH:mm:ss')}}</p>
                <em :class="{colorT:getListByUserIdCL.orderStateDescribe == '交易完成',colorF:getListByUserIdCL.orderStateDescribe =='交易失败'}">{{getListByUserIdCL.orderStateDescribe}}</em>
              </div>
            </div>
            <div class="detail_bottom">
              <p>手机号：{{getListByUserIdCL.inventedProductToMobile}}</p>
              <b>{{getListByUserIdCL.integralOrder}}</b>
              <span>使用积分：</span>
            </div>
          </li>
        </ul>
        <div id="PullUp" class="scroller-pullUp hide">
          <div>
            <img src="./bottom.gif" />
            <!--<span>加载更多</span>-->
          </div>
        </div>
      </div>
    </div>
    <div class="miss" v-show="miss">
      <img src="./baoqian.png" alt=""/>
      <p>亲，您还没有购买商品～</p>
      <p>请返回 <router-link to="/">花积分首页</router-link> 完成购买操作</p>
    </div>
    <img class="center_icon" src="./center.gif" alt="" v-show="centerShow"/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    // 数据
    data: function () {
      return {
        // 全部显示或隐藏
        useIntegral:true,
        // 中间转场标志
        centerShow:false,
        // 缺醒页
        miss:false,
        // 商品默认图片地址
        path:'./static/images/default.png',
        // 商品页码总数
        pageCount:1,
        // 请求的页码数
        page:1,
        // 请求数
        num:0,
        // 订单列表
        getListByUserIdCLS: [],
        //接收手机号和userid的数组
        userAry: [],
        // userId
        userId:'',
        // 滚动条Y轴坐标
        myScrollY:'',
        // 滚动条
        myScroll:{}
      };
    },
    methods:{
      // 格式化时间
      format: function (time, format) {
        var date = new Date(time);
        var dateCheck = function (i) {
          return (i < 10 ? '0' : '') + i;
        }
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
          switch (a) {
            case 'yyyy':
              return dateCheck(date.getFullYear());
              break;
            case 'MM':
              return dateCheck(date.getMonth() + 1);
              break;
            case 'dd':
              return dateCheck(date.getDate());
              break;
            case 'HH':
              return dateCheck(date.getHours());
              break;
            case 'mm':
              return dateCheck(date.getMinutes());
              break;
            case 'ss':
              return dateCheck(date.getSeconds());
              break;
          }
        })
      },
      // 关闭初始加载，如果有订单显示订单
      assignment: function () {
        this.centerShow = false;
        // 调用android方法隐藏过渡动画
//        window.android.hide();
        this.useIntegral = true;
      },
      // 检查图片路径，如果有正常图片显示正常图片，如果没有正常图片，就显示默认图片
      checkImg: function (img) {
        return img.indexOf('http') == -1 ? projectUrl + img : img;
      },
      //上拉下拉方法
      pull: function (listLength) {
        // 初始化body高度
        document.body.style.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) + 'px';

        var pullDown = document.querySelector("#PullDown"),
          pullUp = document.querySelector("#PullUp"),
          isPulled = false, // 拉动标记
          that = this;

        function getContents() {
          // 请求下一页页数
          that.page = that.page + 1;
          that.$http.post(projectUrl + '/orders/getListByUserId', {
            pageNum: that.page,
            userId: that.userId
          }, {emulateJSON: true}).then((response) => {
            response = response.body; // 通过response.josn来格式化json数据,这个返回的是promise对象
            if (response.resultCode == 200) {
              // 刷新完区域后然后隐藏上拉下拉框
              pullDown.style.display = "none";
              pullUp.style.display = "none";
              if (response.resultBody != '') {
                // 如果返回的内容不为空则更新一下sessionStroge中的值
                sessionStorage.setItem("orderPage", that.page);
              }
              that.getListByUserIdCLS = that.getListByUserIdCLS.concat(response.resultBody);
              // 要在这里刷新，因为这里是异步的，如果在外面刷新的话，就使得盒子的高度还是和没加载前一样
              setTimeout(function () {
                myScroll.refresh();
              }, 200);
            }
          });
        }

        var myScroll = new IScroll('#wrapper', {
          // 每滚动一像素触发一次
          //probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。
          probeType: 2,
          // 显示横向滚动条
//          scrollX: true,
          // 上下左右滚动都生效的时候使用
          freeScroll: true,
          // 启用tap事件
          tap: true,
          // 取消屏蔽默认事件
          preventDefault: false,
//          scrollbars: false,//有滚动条
          mouseWheel: true,//允许滑轮滚动
//	      fadeScrollbars: true,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果
//        bounce:true,//边界反弹
//	      interactiveScrollbars:true,//滚动条可以拖动
          shrinkScrollbars: 'clip',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.
//        click: true ,// 允许点击事件
//        keyBindings:true,//允许使用按键控制
//        momentum:true// 允许有惯性滑动
        });
        // 防止同屏内滑动事件产生影响，禁止滚动条的滚动事件，当滑动的时候不进行冒泡
        document.addEventListener('touchmove', function (e) {
          e.preventDefault();
        }, false);
        // 如果缓存里面有y轴值，设置Y轴值
        // 这个要放在外面判断，否则还是会闪烁一下
//        if (sessionStorage.getItem("orderScrollY")) {
//          // scrollTo 中间的想想x，y必须是数字类型的
//          var scrollStorage = Number(sessionStorage.getItem("orderScrollY"));
//          console.log(scrollStorage);
////            window.alert(sessionStorage.getItem("scrollY"));
//          myScroll.scrollTo(0, scrollStorage);
////            myScroll.refresh();
//        }
        setTimeout(function () {
          myScroll.refresh();
        }, 0);
        myScroll.on('scroll', function () {
          if (listLength > 9 && that.page < that.pageCount) {
            // 当前y轴位置
            var height = this.y,
            // 当滚动到底部的时候y轴的值
              bottomHeight = this.maxScrollY - height;

            // 控制下拉显示  下来动作超过70的时候显示,下拉的时候用y来衡量，因顶部为0
            if (height >= 70) {
              pullDown.style.display = "block";
              isPulled = true;
              myScroll.refresh();
              return;
            }
            //        else if (height < 50 && height >= 0) {
            //          pullDown.style.display = "none";
            //          return;
            //        }

            // 控制上拉显示 上拉动作超过60的时候显示
            if (bottomHeight >= 50) {
              pullUp.style.display = "block";
              isPulled = true;
              // 上拉的时候先刷新一下滚动条获取一下现在高度
              myScroll.refresh();
              return;
            }
            //        else if (bottomHeight < 50 && bottomHeight >= 0) {
            //          pullUp.style.display = "none";
            //          return;
            //        }
          }
        })
        // 当滚动结束的时候如果达到触发的条件，把条件改回去，然后添加数据
        myScroll.on('scrollEnd', function () { // 滚动结束
          if (listLength > 9 && that.page < that.pageCount) {
            // 如果达到触发条件，则执行加载
            if (isPulled) {
              // 标志回归为初始的false状态
              isPulled = false;
              getContents();
              // 整体处理完之后刷新滚动条获取一下高度
              setTimeout(function () {
                myScroll.refresh();
              }, 300)
            }
          }
          // 滚动结束的时候在页面中记录一下下载的y轴值
//          sessionStorage.setItem("orderScrollY", myScroll.y);
//          var a = sessionStorage.getItem("orderScrollY");
//          console.log(a);
        });
      }
    },
    // 数据监测、属性和方法计算
    created: function() {
      // 获取手机号和userId
      if (isAndroid) {
        // 获取手机号和userId
        this.userAry = window.android.saveData().split(':');
        this.userId = this.userAry[1];
        // 取出userid
//        window.alert(this.userAry[1]);
      }
      if (isiOS) {
        if(this.$route.query.userId!== undefined){
          this.userId = this.$route.query.userId;
//          window.alert(this.userId);
        }
        // 获取手机号和userId
//        this.userAry = window.saveData().split(':');
      }
      var that = this;
      var page = Number(sessionStorage.getItem("orderPage"));
      if (page) {
        that.page = page;
      }

      var getData = function () {
//        that.$http({
//          url:'/loyaltyApp/orders/getListByUserId',
//          method:'POST',
//          emulateJSON : true,
//          data:{
//            pageNum:that.num+1,
//            userId:that.userAry[1]
//          },
//          headers:{
//            'Content-Type':'application/x-www-form-urlencoded'
//          }
//        }).then(function(response){
//          // 通过response.josn来格式化json数据,这个返回的是promise对象
//          response = response.body;
//          console.log(response);
//          // 如果数据为空的时候
//            if(response.resultBody.length == 0){
//              setTimeout(function(){
//                that.centerShow = false;
//                that.miss = true;
//              },0.6*1000);
//            }else{
//              // 数据不为空的时候判断页数和缓存里面的页数比较，递归请求数据
//              if(that.num < that.page){
//                that.getListByUserIdCLS = that.getListByUserIdCLS.concat(response.resultBody);
////              console.log(that.getListByUserIdCLS);
//                that.num ++;
//                if(that.num < that.page){
//                  getData();
//                }
//              }
//              if(that.num == that.page){
//                //1s显示数据
//                setTimeout(function() {
//                  that.assignment();
//                  that.pull();
//                },0.6*1000);
//              }
//            }
//        },function(){
//          window.alert(response.resultCode);
//        });


        that.$http.post(projectUrl + '/orders/getListByUserId', {
          pageNum: that.num + 1,
          userId: that.userId
        }, {emulateJSON: true}).then((response) => {
          // 通过response.josn来格式化json数据,这个返回的是promise对象
          response = response.body;
          console.log(response);
          if (response.resultCode == 200) {
            // 记录这类商品总共的页数
            that.pageCount = response.pageCount;
            // 如果数据为空的时候
//            window.alert(response.resultBody.length);
            if (response.resultBody.length == 0) {
              // 动画500ms，加上请求时间
              setTimeout(function () {
                that.centerShow = false;
                that.useIntegral = false;
                that.miss = true;
              }, 0.6 * 1000);
            } else {
//              window.alert(that.num);
//              window.alert(that.page);
              // 数据不为空的时候判断页数和缓存里面的页数比较，递归请求数据
              if (that.num < that.page) {
                that.getListByUserIdCLS = that.getListByUserIdCLS.concat(response.resultBody);
//              console.log(that.getListByUserIdCLS);
                that.num++;
                if (that.num < that.page) {
                  getData();
                }
              }
            }
          } else {
            window.alert(response.resultCode);
          }
        }).then(()=> {
//          window.alert(that.num)
//          window.alert(that.page)
          // 当数据加载完成后显示页面隐藏过渡动画
          if (that.num == that.page) {
//            that.assignment();
            setTimeout(function () {
//                  console.log(that.getListByUserIdCLS)
              // 把商品列表长度传入方法
              that.pull(that.getListByUserIdCLS.length);
            }, 0.5 * 1000);
          }
        });

//        document.cookie = 'JSESSIONID=BA2AAEAB52FAB1DC7A39E48B71A9DE4A; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/loyaltyApp/; httponly, JSESSIONID=708E99E95A83D73CD8F8257946804BE7; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/loyaltyApp, JSESSIONID=219564C4317FE50F22B151997B14E659; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/loyaltyApp';
//        $.ajax({
//          type: 'POST',
//          url: '/loyaltyApp/orders/getListByUserId',
//          data: {
//            pageNum: 1,
//            userId: 7
//          },
//          beforeSend: function (xhr) {
//            console.log(document.cookie);
////            var cookie = "JSESSIONID=BA2AAEAB52FAB1DC7A39E48B71A9DE4A; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/loyaltyApp/; httponly, JSESSIONID=708E99E95A83D73CD8F8257946804BE7; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/loyaltyApp, JSESSIONID=219564C4317FE50F22B151997B14E659; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/loyaltyApp";//此处设置cookie
////            console.info("adding cookie: " + cookie);
////            xhr.setRequestHeader('Cookie', cookie);
//            console.log(xhr);
//          },
//          success:function(data){
//            console.log(data);
//          }
//        });
      };
      getData();
    },
    // 相当于ready事件
    mounted: function(){},
    // 由于数据更新导致虚拟DOM重新渲染和打补丁，在这之后会调用该钩子
    updated:function() {}
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .all_box{
    &.order{
       height: 100%;
       /*font-family: "PingFang-SC-Medium";*/
       #wrapper{
         /*top:1.23rem;*/
       }
      .order_list{
        li{
          margin-top:0.2rem;
          background:#fff;
          p,span{
            margin-bottom:0.12rem;
            font-size:0.24rem;
            color:#8b8b8b;
          }
          &:last-child{
            border:none;
           }
          .detail_top{
            position:relative;
            overflow: hidden;
            margin-left:0.32rem;
            img{
              float: left;
              margin: .32rem 0.16rem 0 0;
              width: 1.72rem;
              height: 1.72rem;
              /*background: #00bfff;*/
            }
            .detail_right{
              float:left;
              width:55%;
              p{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &:last-of-type{
                    margin-bottom:0.32rem;
                 }
              }
              h6{
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                margin: 0.32rem 0 .28rem;
                height: .86rem;
                line-height: .43rem;
                font-size: .3rem;
                color: #242424;
              }
              em{
                position:absolute;
                top:16%;
                right:0.32rem;
                font-size:0.24rem;
                color:#242424;
                &.colorT{
                  color:#7ac700;
                 }
                &.colorF{
                  color:#d7000f;
                 }
              }
            }
          }
          .detail_bottom{
            overflow:hidden;
            height:0.86rem;
            line-height:0.86rem;
            p{
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
              float:left;
              width:3.6rem;
              margin-left:0.32rem;
            }
            b,span{
              float:right;
            }
            b{
              margin-right:0.32rem;
              font-size:0.34rem;
              color:#4dafea;
              /*font-family: "HelveticaNeueLPro-Md";*/
            }
          }
        }
      }
     }
  }
</style>
