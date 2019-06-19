import Vue from 'vue';
import Vuex from 'vuex';

const files = require.context('@/page/', true, /\.store.js$/)
const modules = {}

console.log('-----------', files.keys())

function getKey(path){
    let key = '';
    const paths = path.split('/');
    key = paths[paths.length - 1].replace('.store.js', '')
    return key;
}

files.keys().forEach((path) => {
    const newKey = getKey(path)
    if (!newKey) {
        return;
    }
    modules[newKey] = files(path).default
})

console.log(modules)

Vue.use(Vuex);

export default new Vuex.Store({ modules });
