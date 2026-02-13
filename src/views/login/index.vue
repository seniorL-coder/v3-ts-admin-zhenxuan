<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import type { loginParamsType } from '@/types/user'
import type { FormInstance } from 'element-plus'
import { useUserStore } from '@/stores/user.ts'
import { useRouter, useRoute } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import bg_img from '@/assets/images/login_left-BVCCvqZF.png'
import settings from '@/settings.ts'

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
  setTimeout(() => router.replace({ path: redirect || '/' }), 500)
}
const onReset = () => {
  formEl.value?.resetFields()
}
</script>

<template>
  <div class="w-full h-full overflow-hidden login-container">
    <el-row class="h-full login-box" align="middle">
      <el-col :span="12" :xs="{ span: 0 }">
        <el-image class="w-full h-full" :src="bg_img" fit="fill" />
      </el-col>
      <el-col :span="9" :xs="{ span: 24 }" :offset="3" class="form_container">
        <Transition name="scale-fade" appear>
          <el-card class="rounded-lg! mx-auto perspective-distant h-80">
            <template #header>
              <el-row class="flex! items-center justify-around">
                <el-image class="w-15 h-15" :src="settings.logo" fit="fill" />
                <span class="uppercase font-bold text-[40px]">{{ settings.title }}</span>
              </el-row>
            </template>
            <el-form
              class="flex! h-7em! flex-col justify-between"
              ref="formRef"
              :rules="rules"
              :model="formData"
            >
              <el-form-item prop="username">
                <el-input
                  v-model="formData.username"
                  :prefix-icon="User"
                  placeholder="请输入用户名"
                />
              </el-form-item>
              <el-form-item prop="password">
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
              <el-col :span="12" class="flex! justify-center items-center">
                <el-button @click="onSubmit" size="large" type="primary">登录</el-button>
              </el-col>
              <el-col :span="12" class="flex! justify-center items-center">
                <el-button @click="onReset" size="large" type="warning">重置</el-button>
              </el-col>
            </el-row>
          </el-card></Transition
        >
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="sass">
.login-container
  background: url("@/assets/images/background-img.svg") no-repeat center center/contain
  display: flex
  align-items: center
  justify-content: center
.login-box
  position: relative
  display: flex
  align-items: center
  justify-content: space-around
  width: 96.5%
  height: 94%
  padding: 0 50px
  background-color: rgba(248, 248, 248, 0.8)
  border-radius: 10px

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
:deep(.el-input__inner)
  height: 40px !important
</style>
