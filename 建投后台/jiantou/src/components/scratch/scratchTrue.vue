<template lang="html">
  <div class="index_home">
    <my-header headerTitle="抽奖兑换">
      <router-link :to="{path:'record'}">积分记录</router-link>
    </my-header>
    <scroller lock-x ref="mode" height="-42%" style="background: #F2F4F8;"  @on-scroll="updateScroll">
      <div>
        <div id="wrapper">
          <div class="box">
            <div class="top_tetl">试试你的手气吧</div>

            <div class="ggl" id="top">
              <img class="gglImg" src="static/images/img/winning@2x.png" alt=""/>

              <div class="info" id="prize">
                <div class="Win" style="display: block">
                  <span>恭喜你 中奖了</span>
                </div>
              </div>
            </div>
            <div class="describe_box">
              <div class="describe" style="opacity: 1;">
                <p>已中奖品</p>

                <p>{{shopName}}</p>

                <p>联系手机号</p>

                <p>{{phone}}</p>
              </div>
              <router-link class="btn" style="opacity: 1;" to="/" tag="div">确定</router-link>
            </div>
            <div class="explain" style="margin-top:0.56rem;">
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
        // 获取上一个手机号
        phone:this.$route.query.phone,
        // 获取商品名称
        shopName: this.$route.query.shopName,
      };
    },
    components: {
      myHeader: header,
      //公共处理滚动条
      Scroller: Scroller
    },
    methods: {
      // 更新滚动条方法
      updateScroll: function () {
//        console.log(1);
        this.$refs.mode.reset();
      }
    },
    created:function() {

    },
    mounted: function () {

    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "scratch.scss";
</style>
