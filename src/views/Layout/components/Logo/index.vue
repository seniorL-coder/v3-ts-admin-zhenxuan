<script setup lang="ts">
import logoInfo from '@/setting'
</script>

<template>
  <div class="logo">
    <el-image class="img" :src="logoInfo.logo" alt="logo" />

    <h2>{{ logoInfo.title }}</h2>
  </div>
</template>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  transition: all 0.5s;
  perspective: 500px;
  &:hover {
    scale: 0.9;
    z-index: 999;
    transform: translateZ(100px);
    box-shadow: 5px 5px 10px rgba(128, 128, 128, 0.5);
  }
}
.img:hover ~ .userinfo {
  height: 180px;
  transition: all 1s;
}
.userinfo {
  perspective: 500px;
  box-shadow:
    0 12px 32px 4px rgba(0, 0, 0, 0.04),
    0 8px 20px rgba(0, 0, 0, 0.08);
  transform: translateZ(100px);
  box-sizing: border-box;
  overflow: hidden;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 100;
  top: 50px;
  left: 20px;
  width: 180px;
  height: 0;
  border-radius: 10px;
  background-color: #ffffff;
  .avator {
    height: 50px;
    width: 50px;
    border-radius: 100px;
  }
}
</style>
