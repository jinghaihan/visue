<template>
  <WebIDE />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import WebIDE from '@/components/WebIDE/index.vue'

  export default defineComponent({
    name: 'WebIDEPage',
    components: { WebIDE },
    setup() {},
  })
</script>

<style lang="less" scoped></style>
