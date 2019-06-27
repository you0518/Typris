<template lang="pug">
  .next-mino.d-flex.flex-column.align-items-center.m-3
    div
      h4 HOLD
    svg(xmlns="http://www.w3.org/2000/svg"
      :width="minoAreaWidth"
      :height="minoAreaHeight"
      :viewBox="`0 0 ${minoAreaWidth} ${minoAreaHeight}`")
      //- 外枠の描画
      rect(
        :width="blockSize * width"
        :height="blockSize * height"
        fill="white"
        stroke="black"
        stroke-width="1")
      template(v-for="(row, j) in holdMinoBlock")
        template(v-for="(point, k) in row")
          rect(v-if="point!==0"
            :y="(j + 1) * blockSize"
            :x="(k + 1) * blockSize"
            :width="blockSize"
            :height="blockSize"
            :fill="fillColorList[point]"
            :stroke="strokeColorList[point]"
            :stroke-width="strokeWidth")
          
</template>

<script lang="ts">
import PlayAreaModule from '@/store/modules/play'
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      // 1マスのサイズ[px]
      blockSize: 20,
      strokeWidth: 1,
      // ホールドエリアの幅ブロック数
      width: 6,
      // ホールドエリアの高さブロック数
      height: 4
    }
  },
  computed: {
    /**
     * ホールド領域の幅[px]
     */
    minoAreaWidth(): number {
      return this.blockSize * this.width
    },
    /**
     * ホールド領域の高さ[px]
     */
    minoAreaHeight(): number {
      return this.blockSize * this.height
    },
    holdMinoBlock(): number[][] {
      return PlayAreaModule.getHoldMinoBlock
    },
    fillColorList(): string[] {
      return PlayAreaModule.getColorList
    },
    strokeColorList() {
      return PlayAreaModule.getStrokeColorList
    }
  }
})
</script>
