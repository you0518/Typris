<template lang="pug">
  .dot-component(@click="$emit('click')")
    svg(xmlns="http://www.w3.org/2000/svg"
      :width="areaWidth + blockSize"
      :height="areaHeight + blockSize"
      :viewBox="`0 0 ${areaWidth + blockSize} ${areaHeight + blockSize}`"
      )
      rect(
        :x="blockSize / 2"
        :y="blockSize / 2"
        :rx="blockSize"
        :width="areaWidth"
        :height="areaHeight"
        :stroke="roundColor"
        fill="white"
        :stroke-width="blockSize")
      template(v-for="(block, k) in blocks")
        template(v-for="(row, i) in block")
          template(v-for="(point, j) in row")
            rect(v-if="point > 0"
              :y="(i + 2) * blockSize"
              :x="(j + 2) * blockSize + blockSize * (row.length + 1) * k"
              :width="blockSize"
              :height="blockSize"
              :fill="play.getColorList[k + 1]"
              :stroke="play.getStrokeColorList[k + 1]"
              :stroke-width="strokeWidth")

</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import { play } from '@/store'
export default Vue.extend({
  props: {
    blocks: {
      type: Array as PropType<number[][][]>,
      required: true
    },
    blockSize: {
      type: Number,
      required: true
    },
    strokeWidth: {
      type: Number,
      required: true
    },
    roundColor: {
      type: String,
      required: true
    }
  },
  computed: {
    areaWidth(): number {
      return (
        ((this.blocks[0][0].length + 1) * this.blocks.length + 2) *
        this.blockSize
      )
    },
    areaHeight(): number {
      return this.blockSize * (this.blocks[0].length + 3)
    },
    play(): typeof play {
      return play
    }
  }
})
</script>
