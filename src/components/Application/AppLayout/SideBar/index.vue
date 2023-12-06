<template>
  <div :class="prefixCls">
    <Action class="logo" icon="svg-logo" />

    <Action
      v-for="menu in menus"
      :key="menu.name"
      :title="menu.meta.title"
      :icon="menu.meta.icon"
      :active="isActive(menu)"
      :propsData="{ placement: 'right' }"
      @click="onClick(menu)"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useDesign } from '@/hooks/useDesign'
  import { basicRoutes } from '@/router/routes'

  export default defineComponent({
    name: 'AppLayoutSiderBar',
    setup() {
      const { prefixCls } = useDesign('app-layout-sider')

      const menus = basicRoutes.filter((route) => route.name)

      const route = useRoute()
      const isActive = (menu) => {
        return route.name === menu.name
      }

      const router = useRouter()
      const onClick = (menu) => {
        router.push(menu.path)
      }

      return {
        prefixCls,
        menus,
        isActive,
        onClick,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-app-layout-sider';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;

    :deep(.logo) {
      height: 45px;
      width: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      font-size: 36px;
      color: @cyan-color;
    }
  }
</style>
