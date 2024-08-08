<template>
  <!-- 如果 visible 为 true，则显示确认对话框 -->
  <div v-if="visible" class="confirm-dialog-overlay">
    <div class="confirm-dialog">
      <!-- 显示盲盒名称的确认消息 -->
      <p>是否将盲盒 "{{ blindBoxName }}" 送出？</p>
      <div class="dialog-footer">
        <!-- 确认按钮，点击时触发 confirm 方法 -->
        <button @click="confirm">确认</button>
        <!-- 取消按钮，点击时触发 cancel 方法 -->
        <button @click="cancel">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 控制对话框是否可见
    visible: {
      type: Boolean,
      default: false
    },
    // 盲盒名称，必填
    blindBoxName: {
      type: String,
      required: true
    }
  },
  methods: {
    // 确认操作，触发 confirm 事件
    confirm() {
      this.$emit('confirm');
    },
    // 取消操作，触发 cancel 事件
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped>
/* 覆盖层样式 */
.confirm-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 对话框样式 */
.confirm-dialog {
  background: #fef5e8;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  border: 5px solid gold; /* 添加金色边框 */
}

/* 对话框底部按钮容器样式 */
.dialog-footer {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  
}
button{
  padding: 5px 10px;
  border-radius: 5px;
  color: #5a4e39;
  border: none;
  background-color: #f9b628;
}
</style>