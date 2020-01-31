import Vue from 'vue';
import App from './App.vue';

import createStore from './store'

import createRouter from './router'
// 为了兼容服务端， 要把这个方法改造成函数
export default () => {
    let router = createRouter();
    let store = createStore();
    let app = new Vue({
        router,
        store,
        render: (h) => h(App)
    })
    return { app, router, store };
}

