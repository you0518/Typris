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
          rect(v-else
            :y="i * blockSize"
            :x="j * blockSize"
            :width="blockSize"
            :height="blockSize"
            fill="brown"
            stroke="black"
            stroke-width="1")
    test
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
      blockSize: 40
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
    }
  },
  mounted() {
    PlayAreaModule.initNextMinoList()
    PlayAreaModule.startPlay()
  },
  methods: {
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
