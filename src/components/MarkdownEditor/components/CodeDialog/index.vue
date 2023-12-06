<template>
  <div ref="containerRef" :class="prefixCls">
    <div ref="codeRef" class="code-container"></div>

    <div class="resizer"></div>

    <div class="output-container" v-html="markdown.render(code)"></div>
  </div>
</template>

<script lang="ts">
  import { cloneDeep, debounce } from 'lodash-es'
  import { ref, toRaw, defineComponent, onMounted } from 'vue'
  import { useDesign } from '@/hooks/useDesign'
  import { useMonacoEditor, defaultOptions } from '@/hooks/useMonacoEditor'
  import { useMarkdownIt } from '@/hooks/useMarkdownIt'

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
      const { prefixCls } = useDesign('markdown-editor-codeDialog')

      const { markdown } = useMarkdownIt()

      const codeRef = ref()
      const code = ref(props.state.code)
      const { initMonaco, monacoRef } = useMonacoEditor()

      onMounted(async () => {
        await initMonaco()
        const editor = monacoRef.value.editor.create(codeRef.value, {
          value: code.value,
          language: 'markdown',
          ...defaultOptions,
        })
        editor.onDidChangeModelContent(
          debounce(() => {
            code.value = editor.getValue()
            handleChange()
          }, 500),
        )
      })

      function handleChange() {
        props.setState({
          code: cloneDeep(toRaw(code.value)),
        })
        emit('change')
      }

      return {
        prefixCls,
        markdown,
        codeRef,
        code,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-markdown-editor-codeDialog';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;
    display: flex;
    overflow: hidden;

    > div {
      height: 100%;
    }

    .code-container {
      flex-shrink: 0;
      width: 500px;
    }

    .resizer {
      width: 12px;
      cursor: col-resize;
    }

    .output-container {
      flex-grow: 1;
      background-color: #fff;
      color: #333;
      padding: 24px;
      overflow: auto;
    }
  }
</style>
