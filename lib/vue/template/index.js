import Vue from 'vue';
// 引入ele-ui
import ElementUI from 'element-ui'; 
import store from '../src/store/index.js';
import router from '../src/router/index.js';
import App from './index.vue';

import 'element-ui/lib/theme-chalk/index.css';
// 基础css
import '../src/assets/css/mian-base.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);

const mainVue = new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
});

export default mainVue;

global.Vue = mainVue;
