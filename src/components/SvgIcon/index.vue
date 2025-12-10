<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '2rem',
  },
  height: {
    type: String,
    default: '2rem',
  },
})
</script>
<template>
  <svg>
    <use :href="prefix + name" :fill="color" :width="width" :height="height" />
  </svg>
</template>
