// 配置的路由

import VueRouter from 'vue-router'
import Vue from 'vue'

import Bar from './components/Bar.vue'
import Foo from './components/Foo.vue'

Vue.use(VueRouter);

export default () => {
    let router = new VueRouter({
        mode: 'history',
        routes: [
            {path: '/', component: Bar},
            {path: '/foo',component: Foo},
        ]
    });
    return router;
}