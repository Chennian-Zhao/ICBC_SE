<template>
  <!-- todo 向我提问弹窗 -->
  <el-button type="text" class="ask-me" plain @click="openDialog"></el-button>
  <el-dialog
      :show-close="false"
      v-model="goToAskPop"
      class="ask-me-dialog"
  >
    <el-scrollbar height="400px">
      <!-- 常见问题 -->
      <div class="defaultQ">
        <div v-for="(q, i) in defaultQuestions" :key="i">
          <div @click="selectQuestion(i)">
            {{ i + 1 }}. {{ q }}
          </div>
          <el-divider/>
        </div>
      </div>
      <!-- 历史记录 -->
      <div v-for="(msg, index) in chatHistory" :key="index" class="message" :class="msg.type">
        <el-main :class="[msg.type === 'ai' ? 'questions' : 'answer']"
                 :style="{borderRadius: `var(--el-border-radius-round)`}">
          <div>{{ msg.content }}</div>
        </el-main>
      </div>
    </el-scrollbar>
    <el-divider/>
    <el-footer>
      <el-input
          v-model="input"
          placeholder="请输入 ..."
          @keyup.enter="askAI"
      >
        <template #append>
          <el-button style="font-weight: bold; background-color: #f9b628; border-color: #f9b628; color: black;"
                     @click="askAI">发送
          </el-button>
        </template>
      </el-input>
    </el-footer>
  </el-dialog>
  <!-- 向我提问 -->
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';

const goToAskPop = ref(false);
const input = ref('');
const chatHistory = ref([]);

// 常见问题
const defaultQuestions = [
  "什么是积存金",
  "积存金买卖方式",
  "当前积存金价格",
  "如何兑换积存金为事物",
  "积存金手续计算"
];

const defaultAnswers = [
  "积存金是指在一定时间内，按照一定的价格和方式积累和存储的黄金。通常由银行或金融机构提供服务，" +
  "客户可以根据自己的投资需求，每月或定期购买一定金额的黄金，并存储在银行的账户中，逐渐积累黄金的数量。",
  "积存金的买卖方式主要有两种：定期定额购买和按市场价格即时买卖。定期定额购买是指客户每月" +
  "固定投资一定金额购买黄金，适合长期投资者；即时买卖是指客户可以根据市场黄金价格的变化，随时买入或卖出黄金，更灵活但需要关注市场动态。",
  "当前的积存金价格取决于国际市场上的黄金价格，实时波动。黄金价格受国际政治经济形势、通货" +
  "膨胀率、货币汇率等多种因素影响，投资者可以通过金融机构提供的实时价格查询渠道了解当前积存金的价格。",
  "要将积存金兑换为实物黄金，投资者可以通过银行或相关金融机构的指定渠道进行兑换。通常需要提" +
  "前预约，支付一定的加工和提取费用，兑换的实物黄金可以是金条、金币等，具体取决于金融机构的产品种类和规格。",
  "积存金的手续计算包括多个方面：购买费用（可能包含手续费）、存储费用（如银行的账户管理费）、卖出时的手续费" +
  "、以及可能的税费。不同的金融机构收费标准可能有所不同，投资者在进行积存金投资前应详细了解各项费用，以便做出合理的投资决策。"
];

// 模拟AI回答，已经内置了问题的答案，内置的问题
const AIQuestions = [
  "什么是积存金",
  "积存金的主要优势是什么",
  "积存金与定期存款有什么区别",
  "如何开始积存金",
  "积存金适合和哪些人群",
  "积存金有哪些风险",
  "积存金的利率如何计算",
  "是否可以提前支取积存金",
  "积存金的税务如何处理",
  "如何选择合适的积存金产品",
]

