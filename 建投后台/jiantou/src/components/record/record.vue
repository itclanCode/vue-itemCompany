<template lang="html">
  <div class="record">
    <my-header :headerTitle="headerName"></my-header>
    <scroller lock-x @on-scroll="updateScroll" ref="mode" height="-42%" style="background: #F2F4F8;">
      <div id="wrapper" v-show="!show">
        <div class="box">
          <ul>
            <li v-for="(item,$index) in list" class="retainbb">
              <router-link :to="{path:'recordDetail',query:{list:list[$index],headerTitle:'积分记录'}}">
                <p class="listItem">
                  <span class="nameTit">{{item.title}}</span>
                  <span class="price">
                    <b v-if="item.score>0" style="color:#FF5900 ">+{{item.score}}</b>
                    <b v-if="item.score<0" style="color:#0DB14B ">{{item.score}}</b>
                    积分</span>
                </p>

                <p class="listBot">
                  <span class="nameSta">{{state(item.state)}}</span>
                  <span class="timeTitl">操作时间：{{item.date}}</span>
                </p>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!--加载图标-->
      <loading v-model="show"></loading>
    </scroller>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../common/header';
  import {Scroller,Loading} from 'vux';
  export default {
    data: function () {
      return {
        // 获取头部信息
        headerName:this.$route.query.headerTitle,
        // 积分列表数据
        list:'',
        // 加载图标显示隐藏
        show:true
      };
    },
    computed:{

    },
    components: {
      // 引用公用的头部
      myHeader: header,
      // 公共处理滚动条
      Scroller:Scroller,
      // 加载图标
      Loading:Loading
    },
    methods:{
      // 更新滚动条方法
      updateScroll:function(){
//        console.log(1);
        this.$refs.mode.reset();
      },
      // 处理获取数据的积分状态
      state:function(state){
        if(state == 0){
          return '无效';
        }else if(state == 1){
          return '有效';
        }else if(state == 2){
          return '待积分';
        }else if(state == 3){
          return '中奖';
        }else if(state == 4){
          return '未中奖';
        }else if(state == 5){
          return '短信验证码发送中';
        }else if(state == 6){
          return '短信验证码已发送';
        }
      }
    },
    created: function () {
      var that = this;
      // 请求积分记录列表
      jsonp('/user/getIntegralLogUCL',
        function(data){
          console.log(data);
          if(data.resultCode == 200&&data.resultBody !=0){
            data = JSON.parse(data.resultBody);
            console.log(data);
            that.list = data.data;
            // 隐藏加载图标
            that.show = false;
          }else{
            console.log('积分记录列表接口问题' + data.resultCode);
          }
        },
        {
          curPage:1,
          pageSize:100
        }
      );
    },
    mounted:function() {
      // this.getDraw();
      // 更新滚动条
      this.$nextTick(() => {
        this.$refs.mode.reset()
      })
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "./record.scss";
</style>
