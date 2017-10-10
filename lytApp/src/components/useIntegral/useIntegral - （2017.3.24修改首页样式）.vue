<template lang="html">
  <div class="all_box">
    <!--<div id="header">头部</div>-->
    <div id="wrapper" v-show="useIntegral">
      <div id="scroller">
        <div id="PullDown" class="scroller-pullDown hide">
          <div>
            <img src="./top.gif" />
            <!--<span id="pullDown-msg" class="pull-down-msg">下拉刷新</span>-->
          </div>
        </div>
        <!--<div class="swiper-container banner">-->
          <!--<div class="swiper-wrapper">-->
            <!--<img class="swiper-slide" src="./cbd.jpg" alt=""/>-->
            <!--<img class="swiper-slide" src="./muwu.jpg" alt=""/>-->
            <!--<img class="swiper-slide" src="./yuantiao.jpg" alt=""/>-->
          <!--</div>-->
          <!--&lt;!&ndash; 如果需要分页器 &ndash;&gt;-->
          <!--<div class="swiper-pagination"></div>-->
        <!--</div>-->
        <ul class="main_icon">
          <li v-for="router in routers" @tap="jump">
            <router-link :to="router.path">
              <img :src="router.img" alt=""/>

              <p>{{router.name}}</p>
            </router-link>
          </li>
        </ul>
        <!--父页面中传过来的数据信息，这个是定义在父页面上的自定义属性 ：data 动态传递数据-->
        <!--<div>{{data}}</div>-->
        <ul class="classification">
          <li class="retainbb" v-for="(getAllType,$index) in getAllTypes" @tap="toggle($index)" :class="{active:active==$index}">{{getAllType.name}}</li>
          <!--<li>全部商品</li>-->
        </ul>
        <ul class="fictitious" id="Content">
          <li class="retainbb" v-for="getListByType in getListByTypes" @tap="jump">
            <router-link :to="{path:'goods',query:{goodId:getListByType.id}}">
              <!--<img src="./cbd.jpg" v-lazy="'/loyaltyApp'+getListByType.masterImg"/>-->
              <img :src="checkImg(getListByType.masterImg)"/>

              <div class="right_box">
                <h6>{{getListByType.name1}}</h6>

                <p>{{getListByType.name2}}</p>

                <div>
                  <i></i>
                  <b>{{getListByType.marketPrice}}</b>
                  <span>￥{{getListByType.mallIntegralPrice}}</span>
                  <em>已售{{getListByType.virtualSales}}</em>
                </div>
              </div>
            </router-link>
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
        // 路由参数设置
        routers:[
          {
            path:'/chargeFlow',
            name:'充流量',
            img:'./static/images/chongliuliang_icon@2x.png'
          },
          {
            path:'/mileage',
            name:'兑里程',
            img:'./static/images/duilicheng_icon@2x.png'
          },
          {
            path:'/chargeBill',
            name:'充话费',
            img:'./static/images/chonghuafei_icon@2x.png'
          }
        ],
        // 请求的页码数
        page:1,
        // 请求数
        num:0,
        // 商品类型信息
        getAllTypes:[],
        // 选项卡类型id
        typeId:'',
        // 桑品列表信息
        getListByTypes:[],
        // 选项卡切换状态
        active:0,
        // 滚动条Y轴坐标
        myScrollY:'',
        // 滚动条
        myScroll:{}
      };
    },
    // 接收父组件传来的数据
    props:['data'],
    // 使用的方法
    methods: {
      // 选项卡切换动作
      toggle: function($index) {
        var that = this;
        //　防止重复点击选项卡
        if(this.active !== $index){
          this.active = $index;
          // 点击哪个选项卡标签存储那个类型id
          this.typeId = this.getAllTypes[$index].id
          // 当切换商品类型的时候初始页面数num和请求页码数page重置
          this.num = 0;
          this.page = 1;
          this.getListByTypes = [];
          this.$http.post('/loyaltyApp/product/getListByType',{
            // 通过导航的id请求相应的数据，然后更新相应的数据
            productTypeId: this.typeId,
            pageNum:this.num+1
          },{emulateJSON:true}).then((response) => {
            response = response.body;
            console.log(response);
            // 判断获取数据的状态码
            if(response.resultCode == 200){
              this.getListByTypes = response.resultBody;
              // 刷新一下滚动条
              setTimeout(function() {
                that.myScroll.refresh();
              },0);
            }else{
              window.alert(response.resultCode);
            }
          });
        }
      },
      // 关闭初始加载，把暂存的数据放到需填充的数据当中，并且让“加载更多”显示
      assignment:function() {
        // 过渡动画隐藏
        this.centerShow = false;
        // 整个页面显示
        this.useIntegral = true;
      },
      // 检查图片
      checkImg:function(img){
        return img.substring(0,4) == 'http'? img:'/loyaltyApp'+img;
      },
      //上拉下拉方法
      pull:function(){
        // 初始化body高度
        document.body.style.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) + 'px';

        var pullDown = document.querySelector("#PullDown"),
          pullUp = document.querySelector("#PullUp"),
          isPulled = false, // 拉动标记
          that = this;

        function getContents() {
          that.page = that.page+1;
          that.$http.post('/loyaltyApp/product/getListByType',{
            productTypeId:that.typeId,
            pageNum:that.page
          },{emulateJSON:true}).then((response) => {
            response = response.body; // 通过response.josn来格式化json数据,这个返回的是promise对象
            if (response.resultCode == 200) {
              if(response.resultBody != ''){
                // 如果返回的内容不为空则更新一下sessionStroge中的值
                sessionStorage.setItem("page", that.page);
              }
              that.getListByTypes = that.getListByTypes.concat(response.resultBody);
              // 要在这里刷新，因为这里是异步的，如果在外面刷新的话，就使得盒子的高度还是和没加载前一样
              setTimeout(function() {
                myScroll.refresh();
              },200);
            }
          });
        }
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
//	      scrollbars: true,//有滚动条
          mouseWheel: true,//允许滑轮滚动
//	      fadeScrollbars: true,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果
//        bounce:true,//边界反弹
//	      interactiveScrollbars:true,//滚动条可以拖动
          shrinkScrollbars:'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.
//        click: true ,// 允许点击事件
//        keyBindings:true,//允许使用按键控制
//        momentum:true// 允许有惯性滑动
        });
        console.log(myScroll);
        this.myScroll = myScroll;
        // 防止同屏内滑动事件产生影响，禁止滚动条的滚动事件，当滑动的时候不进行冒泡
        document.addEventListener('touchmove', function (e) {
          e.preventDefault();
        }, false);
        // 如果缓存里面有y轴值，设置Y轴值
        // 这个要放在外面判断，否则还是会闪烁一下
        if (sessionStorage.getItem("scrollY")) {
          // scrollTo 中间的想想x，y必须是数字类型的
          var scrollStorage = Number(sessionStorage.getItem("scrollY"));
          console.log(scrollStorage);
//            window.alert(sessionStorage.getItem("scrollY"));
          myScroll.scrollTo(0, scrollStorage);
//            myScroll.refresh();
        }
        setTimeout(function() {
          myScroll.refresh();
        },0);
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
          if (isPulled) { // 如果达到触发条件，则执行加载
            setTimeout(function() {
              isPulled = false;
              // 刷新完区域后然后隐藏上拉下拉框
              pullDown.style.display = "none";
              pullUp.style.display = "none";
              getContents();
              // 整体处理完之后刷新滚动条获取一下高度
              setTimeout(function() {
                myScroll.refresh();
              },200)
            },1000);
          }
          // 滚动结束的时候在页面中记录一下下载的y轴值
          that.myScrollY = myScroll.y;
          console.log(that.myScrollY);
        });
      },
      // 点击记着当前页面存储到缓存中
      jump:function() {
        // 点击把现在的y轴值存到缓存中
        console.log(this.myScrollY);
        sessionStorage.setItem("scrollY", this.myScrollY);
//        window.alert(sessionStorage.getItem("scrollY"));
      }
    },
    // 实例已经创建完成之后被调用，数据观测，属性和方法
    created: function() {
      var that = this;
      // 请求花积分首页轮播图接口
      this.$http.get('/loyaltyApp/banner/getSpendPageBanner').then((response) => {
        response = response.body;
        console.log(response);
        if(response.resultCode == 200){
          console.log('获取到数据');
        }else{
//          window.alert(response.resultCode);
        }
      });
      // 商品分类：生活类、出行类、视频类
      this.$http.get('/loyaltyApp/productType/getAllType').then((response) => {
        response = response.body;
        console.log(response);
        if(response.resultCode == 200){
          this.getAllTypes = response.resultBody;
          //第一个分类
          this.typeId = response.resultBody[0].id;
          // 在请求完商品分类之后请求商品列表
          getData();
        }else{
//          window.alert(response.resultCode);
        }
      });
      // vue-resource 不能关闭请求异步
      // 请求商品类型接口
      var page = Number(sessionStorage.getItem("page"));
      if (page) {
        that.page = page;
      }
      // 请求商品列表数据
      var getData = function() {
        that.$http.post('/loyaltyApp/product/getListByType',{
          productTypeId:that.typeId,
          pageNum:that.num+1
        },{emulateJSON:true}).then((response) => {
          response = response.body; // 通过response.josn来格式化json数据,这个返回的是promise对象
          console.log(response);
          if(response.resultCode == 200){
            if(that.num < that.page){
              that.getListByTypes = that.getListByTypes.concat(response.resultBody);
              that.num ++;
              // 加一之后再进行比较看是否再进行请求
              if(that.num < that.page){
                getData();
              }
            }
            if(that.num == that.page){
              //1s显示数据
              setTimeout(function() {
                that.assignment();
                that.pull();
              },1000);
            }
          }
        });
      };
    },
    // 相当于ready事件
    mounted: function() {
//      window.alert(window.devicePixelRatio);
      // 刚开始的时候加载轮播图
//      var mySwiper = new Swiper ('.swiper-container', {
//        // 横向滚动
//        direction: 'horizontal',
//        // 使轮播图循环滚动
//        loop: true,
//        // 自动切换的时间间隔
//        autoplay:3000,
//        // 滑动的速度
//        speed:1000,
//        // 如果需要分页器
//        pagination: '.swiper-pagination',
//        // 用户在操作完swiper之后自动切换不会停止，每次都会重新启动autoplay
//        autoplayDisableOnInteraction: false,
//        initialSlide:1
//      });
//      console.log(mySwiper);
    },
    // 由于数据更新导致虚拟DOM重新渲染和打补丁，在这之后会调用该钩子
    updated:function() {},
    computed:{},
    //　vue实例可用的组件列表
    components: {}
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  img[lazy=loaded] {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
  }
  /*VueLazyload 中定义了两种情况，加载的时候，还有错误的时候*/
  /*img[lazy=loading] {*/
    /*width: 40px!important;*/
    /*margin: auto;*/
  /*}*/
  img[lazy=error] {
    border-radius: 2px;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
  }
  .all_box{
    #wrapper{
      /*top:1.23rem;*/
    }
    header {
      height:1.23rem;
      background:dodgerblue;
    }
    .banner{
      height:3rem;
    }
    .main_icon{
      overflow:hidden;
      margin-bottom:0.2rem;
      padding: 0 .62rem;
      background:#fff;
      li{
        overflow:hidden;
        float:left;
        width:33.33%;
        text-align:center;
        img{
          margin-top:0.3rem;
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
    .classification{
      display: flex;
      overflow:hidden;
      width:100%;
      /*height:0.8rem;*/
      background:#fff;
      li{
        flex:1;
        height:0.76rem;
        line-height:0.76rem;
        text-align:center;
        font-size: .28rem;
        color:#666;
        &.active{
           color:#b80015;
          &:after{
            /*border-bottom:0.04rem solid #b80015;*/
            height:4px;
            background:#b80015;
          }
         }
      }
    }
    .fictitious{
        background:#fff;
        min-height:7.4rem;
        li{
          overflow:hidden;
          margin-left:0.32rem;
        &:last-child{
           border:none;
         }
        img{
          float:left;
          margin:0.4rem 0.32rem 0.4rem 0;
          width:2.05rem;
          height:2.05rem;
        }
        .right_box{
          float:left;
          width:62.6%;
          h6{
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
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
            height:0.72rem;
            line-height:0.36rem;
            font-size:0.28rem;
            color:#787878;
          }
          div{
            /*display:flex;*/
            /*align-items: flex-end;*/
            overflow:hidden;
            margin-top:0.45rem;
            height:0.4rem;
            i{
              float:left;
              margin-top:0.17rem;
              width:0.2rem;
              height:0.2rem;
              background:url('./gold_icon@2x.png') no-repeat;
              background-size:100%;
            }
            b{
              float:left;
              position:relative;
              top:0.02rem;
              margin-left:0.08rem;
              font-size:0.4rem;
              font-family: "Arial";
              color:#d7000f;
            }
            span,em{
              margin-top:0.16rem;
            }
            span{
              float:left;
              margin-left:0.08rem;
              text-decoration:line-through;
              font-size:0.24rem;
              font-family: STXhei,"Helvetica Neue LT Pro";
              font-weight: lighter;
              color:#b4b4b4;
            }
            em{
              float:right;
              font-size:0.24rem;
              color:#b4b4b4;
            }
          }
        }
      }
    }
  }
</style>

