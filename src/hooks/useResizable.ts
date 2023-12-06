import { isArray, isNumber } from 'lodash-es'
import { ref } from 'vue'
import { ResizerDirectionEnum, ResizerTypeEnum } from '@/enums/WebIDEEnum'

interface UseResizableProps {
  type: ResizerTypeEnum
  getContainer: Function
  getDirection: Function
  getReverse: Function
  contentSize: number | number[]
}

export function useResizable(props: UseResizableProps) {
  const variable = {
    order: 0,
    start: { x: 0, y: 0 },
  }

  const isResizing = ref(false)
  const contentSize = ref(props.contentSize)

  const getDiff = (event) => {
    let diff = 0
    let diffPer = 0

    if (props.getDirection() === ResizerDirectionEnum.VERTICAL) {
      diff = event.clientY - variable.start.y
      variable.start.y = event.clientY

      diffPer = (diff / props.getContainer().offsetHeight) * 100
    } else {
      diff = event.clientX - variable.start.x
      variable.start.x = event.clientX

      diffPer = (diff / props.getContainer().offsetWidth) * 100
    }

    return { diff, diffPer }
  }

  const changeDiff = (diff) => {
    const reverse = props.getReverse()

    if (reverse) {
      if (isArray(contentSize.value) && variable.order) {
        contentSize.value[variable.order - 1] -= diff
        contentSize.value[variable.order] += diff
      }

      if (isNumber(contentSize.value)) {
        contentSize.value -= diff
      }
    } else {
      if (isArray(contentSize.value) && variable.order) {
        contentSize.value[variable.order - 1] += diff
        contentSize.value[variable.order] -= diff
      }

      if (isNumber(contentSize.value)) {
        contentSize.value += diff
      }
    }
  }

  const resize = (event) => {
    if (!isResizing.value) return

    const { diff, diffPer } = getDiff(event)

    if (props.type === ResizerTypeEnum.PERCENT) {
      changeDiff(diffPer)
    }

    if (props.type === ResizerTypeEnum.PIXEL) {
      changeDiff(diff)
    }
  }

  const resizeStop = () => {
    if (isResizing.value) {
      isResizing.value = false
      window.removeEventListener('mousemove', resize)
      window.removeEventListener('mouseup', resizeStop)
    }
  }

  const resizeStart = (event, index) => {
    isResizing.value = true
    variable.start.x = event.clientX
    variable.start.y = event.clientY
    variable.order = index

    window.addEventListener('mousemove', resize)
    window.addEventListener('mouseup', resizeStop)
  }

  return { isResizing, contentSize, resizeStart, resizeStop }
}
