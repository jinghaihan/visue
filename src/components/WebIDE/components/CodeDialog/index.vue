<template>
  <div ref="containerRef" :class="prefixCls" :style="containerStyle">
    <div class="code-container" :style="getCodeContainerStyle()">
      <template v-for="(editor, index) in EditorConfigSetting" :key="editor.key">
        <div
          :class="`resizer editor-resizer ${editor.key}-editor-resizer`"
          :style="editorResizerStyle"
          @mousedown="(e) => editorResizeStart(e, index)"
        >
        </div>
        <a-card :title="editor.title" hoverable :style="getEditorStyle(index)">
          <div :id="`${editor.key}-container`"></div>
        </a-card>
      </template>
    </div>

    <div
      class="resizer container-resizer"
      :style="containerResizerStyle"
      @mousedown="containerResizeStart"
    >
    </div>

    <div class="output-container">
      <iframe
        ref="iframeRef"
        class="output"
        frameBorder="0"
        sandbox="allow-scripts"
        :style="outputStyle"
      >
      </iframe>
    </div>
  </div>
</template>

<script lang="ts">
  import { cloneDeep } from 'lodash-es'
  import { ref, toRaw, defineComponent, onMounted } from 'vue'
  import { useDesign } from '@/hooks/useDesign'

  import { EditorConfigSetting } from '../../setting'
  import { useEditor } from './hooks/useEditor'
  import { useStyle } from './hooks/useStyle'

  import { generatHTML } from './helper'

  export default defineComponent({
    name: 'CodeDialog',
    props: {
      state: {
        type: Object,
        required: true,
      },
      setState: {
        type: Function,
        required: true,
      },
    },
    emits: ['change'],
    setup(props, { emit }) {
      const { prefixCls } = useDesign('webIDE-codeDialog')

      /**
       * Output - update iframe doc
       */
      const iframeRef = ref()
      const updateDoc = () => {
        const data = {
          codes: cloneDeep(toRaw(codes.value)),
        }
        iframeRef.value!.srcdoc = generatHTML(data.codes)
      }

      /**
       * Input - init code editor
       */
      const { initMonaco, initEditor } = useEditor()
      const codes = ref({})

      const initCodes = () => {
        EditorConfigSetting.forEach((config) => {
          codes.value[config.key] = ''
        })
      }
      initCodes()

      const setCodeValue = (data) => {
        codes.value[data.key] = data.value
        handleChange()
      }

      let editors
      onMounted(async () => {
        await initMonaco()
        editors = initEditor({ codes: props.state.codes, onChange: setCodeValue })
      })

      function handleChange() {
        updateDoc()
        props.setState({
          codes: cloneDeep(toRaw(codes.value)),
        })
        emit('change')
      }

      /**
       * Style - generate style by layout type & resize
       */
      const containerRef = ref()
      const {
        editorResizeStart,
        containerResizeStart,
        getCodeContainerStyle,
        getEditorStyle,
        containerStyle,
        containerResizerStyle,
        editorResizerStyle,
        outputStyle,
      } = useStyle(props, containerRef)

      /**
       * External API
       */
      function onRefresh() {
        Object.keys(editors).forEach((key) => {
          const value = editors[key].getValue()
          codes.value[key] = value
        })
        handleChange()
      }

      function onClear() {
        Object.keys(editors).forEach((key) => {
          codes.value[key] = ''
          editors[key].setValue('')
        })
        handleChange()
      }

      return {
        prefixCls,
        // setting
        EditorConfigSetting,
        // ref
        containerRef,
        iframeRef,
        // resize
        editorResizeStart,
        containerResizeStart,
        // style
        getCodeContainerStyle,
        getEditorStyle,
        containerStyle,
        containerResizerStyle,
        editorResizerStyle,
        outputStyle,

        // external api
        onRefresh,
        onClear,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-webIDE-codeDialog';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;
    display: flex;
    overflow: hidden;

    .code-container {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      :deep(.@{ant-prefix}-card) {
        height: 100%;

        &-head {
          min-height: 0;
          height: 40px;
          user-select: none;
        }

        &-body {
          height: calc(~'100% - 40px');
          padding: 0;

          > div {
            height: 100%;
          }
        }
      }
    }

    .output-container {
      background-color: #fff;
      flex-grow: 1;

      .output {
        min-height: 100%;
        min-width: 100%;
      }
    }
  }
</style>
