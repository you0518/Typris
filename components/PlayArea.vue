<template lang="pug">
  .play-area.d-flex.flex-column.align-items-center
    svg(xmlns="http://www.w3.org/2000/svg"
      :width="playAreaWidth"
      :height="playAreaHeight"
      :viewBox="`0 0 ${playAreaWidth} ${playAreaHeight}`")
      template(v-for="(area, i) in playArea")
        template(v-for="(mino, j) in area")
          rect(v-if="mino!==-1"
            :y="i * blockSize"
            :x="j * blockSize"
            :width="blockSize"
            :height="blockSize"
            :fill="getColor(mino)"
            stroke="gray"
            stroke-width="1")
          //- 壁の描画
          rect(v-else
            :y="i * blockSize"
            :x="j * blockSize"
            :width="blockSize"
            :height="blockSize"
            fill="brown"
            stroke="gray"
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
      blockSize: 35
    }
  },
  computed: {
    playAreaWidth(): number {
      return this.blockSize * PlayAreaModule.maxWidth
    },
    playAreaHeight(): number {
      return this.blockSize * PlayAreaModule.maxHeight
    },
    playArea(): number[][] {
      // 直接importしたものをsvgでつかうと、cannot find PlayAreaModuleと言われてしまうため。
      return PlayAreaModule.getPlayArea
    },
    colorList(): string[] {
      return PlayAreaModule.getColorList
    },
    gameOver() {
      return PlayAreaModule.getGameOver
    }
  },
  mounted() {
    PlayAreaModule.startPlay()
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

<style lang="sass" scoped>
.play-area
  border: 1px solid
</style>
