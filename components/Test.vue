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
      b-button(@click="hold" variant="info") HOLD
</template>

<script lang="ts">
import Vue from 'vue'
import { play } from '@/store'

export default Vue.extend({
  methods: {
    drop() {
      play.moveDrop()
    },
    right() {
      play.moveRight()
    },
    left() {
      play.moveLeft()
    },
    down() {
      play.moveDown()
    },
    auto() {
      setInterval(() => play.moveDown(), 500)
    },
    rotate() {
      play.rotate()
    },
    hold() {
      play.setHold()
    }
  }
})
</script>
