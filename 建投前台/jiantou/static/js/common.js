/**
 * Created by lixin on 2017/6/22
 */
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

// 项目路径
var projectUrl = 'http://47.94.86.226:8080/cscShop';

// jsonp请求
var jsonp = function(url,success,data){
  $.ajax({
    async:true,
    type:'jsonp',
    url:'http://47.94.86.226:8080/cscShop'+url,
    data:data,
    dataType:'jsonp',
    jsonp: 'callback',
    success:success
  })
};
