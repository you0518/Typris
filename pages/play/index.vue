<template lang="pug">
  div
    .typris.d-flex.m-3
      div
        score
        hold-mino
        next-mino
      play-area
      typing-field.ml-3
</template>

<script lang="ts">
import Vue from 'vue'

import HoldMino from '@/components/HoldMino.vue'
import NextMino from '@/components/NextMino.vue'
import PlayArea from '@/components/PlayArea.vue'
import Score from '@/components/Score.vue'
import TypingField from '@/components/TypingField.vue'

export default Vue.extend({
  components: {
    HoldMino,
    NextMino,
    PlayArea,
    Score,
    TypingField
  }
})
</script>
