/*公用文件在這裡加載*/
var Vue = require('vue');
var VueRouter = require('vue-router');
var popup = require('./vue-popup');
Vue.use(popup)

window.Vue = Vue

var App = Vue.extend();


Vue.use(VueRouter);
var router = new VueRouter();
router.map({
		'/':{
			component: function(resolve){
			   require(['./demo.vue'],resolve)
			}
		}})
Vue.router = router
router.start(App, 'body');


