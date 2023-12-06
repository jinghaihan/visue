<template>
  <div :class="prefixCls">
    <template v-for="action in NavBarSetting" :key="action.key">
      <Action
        :title="action.title"
        :icon="action.icon"
        :propsData="{ placement: 'bottom' }"
        @click="actionHandler(action)"
      />
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useDesign } from '@/hooks/useDesign'

  import { NavBarSetting } from '../../setting'

  export default defineComponent({
    name: 'NavBar',
    props: {
      state: {
        type: Object,
        required: true,
      },
      setState: {
        type: Function,
        required: true,
      },
      event: {
        type: Object,
        required: true,
      },
    },
    setup(_props) {
      const { prefixCls } = useDesign('markdown-editor-navBar')

      const actionHandler = (_action) => {}

      return {
        prefixCls,
        NavBarSetting,

        actionHandler,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-markdown-editor-navBar';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
