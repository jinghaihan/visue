import { computed } from 'vue'
import { LayoutTypeEnum, ResizerDirectionEnum } from '@/enums/WebIDEEnum'

const getResizerStyle = (direction) => {
  const resizerSize = 12

  if (direction === ResizerDirectionEnum.VERTICAL) {
    return {
      height: '100%',
      width: `${resizerSize}px`,
      cursor: 'col-resize',
    }
  } else {
    return {
      height: `${resizerSize}px`,
      width: '100%',
      cursor: 'row-resize',
    }
  }
}

export function useLayout(props) {
  const Container = computed(() => {
    switch (props.state.layout) {
      case LayoutTypeEnum.TOP:
        return {
          flexDirection: 'column',
        }
      case LayoutTypeEnum.LEFT:
        return {
          flexDirection: 'row',
        }
      case LayoutTypeEnum.RIGHT:
        return {
          flexDirection: 'row-reverse',
        }
      default:
        return {}
    }
  })

  const ContainerResizer = computed(() => {
    switch (props.state.layout) {
      case LayoutTypeEnum.TOP:
        return getResizerStyle(ResizerDirectionEnum.HORIZONTAL)
      default:
        return getResizerStyle(ResizerDirectionEnum.VERTICAL)
    }
  })

  const CodeContainer = computed(() => {
    switch (props.state.layout) {
      case LayoutTypeEnum.TOP:
        return {
          width: '100%',
          flexDirection: 'row',
        }
      default:
        return {
          height: '100%',
          flexDirection: 'column',
        }
    }
  })

  const Editor = computed(() => {
    switch (props.state.layout) {
      case LayoutTypeEnum.TOP:
        return {
          height: '100%',
          width: 0,
        }
      default:
        return {
          height: 0,
          width: '100%',
        }
    }
  })

  const EditorResizer = computed(() => {
    switch (props.state.layout) {
      case LayoutTypeEnum.TOP:
        return getResizerStyle(ResizerDirectionEnum.VERTICAL)
      default:
        return getResizerStyle(ResizerDirectionEnum.HORIZONTAL)
    }
  })

  return {
    Container,
    ContainerResizer,
    CodeContainer,
    Editor,
    EditorResizer,
  }
}
