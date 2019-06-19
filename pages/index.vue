<template lang="pug">
  .typris.d-flex
    play-area
    next-mino
</template>
<script lang="ts">
import Vue from 'vue'
import HoldMino from '@/components/HoldMino.vue'
import NextMino from '@/components/NextMino.vue'
import PlayArea from '@/components/PlayArea.vue'
import Score from '@/components/Score.vue'
export default Vue.extend({
  components: {
    HoldMino,
    NextMino,
    PlayArea,
    Score
  }
})
</script>
