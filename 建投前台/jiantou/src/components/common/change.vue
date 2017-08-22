<template lang="html">
  <div>
    <!--<div>{{dataType}}</div>-->
    <ul class="shop_nav retainb">
      <li v-for="(navList,$index) in navLists" :class="{selected:selected == $index}" @click="toggle($index,navList.id)"><a href="javascript:;">{{navList.name}}</a></li>
    </ul>
    <ul class="shops">
      <router-link :to="{path:'shopDetails',query:{headerTitle:dataType.name+'兑换',productId:dataList.id,isSellOut:dataList.isSellOut,dataTypeId:dataType.id}}" tag="li" v-for="dataList in dataLists">
        <div :class="state">
          <p :class="{bill_bottom:state=='bill',flow_bottom:state == 'flow'}">{{dataList.serviceProvider.name}}</p>
          <i :class="{bill_right:state == 'bill',flow_right:state == 'flow'}">{{textState}}</i>
          <b>{{dataList.name1}}</b>
          <img v-if="dataList.isSellOut==1" class="sold_out" src="./sold_out.png" alt=""/>
        </div>
        <em class="price_icon" :class="{sell_out:dataList.isSellOut==1,last_bottom:dataType.sort == 6}"></em>
        <span class="price">{{dataList.mallIntegralPrice}}</span>
      </router-link>
    </ul>
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
        dataLists: ''
      };
    },
    components: {},
    props: ['state','dataType','indexLast'],
    computed:{
      // 处理充流量充话费文字
      textState:function(){
        return this.state == 'bill'?'元':'M';
      }
    },
    methods: {
      // 获取商品数据
      getShop:function(id){
        var that = this
        // 根据服务商id请求商品列表数据
        jsonp('/product/getListByIsShow',
          function (data) {
            if (data.resultCode == 200) {
              // 切换时清空数据
              that.dataLists ='';
              console.log(data);
              that.dataLists = data.resultBody;
              // 触发父组件的隐藏加载图标的方法
              that.$emit('showState');
            }else{
              console.log('充流量、充话费商品列表数据接口问题' + data.resultCode);
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
            // 开始获取第一个类型的商品列表数据
            that.getShop(that.navLists[0].id);
          }else{
            console.log('充流量、充话费运营商信息数据接口问题');
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
