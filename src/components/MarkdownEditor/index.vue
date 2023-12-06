<template>
  <a-layout :class="prefixCls">
    <a-layout-header :class="`${prefixCls}-header`">
      <NavBar :state="state" :setState="setState" :event="{}" />
    </a-layout-header>

    <a-layout-content :class="`${prefixCls}-content`">
      <CodeDialog :state="state" :setState="setState" @change="onChange" />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
  import { cloneDeep } from 'lodash-es'
  import { ref, toRaw, defineComponent } from 'vue'
  import { useDesign } from '@/hooks/useDesign'

  import NavBar from './components/NavBar/index.vue'
  import CodeDialog from './components/CodeDialog/index.vue'

  import { MARKDOWN_EDITOR_CFG_KEY } from '@/enums/CacheEnum'
  import { webStorage } from '@/utils/storage'

  export default defineComponent({
    name: 'MarkdownEditor',
    components: { NavBar, CodeDialog },
    setup() {
      const { prefixCls } = useDesign('markdown-editor')

      const state = ref({
        code: '',
      })
      const setState = (value) => {
        state.value = {
          ...state.value,
          ...value,
        }
      }

      function onChange() {
        const data = cloneDeep(toRaw(state.value))

        webStorage.$ls.set(MARKDOWN_EDITOR_CFG_KEY, data)
      }

      function initState() {
        const cacheState = webStorage.$ls.get(MARKDOWN_EDITOR_CFG_KEY)
        if (cacheState) {
          const value = JSON.parse(cacheState)
          state.value = value
        }
      }
      initState()

      return {
        prefixCls,

        state,
        setState,
        onChange,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-markdown-editor';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;

    &-header {
      height: 45px;
      padding: 0;
      background-color: @bg-dark-color;
    }

    &-content {
      height: calc(~'100vh - 45px');
    }
  }
</style>
