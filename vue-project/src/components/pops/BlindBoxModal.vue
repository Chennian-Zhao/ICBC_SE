<template>
  <!-- 模态框的遮罩层，点击遮罩层关闭模态框 -->
  <div class="modal-overlay" v-if="isVisible" @click.self="closeModal">
    <div class="modal-content">
      <div>
        <p class="modal-header">请从已获得盲盒中选择要送出的盲盒</p>
      </div>
      <!-- 轮播图容器 -->
      <div class="carousel">
        <!-- 左侧切换按钮 -->
        <div @click="prevSlide" class="carousel-prev-icon-left"></div>
        <!-- 轮播图图片列表 -->
        <div class="carousel-slides">
          <img v-for="(blindbox, index) in blindboxes" :key="index" :src="blindbox.image"
            :style="{ left: index * 100 + '%', 'transform': dynamicstyle }" :alt="blindbox.name" class="blindbox-img" />
        </div>
        <!-- 右侧切换按钮 -->
        <div @click="nextSlide" class="carousel-prev-icon-right"></div>
      </div>
      <div class="carousel-text">
        <div v-for="(blindbox, index) in blindboxes" :key="index"
          :style="{ left: index * 100 + '%', 'transform': dynamicTextStyle }" class="blindbox-name">
          {{ blindbox.name }}
        </div>
      </div>
      <!-- 赠送按钮 -->
      <button @click="handleGift" style="font-size: 18px;">赠送</button>
      <ConfirmDialog :visible="showConfirmDialog" :blindBoxName="currentBlindBoxName" @confirm="handleConfirm"
        @cancel="handleCancel" />
    </div>
  </div>
</template>

<script>
import image1 from '@/assets/images/三丽鸥/美乐蒂.png';
import image2 from '@/assets/images/三丽鸥/帕恰狗.png';
import image3 from '@/assets/images/三丽鸥/HelloKitty.png';
import image4 from '@/assets/images/Disney/草莓熊.png';
import image5 from '@/assets/images/Disney/火腿猪.png';
import image6 from '@/assets/images/Disney/玛丽猫.png';
import ConfirmDialog from '@/components/pops/ConfirmDialog.vue';
import state from "@/api/global_variable.js";

export default {
  name: 'BlindBoxModal',
  components: {
    ConfirmDialog
  },
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
      // blindboxes: [
      //   { name: '美乐蒂', image: state.goldBeanSkins[0] },
      //   { name: '帕恰狗', image: image2 },
      //   { name: 'HelloKitty', image: image3 },
      //   { name: '草莓熊', image: image4 },
      //   { name: '火腿猪', image: image5 },
      //   { name: '玛丽猫', image: image6 }
      // ],
      blindboxes: state.goldBeanSkins.map((skin, index) => ({
        name: skin.name || `盲盒${index + 1}`,
        image: skin.image
      })),
      dynamicstyle: "", // 动态样式，用于控制图片的动画效果
      dynamicTextStyle: "",
      currentSlide: 0, // 当前显示的图片索引
      interval: null, // 定时器对象
      showConfirmDialog: false, // 控制确认弹窗的显示
      currentBlindBoxName: '' // 当前盲盒名称
    };
  },
  mounted() {
    // 组件挂载后启动自动播放
    this.startSlideshow();
    this.updateCurrentBlindBoxName();
  },
  methods: {
    // 切换到下一张图片
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.blindboxes.length;
      this.setStyle();
      this.updateCurrentBlindBoxName();
    },
    // 切换到上一张图片
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.blindboxes.length) % this.blindboxes.length;
      this.setStyle();
      this.updateCurrentBlindBoxName();
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
        this.updateCurrentBlindBoxName();
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
    // 显示确认弹窗
    handleGift() {
      this.stopSlideshow(); // 停止轮播
      this.showConfirmDialog = true;
    },
    // 跳转到赠送结算页面
    handleConfirm() {
      console.log('跳转到赠送结算页面');
      this.showConfirmDialog = false;
      this.$emit('close');
      state.sendmoney = 0;
      this.$router.push({ name: 'GiftSettlement' });
    },
    handleCancel() {
      this.startSlideshow(); // 重新启动轮播
      this.showConfirmDialog = false;
    },
    // 更新当前盲盒名称
    updateCurrentBlindBoxName() {
      this.currentBlindBoxName = this.blindboxes[this.currentSlide].name;
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
  background: #fef5e8;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
  border: 5px solid gold;
  /* 添加金色边框 */
}

/* 模态框头部样式 */
.modal-header {
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  /* 文字居中 */
  margin-bottom: 30px;
  font-size: 20px;
  font-family: 'Microsoft YaHei', Georgia, 'Times New Roman', Times, serif;
  /* 使用微软雅黑字体 */
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
  object-fit: cover;
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
  transform: rotate(180deg);
  /* 旋转180度 */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 999;
}

/* 右

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


/* 盲盒名字样式 */
.blindbox-name {
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
  color: #333;
}

/* 文字轮播容器样式 */
.carousel-text {
  position: relative;
  width: 320px;
  height: 40px;
  /* 调整高度以适应文字 */
  overflow: hidden;
  margin-top: 10px;
}

/* 盲盒名字样式 */
.blindbox-name {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: #333;
  transition: 0.5s transform ease-in-out;
}
</style>