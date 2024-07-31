<template>
    <van-nav-bar title="标题" left-text="返回" @click-left="onClickLeft">
        <template #right>
            <van-icon name="more" color="#ff0000" @click="onClickRight" />
        </template>
    </van-nav-bar>
</template>

<style scoped>

/* 使用 deep 选择器强制样式穿透 */
::v-deep .van-nav-bar__text {
    color: #ff0000 !important;
    /* 设置导航栏文本颜色为红色 */
}

</style>



<script>
export default {
    methods: {
        onClickLeft() {
            // 左侧按钮点击事件处理
        },
        onClickRight() {
            // 右侧按钮点击事件处理
        },
    },
};
</script>
