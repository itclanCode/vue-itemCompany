<template lang="html">
  <div class="all_box activity">
    <div id="wrapper" v-show="useIntegral">
      <div id="scroller">
        <img :src="firstImg" alt=""/>
        <router-link v-for="imgPath in imgPaths" :to="{path:'goods',query:{goodId:imgPath.goodId}}">
        <img :src="imgPath.path" alt=""/>
        </router-link>
        <!--<a v-for="imgPath in imgPaths">-->
          <!--<img :src="imgPath.path" alt=""/>-->
        <!--</a>-->
      </div>
    </div>
    <img class="center_icon" src="./center.gif" alt="" v-show="centerShow"/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data: function () {
      return {
        // 全部显示或隐藏
        useIntegral:true,
        // 中间转场标志
        centerShow:false,
        // 头图
        firstImg:'./static/images/activity/travel/travel_01.jpg',
        // 图片
        imgPaths:[
          {
            path:'./static/images/activity/travel/travel_02.jpg',
            goodId:'678d0036cba449788171332ff03f8e9f'
          },
          {
            path:'./static/images/activity/travel/travel_03.jpg',
            goodId:'ff79ef0501c24194a4a0150617c4266e'
          },
          {
            path:'./static/images/activity/travel/travel_04.jpg',
            goodId:'8a05659ec19e42ec837b0e14b4256f35'
          }
        ]
      };
    },
    created:function(){
//      var that = this;
//      setTimeout(function(){
//        that.centerShow = false;
//        that.useIntegral = true;
//      },0.8*1000);
    },
    mounted:function() {
      // 如果没更新就放在这里
      setTimeout(function() {
        var myscroll = new IScroll('#wrapper',{
          // 显示横向滚动条
//        scrollX: true,
          // 上下左右滚动都生效的时候使用
          freeScroll: true,
          // 启用tap事件
          tap: true,
          // 取消屏蔽默认事件
          preventDefault: false,
//        scrollbars: false,//有滚动条
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
      },0.5*1000);
    },
    components: {}
  };
</script>
