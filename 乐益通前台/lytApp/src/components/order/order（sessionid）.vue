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
          <li v-for="getListByUserIdCL in getListByUserIdCLS">
            <div class="detail_top retainbb">
              <img :src="'/loyaltyApp'+getListByUserIdCL.product.masterImg" alt=""/>
              <div class="detail_right">
                <h6>{{getListByUserIdCL.product.name1}}</h6>
                <p>订单编号：{{getListByUserIdCL.orderSn}}</p>
                <p>下单时间：{{format(getListByUserIdCL.createTime,'yyyy.MM.dd HH:mm:ss')}}</p>
                <em>{{getListByUserIdCL.orderStateDescribe}}</em>
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
        useIntegral:false,
        // 中间转场标志
        centerShow:true,
        // 缺醒页
        miss:false,
        // 请求的页码数
        page:1,
        // 请求数
        num:0,
        // 订单列表
        getListByUserIdCLS: [],
        //接收手机号和id的数组
        userAry: []
      };
    },
    methods:{
      // 格式化时间
      format:function(time,format){
        var date = new Date(time);
        var dateCheck = function(i){
          return (i<10?'0':'')+i;
        }
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g,function(a){
          switch(a){
            case 'yyyy':
                  return dateCheck(date.getFullYear());
                  break;
            case 'MM':
                  return dateCheck(date.getMonth()+1);
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
      assignment:function() {
        this.centerShow = false;
        this.useIntegral = true;
      },
      getContents:function() {
        var that = this;
        // 请求下一页页数
        that.page = that.page+1;
        that.$http.get('/loyaltyApp/orders/getListByUserIdCL?pageNum='+that.page).then((response) => {
          response = response.body; // 通过response.josn来格式化json数据,这个返回的是promise对象
          if (response.resultCode == 200) {
            if(response.resultBody != ''){
              // 如果返回的内容不为空则更新一下sessionStroge中的值
              sessionStorage.setItem("orderPage", that.page);
            }
            that.getListByUserIdCLS = that.getListByUserIdCLS.concat(response.resultBody);
            // 要在这里刷新，因为这里是异步的，如果在外面刷新的话，就使得盒子的高度还是和没加载前一样
            setTimeout(function() {
              myScroll.refresh();
            },200);
          }
        });
      },
      //上拉下拉方法
      pull:function(){
        // 初始化body高度
        document.body.style.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) + 'px';

        var pullDown = document.querySelector("#PullDown"),
          pullUp = document.querySelector("#PullUp"),
          isPulled = false, // 拉动标记
          that = this;
        var myScroll = new IScroll('#wrapper', {
          // 每滚动一像素触发一次
          //probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。
          probeType: 2,
          // 显示横向滚动条
          scrollX: true,
          // 上下左右滚动都生效的时候使用
          freeScroll: true,
          // 启用tap事件
          tap: true,
          // 取消屏蔽默认事件
          preventDefault: false,
//	            scrollbars: true,//有滚动条
          mouseWheel: true,//允许滑轮滚动
//	            fadeScrollbars: true,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果
          bounce:true,//边界反弹
//	            interactiveScrollbars:true,//滚动条可以拖动
          shrinkScrollbars:'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.
//            click: true ,// 允许点击事件
//            keyBindings:true,//允许使用按键控制
          momentum:true// 允许有惯性滑动
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
        setTimeout( function(){
          myScroll.refresh();
        } , 200 );
        myScroll.on('scroll', function () {
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
        })
        // 当滚动结束的时候如果达到触发的条件，把条件改回去，然后添加数据
        myScroll.on('scrollEnd', function () { // 滚动结束
          // 如果达到触发条件，则执行加载
          if (isPulled) {
            setTimeout(function() {
              isPulled = false;
              // 刷新完区域后然后隐藏上拉下拉框
              pullDown.style.display = "none";
              pullUp.style.display = "none";
              that.getContents();
              // 整体处理完之后刷新滚动条获取一下高度
              setTimeout(function() {
                myScroll.refresh();
              },200)
            },1000);
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
      var that = this;
      // 获取默认手机号
      if(isAndroid){
        // 获取手机号和id
        this.userAry = window.android.saveData().split(':');
        // 设置手机号
        window.alert(this.userAry[2]);
      }
      function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
          return unescape(arr[2]);
        else
          return null;
      }

      function setCookie(name, value, time) {
        var strsec = getsec(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec * 1);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
      }

      function delCookie(name)
      {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=getCookie(name);
        if(cval!=null)
          document.cookie= name + "="+cval+";expires="+exp.toGMTString();
      }

      function getsec(str) {
        var str1 = str.substring(1, str.length) * 1;
        var str2 = str.substring(0, 1);
        if (str2 == "s") {
          return str1 * 1000;
        }
        else if (str2 == "h") {
          return str1 * 60 * 60 * 1000;
        }
        else if (str2 == "d") {
          return str1 * 24 * 60 * 60 * 1000;
        }
      }
      setCookie('JSESSIONID','BA2AAEAB52FAB1DC7A39E48B71A9DE4A; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/loyaltyApp/; httponly, JSESSIONID=708E99E95A83D73CD8F8257946804BE7; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/loyaltyApp, JSESSIONID=219564C4317FE50F22B151997B14E659; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/loyaltyApp','10000');
      setCookie('a','1','10000');
//      var that = this;
//      console.log(that.$http.headers);
//      that.$http.headers.common.a = 1;
//      console.log(that.$http.headers);
//      var page = Number(sessionStorage.getItem("orderPage"));
//      if (page) {
//        that.page = page;
//      }

      var getData = function() {
        that.$http({
          url:'/loyaltyApp/orders/getListByUserIdCL',
          method:'POST',
          data:{
            pageNum:1
          },
          headers:{
//            'Cookie':'JSESSIONID=BA2AAEAB52FAB1DC7A39E48B71A9DE4A; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/loyaltyApp/; httponly, JSESSIONID=708E99E95A83D73CD8F8257946804BE7; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/loyaltyApp, JSESSIONID=219564C4317FE50F22B151997B14E659; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/loyaltyApp',
            'Accept-Language': 'zh-CN'
          }
        }).then(function(response){
          // 通过response.josn来格式化json数据,这个返回的是promise对象
          response = response.body;
          console.log(response);
        },function(){
          window.alert(response.resultCode);
        });
//        that.$http.get('/loyaltyApp/orders/getListByUserIdCL?pageNum='+(that.num+1)).then((response) => {
//          // 通过response.josn来格式化json数据,这个返回的是promise对象
//          response = response.body;
//          console.log(response);
//          if(response.resultCode == 200){
//            // 如果数据为空的时候
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
//          }else{
//            window.alert(response.resultCode);
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
       font-family: "PingFang-SC-Medium";
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
              float:left;
              margin:0.38rem 0.32rem 0.24rem 0;
              width:1.42rem;
              height:1.42rem;
              background:deepskyblue;
            }
            .detail_right{
              float:left;
              width:50.1%;
              h6,p{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              h6{
                margin:0.52rem 0 0.32rem;
                font-size:0.32rem;
                color:#242424;
              }
              em{
                position:absolute;
                top:0.6rem;
                right:0.32rem;
                font-size:0.26rem;
                color:#242424;
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
              font-family: "HelveticaNeueLPro-Md";
            }
          }
        }
      }
     }
  }
</style>
