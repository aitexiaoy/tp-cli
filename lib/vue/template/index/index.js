// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//引入i18n语言切换实例
import "babel-polyfill"; //引入针对IE支持
import Vue from 'vue';
import ElementUI from 'element-ui'; //引入eleui
import store from '../../src/store/index.js';
import router from '../../src/router/index.js';
import App from './index.vue';
import 'element-ui/lib/theme-chalk/index.css';
import  '../../src/assets/js/global-param.js';
//基础css
import '../../src/assets/css/mian_base.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);

var mainVue = new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})

export default mainVue;
