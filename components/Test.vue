<template lang="pug">
  .m-5
    b-button(@click="left" variant="warning") 左
    b-button(@click="right" variant="danger") 右
    b-button(@click="down" variant="primary") 下
    b-button(@click="rotate") 回転
    b-button(@click="start") デキュー
</template>

<script lang="ts">
import Vue from 'vue'
import { setInterval } from 'timers'
import PlayAreaModule from '@/store/modules/play'

export default Vue.extend({
  methods: {
    start() {
      PlayAreaModule.startPlay()
    },
    right() {
      PlayAreaModule.moveRight()
    },
    left() {
      PlayAreaModule.moveLeft()
    },
    down() {
      setInterval(() => PlayAreaModule.moveDown(), 1000)
    },
    rotate() {
      PlayAreaModule.rotate()
    }
  }
})
</script>
