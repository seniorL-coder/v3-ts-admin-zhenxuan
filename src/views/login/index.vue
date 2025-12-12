<script setup lang="ts">
import bg_img from '@/assets/images/background-img.svg'
import { MotionComponent } from '@vueuse/motion'
import { ref, useTemplateRef } from 'vue'
import type { loginParamsType } from '@/types/user'
import type { FormInstance } from 'element-plus'
import { useUserStore } from '@/stores/user.ts'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()

const userStore = useUserStore()

/**
 * 左侧滑入 → 刹车 → 轻微回弹 → 停止
 */
const cardMotion = {
  initial: {
    x: -1500, // 初始在右侧
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      easing: 'ease-out',
      type: 'spring', // 弹性刹车
      stiffness: 300, // 越大越明显
      damping: 15, // 阻尼越小，弹性越明显
    },
  },
}

const formData = ref<loginParamsType>({
  username: import.meta.env.DEV ? 'admin' : '',
  password: import.meta.env.DEV ? '111111' : '',
})

const formEl = useTemplateRef<FormInstance>('formRef')

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' },
  ],
}

const onSubmit = async () => {
  await userStore.login(formData.value)
  ElMessage.success('登录成功!☺️')
  setTimeout(() => router.replace('/'), 1000)
}
const onReset = () => {
  formEl.value?.resetFields()
}
</script>

<template>
  <div class="w-full h-full overflow-hidden">
    <el-row class="h-full bg-blue-400" align="middle">
      <el-col :span="12" :xs="{ span: 0 }"><el-image :src="bg_img" /></el-col>
      <el-col :span="9" :xs="{ span: 24 }" :offset="3" class="form_container">
        <motion-component v-motion="cardMotion">
          <el-card class="w-2/3 mx-auto">
            <template #header>
              <h1 class="text-3xl">欢迎来到</h1>
              <div>Vue3 + TypeScript Admin</div>
            </template>
            <el-form
              ref="formRef"
              :rules="rules"
              :model="formData"
              label-position="left"
              label-width="70px"
            >
              <el-form-item label="用户名: " prop="username">
                <el-input
                  v-model="formData.username"
                  :prefix-icon="User"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password" label="密码: ">
                <el-input
                  :prefix-icon="Lock"
                  v-model="formData.password"
                  placeholder="请输入密码"
                  type="password"
                  :show-password="true"
                ></el-input>
              </el-form-item>
            </el-form>
            <el-row>
              <el-col :span="12" class="!flex justify-center items-center">
                <el-button @click="onSubmit" type="primary">登录</el-button>
              </el-col>
              <el-col :span="12" class="!flex justify-center items-center">
                <el-button @click="onReset" type="warning">重置</el-button>
              </el-col>
            </el-row>
          </el-card></motion-component
        >
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="sass">
.form_container
  background-image: url("/public/favicon.ico")
  background-position: top right
</style>
