<template lang="html">
  <div>
    <ul class="shops">
      <router-link :to="{path:'shopDetails',query:{headerTitle:dataType.name+'兑换',productId:dataList.id,isSellOut:dataList.isSellOut,dataTypeId:dataType.id}}" tag="li" v-for="dataList in dataLists">
        <div class="market retainb" :class="{last_bottom:dataType.sort == 6}">
          <img :src="imgUrl(dataList.masterImg)" alt=""/>
          <b>{{dataList.name1}}</b>
          <p>{{dataList.description}}</p>
          <span>{{dataList.mallIntegralPrice}}</span>
          <img v-if="dataList.isSellOut == 1" class="sold_out" src="./sold_out.png" alt=""/>
          <em :class="{sell_out:dataList.isSellOut==1}"></em>
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
        // level2行情
        dataLists: ''
      };
    },
    props: ["dataType","indexLast"],
    components: {},
    methods: {
      // 处理图片路径
      imgUrl:function(url){
        return projectUrl + url;
      }
    },
    computed: {},
    created: function () {
      var that = this;
      // 请求level行情数据
      jsonp('/product/getListByIsShow',
        function (data) {
          if (data.resultCode == 200) {
            console.log(data);
            that.dataLists = data.resultBody;
            // 触发父组件的隐藏加载图标的方法
            that.$emit('showState');
          } else {
            console.log('level行情数据接口问题' + data.resultCode);
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
