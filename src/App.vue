<template>
  <a-config-provider
    :prefixCls="prefixCls"
    :locale="zhCN"
    :theme="{
      algorithm: theme.darkAlgorithm,
      token: { colorPrimary: primaryColor, borderRadius: 0 },
    }"
  >
    <AppLayout />
  </a-config-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { theme } from 'ant-design-vue'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'

  import { prefixCls, primaryColor } from '@/settings/designSetting'
  import AppLayout from '@/components/Application/AppLayout/index.vue'

  export default defineComponent({
    name: 'App',
    components: { AppLayout },
    setup() {
      return {
        theme,
        zhCN,
        prefixCls,
        primaryColor,
      }
    },
  })
</script>

<style></style>
