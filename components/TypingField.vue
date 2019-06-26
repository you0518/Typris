<template lang="pug">
  .typing-field
    div
      b-form-input(v-model="inputKeys")
    
    .d-flex.flex-column
      .d-flex.justify-content-center
        hold(
          :fill="choices[0].fill"
          :text="[...senTemps[sentenceList[0]]]")
      .d-flex.justify-content-center
        arrow.m-1(vector="left"
          :fill="choices[3].fill"
          :text="[...senTemps[sentenceList[3]]]")
        rotate.m-1(
          :fill="choices[1].fill"
          :text="[...senTemps[sentenceList[1]]]")
        arrow.m-1(vector="right"
          :fill="choices[4].fill"
          :text="[...senTemps[sentenceList[4]]]")
      .d-flex.justify-content-center
        arrow.m-1(vector="bottom"
          :fill="choices[2].fill"
          :text="[...senTemps[sentenceList[2]]]")
</template>

<script lang="ts">
import Vue from 'vue'
import TypingModule from '@/store/modules/typing'
import PlayModule from '@/store/modules/play'
import Arrow from '@/components/ui/ArrowComponent.vue'
import Rotate from '@/components/ui/RotateComponent.vue'
import Hold from '@/components/ui/HoldComponent.vue'

export default Vue.extend({
  components: {
    Arrow,
    Rotate,
    Hold
  },
  data() {
    return {
      inputKeys: '',
      correct: 0,
      reg: new RegExp(/^[a-zA-Z0-9!-/:-@¥[-`{-~\s]*$/),
      choices: [
        {
          operate: 'HOLD',
          fill: '#E91E63',
          callback: async () => {
            await PlayModule.setHold()
          }
        },
        {
          operate: 'ROTATE',
          fill: '#2196F3',
          callback: async () => {
            await PlayModule.rotate()
          }
        },
        {
          operate: 'DROP',
          fill: '#4CAF50',
          callback: async () => {
            await PlayModule.moveDrop()
          }
        },
        {
          operate: 'left',
          fill: '#CE93D8',
          callback: async () => {
            await PlayModule.moveLeft()
          }
        },
        {
          operate: 'right',
          fill: '#EF9A9A',
          callback: async () => {
            await PlayModule.moveRight()
          }
        }
      ]
    }
  },
  computed: {
    // 文章のテンプレート一覧
    senTemps() {
      return TypingModule.getSentenceTemplates
    },
    sentenceList() {
      return TypingModule.getSentenceList
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    handleKeyDown(event) {
      const key = event.key
      switch (key) {
        case 'Backspace':
          this.inputKeys = this.inputKeys.slice(0, -1)
          return true
      }
      if (key.length !== 1 || !this.reg.test(key)) {
        return true
      }
      this.inputKeys += key
      const correct = this.sentenceList.findIndex(el => {
        return this.inputKeys === this.senTemps[el][0]
      })
      if (correct < 0) {
        return
      }
      this.inputKeys = ''
      TypingModule.nextTyping(correct)
      this.choices[correct].callback()
      return false
    }
  }
})
</script>

<style lang="sass" scoped>
.typing-field
  font-size: 10px
  &> div
    margin-top: 0.2rem
    margin-bottom: 0.2rem
  &-operate
    width: 40px
    margin-right: 0.5rem
</style>
