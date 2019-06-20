<template lang="pug">
  .next-mino.d-flex.flex-column.align-items-center.m-3
    div
      h2 NEXT
    svg(xmlns="http://www.w3.org/2000/svg"
      :width="nextMinoAreaWidth"
      :height="nextMinoAreaHeight"
      :viewBox="`0 0 ${nextMinoAreaWidth} ${nextMinoAreaHeight}`")
      template(v-for="(minoBlock, i) in nextMinoBlockList")
        //- 外枠を描画
        rect(
              :y="i * oneNextMinoAreaHeight"
              :width="blockSize * width"
              :height="blockSize * height"
              fill="white"
              stroke="black"
              stroke-width="1")
        template(v-for="(minoBlockRow, j) in minoBlock")
          template(v-for="(mino, k) in minoBlockRow")
            rect(v-if="mino!==0"
              :y="(j + 1) * blockSize + i * oneNextMinoAreaHeight"
              :x="(k + 1) * blockSize"
              :width="blockSize"
              :height="blockSize"
              :fill="colorList[mino]"
              :stroke="strokeColorList[mino]"
              stroke-width="1")
          
</template>

<script lang="ts">
import PlayAreaModule from '@/store/modules/play'
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      // 1マスのサイズ[px]
      blockSize: 25,
      width: 6,
      height: 4
    }
  },
  computed: {
    oneNextMinoAreaHeight(): number {
      return this.blockSize * this.height
    },
    nextMinoAreaWidth(): number {
      return this.blockSize * this.width
    },
    nextMinoAreaHeight(): number {
      return this.oneNextMinoAreaHeight * this.nextMinoBlockList.length
    },
    nextMinoBlockList(): number[][][] {
      return PlayAreaModule.getNextMinoBlockList
    },
    colorList(): string[] {
      return PlayAreaModule.getColorList
    },
    strokeColorList() {
      return PlayAreaModule.getStrokeColorList
    }
  }
})
</script>
