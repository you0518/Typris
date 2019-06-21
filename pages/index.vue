<template lang="pug">
  div
    .typris-title(v-if="!started").d-flex.flex-column.align-items-center
      dot-component#typris-title.m-5(
        :blocks="title"
        :strokeWidth=2
        :blockSize=20
        roundColor="gold"
      )
      dot-component#start-button.m-5(
        :blocks="start"
        :strokeWidth=1
        :blockSize=5
        roundColor="red"
        @click="startPlay"
      )
    .typris.d-flex(v-else)
      div
        score
        hold-mino
      play-area
      next-mino
</template>
<script lang="ts">
import Vue from 'vue'
import PlayAreaModule from '@/store/modules/play'

import HoldMino from '@/components/HoldMino.vue'
import NextMino from '@/components/NextMino.vue'
import PlayArea from '@/components/PlayArea.vue'
import Score from '@/components/Score.vue'
import DotComponent from '@/components/DotComponent.vue'

export default Vue.extend({
  components: {
    HoldMino,
    NextMino,
    PlayArea,
    Score,
    DotComponent
  },
  data() {
    return {
      start: [
        [
          [1, 0, 0, 0, 1, 0, 0],
          [1, 0, 0, 1, 1, 1, 0],
          [1, 0, 0, 0, 1, 0, 0],
          [1, 0, 0, 0, 1, 0, 0],
          [1, 0, 0, 1, 1, 1, 0],
          [1, 0, 1, 0, 1, 0, 1],
          [1, 0, 0, 1, 0, 0, 0]
        ],
        [
          [0, 1, 0, 1, 0, 1, 0],
          [0, 1, 0, 1, 0, 1, 0],
          [0, 1, 0, 0, 0, 0, 0],
          [0, 1, 0, 0, 0, 0, 0],
          [0, 1, 0, 0, 0, 1, 0],
          [0, 1, 0, 0, 0, 1, 0],
          [0, 0, 1, 1, 1, 0, 0]
        ],
        [
          [0, 1, 0, 0, 1, 0, 0],
          [0, 1, 0, 0, 1, 0, 0],
          [0, 1, 1, 1, 1, 1, 0],
          [1, 0, 1, 0, 1, 0, 1],
          [1, 0, 1, 1, 0, 0, 1],
          [1, 0, 1, 0, 0, 0, 1],
          [0, 1, 0, 1, 0, 1, 0]
        ],
        [
          [0, 0, 1, 1, 1, 1, 0],
          [0, 0, 0, 0, 1, 0, 0],
          [0, 0, 0, 1, 0, 0, 0],
          [0, 0, 1, 1, 1, 1, 0],
          [0, 1, 0, 0, 0, 0, 1],
          [0, 0, 1, 1, 0, 0, 1],
          [0, 0, 1, 1, 1, 1, 0]
        ]
      ],
      title: [
        [
          [1, 1, 1, 1, 1],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0]
        ],
        [
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [0, 1, 0, 1, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0]
        ],
        [
          [1, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 1, 1, 1, 0],
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0]
        ],
        [
          [1, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 1, 1, 1, 0],
          [1, 0, 1, 0, 0],
          [1, 0, 0, 1, 0],
          [1, 0, 0, 0, 1]
        ],
        [
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0]
        ],
        [
          [0, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 0],
          [0, 1, 1, 1, 0],
          [0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [0, 1, 1, 1, 0]
        ]
      ]
    }
  },
  computed: {
    started() {
      return PlayAreaModule.isStart
    }
  },
  methods: {
    startPlay() {
      PlayAreaModule.startPlay()
    }
  }
})
</script>

<style lang="sass" scoped>
#start-button
  cursor: pointer
</style>
