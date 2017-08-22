import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueLazyload  from 'vue-lazyload';
import App from './App';
// 建投积分商城首页
import index from 'components/index/index';
// level2 行情详细页（公用）
// 充话费
// 充流量
// 看大片
// 抽大奖
// 爽购物（京东E卡）
import shopDetails from 'components/common/shopDetails';
// 抽大奖跳转页
import scratch from 'components/scratch/scratch';
// 验证兑换手机号
import validatePhone from 'components/scratch/validatePhone';
// 短信验证码
import validateMessage from 'components/scratch/validateMessage';
// 抽奖输完短信验证码后显示的页面
import scratchTrue from 'components/scratch/scratchTrue.vue';
// 积分记录列表
import record from 'components/record/record';
// 积分记录详情
import recordDetail from 'components/recordDetail/recordDetail';
// 充值成功
// 充值失败
// 委托购买处理中
import rechargeState from 'components/common/rechargeState';


// 公用css文件
import './common/sass/index.scss';
// 插入vue-router插件
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueLazyload, {
  loading: '../static/images/default.png',
  try: 3 // default 1
});

const routes = [
  // 建投积分商城首页
  {path: '/', name: 'index', component: index},
  // level2 行情详细页（公用）
  // 充话费
  // 充流量
  // 看大片
  // 抽大奖
  // 爽购物（京东E卡）
  {path: '/shopDetails', name: 'shopDetails', component: shopDetails},
  // 抽大奖跳转页
  {path:'/scratch',name:'scratch',component:scratch},
  // 验证兑换手机号
  {path:'/validatePhone',name:'validatePhone',component:validatePhone},
  // 短信验证码
  {path:'/validateMessage',name:'validateMessage',component:validateMessage},
  // 抽奖成功后页面
  {path:'/scratchTrue',name:'scratchTrue',component:scratchTrue},
  // 积分记录列表
  {path:'/record',name:'record',component:record},
  // 积分记录详情
  {path:'/recordDetail',name:'recordDetail',component:recordDetail},
  // 充值成功
  // 充值失败
  // 委托购买处理中
  {path:'/rechargeState',name:'rechargeState',component:rechargeState}
];

const router = new VueRouter({
  //linkActiveClass: 'active', // router-link的默认class值
  routes: routes
});

new Vue({
  // 挂载到#app元素上
  el: '#app',
  // 下面注册了组件，要有地方使用组件
  template: '<App/>',
  components: {
    'App': App
  },
  // router配置参数注入路由
  router: router
});

