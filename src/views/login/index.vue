<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';

import { loginRules } from "./utils/rule";

const loading = ref(false);
const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  username: "admin",
  password: "admin123"
});


const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('表单格式正确');
    } else {
      loading.value = false;
      return fields;
    }
  });
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (code === "Enter") {
    onLogin(ruleFormRef.value);
  }
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});

</script>

<template>
    <div class="login-form">
      <h2> Login </h2>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="loginRules" size="large">
        <el-form-item :rules="[
  {
    required: true,
    message: '请输入账号',
    trigger: 'blur'
  }
]" prop="username">
          <el-input clearable v-model="ruleForm.username" placeholder="账号" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input clearable show-password v-model="ruleForm.password" placeholder="密码" />
        </el-form-item>

        <el-button class="w-full mt-10" size="default" type="primary" :loading="loading" @click="onLogin(ruleFormRef)">
          登录
        </el-button>

      </el-form>
    </div>
</template>

<style scoped>
.login-form {
  width: 360px;
}

.login-form h2 {
  text-transform: uppercase;
  margin: 15px 0;
  color: #999;
  font: bold 200% Consolas, Monaco, monospace;
}
</style>
