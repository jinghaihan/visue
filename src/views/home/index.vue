<template>
  <div :class="`${prefixCls}`" ref="containerRef">
    <canvas class="canvas" ref="canvasRef"></canvas>
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent, onMounted, onBeforeUnmount } from 'vue'
  import { useDesign } from '@/hooks/useDesign'
  import { Letters } from './Letters'

  export default defineComponent({
    name: 'HomePage',
    props: {
      options: {
        type: Object,
        required: false,
        default: () => {},
      },
    },
    setup(props) {
      const { prefixCls, prefixVar } = useDesign('home')

      const containerRef = ref()
      const canvasRef = ref()

      let letters = null as Letters | null
      onMounted(() => {
        letters = new Letters({
          container: containerRef.value,
          canvas: canvasRef.value,
          msg: prefixVar,
          ...props.options,
        })
      })
      onBeforeUnmount(() => {
        letters?.destroy()
      })

      return {
        prefixCls,
        containerRef,
        canvasRef,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-home';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;

    .canvas {
      height: 100%;
      width: 100%;
    }
  }
</style>
