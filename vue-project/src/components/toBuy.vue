<template>

  <div class="app">

    <!-- <el-page-header @click="goBack" :icon="ArrowLeft" style="width: min-content;">
    </el-page-header>
    <p style=" text-align: center ;" > 主动积存 </p> -->
    <div style="display: flex;align-items: center; /* 垂直居中 */position: relative; ">
      <img src='../assets/arrow_right@2x.png' @click="goBack" style=" transform: rotate(180deg);">
      <!-- <p style=" text-align: center ;" > 主动积存 </p> -->
      <p style="flex-grow: 1; /* 占据剩余空间 */text-align: center; /* 水平居中 */position: absolute;left: 50%;
            transform: translateX(-50%); font-size: 20px;"> 主动积存 </p>
    </div>


    <el-card>

      <el-form @submit.prevent="submitForm" :model="form" label-width="130px">

        <el-countdown prefix="请在" suffix="内完成交易!" format="mm:ss" :value="timevalue" value-style="color:#bd3a7c"/>

        <el-form-item label="交易账户">
          <!-- <el-input  type="number" class="account"  ></el-input> -->
          <p style="color:rgb(141 113 129);">662008601780443</p>
        </el-form-item>

        <el-form-item label="可用余额">
          <!-- <el-input  type="number"  class="balance" ></el-input> -->
          <p style="color:rgb(141 113 129);">5000.00</p>
        </el-form-item>


        <el-form-item label="积存品种">
          <!-- <el-input  type="number"  class="balance" ></el-input> -->
          <p style="color:rgb(141 113 129);">积存金</p>
        </el-form-item>

        <el-form-item label="积存方式">
          <el-select
              v-model="selectvalue"
              filterable
              placeholder="Select"
              style="width: 240px"
          >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>

        </el-form-item>


        <div v-if="selectvalue == 'Optiongrams'">
          <el-form-item label="积存份额">
            <!-- <el-input  type="number"  class="tostore" ></el-input> -->
            <el-input v-model.number="gramsinput1" type="number" @input="updateImagegrams" style="width: 90px"
                      placeholder="请输入"/>
                  <span class="yuankeform">克</span>
            <img :src="imageSrc" alt="动态图片"/>
          </el-form-item>

          <el-form-item label="积存价格">
            <!-- <el-input  type="number"  class="storeprice" ></el-input> -->
            <!-- <p :style="{ color: }">559.87</p><p>元/克</p> -->
            <p>{{state.currentPrice.toFixed(2)}}</p>
            <p style="color:rgb(141 113 129);margin-left: 6px;">元/克</p>

          </el-form-item>


          <el-form-item label="积存金额">
            <!-- <el-input v-model="form.amount" type="number" @input="updateImage" ></el-input> -->
            <el-input v-model.number="number1" style="width: 180px" disabled type="number" placeholder="待回显"/>
            <span class="yuankeform">元</span>
            <!-- <el-input v-model="number1" style="width: 180px" disabled type="number"  placeholder="待回显" />元 -->

          </el-form-item>

<!--          <el-form-item>-->
<!--            <img :src="imageSrc" alt="动态图片"/>-->
<!--          </el-form-item>-->

          <el-form-item label="积存费率">
            <!-- <el-input  type="number"  class="storeuse" ></el-input> -->
            <p>0.50%</p>
            <p style="color:rgb(141 113 129);">(积存费用</p>{{ (gramstweened.gramsinput * state.currentPrice * 0.005).toFixed(2) }}
            <p style="color:rgb(141 113 129);">元)</p>
          </el-form-item>
        </div>

        <div v-if="selectvalue == 'Optionmoney'">
          <el-form-item label="积存份额">
            <!-- <el-input  type="number"  class="tostore" ></el-input> -->
            <el-input v-model.number="gramsinput2" type="number" disabled style="width: 90px" placeholder="待回显"/>
            <span class="yuankeform">克</span>
            <img :src="imageSrc" alt="动态图片"/>
          </el-form-item>

          <el-form-item label="积存价格">
            <!-- <el-input  type="number"  class="storeprice" ></el-input> -->
            <p>{{state.currentPrice.toFixed(2)}}</p>
            <p style="color:rgb(141 113 129);margin-left: 6px;">元/克</p>
          </el-form-item>


          <el-form-item label="积存金额">
            <!-- <el-input v-model="form.amount" type="number" @input="updateImage" ></el-input> -->
            <el-input v-model.number="number2" style="width: 180px" type="number" @input="updateImagemoney"
                      placeholder="请输入"/>
                      <span class="yuankeform">元</span>
            <!-- <el-input v-model.number="number2" style="width: 180px" type="number"  placeholder="请输入金额  " />元 -->
          </el-form-item>

<!--          <el-form-item>-->
<!--            <img :src="imageSrc" alt="动态图片"/>-->
<!--          </el-form-item>-->

          <el-form-item label="积存费率">
            <!-- <el-input  type="number"  class="storeuse" ></el-input> -->
            <p>0.50%</p>
            <p style="color:rgb(141 113 129);">(积存费用</p>{{ (tweened.number * 0.005).toFixed(2) }}<p
              style="color:rgb(141 113 129);">元)</p>
          </el-form-item>
        </div>


        <el-form-item label="盲盒活动">
          <!-- <el-checkbox v-model="form.participateInBlindBox"></el-checkbox> -->
          <el-button plain @click="showInfo" style="width: 50%">了解盲盒活动</el-button>
          <!-- <el-switch
              v-model="value2"
              class="mt-2"
              style="margin-left: 24px; --el-switch-on-color:#0a0c15;--el-switch-off-color:#0a0c15;  "
              inline-prompt
              :active-icon="Check"
              :inactive-icon="Close"
          /> -->
          <el-switch
              v-model="value2"
              class="mt-2"
              style="margin-left: 24px; --el-switch-on-color:#c6d106;--el-switch-off-color:#cfd1d9;  "
              inline-prompt
         
          />
        </el-form-item>

        <el-button type="primary" style="--el-color-primary:#f9b628;--el-button-text-color: #5a4e39;" @click="submitForm">买入</el-button>

      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {computed, reactive, ref, watch} from 'vue'
