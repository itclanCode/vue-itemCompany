<template lang="html">
  <div>
    <ul class="shop_nav retainb">
      <li v-for="(navList,$index) in navLists" :class="{selected:selected == $index}" @click="toggle($index,navList.id)"><a
        href="javascript:;">{{navList.name}}</a></li>
    </ul>
    <ul class="shops">
      <router-link :to="{path:'shopDetails',query:{headerTitle:dataType.name+'兑换',productId:dataList.id,isSellOut:dataList.isSellOut,dataTypeId:dataType.id}}" tag="li" v-for="dataList in dataLists">
        <div class="market retainb movie" :class="{last_bottom:dataType.sort == 6}">
          <img :src="imgUrl(dataList.masterImg)" alt=""/>
          <b>{{dataList.name1}}</b>

          <p>{{dataList.name2}}</p>
          <span>{{dataList.mallIntegralPrice}}</span>
          <em :class="{sell_out:dataList.isSellOut==1}"></em>
          <img v-if="dataList.isSellOut == 1" class="sold_out" src="./sold_out.png" alt=""/>
        </div>
      </router-link>
    </ul>

    <router-link class="movie_banner" v-if="shopState" :to="{path:'shopDetails',query:{headerTitle:dataType.name+'兑换',productId:firstShop.id,isSellOut:firstShop.isSellOut,dataTypeId:dataType.id}}" tag="div">
      <img :src="imgUrl(firstShop.masterImg)" alt=""/>
      <b>{{firstShop.name1}}</b>
      <div>
        <img src="./gold.png" alt=""/>
        <p>{{firstShop.mallIntegralPrice}}</p>
      </div>
    </router-link>

    <div class="line" v-if="!indexLast"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data: function () {
      return {
        // 开发商类型
        navLists: '',
        // 默认选中按钮
        selected: 0,
        // 商品列表
        dataLists: '',
        // 第一个商品放到大图处
        firstShop:'',
        // 如果商品列表有没有商品的状态
        shopState:false
      };
    },
    components: {},
    props: ['dataType','indexLast'],
    computed:{

    },
    methods: {
      // 处理图片路径
      imgUrl:function(url){
        return projectUrl + url;
      },
      // 获取商品数据
      getShop:function(id){
        var that = this
        // 根据服务商id请求商品列表数据
        jsonp('/product/getListByIsShow',
          function (data) {
            if (data.resultCode == 200) {
              // 清空数据
              that.dataLists = '';
              console.log(data);
              // 如果数据不为空
              if(data.resultBody.length != 0){
                // 如果列表不为空的话，就显示
                that.shopState = true;
                // 取出数组里面第一个商品
                that.firstShop = data.resultBody.shift();
                // 剩下的列表正常显示
                that.dataLists = data.resultBody;
              }else{
                // 如果列表是空的话，隐藏不处理
                that.shopState = false;
                // 触发父组件的隐藏加载图标的方法
                that.$emit('showState');
              }
            }else{
              console.log('看大片商品列表数据接口问题' + data.resultCode);
            }
          },
          {
            productTypeId: that.dataType.id,
            serviceProviderId: id
          }
        )
      },
      // 点击按钮进行切换
      toggle: function ($index, id) {
        var that = this;
        // 防止重复点击请求
        if (this.selected != $index) {
          // 改变按钮显示状态
          this.selected = $index;
          console.log(id);
          this.getShop(id);
        }
      }
    },
    created: function () {
      var that = this;
      // 获取运营商信息
      jsonp('/serviceProvider/getListByIsShow',
        function (data) {
          if (data.resultCode == 200) {
            console.log(data);
            that.navLists = data.resultBody;
            // 触发父组件的隐藏加载图标的方法
            that.$emit('showState');
            // 开始获取第一个类型的商品列表数据
            that.getShop(that.navLists[0].id);
          }else{
            console.log('看大片运营商信息数据接口问题' + data.resultCode);
          }
        },
        {
          productTypeId: that.dataType.id
        }
      );
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
