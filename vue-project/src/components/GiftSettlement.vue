<template>
  <el-container>
    <el-header class="header">
      <img src="../assets/arrow_right@2x.png" @click="goBack" class="back-icon">
      <p class="header-title"><strong>赠金予卿，留爱于心</strong></p>
    </el-header>
    <el-main class="main-content">
      <div class="block">
        <div class="block-header yellow-bg">受赠方</div>
        <div class="block-content">
          <el-form :model="form" ref="form" label-width="120px">
            <el-form-item label="户名" prop="name" class="form-item">
              <el-input v-model="form.name" placeholder="请输入（支持首字母检索）"></el-input>
            </el-form-item>
            <div class="divider"></div> <!-- 分隔线 -->
            <el-form-item label="手机号" prop="phone" class="form-item">
              <el-input type="tel" v-model="form.phone" placeholder="请输入受赠方手机号"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="block">
        <div class="block-header yellow-bg">
          赠予额度
          <span class="small-text">主题限定~定额赠送</span>
        </div>
        <div class="block-content">
          <el-form :model="form" ref="form" label-width="150px">
            <el-form-item label="赠予克数" prop="weight" class="form-item">
              <el-input type="number" v-model="form.weight" min="0.1" placeholder="请输入(0.1g起)"></el-input>
            </el-form-item>
            <div class="divider"></div> <!-- 分隔线 -->
            <el-form-item label="等额金豆赠送(¥/g)" prop="equivalent" class="form-item">
              <el-input type="number" v-model="form.equivalent" placeholder="免手续费"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="block">
        <div class="block-header yellow-bg">支付</div>
        <div class="block-content">
          <el-form :model="form" ref="form" label-width="120px">
            <el-form-item label="付款方式" prop="paymentMethod" class="form-item">
              <el-select v-model="form.paymentMethod" placeholder="使用工行卡">
                <el-option label="微信" value="wechat"></el-option>
                <el-option label="支付宝" value="alipay"></el-option>
                <el-option label="数字人民币" value="digitalRMB"></el-option>
                <el-option label="其他银行卡" value="otherBank"></el-option>
              </el-select>
            </el-form-item>
            <div class="divider"></div> <!-- 分隔线 -->
            <el-form-item label="付款账户" prop="account" class="form-item">
              <!-- <el-input type="number" v-model="form.account" placeholder="请输入15位数字"></el-input> -->
              <p style="color:rgb(141 113 129);text-align: center;">662008601780443</p>
            </el-form-item>
            
            <div class="divider"></div> <!-- 分隔线 -->
            <el-form-item label="留言" prop="message" class="form-item">
              <el-input type="text" v-model="form.message" placeholder="请输入"></el-input>
            </el-form-item>
            <div class="divider"></div> <!-- 分隔线 -->
            <el-form-item label="短信通知" prop="smsNotification" class="form-item">
              <el-checkbox v-model="form.smsNotification"></el-checkbox>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="confirm">
          <button class="block-header yellow-bg" @click="showAlert">确认</button>
          <div class="block-content"></div>
      </div>
      <div v-if="showDialog" class="custom-dialog">
          <div class="custom-dialog-content">
            
            <div class="dialog-footer">
              <button @click="goHome">返回主页</button>
            </div>
          </div>
      </div>
      
      
  

    </el-main>
  </el-container>
</template>

<script>




export default {
  name: 'GiftSettlement',
  data() {
    return {
      form: {
        name: '',
        phone: '',
        weight: '',
        equivalent: '',
        paymentMethod: '',
        account: '',
        message: '',
        smsNotification: false
      },
      showDialog: false
    };
  },
  methods: {
    showAlert() {
      console.log('确认按钮已点击');
      this.showDialog = true;
    },
    goBack() {
      this.$router.push({ name: 'Transfer' });
    },
    goHome() {
      this.$router.push({ name: 'Home' });
    }
  }
};
</script>

<style>
/*表单居中 */
.el-form-item__content {
  align-content: center;
}
</style>

<style scoped>

/* 头部样式 */
.header {
  display: flex; /* 使用flex布局 */
  align-items: center; /* 垂直居中对齐 */
  background-color: white; /* 背景颜色为白色 */
  padding: 10px; /* 内边距为10px */
}

