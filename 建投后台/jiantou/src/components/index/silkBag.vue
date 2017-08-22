<template lang="html">
  <div>
    <ul class="shops">
      <router-link :to="{path:'shopDetails',query:{headerTitle:dataType.name+'兑换',productId:dataList.id,isSellOut:dataList.isSellOut,dataTypeId:dataType.id}}" tag="li" v-for="dataList in dataLists">
        <div class="market retainb silk_bag" :class="{last_bottom:dataType.sort == 6}">
          <img :src="imgUrl(dataList.masterImg)" alt=""/>
          <b>{{dataList.name1}}</b>
          <p>{{dataList.description}}</p>
          <span>{{dataList.mallIntegralPrice}}</span>
          <em :class="{sell_out:dataList.isSellOut==1}"></em>
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
        // 如果商品列表有没有商品的状态
        shopState:false
      };
    },
    props:['dataType','indexLast'],
    components: {},
    methods:{
      // 处理图片路径
      imgUrl:function(url){
        return projectUrl + url;
      }
    },
    created:function(){
      var that = this;
      // 请求爽购物数据
      jsonp('/product/getListByIsShow',
        function (data) {
          if (data.resultCode == 200) {
            console.log(data.resultBody);
            // 如果数据不为空
            if(data.resultBody.length != 0){
              // 如果列表不为空的话，就显示
              that.shopState = true;
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
            console.log('爽购物数据接口问题' + data.resultCode);
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
