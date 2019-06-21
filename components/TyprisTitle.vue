<template lang="pug">
  .typris-title
    svg(xmlns="http://www.w3.org/2000/svg"
      :width="titleWidth * 1.2"
      :height="titleHeight * 1.2"
      :viewBox="`0 0 ${titleWidth * 1.2} ${titleHeight * 1.2}`"
      )
      rect(
        x="20"
        y="20"
        rx="40"
        :width="titleWidth"
        :height="titleHeight"
        stroke="gold"
        fill="white"
        stroke-width="30")
      template(v-for="(block, k) in title")
        template(v-for="(row, i) in block")
          template(v-for="(point, j) in row")
            rect(v-if="point > 0"
              :y="(i + 2) * blockSize"
              :x="(j + 2) * blockSize + blockSize * (row.length - 1) * k"
              :width="blockSize"
              :height="blockSize"
              :fill="fillColorList[point]"
              :stroke="strokeColorList[point]"
              :stroke-width="strokeWidth")
      
</template>
<script lang="ts">
import Vue from 'vue'
import PlayAreaModule from '@/store/modules/play'

export default Vue.extend({
  data() {
    return {
      // 1マスのサイズ[px]
      blockSize: 30,
      strokeWidth: 2,
      title: [
        [
          [0, 1, 1, 1, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0]
        ],
        [
          [0, 2, 0, 2, 0],
          [0, 2, 0, 2, 0],
          [0, 0, 2, 0, 0],
          [0, 0, 2, 0, 0],
          [0, 0, 2, 0, 0]
        ],
        [
          [0, 3, 3, 3, 0],
          [0, 3, 0, 3, 0],
          [0, 3, 3, 3, 0],
          [0, 3, 0, 0, 0],
          [0, 3, 0, 0, 0]
        ],
        [
          [0, 4, 4, 4, 0],
          [0, 4, 0, 4, 0],
          [0, 4, 4, 4, 0],
          [0, 4, 4, 0, 0],
          [0, 4, 0, 4, 0]
        ],
        [
          [0, 0, 5, 0, 0],
          [0, 0, 5, 0, 0],
          [0, 0, 5, 0, 0],
          [0, 0, 5, 0, 0],
          [0, 0, 5, 0, 0]
        ],
        [
          [0, 6, 6, 6, 0],
          [0, 6, 0, 0, 0],
          [0, 0, 6, 0, 0],
          [0, 0, 0, 6, 0],
          [0, 6, 6, 6, 0]
        ]
      ]
    }
  },
  computed: {
    titleWidth(): number {
      return (this.title[0][0].length * this.title.length - 2) * this.blockSize
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
