<template>
  <!-- 模态框的遮罩层，点击遮罩层关闭模态框 -->
  <div class="modal-overlay" v-if="isVisible" @click.self="closeModal">
    <div class="modal-content">
      <div class="model-header">
        <p class = "modal-header">请选择你要赠送的盲盒金豆</p>
      </div>
      <!-- 轮播图容器 -->
      <div class="carousel">
        <!-- 左侧切换按钮 -->
        <div @click="prevSlide" class="carousel-prev-icon-left"></div>
        <!-- 轮播图图片列表 -->
        <div class="carousel-slides">
          <img
            v-for="(blindbox, index) in blindboxes"
            :key="index"
            :src="blindbox.image"
            :style="{left: index * 100 + '%', 'transform': dynamicstyle}"
            :alt="blindbox.name"
            class="blindbox-img"
          />
          
        </div>
        <!-- 右侧切换按钮 -->
        <div @click="nextSlide" class="carousel-prev-icon-right"></div>
      </div>
      <div class="carousel-text">
        <div
          v-for="(blindbox, index) in blindboxes"
          :key="index"
          :style="{left: index * 100 + '%', 'transform': dynamicTextStyle}"
          class="blindbox-name"
        >
          {{ blindbox.name }}
        </div>
      </div>
      <!-- 赠送按钮 -->
      <button @click="goToGiftSettlementPage">赠送</button>
    </div>
  </div>
</template>

<script>
import image1 from '@/assets/images/三丽鸥/美乐蒂.png';
import image2 from '@/assets/images/三丽鸥/帕恰狗.png';
import image3 from '@/assets/images/三丽鸥/HelloKitty.png';

export default {
  name: 'BlindBoxModal',
  props: {
    // 控制模态框是否可见
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      // 盲盒图片列表
      blindboxes: [
        { name: '盲盒1', image: image1 },
        { name: '盲盒2', image: image2 },
        { name: '盲盒3', image: image3 },
        { name: '盲盒4', image: image1 },
        { name: '盲盒5', image: image2 },
        { name: '盲盒6', image: image3 }
      ],
      dynamicstyle: "", // 动态样式，用于控制图片的动画效果
      dynamicTextStyle: "",
      currentSlide: 0, // 当前显示的图片索引
      interval: null, // 定时器对象
    };
  },
  mounted() {
    // 组件挂载后启动自动播放
    this.startSlideshow();
  },
  methods: {
    // 切换到下一张图片
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.blindboxes.length;
      this.setStyle();
    },
    // 切换到上一张图片
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.blindboxes.length) % this.blindboxes.length;
      this.setStyle();
    },
    // 设置图片的动画效果
    setStyle() {
      this.dynamicstyle = `translateX(-${this.currentSlide * 100}%)`;
      this.dynamicTextStyle = `translateX(-${this.currentSlide * 100}%)`;
    },
    // 启动自动播放
    startSlideshow() {
      this.interval = setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.blindboxes.length;
        this.setStyle();
      }, 3000);
    },
    // 停止自动播放
    stopSlideshow() {
      clearInterval(this.interval);
    },
    // 关闭模态框
    closeModal() {
      this.$emit('close');
    },
    // 跳转到赠送结算页面
    goToGiftSettlementPage() {
      this.$emit('close');
      this.$router.push({ name: 'GiftSettlement' });
    }
  }
};
</script>

<style scoped>
/* 模态框遮罩层样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

}

/* 模态框内容样式 */
.modal-content {
  background:#fef5e8;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
  border: 5px solid gold; /* 添加金色边框 */
}
/* 模态框头部样式 */
.modal-header {
  width:100%;
  display: flex;
  justify-content: center;
  text-align: center; /* 文字居中 */
  margin-bottom: 30px;
  font-family: 'Microsoft YaHei', Georgia, 'Times New Roman', Times, serif; /* 使用微软雅黑字体 */
}
/* 轮播图容器样式 */
.carousel {
  position: relative;
}

/* 轮播图图片列表样式 */
.carousel-slides {
  position: relative;
  width: 320px;
  height: 173px;
  overflow: hidden;
}

/* 轮播图图片样式 */
.carousel-slides img {
  display: inline-block;
  position: absolute;
  width: inherit;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  height: 100%;
  transition: 0.5s transform ease-in-out;
}

/* 左侧切换按钮样式 */
.carousel-prev-icon-left {
  position: absolute;
  left: 10px;
  top: 55px;
  height: 50px;
  width: 40px;
  border: none;
  background-image: url('../../assets/arrow_right@2x.png');
  transform: rotate(180deg); /* 旋转180度 */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 999;
}

/* 右侧切换按钮样式 */
.carousel-prev-icon-right {
  position: absolute;
  right: 10px;
  top: 55px;
  height: 50px;
  width: 40px;
  border: none;
  background-image: url('../../assets/arrow_right@2x.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 999;
}

/* 赠送按钮样式 */
button {
  width: 100%;
  background-color: #f9b628;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  color: #5a4e39;
  margin-top: 30px;
}

/* 赠送按钮悬停样式 */
button:hover {
  background-color: #0056b3;
}
/* 盲盒名字样式 */
.blindbox-name {
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
  color:  #333;
}

/* 文字轮播容器样式 */
.carousel-text {
  position: relative;
  width: 320px;
  height: 30px; /* 调整高度以适应文字 */
  overflow: hidden;
  margin-top: 10px;
}

/* 盲盒名字样式 */
.blindbox-name {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: #333;
  transition: 0.5s transform ease-in-out;
}


</style>