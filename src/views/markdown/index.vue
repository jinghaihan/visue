<template>
  <MarkdownEditor />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import MarkdownEditor from '@/components/MarkdownEditor/index.vue'

  export default defineComponent({
    name: 'MarkdownPage',
    components: { MarkdownEditor },
    setup() {},
  })
</script>

<style lang="less" scoped></style>
