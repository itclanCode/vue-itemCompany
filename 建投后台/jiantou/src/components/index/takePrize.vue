<template lang="html">
  <div>
    <!--如果商品没有则不要第一个-->
    <router-link class="movie_banner prize_banner" v-if="shopState" :to="{path:'shopDetails',query:{headerTitle:dataType.name+'兑换',productId:firstShop.id,isSellOut:firstShop.isSellOut,dataTypeId:dataType.id}}" tag="div">
      <img :src="imgUrl(firstShop.masterImg)" alt=""/>
      <b class="prize_b">{{firstShop.name1}}</b>
      <div class="prize_span">
        <img src="./gold.png" alt=""/>
        <p>{{firstShop.mallIntegralPrice}}</p>
      </div>
    </router-link>
    <ul class="shops">
      <router-link :to="{path:'shopDetails',query:{headerTitle:dataType.name+'兑换',productId:dataList.id,isSellOut:dataList.isSellOut,dataTypeId:dataType.id}}" tag="li" v-for="dataList in dataLists">
        <div class="market retainb prize" :class="{last_bottom:dataType.sort == 6}">
          <b>{{dataList.name1}}</b>
          <p>
            <strong>{{dataList.mallIntegralPrice}}</strong>
            <i>抽一次</i>
          </p>
          <img class="shop_img" :src="imgUrl(dataList.masterImg)" alt=""/>
          <img v-if="dataList.isSellOut == 1" class="sold_out" src="./sold_out.png" alt=""/>
        </div>
      </router-link>
    </ul>
    <div class="line" v-if="!indexLast"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data: function () {
      return {
        // 商品列表数据
        dataLists:'',
        // 第一个商品数据
        firstShop:'',
        // 如果商品列表有没有商品的状态
        shopState:false
      };
    },
    props: ['dataType','indexLast'],
    components: {},
    methods:{
      // 处理图片路径
      imgUrl:function(url){
        return projectUrl + url;
      },
    },
    created: function () {
      var that = this;
      // 请求抽大奖数据
      jsonp('/product/getListByIsShow',
        function (data) {
          if (data.resultCode == 200) {
            console.log(data);
            // 如果数据不为空
            if(data.resultBody.length != 0){
              // 如果列表不为空的话，就显示
              that.shopState = true;
              // 取出数组里面第一个商品
              that.firstShop = data.resultBody.shift();
              console.log(that.firstShop);
              // 剩下的列表正常显示
              that.dataLists = data.resultBody;
              // 触发父组件的隐藏加载图标的方法
              that.$emit('showState');
            }else{
              // 如果列表是空的话，隐藏不处理
              that.shopState = false;
              // 触发父组件的隐藏加载图标的方法
              that.$emit('showState');
            }
          }else{
            console.log('抽大奖数据接口问题' + data.resultCode);
          }
        },
        {
          productTypeId: that.dataType.id
        }
      )
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
