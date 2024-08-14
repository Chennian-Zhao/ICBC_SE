<template>
  <!-- 模态框的遮罩层，点击遮罩层关闭模态框 -->
  <div class="modal-overlay" v-if="state.indexflag" @click.self="closeModal">
    <div class="modal-content">
      <div>
        <!-- <p class="modal-header">已有盲盒</p> -->
      </div>
      <!-- 轮播图容器 -->
      <div class="carousel">

        <div class="carousel-slides"> 
          <!-- <div v-for="(item,index) in state.goldBeanSkins" :key="index">
            <img v-if="index === state.index" :src="item.image" class="blindbox-img"/>
            </div> -->
         <!-- <img   v-for="(blindbox, index) in blindboxes" :key="index" :src="blindbox.image"
             :style="{ left: index * 100 + '%', 'transform': dynamicstyle }" :alt="blindbox.name" class="blindbox-img" /> -->
             
             <div v-for="(item,index) in state.goldBeanSkins" :key="index">
              <img v-if="index === state.index" :src="item.image"  class="blindbox-img"/>
            </div>
           
        </div>

      </div>
      <div class="carousel-text">
        <!-- <div v-for="(item, index) in state.goldBeanSkins" :key="index"class="blindbox-name">
          <div v-if="index === state.index">{{ item.name }}</div>
        </div> -->
         <div  v-for="(item, index) in state.goldBeanSkins" :key="index" class="blindbox-name">
          <div v-if="index === state.index">{{ item.name }}</div>
           <!-- {{form.blindboxesname1}} -->
         </div>
      </div>
      <!-- 赠送按钮 -->
      <button @click="closeModal" style="font-size: 18px;">返回</button>
    </div>
  </div>
</template>

<script setup>
import {computed, reactive, ref, watch} from 'vue'
import {ElMessageBox} from 'element-plus'
import {Check, Close} from '@element-plus/icons-vue'
import gsap from 'gsap'
import {useRouter} from 'vue-router';
import state from "@/api/global_variable.js";


// const   blindboxesimage=ref(state.goldBeanSkins[state.index].image);
// const blindboxesname= ref(state.goldBeanSkins[state.index].name);
// const form = reactive({
//   blindboxesimage1: blindboxesimage,
//   blindboxesname1: blindboxesname,
// })



const closeModal=()=> {
      state.indexflag=false;
}



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
  left: 75px;
  height: 100%;
  transition: 0.5s transform ease-in-out;
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