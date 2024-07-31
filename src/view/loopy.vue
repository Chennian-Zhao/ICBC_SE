<template>
    <HelloWorld msg="Vite + Vue" />
    <div class="background-container">
        <!-- 其他内容 -->

        <div>
            <van-nav-bar title="小金豆盲盒">
                <template #left>
                    <van-icon name="arrow-left" color="#ff0000" @click="onClickLeft" />
                </template>
                <template #right>
                    <van-dropdown-menu class="menu-right">
                        <van-dropdown-item v-model="selected" :options="options" />
                    </van-dropdown-menu>
                </template>
            </van-nav-bar>
        </div>

        <van-notice-bar left-icon="volume-o" text="🎉揭开神秘面纱，快来开启你的专属惊喜！🎉" />
        <div class="center-container">
            <div class="image-container">
                <img src="../picture/三丽鸥盲盒.png" alt="Description" class="animated-image">

                <div class="blindbox-text">露比系列盲盒</div>
            </div>


            <van-divider class="fancy-text">
                款式展示
            </van-divider>

            <div class="carousel-container">

                <van-swipe :autoplay="3000" indicator-color="white" ref="swipe">
                    <van-swipe-item v-for="(item, index) in images" :key="index">
                        <img :src="item.src" :alt="item.alt" class="carousel-image" />
                        <div class="carousel-caption">{{ item.caption }}</div>
                    </van-swipe-item>
                </van-swipe>
                <van-icon name="arrow-left" class="carousel-nav left-nav" @click="prev" />
                <van-icon name="arrow" class="carousel-nav right-nav" @click="next" />
            </div>
        </div>
        <van-action-bar>
            <van-col span="4" class="icon-column">
                <van-action-bar-icon icon="coupon-o" text="显示卡" @click="onClickIcon" />
            </van-col>

            <van-action-bar-button class="button" type="primary" text="就抽它" @click="goToLuckyPage" />

            <van-col span="4" class="icon-column">
                <van-badge :content="2" color="#d73434">
                    <van-action-bar-icon icon="coupon-o" text="提示卡" @click="onClickIcon" />
                </van-badge>
            </van-col>
        </van-action-bar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selected: 'loopy',
            options: [
                { text: '三丽鸥', value: 'home' },
                { text: '迪士尼', value: 'Disney' },
                { text: '露比', value: 'loopy' },
            ],
            images: [
                { src: '/src/picture/大耳狗1.jpg', alt: 'Image 1', caption: '大耳狗' },
                { src: '/src/picture/帕恰狗1.jpg', alt: 'Image 2', caption: '帕恰狗' },
                { src: '/src/picture/库洛米1.jpg', alt: 'Image 3', caption: '库洛米' },
                { src: '/src/picture/美乐蒂1.jpg', alt: 'Image 4', caption: '美乐蒂' },

            ],
        };
    },
    watch: {
        selected(newVal) {
            this.onMenuClick(newVal);
        }
    },
    methods: {
        goToLuckyPage() {
            this.$router.push('/lucky'); // 使用 $router.push 方法跳转到 'lucky' 页面
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        prev() {
            this.$refs.swipe.prev();
        },
        // Method to navigate to the next slide
        next() {
            this.$refs.swipe.next();
        },
        onMenuClick(menu) {
            switch (menu) {
                case 'home':
                    this.$router.push('/');
                    break;
                case 'Disney':
                    this.$router.push('/disney');
                    break;
                case 'loopy':
                    this.$router.push('/loopy');
                    break;
            }
        }
    }
};
</script>

<style scoped>
.icon-column {
    display: flex;
    align-items: center;
    /* 垂直居中 */
    justify-content: center;
    /* 水平居中 */
}

.van-action-bar-icon,
.van-badge {
    display: flex;
    align-items: center;
}

.menu-right {
    width: 0px;
}

/* 自定义DropdownMenu容器 */
.van-dropdown-menu {
    background-color: #ffffff;
    border: 10px solid #ffffff;
}

/* 自定义DropdownItem */
.van-dropdown-item {
    color: #333;
}

/* 自定义下拉菜单的选项 */
.van-dropdown-item__option {
    background-color: #fff;
    color: #4c4c4c;
}

/* 自定义选中状态 */
.van-dropdown-item__option--selected {
    background-color: #ffffff;
    color: #6cc5e6;
}

.van-dropdown-menu__item--active {
    color: #5594f2;
    /* 这里修改为你想要的颜色 */
}

.van-dropdown-item__option--active {
    color: #d73434;
    /* 这里修改为你想要的颜色 */
}

.button {
    background-color: #d73434;
}

.van-nav-bar__left {
    color: #d73434;
    /* 这里设置你想要的颜色 */
}

/* 如果你想改变箭头的颜色 */
.van-nav-bar__arrow {
    color: #d73434;
    /* 这里设置你想要的颜色 */
}

.carousel-container {
    position: relative;
    /* 添加相对定位 */
    width: 275px;
    height: 200px;
    border-radius: 50px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #200000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.carousel-image {
    width: 100%;
    height: 200px;
    display: block;
}

.carousel-caption {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 16px;
}
.center-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
}
.background-container {
    width: 100%;
    height: 100vh;
    background-image: url('../picture/露比页1.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.image-container {
    display: flex;
    flex-direction: column;
    /* 确保项目垂直堆叠 */
    justify-content: center;
    /* 垂直居中项目 */
    align-items: center;
    /* 水平居中项目 */
    width: 250px;
    /* 设置容器宽度 */
    height: 250px;
    /* 设置容器高度 */
    border: 1px solid #200000;
    /* 可选：添加边框以增强可见性 */
    /* margin: 15px auto;
    /* 自动水平居中 */
    border-radius: 20px;
    background-color: rgb(245, 245, 245);
}

.image-container img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    /* 保持图片比例 */
}

.blindbox-text {
    text-align: center;
    /* Center aligns all inline and inline-block elements */
    font-size: small;
}

.animated-image {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease-out;
    /* 添加过渡动画 */
}

.image-container:hover .animated-image {
    transform: scale(1.1);
    /* 鼠标悬停时放大图片 */
}

.fancy-text {
    font-size: 20px;
    color: #000000;
    font-family: 'Georgia', serif;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    opacity: 0.9;
    /*border-color: #200000;*/
    border-radius: 20px;
}

.carousel-nav {

    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 50%;
    z-index: 10;
    /* Ensure it's above the swipe content */
}

.left-nav {
    left: 10px;

}

.right-nav {
    right: 10px;
    /* Adjust as needed */

}

.carousel-nav:hover {
    background-color: rgba(0, 0, 0, 0.8);
}
</style>
