<template lang="html">
  <div class="all_box charge">
    <!--<div id="header">-->
    <!--<header>-->
    <!--<router-link to="chargeFlow/flowExplain">说明</router-link>-->
    <!--</header>-->
    <!--</div>-->
    <div id="wrapper" v-show="useIntegral">
      <div id="scroller">
        <div class="charge_box">
          <div class="input_box retainbb">
            <input type="text" maxlength="11" placeholder="请输入手机号" @focus="clear" @keyup="phoneCheck('',null)" @blur="clearP" v-model="phone"/>
            <!--<img src="./lianxiren_icon@2x.png" alt=""/>-->
            <!--tap事件不是原生的事件，而是通过touch进行封装的-->
            <div class="user_img" :class="{selected:userState === true}" @tap="linkman"></div>
            <p v-show="cueState" :class="{error:cueText === 1}">{{cueContent}}</p>
          </div>
          <ul class="charge_type">
            <li class="retainb" v-for="(flow,$index) in flows" :class="{selected:selected === $index,un_use:flow.mobileOperator != marketType}" @tap="toggle(flow,$index)">
              <b>{{flow.name1}}</b>
              <p>售价：{{flow.mallIntegralPrice}}积分</p>
            </li>
          </ul>
        </div>
        <div class="charge_bottom">
          <!--<router-link :to="{path:'chargeFlow',query:{flow:flow,integral:integral}}">-->
          <button @tap="flowNext(flow,integral)" :class="{selected:btnState === 1}">{{marketType}}下一步</button>
          <!--</router-link>-->
          <!--<input type="button" value="oc原生Alert" onclick="alert('123');" />-->
          <!--<input type="button" value="addSubView" onclick="addSubView('view');" />-->
        </div>
      </div>
    </div>
    <img class="center_icon" src="./center.gif" alt="" v-show="centerShow"/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    // 数据
    data: function() {
      return{
        // 全部显示或隐藏
        useIntegral:false,
        // 中间转场标志
        centerShow:true,
        // 手机号输入框
        phone: '',
        // 人名
        userName:'默认绑定账号',
        // 提示内容
        cueContent: '默认绑定账号（中国电信）',
        // 提示状态
        cueState: 1,
        // 提示字体颜色状态(手机号对不对)
        cueText: 0,
        // 联系人图片状态
        userState: false,
        // 充流量类型选中索引
        selected: 0,
        // 流量类型
        flows:[
          {
            name1: "优方10M",
            mallIntegralPrice: 300,
            mobileOperator:1
          },
          {
            name1: "优方10M",
            mallIntegralPrice: 300,
            mobileOperator:2
          },
          {
            name1: "优方10M",
            mallIntegralPrice: 300,
            mobileOperator:1
          },
          {
            name1: "优方10M",
            mallIntegralPrice: 300,
            mobileOperator:3
          },
          {
            name1: "优方10M",
            mallIntegralPrice: 300,
            mobileOperator:3
          },
          {
            name1: "优方10M",
            mallIntegralPrice: 300,
            mobileOperator:1
          },
          {
            name1: "优方10M",
            mallIntegralPrice: 300,
            mobileOperator:1
          },
          {
            name1: "优方10M",
            mallIntegralPrice: 300,
            mobileOperator:2
          },
          {
            name1: "优方10M",
            mallIntegralPrice: 300,
            mobileOperator:1
          }
        ],
        // 传给原生的流量数
        flow: '优方10M',
        // 传给原生的积分数
        integral: 300,
        // 厂家类型
        marketType:0,
        // 按钮状态
        btnState: 0,
        //接收手机号和id的数组
        userAry: []
      };
    },
    // 方法
    methods: {
      // 关闭初始加载，把暂存的数据放到需填充的数据当中
      assignment:function(response) {
//        this.flows = response;
        this.centerShow = false;
        this.useIntegral = true;
      },
      // 键盘抬起的时候进行判断
      phoneCheck: function(userName,userPhone) {
//        window.alert(222);
        // 验证手机格式
        var isChinaMobile = /^134[0-8]\d{7}$|^(13[5-9]|147|15[0-27-9]|178|18[2-478])\d{8}$/; // 中国移动
        var isChinaUnion = /^(13[0-2]|145|15[56]|176|18[56])\d{8}$/; // 中国联通
        var isChinaTelcom = /^(133|153|177|18[019])\d{8}$/; // 中国电信
        if (this.phone.length > 0) {
          if (isChinaMobile.test(this.phone)||isChinaUnion.test(this.phone)||isChinaTelcom.test(this.phone)) {
            if(this.phone.length == 11 && userName !='默认绑定号码' && userPhone == null){
              // 发送手机号获取人名
              userName = window.android.number(this.phone);
              if(userName == 0){
                userName = '通讯录无此号码'
              }
              // 输入时如果是默认绑定的号码，显示默认绑定号码
              if(this.phone == this.userAry[0]){
                userName = '默认绑定号码'
              }
            }
            // 判断手机运营商
            if (isChinaMobile.test(this.phone)) {
              this.cueContent = userName+'（中国移动）';
              // 按钮可点击
              this.btnState = 1;
              // 厂家类型赋值
              this.marketType = 1;
            } else if (isChinaUnion.test(this.phone)) {
              this.cueContent = userName+'（中国联通）';
              // 按钮可点击
              this.btnState = 1;
              // 厂家类型赋值
              this.marketType = 2;
            } else if (isChinaTelcom.test(this.phone)) {
              this.cueContent = userName+'（中国电信）';
              // 按钮可点击
              this.btnState = 1;
              // 厂家类型赋值
              this.marketType = 3;
            }
            // 颜色改变回默认
            this.cueText = 0;
            // 提示显示
            this.cueState = 1;
            // 循环判断第一个类型
            if(this.phone.length == 11){
              for(var i = 0;i<this.flows.length;i++){
                if(this.marketType == this.flows[i].mobileOperator){
                  this.selected = i;
                  break;
                }
              }
            }
          } else {
            // 提示内容改变
            this.cueContent = '请输入正确的手机号！';
            // 颜色改变
            this.cueText = 1;
            // 提示显示
            this.cueState = 1;
            // 按钮不可点击
            this.btnState = 0;
          }
        } else {
          // 提示隐藏
          this.cueState = 0;
        }
      },
      // 获取焦点的时候清空号码
      clear: function() {
        //人名清空
        this.userName = '';
        // 号码清空
        this.phone = '';
        // 颜色改变回默认
        this.cueText = 0;
        // 提示隐藏
        this.cueState = 0;
        // 按钮不可点击
        this.btnState = 0;
      },
      clearP:function() {
        if(this.phone.length == 0){
          // 提示隐藏
          this.cueState = 0;
        }
      },
      // 处理流量数值
      numChange: function(flow) {
        var num = null;
        if (flow >= 1000) {
          num = flow / 1000 + 'G';
        } else {
          num = flow + 'M';
        }
        return num;
      },
      // 切换流量类型
      toggle: function(flow,$index) {
        if (flow.mobileOperator == this.marketType) {
          this.selected = $index;
          this.flow = flow.name1;
          this.integral = flow.mallIntegralPrice;
        }
      },
      // 点击联系人切换样式
      linkman: function() {
        this.userState = !this.userState;
        // 判断android或者ios
        if(isAndroid){
          console.log('android');
          // 调取android获取联系人方法，之后点联系人后，原生有一个异步操作，然后调用我的方法通知我去获取手机号
          window.android.getContactsinfo();
        }
        if(isiOS){
          console.log('ios');
          // 调取ios手机联系人方法
          window.addSubView('view');
        }
      },
      // 点击下一步
      flowNext: function(flow,integral) {
        // 通过错误提示状态判断手机号是否正确
        if (this.btnState === 1) {
//          params.flow = params.flow + ' M';
          var integral = integral + '积分';
          if (isAndroid) {
            // 调用android方法，获取支付页面并且把商品信息传给android
            window.android.payment(flow, integral);
          }
          if(isiOS){
//            window.alert(flow+'---'+integral);
            window.nextAction(flow,integral);
          }
        }
      }
    },
    // 数据监测
    created: function() {
      // 获取默认手机号
      if(isAndroid){
        // 获取手机号和id
        this.userAry = window.android.saveData().split(':');
        // 设置手机号
        this.phone = this.userAry[0];
      }
      if(isiOS){
        window.alert(111);
        window.alert(window.sendId());
        this.detailId = window.sendId();
      }
      var that = this;
//      window.alert(window.sendId());
      // 刚开始判断手机号的正确性
      this.phoneCheck('默认绑定号码');
      this.$http.get('/loyaltyApp/product/getListByFlow').then((response) => {
        response = response.body; // 通过response.josn来格式化json数据,这个返回的是promise对象
        console.log(response.resultBody);
        if(response.resultCode == 200){
          //1s显示数据
          setTimeout(function() {
            that.assignment(response.resultBody);
          },1000);
        }else{
          window.alert(response.resultCode);
        }
      });
    },
    // 相当于ready事件
    mounted: function() {
      // 如果没更新就放在这里
      var myscroll = new IScroll('#wrapper',{
        // 启用tap事件
        tap: true,
        // 取消屏蔽默认事件
        preventDefault:false
      });
      // 防止同屏内滑动事件产生影响，禁止滚动条的滚动事件，当滑动的时候不进行冒泡
      document.addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, false);
      // vue实例
      var that = this;
      var push = null,
        ary = null;
      // 定义公用的方法给andriod调用
      window.getPhoneNum = function() {
        that.userState = !that.userState;
        if(isAndroid){
          push = window.android.setPhoneNum();
          ary = push.split(':');
        }
        if(isiOS){
          push = window.setPhoneNum();
          ary = push.split(':');
        }
        that.userName = ary[0];
        that.phone = ary[1];
        that.phoneCheck(that.userName,that.phone);
      };
      // 定义充流量
      window.flowExplain = function() {
        window.location.href="http://10.48.2.62:8888/#/chargeFlow/flowExplain";
      };
    },
    // 由于数据更新导致虚拟DOM重新渲染和打补丁，在这之后会调用该钩子
    updated:function() {},
    // 计算属性
    computed: {}
  };
