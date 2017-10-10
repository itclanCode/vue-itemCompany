<template lang="html">
  <div class="all_box eran_points mileage">
    <header></header>
    <ul class="eran_points_nav">
      <li>
        <img src="./yaoyiyao@2x.png" alt=""/>
        <p>摇一摇签到</p>
      </li>
      <li>
        <img src="./choujiang@2x.png" alt=""/>
        <p>积分抽奖</p>
      </li>
      <li>
        <img src="./jifenyouxi@2x.png" alt=""/>
        <p>积分游戏</p>
      </li>
    </ul>
    <div class="eran_points_activity">
      <div v-for="mileage in mileages">
        <router-link to="/mileage/introduce">
          <h6>{{mileage.title}}</h6>
          <p>{{mileage.detail}}</p>
        </router-link>
      </div>
    </div>
    <div class="eran_points_footer">
      <p>
        <span>我的积分：23210</span><span>赚够了，去花</span>
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
              mileages: [
                {
                  title: '国航航空',
                  detail: '1000乐益通积分=10国航积分'
                },
                {
                  title: '国航航空',
                  detail: '1000乐益通积分=10国航积分'
                },
                {
                  title: '国航航空',
                  detail: '1000乐益通积分=10国航积分'
                },
                {
                  title: '国航航空',
                  detail: '1000乐益通积分=10国航积分'
                },
                {
                  title: '国航航空',
                  detail: '1000乐益通积分=10国航积分'
                },
                {
                  title: '国航航空',
                  detail: '1000乐益通积分=10国航积分'
                }
              ]
            };
        },
        components: {}
    };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../common/sass/min.scss'; /*引入外部scss文件*/
  .all_box{
    &.eran_points{
      .eran_points_nav{
        overflow:hidden;
        li{
          float:left;
          width:33.3%;
          text-align:center;
          img {
            margin:0.48rem 0 0.3rem;
            width: 1.2rem;
            height: 1.2rem;
          }
          p{
            margin-bottom:0.58rem;
            font-size:0.3rem;
            color:#666;
            font-family: "PingFang-SC-Medium";
          }
        }
      }
      .eran_points_activity{
        height:100%;
        background:#f3f3f3;
      }
      .eran_points_footer{
        position:fixed;
        bottom:0;
        left:0;
        overflow:hidden;
        margin-top:0;
        height:0.98rem;
        p{
          margin-left:0;
          width:100%;
          span:nth-child(1){
            padding-left:0.32rem;
            width:5rem;
            background:#fff;
            font-size: 0.3rem;
            color: #242424;
            @include border-1px-t(#dcdcdc);
          }
          span:nth-child(2){
            width:2.18rem;
            background:#cf010b;
            font-size: 0.32rem;
            color: #fff;
            text-align:center;
            @include border-1px-t(#cf010b);
          }
          span{
            float:left;
            height:0.98rem;
            line-height:0.98rem;
          }
        }
      }
     }
  }
</style>
