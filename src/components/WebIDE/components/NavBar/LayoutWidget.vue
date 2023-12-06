<template>
  <a-popover
    v-if="action.key === 'layout'"
    :trigger="['hover', 'click']"
    :getPopupContainer="
      (triggerNode) => {
        return triggerNode.parentNode || document.body
      }
    "
    :title="action.title"
  >
    <Action :icon="action.icon" />

    <template #content>
      <div class="layout-content">
        <template
          v-for="layout in [LayoutTypeEnum.LEFT, LayoutTypeEnum.TOP, LayoutTypeEnum.RIGHT]"
          :key="layout"
        >
          <Action
            icon="svg-layout"
            :class="`${layout}-layout`"
            :active="state.layout === layout"
            @click="onChange(layout)"
          />
        </template>
      </div>
    </template>
  </a-popover>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { LayoutTypeEnum } from '@/enums/WebIDEEnum'

  export default defineComponent({
    name: 'LayoutWidget',
    props: {
      state: {
        type: Object,
        required: true,
      },
      setState: {
        type: Function,
        required: true,
      },
      action: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const onChange = (layout) => {
        props.setState({
          layout,
        })
      }

      return {
        LayoutTypeEnum,
        onChange,
      }
    },
  })
</script>

<style lang="less" scoped>
  .layout-content {
    display: flex;
    justify-content: center;
    align-items: center;

    :deep(.left-layout) {
      transform: rotate(-90deg);
    }
    :deep(.right-layout) {
      transform: rotate(90deg);
    }
  }
</style>