</script>

<style lang="scss">
  /*@import '../../common/sass/min.scss';*/
  .all_box{
  header{
    overflow:hidden;
  a{
    float:right;
    margin-right:0.28rem;
    font-size:0.26rem;
    color:#8b8b8b;
  }
  }
  &.charge{
     width:100%;
     height:100%;
  #wrapper{
    /*top:1.23rem;*/
    background:#f3f3f3;
  }
  }
  .charge_box{
    padding:0 0 0 0.32rem;
    background:#fff;
  .input_box{
    height:1.4rem;
  /*@include border-1px-b(#dcdcdc);*/
  input{
    margin-top:0.3rem;
    width:60%;
    height:0.6rem;
    line-height:0.6rem;
    font-size:0.5rem;
    font-family: "HelveticaNeueLPro-Md";
    color:#242424;
    border:0;
    outline:none;/*去除边框颜色*/
  &::-webkit-input-placeholder {
     line-height:0.6rem;
     font-size:0.34rem;
     font-family:"PingFang-SC-Medium";
     color: #8b8b8b;
   }
  &:-moz-placeholder {/* Firefox 18- */
     line-height:0.6rem;
     font-size:0.34rem;
     color: #8b8b8b;
   }

  &::-moz-placeholder{/* Firefox 19+ */
     line-height:0.6rem;
     font-size:0.34rem;
     color: #8b8b8b;
   }

  &:-ms-input-placeholder {
     line-height:0.6rem;
     font-size:0.34rem;
     color: #8b8b8b;
   }
  }
  .user_img{
    float:right;
    margin:0.26rem 0.2rem 0 0 ;
    width:0.8rem;
    height:0.8rem;
    background:0.15rem 0.15rem url('./lianxiren_icon@2x.png') no-repeat;
    background-size:0.52rem;
  &.selected{
     background:0.15rem 0.15rem url('./lianxiren_pressed_icon@2x.png') no-repeat;
     background-size:0.52rem;
   }
  }
  p{
    margin-top:0.06rem;
    font-size:0.22rem;
    color:#8b8b8b;
  &.error{
     color:#d7000f;
   }
  }
  }
  .charge_type{
    overflow:hidden;
    padding-bottom:0.34rem;
  li{
    float:left;
    margin:0.34rem 0.32rem 0 0;
    width:28.5%;
    height:1.22rem;
    text-align:center;
    /*border:0.01rem solid #b4b4b4;*/
    border-radius:0.1rem;
  /*background:url('./border-1px.png') no-repeat;*/
  /*background-size:100%;*/
  &.selected{
     background:#d7000f;
  b,p{
    color:#fff;
  }
  }
  &.un_use{
     background:#f3f3f3;
  b,p{
    color:#b4b4b4;
  }
  }
  b{
    display: block;
    margin:0.3rem 0 0.14rem 0;
    font-size:0.34rem;
    font-family: "HelveticaNeueLPro-Roman";
    color:#242424;
  }
  p{
    font-size:0.2rem;
    font-family: "PingFang-SC-Medium";
    color:#8b8b8b;
  }
  }
  }
  }
  button{
    margin:0.34rem 0 0 0.32rem;
    width:91%;
    height:0.9rem;
    background:#dcdcdc;
    border:none;
    outline:none;
    border-radius:0.1rem;
    font-size:0.34rem;
    color:#fff;
    font-family: "PingFang-SC-Blod";
  &.selected{
     background:#d7000f;
   }
  }
  .charge_bottom{}
  }
</style>
