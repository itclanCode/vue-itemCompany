<template lang="html">
  <div class="all_box">
    <div id="header">
      头部
      <!--<input type="text" v-model="b"/>-->
      <!--<div id="shiyan"></div>-->
    </div>
    <div id="wrapper">
      <div id="scroller">
        <div class="swiper-container banner">
          <div class="swiper-wrapper">
            <img class="swiper-slide" src="./cbd.jpg" alt=""/>
            <img class="swiper-slide" src="./muwu.jpg" alt=""/>
            <img class="swiper-slide" src="./yuantiao.jpg" alt=""/>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
        </div>
        <ul class="main_icon">
          <li>
            <router-link to="/chargeFlow">
              <img src="./chongliuliang_icon@2x.png" alt=""/>

              <p>充流量</p>
            </router-link>
          </li>
          <li>
            <router-link to="/mileage">
              <img src="./duilicheng-icon@2x.png" alt=""/>

              <p>兑里程</p>
            </router-link>
          </li>
          <li>
            <router-link to="/chargeBill">
              <img src="./chonghuafei_icon@2x.png" alt=""/>

              <p>充话费</p>
            </router-link>
          </li>
        </ul>
        <ul class="classification">
          <li>{{getAllType.name}}</li>
        </ul>
        <ul class="fictitious">
          <li v-for="n in 10">
            <img src="" alt=""/>

            <div class="right_box">
              <h6>腾讯VIP会员卡21天卡腾讯VIP会员卡21天卡</h6>

              <p>购买腾讯VIP会员，登录官网即可购买腾讯VIP会员，登录官网即可购买腾讯VIP会员，登录官网即可购买腾讯VIP会员，登录官网即可</p>

              <div>
                <img src="./gold_icon@2x.png" alt=""/>
                <b @click="play">910</b>
                <span>￥{{see}}</span>
                <em>已售{{aPlus}}</em>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
//  Vue.nextTick(function(){
//    console.log('dom 更新了');
//  });
  var ERR_OK = 0;
  export default {
    // 挂载到这个元素上
//    el:'#shiyan',
    // 挂载元素的模板
    template:'<div>1</div>',
    // render 作为字符串模板的替代方案，函数接收了一个createElement作为第一个参数来创建节点
    // 如果组件是一个函数组件，render还会接收一个额外的context参数
    // 存放数据的
    data: function () {
      return {
        getAllType:'',
        getListByType:'',
        a:1800,
        b:''
      };
    },
    // 接收父级传下来的数据，在父级中通过v-bind绑定属性
    props:['data'],
//    propsData:['data'],
    // 计算属性的，页面初始的时候有些数据格式需要改变就用这个
    computed: {
      aPlus: {
        get:function() {
          return this.data.num + 1;
        },
        // 当给aPlus设置值的时候 v是传入的值
        set:function(v) {
          this.data.num = v-1
          console.log(this.data.num);
        }
      },
      see:function(){
        return this.a
      }
    },
    // 封装的方法一般由事件触发而执行
    methods: {
      play:function() {
        console.log(21312);
        return 1;
      }
    },
    // 当data中的数据发生改变的时候做的事
    watch:{
      a:function(val,oldVal) {
        console.log('new:%s,old:%s',val,oldVal);
      },
      b:function(val,oldVal) {
        console.log(val);
        console.log(oldVal);
      }
    },
    mounted: function() {
//      console.log(this.$data.getAllType);
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
      var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        autoplay:3000,
        speed:1000,
        // 如果需要分页器
        pagination: '.swiper-pagination',
        autoplayDisableOnInteraction: false
      })
    },
    beforeCreate: function() {
      console.log(1);
    },
    created: function() {
      console.log(2);
      this.$http.get('/api/userIntegral').then((response) => {
        response = response.body; // 通过response.josn来格式化json数据,这个返回的是promise对象
        if (response.errno === ERR_OK) {
          this.getAllType = response.data.getAllType;
          this.getListByType = response.data.getListByType;
        }
      });
    },
    beforeMount:function() {
      console.log(3);
    },
    brforeUpdate:function() {
      console.log(5);
    },
    updated:function() {
      console.log(6);
    },
    activated:function() {
      console.log(7);
    },
    deactivated:function() {
      console.log(8);
    },
    beforeDestroy:function() {
      console.log(9);
    },
    destoryed:function() {
      console.log(10);
    },
    components: {}
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .all_box{
    #wrapper{
      top:1.23rem;
    }
    header {
      height:1.23rem;
      background:dodgerblue;
    }
    .banner{
      height:3rem;
    }
    .main_icon{
      overflow:hidden;
      margin-bottom:0.2rem;
      background:#fff;
      li{
        float:left;
        margin:0.3rem 0 0 1.21rem;
        width:0.88rem;
        img{
          width:0.88rem;
          height:0.88rem;
        }
        p{
          margin:0.15rem 0 0.3rem 0;
          text-align:center;
          font-size:0.28rem;
          color:#666666;
        }
      }
    }
    .classification{
      overflow:hidden;
      width:100%;
      height:0.8rem;
      background:#fff;
      border-bottom:0.01rem solid #dcdcdc;
      li{
        width:100%;
        height:0.73rem;
        line-height:0.76rem;
        text-align:center;
        font-size:0.28rem;
        color:#666;
      }
    }
    .fictitious{
      background:#fff;
      border-bottom:0.01rem solid #dcdcdc;
      li{
        overflow:hidden;
        margin-left:0.32rem;
        border-bottom:0.01rem solid #dcdcdc;
        &:last-child{
          border:none;
         }
        img{
          float:left;
          margin:0.4rem 0.32rem 0.4rem 0;
          width:2.04rem;
          height:2.04rem;
          background:deepskyblue;
        }
        .right_box{
          float:left;
          width:4.5rem;
          h6{
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            width:4.5rem;
            margin:0.4rem 0 0.2rem 0;
            font-size:0.34rem;
            color:#242424;
          }
          p{
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            width:4.5rem;
            line-height:0.36rem;
            font-size:0.28rem;
            color:#787878;
          }
          div{
            overflow:hidden;
            margin-top:0.45rem;
            img{
              float:left;
              margin:0.13rem 0 0 0;
              width:0.2rem;
              height:0.2rem;
              background:none;
            }
            b{
              float:left;
              margin-left:0.08rem;
              font-size:0.4rem;
              font-family: "ArialMT";
              color:#b80015;
            }
            span,em{
              margin-top:0.14rem;
            }
            span{
              float:left;
              margin-left:0.08rem;
              text-decoration:line-through;
              font-size:0.24rem;
              color:#b4b4b4;
            }
            em{
              float:right;
              font-size:0.24rem;
              color:#b4b4b4;
            }
          }
        }
      }
    }
  }
</style>
