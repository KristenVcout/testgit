import Vue from 'vue'
import App from './App'
//自定义部分

//导入网络请求的包
import {
	$http
} from '@escook/request-miniprogram'


uni.$http = $http
$http.baseUrl = "https://www.uinav.com"
//$http.baseUrl="https://api-hmugo-web.itheima.net/"
//请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: "数据加载中。。。"
	})
}

//响应拦截器
$http.afterRequest = function(Options) {
	uni.hideLoading()
}
// 封装弹框的函数
uni.$showMsg = function(title = '数据请求失败！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'loading'
	})
}

//自定义部分
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
