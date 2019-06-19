<template lang="pug">
  .d-flex.m-2.flex-column.align-items-center
    div.m-1
      b-button(@click="drop" variant="danger") DROP
    div.m-1
      b-button(@click="left" variant="primary") ←
      b-button.mr-1.ml-1(@click="rotate" variant="warning") ◯
      b-button(@click="right" variant="primary") →
    div.m-1
      b-button(@click="down" variant="primary") ↓
    div.m-1
      b-button(@click="auto" variant="info") AUTO
</template>

<script lang="ts">
import Vue from 'vue'
// import { setInterval } from 'timers'
import PlayAreaModule from '@/store/modules/play'

export default Vue.extend({
  methods: {
    drop() {
      PlayAreaModule.moveDrop()
    },
    right() {
      PlayAreaModule.moveRight()
    },
    left() {
      PlayAreaModule.moveLeft()
    },
    down() {
      PlayAreaModule.moveDown()
    },
    auto() {
      setInterval(() => PlayAreaModule.moveDown(), 500)
    },
    rotate() {
      PlayAreaModule.rotate()
    }
  }
})
</script>
