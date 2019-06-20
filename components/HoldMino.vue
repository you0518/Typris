<template lang="pug">
  .next-mino.d-flex.flex-column.align-items-center.m-3
    div
      h2 HOLD
    svg(xmlns="http://www.w3.org/2000/svg"
      :width="holdMinoAreaWidth"
      :height="holdMinoAreaHeight"
      :viewBox="`0 0 ${holdMinoAreaWidth} ${holdMinoAreaHeight}`")
      rect(
        :width="blockSize * width"
        :height="blockSize * height"
        fill="white"
        stroke="black"
        stroke-width="1")
      template(v-for="(minoBlockRow, j) in holdMinoBlock")
        template(v-for="(mino, k) in minoBlockRow")
          rect(v-if="mino!==0"
            :y="(j + 1) * blockSize"
            :x="(k + 1) * blockSize"
            :width="blockSize"
            :height="blockSize"
            :fill="getColor(mino)"
            stroke="gray"
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
    holdMinoAreaWidth(): number {
      return this.blockSize * this.width
    },
    holdMinoAreaHeight(): number {
      return this.blockSize * this.height
    },
    holdMinoBlock(): number[][] {
      return PlayAreaModule.getHoldMinoBlock
    },
    colorList(): string[] {
      return PlayAreaModule.getColorList
    }
  },
  methods: {
    getColor(index: number): string {
      return index >= 0 && index < this.colorList.length
        ? this.colorList[index]
        : 'black'
    }
  }
})
</script>
