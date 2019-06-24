<template lang="pug">
  .typris.d-flex
      div
        score
        hold-mino
      play-area
      next-mino
      typing-field
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
