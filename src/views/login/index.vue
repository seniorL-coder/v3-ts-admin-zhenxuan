<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import type { loginParamsType } from '@/types/user'
import type { FormInstance } from 'element-plus'
import { useUserStore } from '@/stores/user.ts'
import { useRouter, useRoute } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import bg_img from '@/assets/images/background-img.svg'

const router = useRouter()
const route = useRoute()

const userStore = useUserStore()

/**
 * 左侧滑入 → 刹车 → 轻微回弹 → 停止
 */

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
  await formEl.value?.validate() // 验证表单
  await userStore.login(formData.value)
  ElMessage.success('登录成功!☺️')
  const redirect = route.query.redirect as string
  setTimeout(() => router.replace({ path: redirect || '/' }), 1000)
}
const onReset = () => {
  formEl.value?.resetFields()
}
</script>

<template>
  <div class="w-full h-full overflow-hidden login-container">
    <el-row class="h-full bg-blue-400" align="middle">
      <el-col :span="12" :xs="{ span: 0 }">
        <el-image class="w-full h-full" :src="bg_img" fit="fill" />
      </el-col>
      <el-col :span="9" :xs="{ span: 24 }" :offset="3" class="form_container">
        <Transition name="scale-fade" appear>
          <el-card class="w-2/3 mx-auto perspective-distant">
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
                />
              </el-form-item>
              <el-form-item prop="password" label="密码: ">
                <el-input
                  :prefix-icon="Lock"
                  v-model="formData.password"
                  placeholder="请输入密码"
                  type="password"
                  :show-password="true"
                />
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
          </el-card></Transition
        >
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="sass">
.form_container
  background-image: url("/public/favicon.ico")
  background-position: top right

/* 进入前 & 离开后 */
.scale-fade-enter-from,
.scale-fade-leave-to
  opacity: 0
  transform: scale(0)

/* 进入中 & 离开中 */
.scale-fade-enter-active,
.scale-fade-leave-active
  transition: opacity 0.4s ease-out, transform 0.4s ease-out

/* 进入完成 & 离开前 */
.scale-fade-enter-to,
.scale-fade-leave-from
  opacity: 1
  transform:  scale(1)
</style>
