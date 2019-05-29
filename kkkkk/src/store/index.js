import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations.js';
import actions from './action.js';
import getters from './getters.js';


import { createLocalEnum } from '../assets/js/fbFunction_fn.js';


Vue.use(Vuex);
const state = {
    win_arr: [], // open打开窗口的window对象
    jurisdicOffsetTop: 0,
    // 首页中心、主管、联网单位设备统计+单位类型统计+单位接入统计
    company_system_count: {},
    // 官网user
    web_user: {},
    // 官网登陆状态
    web_login_status: false,
    // webcoket 存储数据
    sockt_data: {},
    Websocket: null, // 全局websocket

    user_config: {},

    // 用户自定义表头
    user_custom_head: {},

    // 缓存告警受理中7天报警数以及误报率
    alarmdeal_seven_data: {},

    // 是否导入 数据
    import_result_data: {},

    pageVue: {}, // 当前页面的Vue实例

    editPageScrollbar: {},

    company_list_status_flag: true,

    // base_pagenew 1级导航的top；
    base_pagenew_top1: 0,
    // 2级
    base_pagenew_top2: 0,

    // 左导航切换收起展开监听标记
    left_width_change_flag: -1,
    // 单位档案模块左侧单位列表展开收起标志
    left_company_list_expand_flag: 0,


    dahuaVideo: '111',
    //  风险评估数据
    msg_type: 'risk_test', // risk_test 测试数据  risk  线上数据
    risk_manage_leave: false, // 风险评估判断是否重新检测标志
    is_complate: true, // 风险评估是否完成
    check_list: [], // 风险评估检查项数据
    evaluation_score: 100, // 当前分数
    evaluation_status_data: {
        status_text: '全面检测，消除隐患更安全',
        current_tip: '您已经--天没有进行风险评估',
    }, // 当前检测项
    current_check_class: 1, // 当前检测大项
    current_check_type: 1, // 当前检测小项
    total_failed: 0,
    evaluation_status: '0', // 评估状态
    is_stop: false, // 暂停标志
    last_check_riskid: '', // 上次检测id 暂停使用
    check_components_status: '0',
    slot_status: '0',
    risk_check_components_status: '', // 组件状态
    base_width: '', // 每项咱比
    prowidth: '', // 进度条
    risk_check_id: '', // risk_id


    current_video_account_info: null, // 当前联网单位视频账号信息(用于登录大华流媒体或者海康萤石云)

    /** 联网单位类型 */
    company_type: {
        company: 'info_company_cared',
        center: 'info_company_center',
    },

    // 记录设备信息，页面加载的时候计算
    device_info: {
        document_width: 0,
        document_height: 0,
        scrollbar_width: 0,
        topNav_height: 60,
        page_width: 0,
        content_height: 400, // 内容区最小高度，等于显示区域高度-顶部导航高度
        right_content_height: 0, // 联网单位右侧内容区高度
        main_content_width_change: false, // 主要内容区的宽度变化标志
    },

    // 登录状态
    status: false,
    /**
     * 用户登录后的个人信息
     */
    user_info: {
        uid: '',
        company_id: '-1',
        company_type: 'info_company_cared',
        center_id: '14080001',
        company_name: '',
    },

    // 联网单位中的信息
    company_info: {
        company_id: '', // 联网单位id
        buildings_list: [], // 联网单位建筑列表,
        systems_list: [], // 联网单位系统列表,
        serviceing_list: [], // 维保信息列表
        company_info: null, // 当前联网单位单位信息
        building_info: null, // 当前联网单位建筑信息
        system_info: null, // 当前联网单位系统信息
    },
    // 平面图中心点坐标
    floorPlanCenter: [116.335285, 39.942384],

    // 本地所使用的字典表
    local_enums: {
    // 设备类型
        device_thing_type: [{
            id: '10001',
            name: '用户信息传输装置',
        },
        {
            id: '10009',
            name: '网关',
        },
        {
            id: '10010',
            name: '基站',
        },
        ],
        // 设备传输方式
        transmission_mode: [{
            id: 'GPRS',
            name: 'GPRS',
        },
        {
            id: 'NB-Iot',
            name: 'NB-Iot',
        },
        {
            id: '4G',
            name: '4G',
        },
        {
            id: 'WIFI',
            name: 'WIFI',
        },
        {
            id: 'LAN',
            name: 'LAN',
        },
        ],
        // 设备主机接入方式
        device_link_way: [{
            id: '打印机',
            name: '打印机',
        },
        {
            id: '主协议板',
            name: '主协议版',
        },
        {
            id: '从协议板',
            name: '从协议版',
        },
        ],
        // 设备组内传输方式
        group_transmission: [{
            id: 'RF433',
            name: 'RF433',
        },
        {
            id: 'LORA',
            name: 'LORA',
        },
        {
            id: 'ZIGBEE',
            name: 'ZIGBEE',
        },
        ],

        /** 部件水压表信息 */
        // 高压告警阀值
        manometer_upper_limit: createLocalEnum(0.8, 1.5, 0.1),
        // 低压阀值
        manometer_lower_limit: createLocalEnum(0.03, 0.2, 0.01),
        // 采样频率
        manometer_sensing_frequency: createLocalEnum(1, 30, 1),
        // 数据发送频率
        manometer_sending_frequency: createLocalEnum(1, 24, 1),

        // 三种管径值
        guanjing: [{
            id: '65mm',
            name: '65mm',
        },
        {
            id: '100mm',
            name: '100mm',
        }, {
            id: '150mm',
            name: '150mm',
        },
        ],


        /** 部件 水位仪 设置阀值 */
        // 高水位
        level_upper_limit: createLocalEnum(1, 4.8, 0.1),
        // 低水位
        level_lower_limit: createLocalEnum(0.1, 4, 0.1),
        // 高温
        level_m_upper_limit: createLocalEnum(50, 100, 1),
        // 低温
        level_m_lower_limit: createLocalEnum(0, 10, 1),
        // 采样频率
        level_sensing_frequency: createLocalEnum(1, 30, 1),
        // 采样频率 公共
        sensing_frequency: createLocalEnum(1, 30, 1),

        // 数据发送频率
        level_sending_frequency: createLocalEnum(1, 24, 1),

        /** 电气火灾探测器 */
        // 高电流告警阀值
        electric_a_upper_limit: createLocalEnum(200, 1000, 100),
        // 高温告警阀值
        electric_m_upper_limit: createLocalEnum(40, 140, 10),
        // 采样频率
        electric_sensing_frequency: createLocalEnum(1, 30, 1),
        // 数据发送频率
        electric_sending_frequency: createLocalEnum(1, 24, 1),

        /** 设备新增 蓝牙 */
        // 采样频率
        bluetooth_sensing_frequency: createLocalEnum(1, 30, 1),
        // 数据发送频率
        bluetooth_sending_frequency: createLocalEnum(1, 24, 1),

        /** 设备新增 感温探测器 */
        // 采样频率
        ganwen_sensing_frequency: createLocalEnum(1, 30, 1),
        // 数据发送频率
        ganwen_sending_frequency: createLocalEnum(1, 24, 1),

        /** 设备新增 可燃探测器 */
        keranqi_sensing_frequency: createLocalEnum(1, 30, 1),
        // 数据发送频率
        keranqi_sending_frequency: createLocalEnum(1, 24, 1),

        // 消火栓添加设备  压力终端  带压力检测的智能闷盖
        firecock_upper_limit: createLocalEnum(0.8, 1.5, 0.1), // 高压阈值
        firecock_lower_limit: createLocalEnum(0.03, 0.20, 0.01), // 低压阈值
        firecock_sensing_frequency: createLocalEnum(1, 30, 1), // 采样频率
        firecock_sending_frequency: createLocalEnum(1, 24, 1), // 发送频率

        // 数据发送频率 公共
        sending_frequency: createLocalEnum(1, 24, 1),

        // 用户人员状态
        enum_user_staff: [
            { id: '1', name: '在职' },
            { id: '0', name: '离职' },
        ],

        // 维保任务来源
        origin_from: [{
            id: '1',
            name: '计划中',
        },
        {
            id: '2',
            name: '业主通知',
        },
            /* {
              id: "3",
              name: "业主申请"
            }, */
        ],
        // 维保属性
        facility_check_cycle: [{
            name: '月',
            id: '3',
        },
        {
            name: '季',
            id: '2',
        },
        {
            name: '年',
            id: '1',
        },
        ],
    },


    // 数据库请求回来的字典表
    enums_dictionary: {

    },


    // 用户权限
    users: null,


    // 信息显示缺省字符
    info_no_data: '',
    // 字段用于用户 点击头像 收起 （点击headers时候收不起来）
    user_avatar_shrink: false,
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});
