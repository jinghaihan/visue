import { debounce } from 'lodash-es'
import { useMonacoEditor, defaultOptions } from '@/hooks/useMonacoEditor'
import { EditorConfigSetting } from '../../../setting'

const { initMonaco, monacoRef } = useMonacoEditor()

interface InitEditorProps {
  codes?: Object
  onChange: Function
}

const initEditor = (props: InitEditorProps) => {
  const editors = {}

  EditorConfigSetting.forEach((conf) => {
    const dom = document.querySelector(`#${conf.key}-container`)
    if (dom) {
      const editor = monacoRef.value.editor.create(dom, {
        value: props.codes ? props.codes[conf.key] : '',
        language: conf.key,
        ...defaultOptions,
      })

      editor.onDidChangeModelContent(
        debounce(() => {
          props.onChange(getChangeProps(conf, editor))
        }, 500),
      )
      props.onChange(getChangeProps(conf, editor))
      editors[conf.key] = editor
    }
  })

  return editors
}

function getChangeProps(config, editor) {
  return {
    key: config.key,
    value: editor.getValue(),
  }
}

export function useEditor() {
  return {
    initMonaco,
    initEditor,
  }
}
