<template lang="html">
  <div class="record_detail">
    <my-header :headerTitle="headerName"></my-header>
    <scroller lock-x ref="mode" height="-42%" style="background: #F2F4F8;">
      <div>
        <div id="wrapper">
          <div class="record_detail_top retainbb">
            <p class="listItem">
              <span class="nameTit">{{list.title}}</span>
                  <span class="price">
                    <b v-if="list.score>0" style="color:#FF5900 ">+{{list.score}}</b>
                    <b v-if="list.score<0" style="color:#0DB14B ">{{list.score}}</b>
                    积分</span>
            </p>
            <p class="listBot">
              <span class="nameSta">{{state(list.state)}}</span>
              <span class="timeTitl">操作时间：{{list.date}}</span>
            </p>
          </div>
          <record-take-prize :dataList="list" v-if="list.state == 3 || list.state == 4"></record-take-prize>
          <record-send :dataList="list" v-if="list.state == 5 || list.state == 6"></record-send>
          <!--<record-take-prize v-if="list.state != 3 && list.state != 4"></record-take-prize>-->
          <!--<record-other v-if="list.state == 3 || list.state == 4"></record-other>-->
        </div>
      </div>
    </scroller>
  </div>
</template>

<script type="text/ecmascript-6">
  // 引入公用的头部
  import header from '../common/header';
  // 引入抽奖记录信息
  import recordTakePrize from './recordTakePrize';
  // 引入其它记录信息
  import recordSend from './recordSend'
  import {Scroller} from 'vux';
  export default {
    data: function () {
      return {
        // 获取积分列表的数据
        list:this.$route.query.list,
        // 获取头部内容
        headerName:this.$route.query.headerTitle
      };
    },
    components: {
      // 公用的头部
      myHeader: header,
      // 抽奖记录详细信息
      recordTakePrize: recordTakePrize,
      // 引入其它记录信息
      recordSend: recordSend,
      //公共处理滚动条
      Scroller: Scroller
    },
    methods:{
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

    },
    mounted(){
    console.log(this.list);
    // this.getDraw();
    // 更新滚动条
    this.$nextTick(() => {
      this.$refs.mode.reset()
    })

  }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "recordDetail.scss";
</style>
