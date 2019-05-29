// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//引入i18n语言切换实例
import "babel-polyfill"; //引入针对IE支持
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper';
import echarts from 'echarts'
import ElementUI from 'element-ui' //引入eleui
import Meta from 'vue-meta'
import VueDND from 'awe-dnd' //拖拽

import merge from 'webpack-merge'


import i18n from '../../src/i18n/index.js'
import store from '../../src/store/index.js'
import router from '../../src/router/index.js'
import App from './index.vue'
import 'element-ui/lib/theme-chalk/index.css';

import current_system from '../../src/assets/js/huanjing_panduan.js'

import parentMessageObj from '../../src/assets/js/window_openr.js'






//自定义组件库

import FBmodules from '../../src/components/modules/index.js'
import FBmainModules from '../../src/components/modules/main_index.js'

//自定义全局方法库
import fbFunction from '../../src/assets/js/fbFunction.js'

import  '../../src/assets/js/global-param.js'

//基础css
import '../../src/assets/css/mian_base.css'
import '../../src/assets/css/animate.css'

import '../../src/assets/css/swiper.css'
import '../../static/font_icon/iconfont.css'

//引入校验工具
import '../../src/assets/js/validate.js'
import {typeOf, deepClone} from "../../src/assets/js/fbFunction_fn.js";
import fblocalStorage from '../../src/assets/js/local_storage.js';


Vue.use(VueDND)




Vue.config.productionTip = false;

Vue.use(VueAwesomeSwiper);

Vue.prototype.$echarts = echarts;
//使用自定义组件库
Vue.use(FBmodules);
Vue.use(FBmainModules);
Vue.use(fbFunction);

Vue.use(ElementUI);
Vue.use(Meta);





router.beforeEach( function(to, from, next){
    var userInfo = fblocalStorage.getStore("user");
    var user_control = fblocalStorage.getStore("user_control");
    //如果有就直接到首页咯
    if (userInfo && typeOf(user_control)==="array"&&user_control.length>0 && userInfo.companyOrCenter_id != "-1") {
        //针对左侧导航路由进行判断,主要用于在一个模块内变化路由的时候能够把LEFTCHILDREN参数带上
        if(to.path.split('/')[1]==from.path.split('/')[1]&&typeof to.query.LEFTCHILDREN=='undefined'&&typeof from.query.LEFTCHILDREN !='undefined'&&from.query.LEFTCHILDREN!=''){
            next(
                {
                    path:to.path,
                    params:to.params,
                    query:merge({LEFTCHILDREN:from.query.LEFTCHILDREN},to.query)
                }
            );
        }
        else{
          next();
          // if(userInfo.company_type == 'info_company_cared' && to.path == '/new_company_list'){
          //   next({
          //     path: '/home_page/company'
          //   });
          // }else{
          //   next();
          // }
        }
    } else {
        if(typeOf(user_control)!=="array"||(typeOf(user_control)==="array"&&user_control.length===0)){
            fblocalStorage.setStore("loginoverTime", "该账号权限不存在,请联系客服或重新注册");
        }
        else if(userInfo.companyOrCenter_id=="-1"){
            fblocalStorage.setStore("loginoverTime", "该账号数据不存在，请换账号登录");
        }
        fblocalStorage.removeStore("user");
        fblocalStorage.removeStore("user_control");
        window.location.href = window.location.protocol+"//"+window.location.host+"/login.html#/";
    }
});

var mainVue = new Vue({
    el: '#app',
    router,
    store,
    i18n, //挂载到Vue上
    components: {
        App
    },
    template: '<App/>'
})

global.Vue = mainVue;

parentMessageObj(mainVue);
global.runTimeSystem = current_system; //运行环境

store.state.pageVue = mainVue;

export default mainVue;
