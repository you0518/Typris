<template lang="pug">
  .typris-title
    svg(xmlns="http://www.w3.org/2000/svg"
      :width="titleWidth + blockSize"
      :height="titleHeight + blockSize"
      :viewBox="`0 0 ${titleWidth + blockSize} ${titleHeight + blockSize}`"
      )
      rect(
        :x="blockSize / 2"
        :y="blockSize / 2"
        :rx="blockSize"
        :width="titleWidth"
        :height="titleHeight"
        stroke="black"
        fill="white"
        :stroke-width="blockSize")
      template(v-for="(block, k) in title")
        template(v-for="(row, i) in block")
          template(v-for="(point, j) in row")
            rect(v-if="point > 0"
              :y="(i + 2) * blockSize"
              :x="(j + 2) * blockSize + blockSize * (row.length + 1) * k"
              :width="blockSize"
              :height="blockSize"
              :fill="fillColorList[k + 1]"
              :stroke="strokeColorList[k + 1]"
              :stroke-width="strokeWidth")
      
</template>
<script lang="ts">
import Vue from 'vue'
import PlayAreaModule from '@/store/modules/play'

export default Vue.extend({
  data() {
    return {
      // 1マスのサイズ[px]
      blockSize: 7,
      strokeWidth: 2,
      title: [
        [
          [1, 0, 0, 0, 1, 0, 0],
          [1, 0, 0, 1, 1, 1, 0],
          [1, 0, 0, 0, 1, 0, 0],
          [1, 0, 0, 0, 1, 0, 0],
          [1, 0, 0, 1, 1, 1, 0],
          [1, 0, 1, 0, 1, 0, 1],
          [1, 0, 0, 1, 0, 0, 0]
        ],
        [
          [0, 1, 0, 1, 0, 1, 0],
          [0, 1, 0, 1, 0, 1, 0],
          [0, 1, 0, 0, 0, 0, 0],
          [0, 1, 0, 0, 0, 0, 0],
          [0, 1, 0, 0, 0, 1, 0],
          [0, 1, 0, 0, 0, 1, 0],
          [0, 0, 1, 1, 1, 0, 0]
        ],
        [
          [0, 1, 0, 0, 1, 0, 0],
          [0, 1, 0, 0, 1, 0, 0],
          [0, 1, 1, 1, 1, 1, 0],
          [1, 0, 1, 0, 1, 0, 1],
          [1, 0, 1, 1, 0, 0, 1],
          [1, 0, 1, 0, 0, 0, 1],
          [0, 1, 0, 1, 0, 1, 0]
        ],
        [
          [0, 0, 1, 1, 1, 1, 0],
          [0, 0, 0, 0, 1, 0, 0],
          [0, 0, 0, 1, 0, 0, 0],
          [0, 0, 1, 1, 1, 1, 0],
          [0, 1, 0, 0, 0, 0, 1],
          [0, 0, 1, 1, 0, 0, 1],
          [0, 0, 1, 1, 1, 1, 0]
        ]
      ]
    }
  },
  computed: {
    titleWidth(): number {
      return (
        ((this.title[0][0].length + 1) * this.title.length + 2) * this.blockSize
      )
    },
    titleHeight(): number {
      return this.blockSize * (this.title[0].length + 3)
    },
    fillColorList() {
      return PlayAreaModule.getColorList
    },
    /**
     * ミノの枠色
     */
    strokeColorList() {
      return PlayAreaModule.getStrokeColorList
    }
  }
})
</script>
