<template>
  <div :class="prefixCls">
    <template v-for="action in NavBarSetting" :key="action.key">
      <LayoutWidget
        v-if="action.key === 'layout'"
        :action="action"
        :state="state"
        :setState="setState"
      />

      <Action
        v-else
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
  import { Modal } from 'ant-design-vue'
  import { useDesign } from '@/hooks/useDesign'

  import { NavBarSetting } from '../../setting'

  import LayoutWidget from './LayoutWidget.vue'

  export default defineComponent({
    name: 'NavBar',
    components: { LayoutWidget },
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
    setup(props) {
      const { prefixCls } = useDesign('webIDE-navBar')

      const actionHandler = (action) => {
        switch (action.key) {
          case 'refresh':
            props.event.onRefresh()
            break
          case 'export':
            props.event.onExport()
            break
          case 'clear':
            Modal.confirm({
              title: '清空',
              content: `确定要清空当前代码吗？`,
              okType: 'danger',
              onOk() {
                props.event.onClear()
              },
              onCancel() {},
            })
            break
          default:
            break
        }
      }

      return {
        prefixCls,
        NavBarSetting,

        actionHandler,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-webIDE-navBar';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
