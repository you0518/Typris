<template lang="pug">
  .next-mino.d-flex.flex-column.align-items-center.m-3
    div
      h4 NEXT
    svg(xmlns="http://www.w3.org/2000/svg"
      :width="MinoAreaWidth"
      :height="MinoAreaHeight"
      :viewBox="`0 0 ${MinoAreaWidth} ${MinoAreaHeight}`")
      template(v-for="(minoBlock, i) in play.getNextMinoBlockList")
        //- 外枠を描画
        rect(
          :y="i * oneMinoAreaHeight"
          :width="blockSize * width"
          :height="blockSize * height"
          fill="white"
          stroke="black"
          stroke-width="1")
        template(v-for="(minoBlockRow, j) in minoBlock")
          template(v-for="(mino, k) in minoBlockRow")
            rect(v-if="mino!==0"
              :y="(j + 1) * blockSize + i * oneMinoAreaHeight"
              :x="(k + 1) * blockSize"
              :width="blockSize"
              :height="blockSize"
              :fill="play.getColorList[mino]"
              :stroke="play.getStrokeColorList[mino]"
              :stroke-width="strokeWidth")

</template>

<script lang="ts">
import { play } from '@/store'

import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      // 1マスのサイズ[px]
      blockSize: 20,
      strokeWidth: 1,
      // 次ミノ1エリアの幅ブロック数
      width: 6,
      // 次ミノ1エリアの高さブロック数
      height: 4
    }
  },
  computed: {
    oneMinoAreaHeight(): number {
      return this.blockSize * this.height
    },
    MinoAreaWidth(): number {
      return this.blockSize * this.width
    },
    MinoAreaHeight(): number {
      return this.oneMinoAreaHeight * this.play.getNextMinoBlockList.length
    },
    play(): typeof play {
      return play
    }
  }
})
</script>
