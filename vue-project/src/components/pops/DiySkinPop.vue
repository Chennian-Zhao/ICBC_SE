<template>
  <!-- <el-button type="text" class="personalize" plain @click="goToDiyPop = true"></el-button> -->
  <el-button type="text" class="personalize" plain @click="state.DiySkinPop = true"></el-button>

  <!-- <el-dialog :show-close="false" v-model="goToDiyPop" width="98%" class="diySkin-dialog-center"> -->
    <el-dialog :show-close="false" v-model="state.DiySkinPop" width="98%" class="diySkin-dialog-center">
    <!-- <div>
      <el-row class="demo-gold" :gutter="20">
        <el-col v-for="(item, index) in state.goldBeanSkins" :key="index" :span="6">
          <div class="block" :class="{selected: selectedGoldBeanSkin === index}" @click="selectGoldBeanSkin(index)">
            <el-avatar shape="square" :size="50" :src="item"/>
          </div>
        </el-col>
      </el-row>
    </div> -->
    <div>
      <el-row class="demo-gold" :gutter="20">
        <el-col v-for="(item, index) in state.goldBeanSkins" :key="index" :span="6">
          <div class="block" :class="{ selected: selectedGoldBeanSkin === index }" @click="selectGoldBeanSkin(index)">
            <el-avatar shape="square" :size="50" :src="item.image" />
          </div>
        </el-col>
      </el-row>
    </div>
    <template #footer>
      <!-- <el-button color="#f5c153" size="large" class="confirm-button" @click="diyConfirm">确认</el-button> -->
      <el-button color="#f5c153" size="large" class="confirm-button" @click="openBlindBoxModal">浏览</el-button>

    </template>
  </el-dialog>
  <BlindBoxModalcopy :isVisible="isBlindBoxModalVisible" @close="closeBlindBoxModal" />
</template>

<script setup>
import { ref } from "vue";
import BlindBoxModalcopy from '@/components/pops/BlindBoxModalcopy.vue';
// 背景图
import state from "@/api/global_variable.js";

//放大盲盒窗口
const isBlindBoxModalVisible=ref(false);

const openBlindBoxModal=()=> {
  state.DiySkinPop=false;
  // goToDiyPop.value = false;
  isBlindBoxModalVisible.value = true;
  state.indexflag=true;
}
const closeBlindBoxModal=()=> {isBlindBoxModalVisible.value = false;}



const goToDiyPop = ref(false);


// const selectedGoldBeanSkin = ref(null);
const selectedGoldBeanSkin = ref(null);


const selectGoldBeanSkin = (index) => {
  state.index=index;
  selectedGoldBeanSkin.value = index;
  state.selectedGoldBeanSkin2[0].image=state.goldBeanSkins.at(index).image;
  state.selectedGoldBeanSkin2[0].name=state.goldBeanSkins.at(index).name;
  console.log(index);
  console.log(state.goldBeanSkins.at(index).name);
  console.log(state.selectedGoldBeanSkin2[0].name);
};

const diyConfirm = () => {
  goToDiyPop.value = false;
};

</script>

<style scoped>
.personalize {
  width: 60px;
  height: 60px;
  margin: 10px;
  flex: 1 1% 1%;
  background-image: url('@/assets/我的盲盒@2x.png');
  /* 背景图片路径 */
  background-repeat: no-repeat;
  background-size: contain;
}

.demo-gold {
  padding-top: 50px;
  padding-left: 10px;
  text-align: center;
}

.block {
  cursor: pointer;
  border: 2px solid transparent;
}

.block.selected {
  border: 2px solid #f5c153;
}

.confirm-button {
  position: absolute;
  left: 50%;
  bottom: -10px;
  transform: translate(-50%, -50%);
}
</style>

<style>
.diySkin-dialog-center {
  width: 400px;
  /* 固定宽度 */
  height: 450px;
  /* 固定高度 */
  background-color: transparent;
  /* 弹窗背景颜色 */
  /* background-image: url('@/assets/装扮弹窗@2x.png'); */
  background-image: url('@/assets/我的已有盲盒.png');
  background-size: contain;
  /* 覆盖整个元素 */
  background-repeat: no-repeat;
  background-position: center;
  padding-top: 30px;
}
</style>