// 内置问题的答案
const AIAnwers = [
  "积存金是一种储蓄产品，允许用户定期存入小额资金，逐步累积成大额存款，通常用于未来的特定用途，如教育、购房或养老。",
  "积存金的主要优势是它可以帮助用户逐步积累资金，降低投资风险，同时享受较高的利率，达到长期储蓄目标。",
  "积存金允许用户定期存入小额资金，积少成多，而定期存款则是一次性存入较大金额，且通常期限固定。",
  "用户可以通过银行或金融机构开设积存金账户，设定每月或每周的存款金额，并定期存入资金。",
  "积存金适合有长期储蓄目标且希望逐步积累资金的人群，如年轻的职场新人、需要为子女教育储备资金的父母或计划为退休生活做准备的中年人。",
  "虽然积存金具有稳定的储蓄功能，但仍存在一定的市场风险和利率风险。如果市场利率发生变化，积存金的收益可能会受到影响。此外，一些积存金产品可能涉及投资风险，用户应了解产品详情和风险提示。",
  "积存金的利率通常由银行或金融机构根据市场情况设定，可能是固定利率或浮动利率。用户在开设积存金账户时会了解到具体的利率计算方式，一般会在定期存款基础上增加一定的利率收益。",
  "大多数积存金产品允许用户提前支取资金，但可能会有一定的手续费或利息损失。具体情况需查看产品条款，了解提前支取的条件和可能的费用。",
  "积存金的利息收益通常需缴纳所得税，具体税率根据当地税法规定。用户应向税务部门或金融机构咨询，了解积存金的税务处理方式和需要提交的税务文件。",
  "选择积存金产品时，用户应考虑自身的储蓄目标、风险承受能力、存款期限和利率水平。建议用户比较不同金融机构的积存金产品，了解各自的利率、手续费和提前支取条件，选择最适合自己的产品。",
]

// 当前选中的问题索引
const selectedQuestionIndex = ref(null);

// 选择问题并记录聊天历史
const selectQuestion = (index) => {
  selectedQuestionIndex.value = index;
  // 记录系统回答
  chatHistory.value.push({ type: 'ai', content: defaultAnswers[index] });
  // 自动滚动到底部
  nextTick(() => {
    const container = document.querySelector('.el-scrollbar__wrap');
    container.scrollTop = container.scrollHeight;
  });
};

// 打开对话框时加载常见问题和历史记录
const openDialog = () => {
  goToAskPop.value = true;

  // 自动滚动到底部
  nextTick(() => {
    const container = document.querySelector('.el-scrollbar__wrap');
    container.scrollTop = container.scrollHeight;
  });
};

// 模拟AI助手回复
const getAIResponse = (question) => {
  // 查找是否存在相似的问题
  const index = AIQuestions.findIndex(q => question.includes(q));
  if (index !== -1) {
    return AIAnwers[index];
  }
  // 如果没有匹配，返回一个默认回复
  return `这是对问题 "${question}" 的回复`;
};

// 发送消息问答界面
const askAI = () => {
  if (input.value.trim() === '') {
    ElMessage.warning('问题不能为空');
    return;
  }

  // 记录用户提问
  chatHistory.value.push({type: 'user', content: input.value});

  // 模拟AI回复
  const aiResponse = getAIResponse(input.value);
  chatHistory.value.push({type: 'ai', content: aiResponse});

  // 清空输入框
  input.value = '';

  // 自动滚动到底部
  nextTick(() => {
    const container = document.querySelector('.el-scrollbar__wrap');
    container.scrollTop = container.scrollHeight;
  });
};

// 页面刷新时清空历史记录
onMounted(() => {
  window.addEventListener('beforeunload', () => {
    chatHistory.value = [];
  });
});
</script>
<style scoped>
.ask-me {
  width: 110px;
  height: 110px;
  margin-top: 15px;
  margin-bottom: 50px;
  margin-left: 20px;
  flex: 1 1% 1%;
  background-image: url('@/assets/点我提问@3x.png'); /* 背景图片路径 */
  background-repeat: no-repeat;
  background-size: contain;
}

.message {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.questions, .answer {
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 10px;
  max-width: 80%;
  word-wrap: break-word;
}

.questions {
  background-color: #d6f1fd;
}

.answer {
  background-color: #f3d7af;
  align-self: flex-end;
  margin-left: auto;
}
</style>
<style>
.ask-me-dialog {
  width: 90%;
  height: 58%;
  background-image: url('@/assets/智能助手弹窗@2x.png');
  background-size: 100% 700px; /* 覆盖整个元素 */
  background-repeat: no-repeat;
  background-color: transparent; /* 弹窗背景颜色 */
  padding-top: 30px;
}

.defaultQ {
  background-color: #fef9f2;
  font-weight: bold;
  text-align: center;
  border-radius: 30px;
}
</style>
