<template>
  <a-layout :class="prefixCls">
    <a-layout-header :class="`${prefixCls}-header`">
      <NavBar :state="state" :setState="setState" :event="{ onRefresh, onExport, onClear }" />
    </a-layout-header>

    <a-layout-content :class="`${prefixCls}-content`">
      <CodeDialog ref="codeDialogRef" :state="state" :setState="setState" @change="onChange" />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
  import { cloneDeep } from 'lodash-es'
  import { ref, toRaw, defineComponent } from 'vue'
  import { saveAs } from 'file-saver'
  import { useDesign } from '@/hooks/useDesign'

  import NavBar from './components/NavBar/index.vue'
  import CodeDialog from './components/CodeDialog/index.vue'

  import { WEB_IDE_CFG_KEY } from '@/enums/CacheEnum'
  import { webStorage } from '@/utils/storage'

  import { generatHTML } from './components/CodeDialog/helper'

  export default defineComponent({
    name: 'WebIDE',
    components: { NavBar, CodeDialog },
    setup() {
      const { prefixCls } = useDesign('webIDE')

      const state = ref({
        layout: 'top',
        codes: {},
      })
      const setState = (value) => {
        state.value = {
          ...state.value,
          ...value,
        }
        onChange()
      }

      function onChange() {
        const data = cloneDeep(toRaw(state.value))

        webStorage.$ls.set(WEB_IDE_CFG_KEY, data)
      }

      function initState() {
        const cacheState = webStorage.$ls.get(WEB_IDE_CFG_KEY)
        if (cacheState) {
          const value = JSON.parse(cacheState)
          state.value = value
        }
      }
      initState()

      /**
       * navBar action handler
       */
      const codeDialogRef = ref()

      const onRefresh = () => {
        codeDialogRef.value?.onRefresh()
      }

      const onExport = () => {
        const codeStr = generatHTML(cloneDeep(toRaw(state.value.codes)))
        const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
        saveAs(blob, `index.html`)
      }

      const onClear = () => {
        codeDialogRef.value?.onClear()
      }

      return {
        prefixCls,
        state,
        setState,
        onChange,

        codeDialogRef,
        onRefresh,
        onExport,
        onClear,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-webIDE';

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
