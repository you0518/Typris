<template lang="pug">
  .score.d-flex.flex-column.align-items-center.m-3
    div
      h2 SCORE
    div
      h3 {{score}}
</template>
<script lang="ts">
import Vue from 'vue'
import PlayAreaModule from '@/store/modules/play'
export default Vue.extend({
  computed: {
    score() {
      return PlayAreaModule.getScore
    }
  }
})
</script>
