<template lang="pug">
  .d-flex.m-2.flex-column.align-items-center
    div.m-1
      b-button(@click="left" variant="warning") ←
      b-button.mr-1.ml-1(@click="rotate" variant="success") ◯
      b-button(@click="right" variant="danger") →
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
      setInterval(() => PlayAreaModule.moveDown(), 100)
    },
    rotate() {
      PlayAreaModule.rotate()
    }
  }
})
</script>
