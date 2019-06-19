import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const files = require.context('@/page/', true, /\.router.js$/)
const routes = []

function getKey(path){
    let key = '';
    const paths = path.split('/');
    key = paths[paths.length - 1].replace('.router.js', '')
    return key;
}

files.keys().forEach((path) => {
    const newKey = getKey(path)
    if (!newKey) {
        return;
    }
    routes.push(files(path).default)
})

const newRouter = new Router({
    routes,
});

export default newRouter;
