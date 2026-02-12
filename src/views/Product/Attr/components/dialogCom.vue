<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { FormRules } from 'element-plus'
import type { ModelAttrInfo, ModelAttrValue } from '@/types/attr'
import { saveAttrInfo } from '@/api/attr'

const dialogVisible = defineModel<boolean>('dialogVisible', { required: true })
const props = defineProps<{
  mode: 'add' | 'edit'
  currEditAttr: ModelAttrInfo
  categoryId: number
  categoryLevel: number
}>()
const dialogTitle = ref<string>('添加属性') // 对话框标题

// ... 省略之前的代码

watch(dialogVisible, (val) => {
  if (val) {
    // 对话框打开时
    if (props.mode === 'edit' && props.currEditAttr) {
      dialogTitle.value = '编辑属性'
      // 编辑模式：深拷贝数据，防止直接修改父组件数据
      form.value = {
        attrName: props.currEditAttr.attrName,
        // 假设 currEditAttr 里的属性值字段也是类似的结构，如果不是则需要 map 转换
        attrValues: props.currEditAttr.attrValueList.map((item) => ({
          ...item,
          disabled: true,
        })),
      }
    } else {
      // 添加模式：重置为初始状态
      dialogTitle.value = '添加属性'
      form.value = {
        attrName: '',
        attrValues: [],
      }
    }

    // 清除上一次可能的校验残余
    nextTick(() => {
      formRef.value?.clearValidate()
    })
  }
})
const rules: FormRules = {
  attrName: [
    { required: true, message: '请输入属性名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2-20 个字符', trigger: 'blur' },
  ],

  attrValues: [
    {
      required: true,
      validator: (_, value, callback) => {
        if (!value || value.length === 0) {
          callback(new Error('请至少添加一个属性值'))
          return
        }

        // 去空值
        const values = value.map((item: any) => item.valueName.trim())

        if (values.some((v: any) => !v)) {
          callback(new Error('属性值不能为空'))
          return
        }

        // 去重校验
        const unique = new Set(values)
        if (unique.size !== values.length) {
          callback(new Error('属性值不能重复'))
          return
        }

        callback()
      },
      trigger: 'blur',
    },
  ],
}

const form = ref<{ attrName: string; attrValues: ModelAttrValue[] }>({
  attrName: '',
  attrValues: [],
})

const addAttrValue = () => {
  form.value.attrValues.push({
    id: Date.now(),
    valueName: '',
    disabled: false,
  })
}

const removeAttrValue = (index: number) => {
  form.value.attrValues.splice(index, 1)
}

const formRef = ref()
const handleSubmit = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    // attrName属性名称
    // attrValueList属性值列表，格式为[{id: number, valueName: string, attrId: number}]
    if (form.value.attrValues.length === 0) {
      ElMessage.error('请至少添加一个属性值')
      return
    }
    await saveAttrInfo({
      attrName: form.value.attrName,
      categoryId: props.currEditAttr.categoryId || props.categoryId,
      categoryLevel: props.currEditAttr.categoryLevel || props.categoryLevel,
      attrValueList: form.value.attrValues,
    })
    dialogVisible.value = false
    ElMessage.success('保存成功')
  })
}
</script>

<template>
  <el-dialog width="600px" :title="dialogTitle" v-model="dialogVisible">
    <el-form :model="form" :rules="rules" ref="formRef">
      <!-- 属性名称 -->
      <el-form-item label="属性名称" prop="attrName">
        <el-input v-model="form.attrName" placeholder="请输入属性名称" />
      </el-form-item>

      <!-- 添加按钮 -->
      <el-form-item>
        <el-button
          v-if="!form.attrValues.length"
          type="primary"
          :disabled="!form.attrName.trim()"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
      </el-form-item>

      <!-- 属性值列表 -->
      <el-form-item label="属性值" prop="attrValues" v-if="form.attrValues.length > 0">
        <div v-for="(item, index) in form.attrValues" :key="item.id" class="attr-item">
          <el-input
            :placeholder="`请输入属性值${index + 1}`"
            :readonly="item.disabled"
            @click="item.disabled = false"
            @blur="item.disabled = true"
            v-model="item.valueName"
            :class="{ 'is-locked': item.disabled, input: true }"
          />

          <el-button
            size="small"
            icon="Delete"
            type="danger"
            circle
            @click="removeAttrValue(index)"
            v-if="form.attrValues.length > 1"
          />
        </div>
        <el-button
          class="mb-2! ml-2!"
          icon="Plus"
          size="small"
          type="primary"
          @click="addAttrValue"
          circle
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="handleSubmit"> 确定 </el-button>
      <el-button @click="dialogVisible = false"> 取消 </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.attr-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.input {
  width: 300px;
  margin-left: 13px;
}
/* 1. 修改输入框容器的背景和边框 */
.input.is-locked :deep(.el-input__wrapper) {
  background-color: #f5f7fa !important; /* 强制背景色 */
  box-shadow: none !important; /* 去掉 Element Plus 默认的投影边框 */
}

/* 2. 修改内部真正 input 标签的文字颜色和鼠标样式 */
.input.is-locked :deep(.el-input__inner) {
  color: #c0c4cc !important;
  cursor: not-allowed;
}
</style>
