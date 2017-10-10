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
        firstImg:'./static/images/activity/disport/disport_01.jpg',
        // 图片
        imgPaths:[
          {
            path:'./static/images/activity/disport/disport_02.jpg',
            goodId:'b08dca118012404b926e9c5c7a460058'
          },
          {
            path:'./static/images/activity/disport/disport_03.jpg',
            goodId:'6c01ec05e03943e68f1d32b82819a9f9'
          },
          {
            path:'./static/images/activity/disport/disport_04.jpg',
            goodId:'3af8c5aeb7004ba5a2a4176ea4aa8ae9'
          },
          {
            path:'./static/images/activity/disport/disport_05.jpg',
            goodId:'0f0ab9056cc044429beaf51a6236cde4'
          },
          {
            path:'./static/images/activity/disport/disport_06.jpg',
            goodId:'b59ba49352334585b36a1b8751accb62'
          },
          {
            path:'./static/images/activity/disport/disport_07.jpg',
            goodId:'3d86f52658d1413b9c438c5b5b52a3eb'
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
      },0.5*1000);
    },
    components: {}
  };
</script>
