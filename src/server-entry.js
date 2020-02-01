import createApp from './app'

export default (context) => {
    // app 有可能涉及到异步逻辑
    return new Promise((resolve, reject) => {
        let { app, router, store } = createApp();
        router.push(context.url); // 跳转到路由
        const meta = app.$meta();
        // 为了防止路由中的异步逻辑， 所以采用 promise的形式， 等待路由加载完成后 返回vue实例，服务端渲染出完整的页面
        router.onReady(() => {
            // 需要把当前页面中匹配到的组件， 找到他的asyncData方法让他执行
            let matchesComponents = router.getMatchedComponents(); // 获取当前路径匹配到的组件
            Promise.all(matchesComponents.map((comp) => {
                if(comp.asyncData) {
                    return comp.asyncData(store);
                }
            })).then(() => {
                // 把vuex中的状态 挂载到上下文中的state上
                context.state = store.state;
                context.meta = meta;
                resolve(app);
            })
        });
    })
}