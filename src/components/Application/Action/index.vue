<template>
  <a-tooltip v-bind="propsData">
    <template v-if="title" #title>{{ title }}</template>

    <a-button
      :class="getClass"
      type="text"
      :style="{ height: size.height + 'px', width: size.width + 'px' }"
    >
      <Icon v-if="icon" :type="icon" />
    </a-button>
  </a-tooltip>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useDesign } from '@/hooks/useDesign'

  export default defineComponent({
    name: 'Action',
    props: {
      title: {
        type: String,
        required: false,
        default: '',
      },
      icon: {
        type: String,
        required: false,
      },
      active: {
        type: Boolean,
        required: false,
        default: false,
      },
      size: {
        type: Object,
        required: false,
        default: () => {
          return {
            width: 45,
            height: 45,
          }
        },
      },
      propsData: {
        type: Object,
        required: false,
        default: () => {},
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('action')

      const getClass = computed(() => {
        return props.active ? `${prefixCls} active` : prefixCls
      })

      return {
        prefixCls,
        getClass,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-action';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    font-size: 16px;
  }

  .@{prefix-cls}.active {
    color: rgba(255, 255, 255, 0.85);
    background-color: rgba(255, 255, 255, 0.12);
  }
</style>
