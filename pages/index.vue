<template lang="pug">
  div
    .typris-title(v-if="!started")
      typris-title
      start-button
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
import TyprisTitle from '@/components/TyprisTitle.vue'
import StartButton from '@/components/StartButton.vue'

export default Vue.extend({
  components: {
    HoldMino,
    NextMino,
    PlayArea,
    Score,
    TyprisTitle,
    StartButton
  },
  computed: {
    started() {
      return PlayAreaModule.isStart
    }
  }
})
</script>
