/**
 * Created by citic on 2017/4/6.
 */
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

// 项目路径
//var projectUrl = '/loyaltyApp';
var projectUrl = 'http://www.ecashback.com.cn/app/loyaltyApp';
//var projectUrl = 'http://106.120.172.94:8085/loyaltyApp';
//var projectUrl = 'http://10.48.154.203:8080/loyaltyApp';