/* 返回图标样式 */
.back-icon {
  width: 30px; /* 宽度为30px */
  height: 30px; /* 高度为30px */
  cursor: pointer; /* 鼠标悬停时显示为指针 */
  transform: rotate(180deg); /* 旋转180度 */
}

/* 头部标题样式 */
.header-title {
  flex-grow: 1; /* 占据剩余空间 */
  text-align: center; /* 文本居中对齐 */
  font-size: 20px; /* 字体大小为20px */
}

/* 主内容样式 */
.main-content {
  background-color: #2c2c2c; /* 背景颜色为深灰色 */
  padding: 20px; /* 内边距为20px */
}

/* 表单项样式 */
.form-item {
  margin-top: -4px; /*顶部外边距为5px */
  margin-bottom: -3px; /* 底部外边距为5px */
}

/* 表单标签样式 */
.el-form-item__label {
  line-height: 36px; /* 行高为36px */
  padding: 0 10px; /* 左右内边距为10px */
}

/* 输入框、选择框和复选框样式 */
.el-input,
.el-select,
.el-checkbox {
  line-height: 36px; /* 行高为36px */
}

/* 区块样式 */
.block {
  background-color: white; /* 背景颜色为白色 */
  border-radius: 5px; /* 边框圆角为5px */
  margin-bottom: 20px; /* 底部外边距为20px */
  overflow: hidden; /* 隐藏溢出内容 */
  padding: 0px; /* 内边距为0 */
}

/* 相邻区块样式 */
.block + .block {
  border-top: 1px solid #d3d3d3; /* 顶部边框为1px的灰色实线 */
}

/* 区块头部样式 */
.block-header {
  padding: 10px; /* 内边距为10px */
  font-size: 18px; /* 字体大小为18px */
  font-weight: bold; /* 字体加粗 */
}

/* 黄色背景样式 */
.yellow-bg {
  background-color: #fac248; /* 背景颜色为黄色 */
}

/* 小文本样式 */
.small-text {
  float: right; /* 右浮动 */
  color: gray; /* 文字颜色为灰色 */
  font-size: 12px; /* 字体大小为12px */
}

/* 区块内容样式 */
.block-content {
  padding: 10px; /* 内边距为10px */
  /*简单修改 */
}

  /* 分隔线样式 */
  .divider {
    border-top: 1px solid #d3d3d3; /* 顶部边框为1px的灰色实线 */
    margin: 10px 0; /* 上下外边距为10px */
  }
  
  /* 确认按钮 */
  
  .confirm {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
  .custom-dialog {
    position: fixed; /* 固定定位，使弹窗相对于视口固定 */
    top: 50%; /* 弹窗垂直居中 */
    left: 50%; /* 弹窗水平居中 */
    
    transform: translate(-50%, -50%); /* 通过平移使弹窗完全居中 */
    background: url('../assets/thank_you.png') no-repeat center center; /* 弹窗背景图片 */
    background-size: cover; /* 背景图片自适应 */
    /* background-color: white; 弹窗背景颜色为白色 */
    border: 5px solid gold; /* 弹窗边框为2px的金色实线 */
    border-radius: 15px; /* 弹窗边框圆角半径为15px */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 弹窗阴影效果 */
    z-index: 1000; /* 弹窗的堆叠顺序，确保其在最上层 */
    padding: 20px; /* 弹窗内边距为20px */
    width: 300px; /* 增加弹窗宽度 */
    height: 500px; /* 增加弹窗高度 */

  }
  
  .custom-dialog-content {
    text-align: center; /* 弹窗内容居中对齐 */
  }
  
  
  .dialog-footer {

  display: flex;
  justify-content: center;
  margin-top: 450px; /* 将元素推到容器底部 */

  
}

  .dialog-footer button {
    background-color: gold; /* 按钮背景颜色为金色 */
    border: none; /* 按钮无边框 */
    padding: 15px 30px; /* 按钮内边距为10px 20px */
    border-radius: 5px; /* 按钮边框圆角半径为5px */
    cursor: pointer; /* 鼠标悬停时显示为指针 */
  }
  
  .dialog-footer button:hover {
    background-color: rgb(224, 9, 106); /* 按钮悬停时背景颜色为深金色 */
  }



</style>
