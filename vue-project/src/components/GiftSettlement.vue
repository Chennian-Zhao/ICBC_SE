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
          <el-form :model="form" ref="form" label-width="120px">
            <el-form-item label="赠予克数" prop="weight" class="form-item">
              <el-input type="number" v-model="form.weight" min="0.1" placeholder="请输入(0.1g起)"></el-input>
            </el-form-item>
            <div class="divider"></div> <!-- 分隔线 -->
            <el-form-item label="等额金豆赠送（¥/g）" prop="equivalent" class="form-item">
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
              <el-input type="number" v-model="form.account" placeholder="请输入15位数字"></el-input>
            </el-form-item>
            <div class="divider"></div> <!-- 分隔线 -->
            <el-form-item label="留言" prop="message" class="form-item">
              <el-input type="text" v-model="form.message" placeholder="留言"></el-input>
            </el-form-item>
            <div class="divider"></div> <!-- 分隔线 -->
            <el-form-item label="短信通知" prop="smsNotification" class="form-item">
              <el-checkbox v-model="form.smsNotification">是否使用短信通知</el-checkbox>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-button type="primary" class="confirm-button" @click="showDialog">确定</el-button>
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <div class="dialog-content">
          <img src="../assets/thank_you.png" class="dialog-image">
          <div class="dialog-text">您的心意已送达</div>
          <el-button type="primary" @click="goHome">返回首页</el-button>
        </div>
      </el-dialog>
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
      dialogVisible: false
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'Transfer' });
    },
    showDialog() {
      this.dialogVisible = true;
    },
    goHome() {
      this.$router.push({ name: 'Home' });
    }
  }
};
</script>

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
}

/* 确认按钮样式 */
.confirm-button {
  width: 100%; /* 宽度为100% */
  background-color: #fac248; /* 背景颜色为黄色 */
  color: black; /* 文字颜色为黑色 */
  font-weight: bold; /* 字体加粗 */
}

/* 对话框内容样式 */
.dialog-content {
  text-align: center; /* 文本居中对齐 */
}

/* 对话框图片样式 */
.dialog-image {
  width: 100px; /* 宽度为100px */
  height: 100px; /* 高度为100px */
  margin-bottom: 20px; /* 底部外边距为20px */
}

/* 对话框文本样式 */
.dialog-text {
  font-family: 'Cursive', sans-serif; /* 字体为Cursive和sans-serif */
  font-size: 24px; /* 字体大小为24px */
  margin-bottom: 20px; /* 底部外边距为20px */
}

/* 分隔线样式 */
.divider {
  border-top: 1px solid #d3d3d3; /* 顶部边框为1px的灰色实线 */
  margin: 10px 0; /* 上下外边距为10px */
}
</style>