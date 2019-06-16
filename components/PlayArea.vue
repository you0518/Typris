<template lang="pug">
  .play-area
    svg(xmlns="http://www.w3.org/2000/svg"
      :width="playAreaWidth"
      :height="playAreaHeight"
      :viewBox="`0 0 ${playAreaWidth} ${playAreaHeight}`")
      template(v-for="(area, i) in playArea")
        template(v-for="(mino, j) in area")
          rect(v-if="mino!==-1"
            :x="i * blockSize"
            :y="j * blockSize"
            :width="blockSize"
            :height="blockSize"
            :fill="getColor(mino)"
            stroke="white"
            stroke-width="3")
</template>
<script lang="ts">
import Vue from 'vue'
import PlayAreaModule from '@/store/modules/play'

export default Vue.extend({
  data() {
    return {
      // 1マスのサイズ[px]
      blockSize: 50
    }
  },
  computed: {
    playAreaWidth(): number {
      return this.blockSize * (PlayAreaModule.maxWidth - 2)
    },
    playAreaHeight(): number {
      return this.blockSize * (PlayAreaModule.maxHeight - 2)
    },
    playArea(): number[][] {
      // 直接importしたものをsvgでつかうと、cannot find PlayAreaModuleと言われてしまうため。
      return PlayAreaModule.getPlayArea
    }
  },
  methods: {
    getColor(index: number): string {
      switch (index) {
        case 1:
          return 'red'
        case 2:
          return 'blue'
        case 3:
          return 'green'
        case 4:
          return 'yellow'
        case 5:
          return 'orange'
        case 6:
          return 'purple'
        case 7:
          return 'pink'
        default:
          return 'black'
      }
    }
  }
})
</script>

<style lang="sass" scoped>
.play-area
  border: 1px solid
</style>
