<template lang="pug">
  .score.d-flex.flex-column.align-items-center.m-3
    div
      h4 SCORE
    div
      h4 {{score}}
</template>
<script lang="ts">
import Vue from 'vue'
import { play } from '@/store'

export default Vue.extend({
  computed: {
    score(): number {
      return play.getScore
    }
  }
})
</script>
