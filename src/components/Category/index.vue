<script setup lang="ts"></script>

<template>
  <el-form :inline="true">
    <el-form-item label="一级分类">
      <el-select class="!w-60" placeholder="请选择一级分类">
        <el-option :value="1" label="一级分类1" />
        <el-option :value="2" label="一级分类2" />
        <el-option :value="3" label="一级分类3" />
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select class="!w-60" placeholder="请选择二级分类">
        <el-option :value="1" label="二级分类1" />
        <el-option :value="2" label="二级分类2" />
        <el-option :value="3" label="二级分类3" />
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select class="!w-60" placeholder="请选择三级分类">
        <el-option :value="1" label="三级分类1" />
        <el-option :value="2" label="三级分类2" />
        <el-option :value="3" label="三级分类3" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="sass"></style>
