<template lang="html">
  <div class="index_home">
    <my-header>
      <router-link :to="{path:'record',query:{headerTitle:'积分记录'}}">积分记录</router-link>
    </my-header>
    <scroller lock-x @on-scroll="updateScroll" ref="mode" height="-42%" style="background: #F2F4F8;">
      <div id="wrapper" v-show="!show">
        <div class="index_top">
          <img src="./1.gif" alt=""/>
          <i>{{user.custTel}}</i>

          <div>
            <b>{{user.validScore}}</b>
            <img src="./money_icon.png" alt=""/>

            <p>待入账积分：{{user.toValidScore}}</p>
          </div>
        </div>
        <div class="index_title">
          <img src="./exclamatory_icon.png" alt=""/>

          <p>{{user.toInvalidScore}}积分将在12月31日过期</p>
        </div>
        <!--<img class="index_banner" src="static/images/activity/disport/disport_01.jpg" alt=""/>-->
        <swiper class="index_banner" :show-desc-mask="false" :show-dots="false" height="3.09rem" loop auto :list="imgList" :duration="500"></swiper>
        <div class="index_earn">
          <img src="./question_icon.png" alt=""/>
          <em></em>

          <p>如何赚积分？</p>
          <img src="./right_arrow.png" alt=""/>
        </div>
        <div class="line"></div>
        <div v-for="(type,$index) in types" v-if="type.typeState == 0" class="shop_list">
          <h6>{{type.name}}</h6>
          <!--level 2行情-->
          <level @showState = "showChange" v-if="type.id == 1" :dataType="type" :indexLast="indexState($index)"></level>
          <!--充话费-->
          <change-box @showState = "showChange" v-else-if="type.id == 2" state="bill" :dataType="type" :indexLast="indexState($index)"></change-box>
          <!--充流量-->
          <change-box @showState = "showChange" v-else-if="type.id == 3" state="flow" :dataType="type" :indexLast="indexState($index)"></change-box>
          <!--看大片-->
          <blockbuster @showState = "showChange" v-else-if="type.id == 4" :dataType="type" :indexLast="indexState($index)"></blockbuster>
          <!--京东E卡-->
          <shopping @showState = "showChange" v-else-if="type.id == 5" :dataType="type" :indexLast="indexState($index)"></shopping>
          <!--抽大奖-->
          <take-prize @showState = "showChange" v-else-if="type.id == 6" :dataType="type" :indexLast="indexState($index)"></take-prize>
          <!--投顾类型-->
          <silk-bag @showState = "showChange" v-else-if="type.id == 7" :dataType="type" :indexLast="indexState($index)"></silk-bag>
        </div>
      </div>
      <!--加载图标-->
      <loading v-model="show"></loading>
    </scroller>
  </div>
</template>

<script type="text/ecmascript-6">
  // 公共的头部
  import header from '../common/header';
  // level 行情
  import level from './level'
  // 充流量，充话费
  import changeBox from '../common/change';
  // 看大片
  import blockbuster from './blockbuster';
  // 爽购物（京东E卡）
  import shopping from'./shopping';
  // 抽大奖
  import takePrize from './takePrize';
  // 投顾类型
  import silkBag from './silkBag';
  import {Swiper,Scroller,Loading } from 'vux';
  export default {
    data: function () {
      return {
        // 用户个人信息
        user:'',
        // 轮播图图片列表
        imgList: [],
        // 模块类型
        types:'',
        // 加载图标显示状态
        show:true
      };
    },
    components: {
      // 公用头部
      myHeader: header,
      // level行情
      level:level,
      // 充流量、充话费组件
      changeBox: changeBox,
      // 看大片
      blockbuster:blockbuster,
      // 爽购物（京东E卡）
      shopping:shopping,
      // 抽大奖
      takePrize:takePrize,
      // 投顾类型
      silkBag:silkBag,
      // 轮播图
      Swiper: Swiper,
      // 滚动
      Scroller:Scroller,
      // 加载图标
      Loading :Loading
    },
    methods:{
      // 更新滚动条方法
      updateScroll:function(){
//        console.log(1);
        this.$refs.mode.reset();
      },
      // 改变显示的状态
      showChange:function(){
        this.show = false;
      },
      // 处理图片路径
      imgUrl:function(url){
        return projectUrl + url;
      },
      // 选择最后一个
      indexState:function(index){
        // 如果是最后一个则返回true
        if(index == this.types.length-1){
          return true;
        }else{
          return false;
        }
      }
    },
    computed:{},
    created: function () {
      var that = this;
      // 请求用户个人信息
      jsonp('/user/getInfoUCL',
        function(data){
          console.log(data);
          if(data.resultCode == 200&&data.resultBody != 0){
            that.user = JSON.parse(data.resultBody);
            console.log(that.user);
          }else{
            console.log('用户个人基本信息接口问题' + data.resultCode)
          }
        }
      )
      // 请求首页banner图
      jsonp('/banner/getList',
        function(data){
          console.log(data);
          if(data.resultCode == 200){
            if(data.resultBody.length != 0){
              $.each(data.resultBody,function(i,item){
                var obj = {};
                obj.url = item.clickUrl;
                obj.img = that.imgUrl(item.url);
                that.imgList.push(obj);
              })
              console.log(that.imgList);
            }
          }else{
            console.log('首页banner图接口问题' + data.resultCode);
          }
        }
      )
      // 请求模块类型(通过判断类型显示相应模块，通过后台配置权重更滑类型模块位置)
      jsonp('/productType/getListByIsShow',
        function (data) {
          console.log(data);
          if (data.resultCode == 200) {
            that.types = data.resultBody;
          } else {
            console.log('商品类型接口问题' + data.resultCode);
          }
        }
      )
    },
    mounted: function () {}
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "./index.scss";
</style>
