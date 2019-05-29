import Vue from 'vue';
import Router from 'vue-router';

import companyRouter from './company_router.js';
import alarmdealRouter from './alarmdeal_router.js';
import firecockRouter from './firecock_router.js';
import systemManageRouter from './system_manage_router.js';
import vyborgUnitRouter from './vyborg_unit_router.js';
import gisRouter from './gis_router.js';
import thirdsystemRouter from './thirdsystem_router.js';
import statistic from './statistic_router.js';
import logoSet from './logo_set_router.js';
import videoRouter from './video_router';
import PatrolRouter from './patrol_router.js';
import dangerRouter from './danger_router.js';
import PersonPosition from './PersonPosition_router.js';
import Myhome_router from './Myhome_router.js';
import resource_router from './resourceManage_router.js';
import digitalPlanRouter from './digital_plan_router.js';
import notice_announcement_router from './notice_announcement_router.js';
import rules_engine_router from './rules_router.js';
import risk_management from './risk_management_router.js';
import home_page from './home_page_router.js';
import statisticv2 from './statisticv2_router.js';
import detailsPage from './details_page_route.js';

Vue.use(Router);

const newRouter = new Router({
    routes: [
    // 首页
        home_page,
        // 联网单位
        companyRouter,
        // 告警受理
        alarmdealRouter,
        // 市政消火栓
        firecockRouter,
        // 系统管理
        systemManageRouter,
        // 维保单位
        vyborgUnitRouter,
        // gis 模块
        gisRouter,
        // 第三方平台
        thirdsystemRouter,
        // 统计分析
        statistic,
        logoSet,
        // 视频模块
        videoRouter,
        // 巡检查岗
        PatrolRouter,
        // 隐患
        dangerRouter,
        // 人员定位
        PersonPosition,
        // 个人中心
        Myhome_router,
        // 资源管理
        resource_router,
        // 数字预案
        digitalPlanRouter,
        // 通知公告
        notice_announcement_router,
        // 规则引擎
        rules_engine_router,
        // 风险评估
        risk_management,
        // 统计分析第二版
        statisticv2,
        // 详情页
        detailsPage,
    // {
    //   path:'*',
    //   redirect:'/'
    // }
    ],
});

export default newRouter;
