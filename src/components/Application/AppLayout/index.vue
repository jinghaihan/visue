<template>
  <a-layout :class="prefixCls">
    <a-layout-sider :class="`${prefixCls}-sider`" :width="45">
      <SideBar />
    </a-layout-sider>
    <a-layout-content :class="`${prefixCls}-content`">
      <RouterView>
        <template #default="{ Component, route }">
          <transition name="fade-slide" mode="out-in" appear>
            <component :is="Component" :key="route.name" />
          </transition>
        </template>
      </RouterView>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useDesign } from '@/hooks/useDesign'

  import SideBar from './SideBar/index.vue'

  export default defineComponent({
    name: 'AppLayout',
    components: { SideBar },
    setup() {
      const { prefixCls } = useDesign('app-layout')

      return {
        prefixCls,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-app-layout';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;
    background: @bg-darker-color;

    &-sider {
      background-color: @bg-dark-color;
    }
  }
</style>
