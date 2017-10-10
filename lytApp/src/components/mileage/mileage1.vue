<template lang="html">
  <div class="all_box mileage">
    <div id="header">头部</div>
    <div id="wrapper">
      <div id="scroller">
        <div v-for="mileage in mileages" class="mileage_list">
          <router-link to="/mileage/introduce">
            <h6>{{mileage.title}}</h6>
            <p>{{mileage.detail}}</p>
          </router-link>
        </div>
      </div>
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
        created: function() {
//          $(function () {
//            var myScroll = new IScroll('#wrapper', {
//              scrollX: true,
//              // 上下左右滚动都生效的时候使用
//              freeScroll: true,
//              // 启用tap事件
//              click: true
//            });
//            document.addEventListener('touchmove', function (e) {
//              e.preventDefault();
//            }, false);
//            console.log(myScroll);
//          });
        },
        mounted: function() {
          var myScroll = new IScroll('#wrapper', {
            scrollX: true,
            // 上下左右滚动都生效的时候使用
            freeScroll: true,
            // 启用tap事件
            click: true
          });
          document.addEventListener('touchmove', function (e) {
            e.preventDefault();
          }, false);
        },
        components: {}
    };
</script>

<style lang="scss" rel="stylesheet/scss">
  .all_box{
    &.mileage{
      #wrapper{
        top:1.23rem;
        background:#f3f3f3;
      }
      .mileage_list{
        overflow:hidden;
        margin-top:0.2rem;
        width:100%;
        height:1.67rem;
        background:deepskyblue;
        font-size:0.2rem;
        font-family:"PingFang-SC-Medium";
        h6{
          margin:0.52rem 0 0.18rem 0.4rem;
          font-size:0.3rem;
          color:#242424;
        }
        p{
          margin-left:0.4rem;
          color:#fff;
        }
      }
     }
  }
</style>
