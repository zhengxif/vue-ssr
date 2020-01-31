<template>
    <div @click="show" class="red">bar component
        {{ $store.state.username }}
    </div>
    
</template>

<script>
export default {
    // 写的代码都是异步的 全部采用promise
    // 规定在页面级组件才能使用
    asyncData(store) { // 自定义的方法，异步数据，这个方法只在服务端执行
        return store.dispatch('set_username');
    },
    mounted() {
        this.$store.dispatch('set_username');
    },
    methods: {
        show() {
            alert(1);
        }
    }
}
</script>

<style scoped>
.red {
    background: red;
}
</style>