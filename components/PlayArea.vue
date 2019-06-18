<template lang="pug">
  .play-area
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
            stroke="black"
            stroke-width="1")
    b-button(@click="left" variant="warning") 左
    b-button(@click="right" variant="danger") 右
    b-button(@click="down" variant="primary") 下
    b-button(@click="rotate") 回転
</template>
<script lang="ts">
import { setInterval } from 'timers'
import Vue from 'vue'
import PlayAreaModule from '@/store/modules/play'

export default Vue.extend({
  data() {
    return {
      // 1マスのサイズ[px]
      blockSize: 40
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
  mounted() {
    PlayAreaModule.initNextMinoList()
    PlayAreaModule.startPlay()
  },
  methods: {
    right() {
      PlayAreaModule.startPlay()
    },
    left() {
      PlayAreaModule.moveLeft()
    },
    down() {
      setInterval(() => PlayAreaModule.moveDown(), 1000)
    },
    rotate() {
      PlayAreaModule.rotate()
    },
    getColor(index: number): string {
      switch (index) {
        case 0:
          return 'white'
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
