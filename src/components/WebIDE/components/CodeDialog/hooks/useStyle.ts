import { computed } from 'vue'
import { LayoutTypeEnum, ResizerDirectionEnum, ResizerTypeEnum } from '@/enums/WebIDEEnum'

import { EditorConfigSetting } from '../../../setting'
import { useResizable } from '@/hooks/useResizable'
import { useLayout } from './useLayout'

export function useStyle(props, ref) {
  /**
   * Resizer
   */
  const length = EditorConfigSetting.length
  const per = Math.floor((1 / length) * 100)

  const getContainer = () => {
    return ref.value
  }

  const {
    isResizing: editorResizing,
    contentSize: editorSize,
    resizeStart: editorResizeStart,
  } = useResizable({
    type: ResizerTypeEnum.PERCENT,
    getContainer,
    getDirection: () => {
      return props.state.layout === LayoutTypeEnum.TOP
        ? ResizerDirectionEnum.HORIZONTAL
        : ResizerDirectionEnum.VERTICAL
    },
    getReverse: () => {
      return false
    },
    contentSize: Array.from({ length: EditorConfigSetting.length }, () => per),
  })

  const {
    isResizing: containerResizing,
    contentSize: codeContainerSize,
    resizeStart: containerResizeStart,
  } = useResizable({
    type: ResizerTypeEnum.PIXEL,
    getContainer,
    getDirection: () => {
      return props.state.layout === LayoutTypeEnum.TOP
        ? ResizerDirectionEnum.VERTICAL
        : ResizerDirectionEnum.HORIZONTAL
    },
    getReverse: () => {
      return props.state.layout === LayoutTypeEnum.RIGHT
    },
    contentSize: 350,
  })

  /**
   * Layout - style generate by layout type
   */
  const { Container, CodeContainer, ContainerResizer, Editor, EditorResizer } = useLayout(props)

  function getCodeContainerStyle() {
    if (props.state.layout === LayoutTypeEnum.TOP) {
      return {
        ...CodeContainer.value,
        height: codeContainerSize.value + 'px',
      }
    } else {
      return {
        ...CodeContainer.value,
        width: codeContainerSize.value + 'px',
      }
    }
  }

  function getEditorStyle(index) {
    if (props.state.layout === LayoutTypeEnum.TOP) {
      return {
        ...Editor.value,
        width: editorSize.value[index] + '%',
      }
    } else {
      return {
        ...Editor.value,
        height: editorSize.value[index] + '%',
      }
    }
  }

  const isResizing = computed(() => {
    return editorResizing.value || containerResizing.value
  })
  const outputStyle = computed(() => {
    return {
      pointerEvents: isResizing.value ? 'none' : 'auto',
    }
  })

  return {
    editorResizeStart,
    containerResizeStart,
    getCodeContainerStyle,
    getEditorStyle,

    containerStyle: Container,
    containerResizerStyle: ContainerResizer,
    editorResizerStyle: EditorResizer,
    outputStyle,
  }
}
