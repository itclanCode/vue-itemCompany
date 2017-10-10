// 通过import引入相应的组件和css
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
//import VueTouch from 'vue-touch';
import VueLazyload  from 'vue-lazyload';
import App from './App';
// 花积分首页
import useIntegral from 'components/useIntegral/useIntegral';
// 商品详情页
import goods from 'components/goods/detail';
// 转账说明
import transfer from 'components/useIntegral/transfer';
// 协议
import agreement from 'components/useIntegral/agreement';
// 充流量
import chargeFlow from 'components/chargeFlow/chargeFlow';
//　充流量说明
import flowExplain from 'components/chargeFlow/explain';
//import linkman from 'components/chargeFlow/linkman';
// 充话费
import chargeBill from 'components/chargeBill/chargeBillQ';
// 充话费说明
//import billExplain from 'components/chargeBill/explain';
// 兑里程
import mileage from 'components/mileage/mileage';
// 兑里程说明
//import introduce from 'components/mileage/introduce';
// 兑里程兑换信息
//import change from 'components/mileage/change';
// 商品订单列表
import order from 'components/order/order';
// 商品订单详情
//import orderDetail from 'components/order/orderDetail';
// 收藏
//import collection from 'components/collection/collection';
// 发现
//import find from 'components/find/find';
// 发现详情
//import findDetail from 'components/find/findDetail';
// 赚积分
//import earnPoints from 'components/earnPoints/earnPoints';
// 首页活动
import life from 'components/activity/life';
import disport from 'components/activity/disport';
import travel from 'components/activity/travel';

import './common/sass/index.scss';

Vue.use(VueRouter); // 装入vue-router插件
Vue.use(VueResource);
Vue.use(VueLazyload, {
  loading: '../static/images/default.png',
  try: 3 // default 1
});
//Vue.use(VueTouch);
// 1.定义组件：可以直接写，也可以通过import引入
// 2.定义路由：每个路有应该映射一个组件，其中component可以通过Vue.extend()创建组件构建器或者是一个组件的配置对象
const routes = [
  // 花积分
  {path: '/', component: useIntegral},
  // 商品详情
  {path:'/goods',name:'goods',component:goods},
  // 转账说明
  {path: '/transfer', component: transfer},
  // 转账说明
  {path: '/agreement', component: agreement},
  // 充流量
  {path: '/chargeFlow', name: 'chargeFlow', component: chargeFlow},
  // 充流量的说明
  {path: '/chargeFlow/flowExplain', name: 'flowExplain', component: flowExplain},
  // 跳联系人页面
  //{path: '/linkman', name: 'linkman', component: linkman},
  // 充话费
  {path: '/chargeBill', name: 'chargeBill', component: chargeBill},
  // 充话费说明
  //{path: '/chargeBill/billExplain', name: 'billExplain', component: billExplain},
  // 兑里程
  {path: '/mileage', name: 'mileage', component: mileage},
  // 兑里程说明
  //{path: '/mileage/introduce', name: 'introduce', component: introduce},
  // 兑里程兑换信息
  //{path: '/mileage/introduce/change', name: 'change', component: change},
  // 订单
  {path: '/order', name: 'order', component: order},
  // 订单详情
  //{path: '/order/orderDetail', name: 'orderDetail', component: orderDetail},
  // 收藏
  //{path: '/collection', name: 'collection', component: collection},
  // 发现首页
  //{path: '/find', name: 'find', component: find},
  // 发现详细页
  //{path: '/find/findDetail', name: 'findDetail', component: findDetail},
  // 赚积分首页
  //{path: '/earnPoints', name: 'earnPoints', component: earnPoints},
  // 首页活动生活
  {path: '/life', name: 'life', component: life},
  // 首页活动娱乐
  {path: '/disport', name: 'disport', component: disport},
  // 首页活动出行
  {path: '/travel', name: 'travel', component: travel}
];

// 3.创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  //mode:history,
  //saveScrollPosition:true,
  linkActiveClass: 'active', // router-link的默认class值
  routes: routes// （缩写）相当于 routes: routes
  //scrollBehavior: function (to, from, savedPosition) {
  //  console.log('滚动条');
  //  return savedPosition || { x: 0, y: 100 }
  //}
});

// 4. 创建和挂载根实例:记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能
new Vue({
  el: '#app', // 挂载到#app元素上
  template: '<App/>', // 下面注册了组件，要有地方使用组件
  components: {
    'App': App
  },
  router: router // router配置参数注入路由
});

