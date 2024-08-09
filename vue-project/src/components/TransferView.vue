<template>
  <div class="transfer-page">
    <div class="header">
      <img src="@/assets/arrow_right@2x.png" @click="goBack" class="back-icon">
      <p class="header-title">赠金予卿 留爱于心</p>
    </div>
  

    <div>
      <img :src="bannerImage" alt="七夕节" class="banner-img" />
    </div>

    <div class="giftbox">
      <div class="secret left" @click="openBlindBoxModal">
      <img src="../assets/side.gif " alt="盲盒GIF" class="blind-box-gif" style="transform: rotate(180deg);">
    </div>
    <div class="giftDecor">
        <img :src="giftImage" alt="Gift" class="gift-img" />
    </div>
    <div class="secret right" @click="openBlindBoxModal">
      <img src="../assets/side.gif" alt="盲盒GIF" class="blind-box-gif" >
    </div>
      
    </div>
    <div class="gift-options">
      <div class="options">
        <button v-for="(option, index) in options" :key="index" :class="['option-button', { selected: selectedOption === index }]" @click="selectOption(index)">
          {{ option }}
        </button>
      </div>
      <div class="design">
          <div class="secret right" @click="openBlindBoxModal">
        <img src="../assets/secretgift.gif" alt="盲盒GIF" class="design_gif">
        </div>
        <div class="design_tip">
          <button class="design_button">戳戳左右赠送盲盒金豆</button>
        </div>
        <div class="secret right" @click="openBlindBoxModal">
        <img src="../assets/secretgift.gif" alt="盲盒GIF" class="design_gif">
    </div>
      </div>
 
      <button class="gift-button" @click="goToGiftSettlementPage">戳我赠送主题金豆</button>
    </div>

    <BlindBoxModal :isVisible="isBlindBoxModalVisible" @close="closeBlindBoxModal" />
  </div>
</template>

<script>
import bannerImage from '@/assets/banner.png';
import giftImage from '@/assets/gift.png';
import BlindBoxModal from '@/components/pops/BlindBoxModal.vue';

export default {
  name: 'Transfer',
  components: {
    BlindBoxModal
  },
  data() {
    return {
      options: ['乞巧金', '孝顺金', '友谊金', '智慧金'],
      selectedOption: 0,
      bannerImage: bannerImage,
      giftImage: giftImage,
      isBlindBoxModalVisible: false
    };
  },
  methods: {
    openBlindBoxModal() {
      this.isBlindBoxModalVisible = true;
    },
    closeBlindBoxModal() {
      this.isBlindBoxModalVisible = false;
    },
    gotoBlindBox() {
      this.$router.push({ name: 'blindbox' });
    },
    goToGiftSettlementPage() {
      this.$router.push({ name: 'GiftSettlement' });
    },
    goBack() {
      this.$router.push({ name: 'Home' });
    },
    async selectOption(index) {
      this.selectedOption = index;
      switch (index) {
        case 0:
          this.bannerImage = (await import('@/assets/banner.png')).default;
          this.giftImage = (await import('@/assets/gift.png')).default;
          break;
        case 1:
          this.bannerImage = (await import('@/assets/banner1.png')).default;
          this.giftImage = (await import('@/assets/gift1.png')).default;
          break;
        case 2:
          this.bannerImage = (await import('@/assets/banner2.png')).default;
          this.giftImage = (await import('@/assets/gift2.png')).default;
          break;
        case 3:
          this.bannerImage = (await import('@/assets/banner3.png')).default;
          this.giftImage = (await import('@/assets/gift3.png')).default;
          break;
        default:
          this.bannerImage = (await import('@/assets/banner.png')).default;
          this.giftImage = (await import('@/assets/gift.png')).default;
      }
    }
  }
};
</script>


<style scoped>
/* 保持原样 */
.transfer-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #fbf1d0;
  width: 100vw;
  height: 100vh;
}

.header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  position: relative;
  background-color: aliceblue
}

.header-title {
  flex-grow: 1; /* 占据剩余空间 */
  text-align: center; /* 文本居中对齐 */
  font-size: 20px; /* 字体大小为20px */
}

.back-icon {
  position: relative;
  left: -15px;
  width: 40px;
  height: 40px;
  margin-top: -7px;
  cursor: pointer;
  transform: rotate(180deg);
}

.banner-img {
  width: 100%;
  /* 将图片设置为块级元素 */
  display: block;
  /* 自动设置左右外边距，使图片水平居中 */
  margin: 0 auto;
}

.tip {
  width: 100%;
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 50px;
  background-color: #f9b628;
  .tip_font {
    font-size: 20px;
    color: black;
    font-family: 'Microsoft YaHei', sans-serif; /* 设置字体为微软雅黑 */
  }
  height: auto;
  background-color: #f9b628;
}
.secret {
  /* display: flex; 
  justify-content: center;
  align-items: center; 
  width: 100%;
  background-color: #f0c040;
  height: auto; */
  width: 45%; /* 设置宽度以便两个图片可以并排显示 */
  display: flex;
  justify-content: center; /* 使图片在容器内居中 */
}

.gift-options {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.blind-box-gif {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.options {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}
.design {
  border: 2px solid gold;
  height: 80px;
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
  height: auto;
  .design_gif{
    width: 80%;
    object-fit: cover;

  }
  .design_button{
    background-color: #f9b628;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    color: #5a4e39;
    margin-top: 70px;
  }
}
.option-button {
  background-color: #a49797;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid gold;
  color: white;
  transition: background-color 0.3s, color 0.3s;
  font-size: 18px;
  font-family: 'Microsoft YaHei', sans-serif;
}

.option-button.selected {
  background-color: white;
  color: #f0c040;
}

.giftbox {
  display: flex;
  width: 100%;
  height: 200px;
  position: relative;
  border: 2px solid gold;
  /* background-image: url(../assets/gift_bg.png); */
  align-items: center;
  justify-content: space-between;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.giftDecor {
  width: 150px;
  height: 130px;
  border-radius: 15px;
  order: 8px solid gold;
  display: flex;
  align-items: center;
  justify-content: center;
  
  
}


.gift-img {
  width: 100%;
  height: 100%;
  object-fit: cover;

}

.golden-rectangle {
  width: 360px;
  height: 300px;
  border: 2px solid gold;
  border-radius: 15px;
  margin-top: 20px;
  background-color: white;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  animation: glowing 1.5s infinite;
}

@keyframes glowing {
  0% { border-color: gold; }
  50% { border-color: #ffdf00; }
  100% { border-color: gold; }
}

.gift-button {
  
  width: 100%;
  background-color: #f9b628;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  color: #5a4e39;
  
}
</style>