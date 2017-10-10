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
            <!--<input type="text" maxlength="11" placeholder="请输入手机号" @focus="clear" @keyup="phoneCheck('',null)" @blur="clearP" v-model="phone"/>-->
            <input type="number" pattern="\d*" maxlength="11" placeholder="请输入手机号" @focus="clear" @keyup="phoneCheck('',null)" @blur="clearP" v-model="phone"/>
            <!--<img src="./lianxiren_icon@2x.png" alt=""/>-->
            <!--tap事件不是原生的事件，而是通过touch进行封装的-->
            <div class="user_img" :class="{selected:userState === true}" @tap="linkman"></div>
            <p v-show="cueState" :class="{error:cueText === 1}">{{cueContent}}</p>
          </div>
          <ul class="charge_type">
            <!--前台存的厂商和后台厂商进行对比-->
            <li class="retainb" v-for="(flow,$index) in flows" :class="{selected:selected === $index,un_use:flow.mobileOperator != marketType}" @tap="toggle(flow,$index)">
              <b>{{flow.name1}}</b>
              <p>售价：{{flow.mallIntegralPrice}}积分</p>
            </li>
          </ul>
        </div>
        <div class="charge_bottom">
          <button @tap="flowNext(flow,integral,goodId)" :class="{selected:btnState === 1}">下一步</button>
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
        // 人名，刚上来时有显示默认绑定的账号
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
        flows:[],
        // 移动运营商
        mobiles:[],
        // 中国联通
        unicoms:[],
        // 中国电信
        telecoms:[],
        // 传给原生的流量数
        flow: '',
        // 传给原生的积分数
        integral: '',
        // 厂家类型
        marketType:0,
        // 按钮状态
        btnState: 0,
        //接收手机号和id的数组
        userAry: [],
        // 商品id
        goodId:''
      };
    },
    // 方法
    methods: {
      // 关闭初始加载，把暂存的数据放到需填充的数据当中
      assignment:function() {
        this.centerShow = false;
        this.useIntegral = true;
      },
      // 键盘抬起的时候进行判断
      phoneCheck: function(userName,userPhone) {
        // 验证手机格式
        var isChinaMobile = /^134[0-8]\d{7}$|^(13[5-9]|147|15[0-27-9]|178|18[2-478])\d{8}$/; // 中国移动
        var isChinaUnion = /^(13[0-2]|145|15[56]|176|18[56])\d{8}$/; // 中国联通
        var isChinaTelcom = /^(133|153|177|18[019])\d{8}$/; // 中国电信
        // 将数字转为字符串
        this.phone = this.phone.toString();
        if (this.phone.length > 0) {
          // 如果是手机号
          if (isChinaMobile.test(this.phone)||isChinaUnion.test(this.phone)||isChinaTelcom.test(this.phone)) {
            // 当输入的时候，根据输入的手机号，获取联系人姓名
            if(this.phone.length == 11 && userName !='默认绑定号码' && userPhone == null){
              if(isAndroid){
                // 发送手机号获取人名
                userName = window.android.number(this.phone);
//                window.alert(userName);
              }
              if(isiOS){
              // 发送手机号获取人名
//                window.alert(window.number(this.phone));
                userName = window.number(this.phone);
              }
              // 如果返回的联系人为空
              if(userName == 0 || userName == undefined){
                userName = '通讯录无此号码'
              }
              // 输入时如果是默认绑定的号码，显示默认绑定号码
              if(this.phone == this.userAry[0]){
                userName = '默认绑定号码'
              }
            }
            // 索引归0
            this.selected = 0;
            // 判断手机运营商
            if (isChinaMobile.test(this.phone)) {
              this.cueContent = userName+'（中国移动）';
              // 按钮可点击
              this.btnState = 1;
              // 厂家类型赋值（移动）
              this.marketType = 1;
              // 中国移动运营商数据
              this.flows = this.mobiles;
            } else if (isChinaUnion.test(this.phone)) {
              this.cueContent = userName+'（中国联通）';
              // 按钮可点击
              this.btnState = 1;
              // 厂家类型赋值（联通）
              this.marketType = 2;
              // 中国联通运营商数据
              this.flows = this.unicoms;
            } else if (isChinaTelcom.test(this.phone)) {
              this.cueContent = userName+'（中国电信）';
              // 按钮可点击
              this.btnState = 1;
              // 厂家类型赋值（电信）
              this.marketType = 3;
              // 中国电信运营商数据
              this.flows = this.telecoms;
            }
            // 更新一下默认存储数据
            this.flow = this.flows[0].name1;
            // 存商品积分价格
            this.integral = this.flows[0].mallIntegralPrice;
            // 存商品id
            this.goodId = this.flows[0].id;
            // 颜色改变回默认
            this.cueText = 0;
            // 提示显示
            this.cueState = 1;
            // 循环判断第一个类型
//            if(this.phone.length == 11){
//              for(var i = 0;i<this.flows.length;i++){
//                // 如果存储的厂商和后台的厂商进行判断  （循环第一个厂商一样的改变其为选中状态）
//                if(this.marketType == this.flows[i].mobileOperator){
//                  this.selected = i;
//                  break;
//                }
//              }
//            }
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
        // 按钮全不可点
        this.marketType = 0;
      },
      // 清除提示信息（当触发失去焦点）
      clearP:function() {
        if(this.phone.length == 0){
          // 提示隐藏
          this.cueState = 0;
        }
      },
      // 处理流量数值 （暂时不用）
//      numChange: function(flow) {
//        var num = null;
//        if (flow >= 1000) {
//          num = flow / 1000 + 'G';
//        } else {
//          num = flow + 'M';
//        }
//        return num;
//      },
      // 切换流量类型
      toggle: function(flow,$index) {
        // 后台返回的运营商和前台存的运营商一样的时候才能切换（如果运营商不通则不让切换）
        if (flow.mobileOperator == this.marketType) {
          // 干煸选中的索引块
          this.selected = $index;
          // 存商品名称
          this.flow = flow.name1;
          // 存商品积分价格
          this.integral = flow.mallIntegralPrice;
          // 切换改变商品id
          this.goodId = flow.id;
//          console.log(this.goodId);
        }
      },
      // 点击联系人切换样式
      linkman: function() {
        // 头像选中样式切换
        this.userState = true;
        // 判断android或者ios
        if(isAndroid){
//          console.log('android');
          // 调取android获取联系人方法，之后点联系人后，原生有一个异步操作，然后调用我的方法通知我去获取手机号
          window.android.getContactsinfo();
        }
        if(isiOS){
//          console.log('ios');
          // 调取ios手机联系人方法
          window.addSubView('view');
        }
      },
      // 点击下一步
      flowNext: function(flow,integral,goodId) {
        // 通过错误提示状态判断手机号是否正确
        if (this.btnState === 1) {
//          params.flow = params.flow + ' M';
//          var integral = integral + '积分';
          if (isAndroid) {
            // 调用android方法，获取支付页面并且把商品信息传给android
            window.android.payment(flow, integral, goodId);
          }
          if(isiOS){
//            window.alert(flow+'---'+integral+'---'+goodId);
            window.nextAction(flow, integral, goodId);
          }
        }
      }
    },
    // 数据监测
    created: function() {
      // 获取默认手机号
      if (isAndroid) {
        // 判断如果没有手机号，调用android登录方法
//        if (window.android.saveData() == '' || window.android.saveData() == null) {
//          window.alert(111);
//          window.android.isLogin();
//        } else {
          // 获取手机号和id
          this.userAry = window.android.saveData().split(':');
          // 设置手机号
          this.phone = this.userAry[0];
//          window.alert(this.phone);
//        }
      }
      if (isiOS) {
        // 获取默认手机号（字符串）
//        window.alert(111);
//        window.alert(window.saveData());
        this.userAry = window.saveData().split(':');
        // 设置手机号
        this.phone = this.userAry[0];
      }
      var that = this;
      // 冒泡排序
      function bubbleSort(array) {
        //给每个未确定的位置做循环
        for (var unfix = array.length - 1; unfix > 0; unfix--) {
          //给进度做个记录，比到未确定位置
          for (var i = 0; i < unfix; i++) {
            if (array[i].mallIntegralPrice > array[i + 1].mallIntegralPrice) {
              var temp = array[i];
              // 后一项放在前面（小的）
              array.splice(i, 1, array[i + 1]);
              // 大的放后面
              array.splice(i + 1, 1, temp);
            }
          }
        }
      }

      this.$http.get(projectUrl + '/product/getListByFlow?pageSize=1000').then((response) => {
        // 通过response.josn来格式化json数据,这个返回的是promise对象
        response = response.body;
        console.log(response.resultBody);
        if (response.resultCode == 200) {
          // 循环将不同类型的运营商类型放到不同数组中
          response.resultBody.forEach(function (item, i) {
            if (item.mobileOperator == 1) {
              that.mobiles.push(item);
              bubbleSort(that.mobiles);
            } else if (item.mobileOperator == 2) {
              that.unicoms.push(item);
              bubbleSort(that.unicoms);
            } else if (item.mobileOperator == 3) {
              that.telecoms.push(item);
              bubbleSort(that.telecoms);
            }
          })
          console.log(that.mobiles);
          console.log(that.unicoms);
          console.log(that.telecoms);
          // 中国移动运营商数据(刚开始显示中国移动的数据)
          that.flows = that.mobiles;
        } else {
          window.alert(response.resultCode);
        }
      }).then(()=> {
        // 当数据加载完成后显示页面隐藏过渡动画
        // 刚开始判断手机号的正确性
        that.phoneCheck('默认绑定号码');
        // 判断完把相应的数组给flows，然后再取出其中第一个
        that.assignment();
      }).then(()=>{
        setTimeout(function () {
          var myscroll = new IScroll('#wrapper', {
            // 启用tap事件
            tap: true,
            // 取消屏蔽默认事件
            preventDefault: false
          });
          // 防止同屏内滑动事件产生影响，禁止滚动条的滚动事件，当滑动的时候不进行冒泡
          document.addEventListener('touchmove', function (e) {
            e.preventDefault();
          }, false);
        }, 0.3 * 1000);
      });
    },
    // 相当于ready事件
    mounted: function() {
      // vue实例
      var that = this;
      var push = null,
        ary = null;
      // 定义公用的方法给andriod调用
      // 点击联系人的时候android调js，js再调android获取相应手机号
      window.getPhoneNum = function () {
        // 头像恢复默认状态
        that.userState = false;
        if (isAndroid) {
          push = window.android.setPhoneNum();
          ary = push.split(':');
        }
        if (isiOS) {
          push = window.setPhoneNum();
          ary = push.split(':');
        }
        that.userName = ary[0];
        that.phone = ary[1];
        that.phoneCheck(that.userName, that.phone);
      };
    },
    // 由于数据更新导致虚拟DOM重新渲染和打补丁，在这之后会调用该钩子
    updated:function() {},
    // 计算属性
    computed: {
//      orderedFlows: function () {
//        return _.orderBy(this.flows, 'name1')
//      }
    }
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
    width:82%;
    height:0.6rem;
    line-height:0.6rem;
    font-size:0.5rem;
    /*font-family: "HelveticaNeueLPro-Md";*/
    color:#242424;
    border:0;
    outline:none;/*去除边框颜色*/
  &::-webkit-input-placeholder {
     line-height:0.6rem;
     font-size:0.34rem;
     /*font-family:"PingFang-SC-Medium";*/
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
    /*font-family: "HelveticaNeueLPro-Roman";*/
    color:#242424;
  }
  p{
    font-size:0.2rem;
    /*font-family: "PingFang-SC-Medium";*/
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
    /*font-family: "PingFang-SC-Blod";*/
  &.selected{
     background:#d7000f;
   }
  }
  .charge_bottom{}
  }
</style>
