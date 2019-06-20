<template lang="pug">
  .play-area.d-flex.flex-column.align-items-center
    svg(xmlns="http://www.w3.org/2000/svg"
      :width="playAreaWidth"
      :height="playAreaHeight"
      :viewBox="`0 0 ${playAreaWidth} ${playAreaHeight}`")
      template(v-for="(area, i) in playArea")
        template(v-for="(point, j) in area")
          rect(v-if="point.mino!==-1"
            :y="i * blockSize"
            :x="j * blockSize"
            :width="blockSize"
            :height="blockSize"
            :fill="getMinoColor(point.mino, j)"
            :stroke="strokeColorList[point.mino]"
            paint-order="stroke"
            stroke-width="2")
          //- 壁の描画
          rect(v-else
            :y="i * blockSize"
            :x="j * blockSize"
            :width="blockSize"
            :height="blockSize"
            paint-order="stroke"
            fill="brown"
            stroke="white"
            stroke-width="1")
    test
    div {{gameOver}}
</template>
<script lang="ts">
import Vue from 'vue'
import PlayAreaModule from '@/store/modules/play'
import Test from '@/components/Test.vue'

export default Vue.extend({
  components: {
    Test
  },
  data() {
    return {
      // 1マスのサイズ[px]
      blockSize: 35,
      colColor: [
        '#FFEBEE',
        '#F3E5F5',
        '#E8EAF6',
        '#E1F5FE',
        '#E8F5E9',
        '#F9FBE7',
        '#FFF3E0',
        '#FBE9E7',
        '#EFEBE9'
      ]
    }
  },
  computed: {
    playAreaWidth(): number {
      return this.blockSize * PlayAreaModule.maxWidth
    },
    playAreaHeight(): number {
      return this.blockSize * PlayAreaModule.maxHeight
    },
    playArea() {
      // 直接importしたものをsvgでつかうと、cannot find PlayAreaModuleと言われてしまうため。
      return PlayAreaModule.getPlayArea
    },
    colorList() {
      return PlayAreaModule.getColorList
    },
    strokeColorList() {
      return PlayAreaModule.getStrokeColorList
    },
    gameOver() {
      return PlayAreaModule.getGameOver
    }
  },
  mounted() {
    PlayAreaModule.startPlay()
  },
  methods: {
    getMinoColor(minoType: number, col: number) {
      return minoType > 0 && minoType < this.strokeColorList.length
        ? this.colorList[minoType]
        : this.colColor[col % this.colColor.length]
    }
  }
})
</script>

<style lang="sass" scoped>
.play-area
  border: 1px solid
</style>
