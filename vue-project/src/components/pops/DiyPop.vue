<template>
  <el-button type="text" class="personalize" plain @click="goToDiyPop = true"></el-button>
  <el-dialog :show-close="false"
             v-model="goToDiyPop"
             width="98%"
             class="diy-dialog-center"
  >
    <div>
      <el-row class="demo-can" :gutter="20">
        <el-col v-for="(item, index) in goldCanSkins" :key="index" :span="6">
          <div class="block" :class="{selected: selectedGoldCanSkin === index}" @click="selectGoldCanSkin(index)">
            <el-avatar shape="square" :size="80" :src="item"/>
          </div>
        </el-col>
      </el-row>
    </div>

    <template #footer>
      <el-button color="#f5c153" size="large" class="confirm-button" @click="diyConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref} from "vue";
// 导入图片并存储在数组中
import can1 from '@/assets/小兔罐@2x.png';
import can2 from '@/assets/小象罐@2x.png';
import can3 from '@/assets/小鼠罐@2x.png';

const goldCanSkins = [can1, can2, can3];
// 背景图
import state from "@/api/global_variable.js";
import backgroundImagePath1 from '@/assets/bg@2x@2x.png';
import backgroundImagePath0 from '@/assets/兔子罐.jpg';

const goToDiyPop = ref(false);

const selectedGoldCanSkin = ref(null);

// 暂时保存背景图片的路径，点击确认后在修改全局变量
const interimUrl = ref('')

const selectGoldCanSkin = (index) => {
  selectedGoldCanSkin.value = index;
  if (index === 0) {
    interimUrl.value = backgroundImagePath0
  } else if (index === 1) {
    interimUrl.value = backgroundImagePath1
  }
};


const diyConfirm = () => {
  if (interimUrl.value !== '') {
    state.backGroundUrl = interimUrl.value;
  }
  goToDiyPop.value = false;
};

</script>

<style scoped>
.personalize {
  width: 60px;
  height: 60px;
  margin: 10px;
  flex: 1 1% 1%;
  background-image: url('@/assets/换装扮@2x.png'); /* 背景图片路径 */
  background-repeat: no-repeat;
  background-size: contain;
}

.demo-can {
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
  bottom: 10px;
  transform: translate(-50%, -50%);
}
</style>

<style>
.diy-dialog-center {
  width: 400px; /* 固定宽度 */
  height: 450px; /* 固定高度 */
  background-color: transparent; /* 弹窗背景颜色 */
  /* background-image: url('@/assets/装扮弹窗@3x.png'); */
  background-image: url('@/assets/我的装扮.png');
  background-size: contain; /* 覆盖整个元素 */
  background-repeat: no-repeat;
  background-position: center;
  padding-top: 30px;
}

</style>
