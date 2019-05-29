<template>
<div id="app" class="main-page main-page-app" v-cloak>
    <router-view></router-view>
</div>
</template>

<script>
import localStorage from '../../src/assets/js/local_storage.js'
import {
    auth_hasRoute
} from '../../src/authorization/auth.js'
import {
    get_serverUserConfig,
    set_serverUserConfig
} from '../../src/server/common_api.js'

import {
    mapActions
} from 'vuex';
import {
    typeOf
} from '../../src/assets/js/fbFunction_fn';

export default {
    name: 'App',
    /*beforeCreate(){
      let _ocCurrentPageInfo = localStorage.getStore('ocCurrentPageInfo');
      if (_ocCurrentPageInfo.refresh_falg === true ) {
        if(_ocCurrentPageInfo.route.query.page_no&&_ocCurrentPageInfo.route.query.page_no=='99999'){
          delete _ocCurrentPageInfo.route.query.page_no;
          this.$router.replace({
            path:_ocCurrentPageInfo.route.path,
            query:_ocCurrentPageInfo.route.query,
            params:_ocCurrentPageInfo.route.params,
        })
        }
      }
    },*/
    metaInfo() {
        if (this.$IS_INDEPENDENT != true) {
            return {
                title: '富邦木星云-云集木星，共建消防新生态！',
                meta: [{
                        name: 'description',
                        content: '以木星智慧云为核心云平台，综合运用物联网、云计算、大数据、AI智能等先进技术，致力于成为业界领先的智慧消防解决方案提供商！'
                    },
                    {
                        name: 'keywords',
                        content: '富邦木星云,智慧消防,消防物联网,云平台,物联网云平台,开放平台,助力生态,生态前瞻,产业链,生态链,便捷接入,设备兼容,网络安全'
                    },
                    {
                        name: 'keywords',
                        content: '智慧消防,智慧城市,消防,物联,智能,网关,消防,物联,智能,网关'
                    }
                ],
                link: [{
                    rel: 'icon',
                    href: '/static/htmlico/favicon_muxingyun.ico'
                }]
            }
        } else {
            return {
                title: '陇南市智慧消防物联网平台',
                meta: [{
                        name: 'description',
                        content: '陇南市智慧消防物联网平台'
                    },
                    {
                        name: 'keywords',
                        content: '陇南市智慧消防物联网平台'
                    }
                ],
                link: [{
                    rel: 'icon',
                    href: '/static/htmlico/favicon_muxingyun.ico'
                }]
            }
        }
    },
    created() {
        this.get_device_info();
        this.refreshEvent();
        this.onresizeEvent();
        this.user();
        this.autoRouter(this.$route.path);
        if (this.$localStorage.getStore('import_result').file_id) {
            this.get_import_result({
                data: this.$localStorage.getStore('import_result'),
                message: this.$fbmessage,
                vue: this
            });
        }

        //获取本机配置
        // this.$store.commit('m_user_config',this.$localStorage.getStore('user_config'))
    },

    mounted() {
        this.$nextTick(() => {
            //从远程更新user_config
            get_serverUserConfig().then(res => {
                this.$store.commit('m_user_config', this.$localStorage.getStore('user_config'))
            })
        })
    },

    methods: {
        ...mapActions(['get_device_info', 'get_import_result']),

        user() {
            const userInfo = localStorage.getStore('user');
            if (userInfo) {
                this.$store.commit('user', userInfo);
            }
        },
        change_window() {
            let flag = true;

        },

        /**函数去抖 */
        throttle(fn, interval) {
            var _self = fn, // 保存需要被延迟执行的函数引用
                timer, // 计时器
                firstTime = true; // 是否第一次调用

            return function () {
                var args = arguments,
                    _this = this;

                if (firstTime) { // 如果是第一次调用, 不需要延迟执行
                    _self.apply(_this, args);
                    return firstTime = false;
                }

                if (timer) { // 如果定时器还在, 说明前一次延迟执行还未完成
                    return false;
                }
                timer = setTimeout(function () {
                    clearTimeout(timer);
                    timer = null;
                    _self.apply(_this, args);
                }, interval || 500);
            };
        },

        // 页面尺寸变化事件
        onresizeEvent() {
            let vue = this;
            window.addEventListener('resize', () => {
                vue.throttle(() => {
                    vue.get_device_info();
                }, 100)();
            })
        },
        /** 页面刷新事件，将当前页面的路由存到localstorage中 */
        refreshEvent() {
            window.addEventListener('beforeunload', () => {
                this.$route.query.page_no = '99999';
                let obj = {
                    refresh_falg: true,
                    route: {
                        path: this.$route.path,
                        query: this.$route.query,
                        params: this.$route.params
                    }
                }
                localStorage.setStore('ocCurrentPageInfo', obj);
            })
        },
        autoRouter(path) {
            if (path == '/' || path == '/gis')
                return
            let routerResult = auth_hasRoute(path, this);

            let user_control = this.$localStorage.getStore('user_control');
            let auth = JSON.parse(JSON.stringify(user_control));
            let is_auth = (!auth || auth == 'undefined' || typeOf(auth) == 'object');

            if (routerResult === false && !is_auth) {
                this.$router.replace({
                    path: '/company',
                    query: this.$route.query,
                    params: this.$route.params,
                });
            } else if (routerResult === true) {

            } else {
                this.$router.replace({
                    path: routerResult,
                    query: this.$route.query,
                    params: this.$route.params,
                })
            }
        }
    },
    watch: {
        "$route.path": function (to, from) {
            this.autoRouter(to);
        },
        "$store.state.user_config": function (newVal, old) {
            if (Object.keys(old).length != 0) {
                let data = this.$localStorage.setStore('user_config', this.$store.state.user_config);
                set_serverUserConfig(newVal);
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import url('../../src/assets/css/css_config.less');

.main-page {
    position: relative;
    min-width: @screen-min-width;
}

.main-page-app {
    // display: none;
}

::-webkit-scrollbar {
    width: 0;
    /*滚动条宽度*/
    cursor: pointer;
}
</style>
