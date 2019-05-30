import Vue from 'vue';
import Vuex from 'vuex';

const files = require.context('@/page/', false, /\.js$/)
const modules = {}

files.keys().forEach((key) => {
    if (key === './index.js') return
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

Vue.use(Vuex);

export default new Vuex.Store(modules);
