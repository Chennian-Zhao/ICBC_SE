<template>
    <div class="background-container">
        <button class="top-right-button" @click="handleTopRightButtonClick">右上按钮</button>
        <van-action-bar-button class="action-bar-button" plain type="primary" text="开心收下" @click="goToLuckyPage" />
    </div>
</template>

<script>
export default {
    methods: {
        goToLuckyPage() {
            this.$router.push('/lucky'); // 跳转到 '/lucky' 页面
        },
         handleTopRightButtonClick() {
            // 右上按钮点击事件处理
            alert('右上按钮被点击');
        }
    }
};
</script>

<style scoped>
.background-container {
    width: 100%;
    height: 45vh;
    /* 设置容器高度为视口高度的一半 */
    background-image: url('../picture/抽中背景.jpg');
    background-size:contain;
    /* 图片将被缩放以适应背景区域，同时保持图片的纵横比。整个图片将显示出来，但背景区域可能会有空白。 */
    background-position: center;
    /* 图片居中显示 */
    background-repeat: no-repeat;
    /* 防止图片重复 */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
}

.action-bar-button {
    width: calc(90% - 40px);
    /* 按钮宽度 */
    background-color: rgba(247, 234, 234, 0.5);
    /* 按钮背景颜色 */
    color: #2b0000;
    /* 按钮文字颜色 */
    border: 1px solid #1f0000;
    /* 按钮边框 */
    position: absolute;
    bottom: 20px;
    /* 距离底部 20px */
    left: 50%;
    /* 按钮水平居中 */
    transform: translateX(-50%);
    /* 确保按钮水平居中 */
    border-radius: 20px;
    /* 圆角边框 */
    text-align: center;
    /* 文字居中 */
}
</style>