import {ElMessageBox} from 'element-plus'
import {Check, Close} from '@element-plus/icons-vue'
import gsap from 'gsap'
import {useRouter} from 'vue-router';
import state from "@/api/global_variable.js";

const router = useRouter();


const timevalue = ref(Date.now() + 1000 * 60)
//按克
const gramsinput1 = ref(state.quickGram)
const gramstweened = reactive({
  gramsinput: state.quickGram
})
watch(gramsinput1, (n) => {
  gsap.to(gramstweened, {duration: 0.5, gramsinput: Number(n) || 0})
  console.log("change")
})
const number1 = computed(() => ((gramstweened.gramsinput * state.currentPrice * 1.005).toFixed(2)))

//按钱
const number2 = ref(0)
const tweened = reactive({
  number: 0
})
watch(number2, (n) => {
  gsap.to(tweened, {duration: 0.5, number: Number(n) || 0})
})
const gramsinput2 = computed(() => ((tweened.number * 0.995 / state.currentPrice).toFixed(4)))


const form = ref({
  gramsamount: gramsinput1,
  moneyamount: number2,
  expectedPurchase: '',
  waytostore: '',
  participateInBlindBox: false,
})


const value2 = ref(true)

const imageSrc = ref('./src/assets/image1.png')


const showInfo = () => {
  ElMessageBox.alert('参加盲盒活动可以获得惊喜礼品！盲盒主题包含有三丽鸥和迪士尼金豆子皮肤抽取',
      '盲盒活动详情', {
        confirmButtonText: 'OK',
      })
}

const updateImagegrams = () => {
  // const amountgrams=gramstweened.gramsinput  //会慢响应
  const amountgrams = form.value.gramsamount

  if (amountgrams < 1.0) {
    imageSrc.value = './src/assets/image1.png'
  } else if (amountgrams < 10.0) {
    imageSrc.value = './src/assets/image2.png'
  } else {
    imageSrc.value = './src/assets/image3.png'
  }
}

const updateImagemoney = () => {
  // const amountmoney = tweened.number*0.995 / 559.87  //会慢响应
  const amountmoney = form.value.moneyamount * 0.995 / state.currentPrice

  if (amountmoney < 1.0) {
    imageSrc.value = './src/assets/image1.png'
  } else if (amountmoney < 10.0) {
    imageSrc.value = './src/assets/image2.png'
  } else {
    imageSrc.value = './src/assets/image3.png'
  }
}

const submitForm = () => {
  // ElMessage({
  //   message: '表单已提交！',
  //   type: 'success',
  // })
  // 处理表单提交逻辑
  // console.log(`金额: ${form.value.amount}`)
  console.log(`预计购买: ${form.value.expectedPurchase}`)
  // console.log(`支付方式: ${form.value.paymentMethod}`)
  console.log(`参加盲盒活动: ${form.value.participateInBlindBox}`)
  state.quickGram = 0
  if(value2.value == true) {
    router.push("Blindbox")
  }else{
    router.push("/")
  }
}

// 定义选择器的选项
const selectvalue = ref('Optiongrams')
const options = [
  {
    value: 'Optiongrams',
    label: '克数',
  },
  {
    value: 'Optionmoney',
    label: '金额',
  },

]


// 定义选项变化时的处理逻辑
const handleOptionChange = () => {
// imageSrc.value = './src/assets/image1.png'
  if(selectvalue.value=='Optiongrams'){
    const amountgrams=form.value.gramsamount

    if (amountgrams <1.0) {
      imageSrc.value = './src/assets/image1.png'
    } else if (amountgrams < 10.0) {
      imageSrc.value = './src/assets/image2.png'
    } else {
      imageSrc.value = './src/assets/image3.png'
    }
  }else{
    const amountmoney = form.value.moneyamount*0.995 / 559.87

    if (amountmoney <1.0) {
      imageSrc.value = './src/assets/image1.png'
    } else if (amountmoney < 10.0) {
      imageSrc.value = './src/assets/image2.png'
    } else {
      imageSrc.value = './src/assets/image3.png'
    }

  }
};

// 监听选择器的变化
watch(selectvalue, handleOptionChange);
//TODO
const goBack = () => {
  state.quickGram = 0
  router.back(); // 使用Vue Router的返回功能
};

</script>

<style>
.el-statistic {
  --el-statistic-content-color: #372b31; /*倒计时文本颜色*/
}

.el-form-item__content {
  font-size: 16px;
  font-weight: normal;
}

:root {
  --el-color-primary: #bd3a7c;
  --el-color-primary-light-3: #bd3a7c;
  --el-text-color-primary: #bd3a7c;
  --el-text-color-regular: #571305;
  --el-text-color-placeholder: #868bd3;
  --el-border-color-light: #dde1ea;
  --el-fill-color-light: #e8e5e5;
  --el-color-white: #fffff6;

}


</style>

<style scoped>
.yuankeform{
  margin-left: 6px;
  /* margin-bottom: 8px;
  margin-top: -8px; */
}
.el-card {
  padding: 20px;
  max-width: 500px;
  /* margin: auto; */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  --el-card-padding: 0px;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}

.el-form-item {
  margin-bottom: 20px;
  align-items: center;
}

.el-form {
  --el-form-label-font-size: 18px;
}

.dialog-footer {
  text-align: right;
}

.el-button {
  width: 100%;
}

</style>

