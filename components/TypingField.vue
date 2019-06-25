<template lang="pug">
  .typing-field
    div
      b-form-input(v-model="inputKeys")
    .d-flex(v-for="(choice, index) in choices" :key="choice.operate" :class="{'mb-3': index === 2}")
      .typing-field-operate.text-center
        .h-100.rounded.d-flex.flex-column.justify-content-center(:style="{'background-color': choice.fill}")
          div 
            b {{choice.operate}}
      .flex-grow-1 
        span
          b {{ senTemps[sentenceList[index]][0] }}
        span.ml-3 {{ senTemps[sentenceList[index]][1] }}

</template>

<script lang="ts">
import Vue from 'vue'
import TypingModule from '@/store/modules/typing'
import PlayModule from '@/store/modules/play'

export default Vue.extend({
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
          operate: '1',
          fill: '#EF9A9A',
          callback: async () => {
            await PlayModule.moveTo({ x: 1, y: 0 })
          }
        },
        {
          operate: '2',
          fill: '#CE93D8',
          callback: async () => {
            await PlayModule.moveTo({ x: 2, y: 0 })
          }
        },
        {
          operate: '3',
          fill: '#9FA8DA',
          callback: async () => {
            await PlayModule.moveTo({ x: 3, y: 0 })
          }
        },
        {
          operate: '4',
          fill: '#81D4FA',
          callback: async () => {
            await PlayModule.moveTo({ x: 4, y: 0 })
          }
        },
        {
          operate: '5',
          fill: '#A5D6A7',
          callback: async () => {
            await PlayModule.moveTo({ x: 5, y: 0 })
          }
        },
        {
          operate: '6',
          fill: '#C5E1A5',
          callback: async () => {
            await PlayModule.moveTo({ x: 6, y: 0 })
          }
        },
        {
          operate: '7',
          fill: '#FFCC80',
          callback: async () => {
            await PlayModule.moveTo({ x: 7, y: 0 })
          }
        },
        {
          operate: '8',
          fill: '#FFAB91',
          callback: async () => {
            await PlayModule.moveTo({ x: 8, y: 0 })
          }
        },
        {
          operate: '9',
          fill: '#BCAAA4',
          callback: async () => {
            await PlayModule.moveTo({ x: 9, y: 0 })
          }
        },
        {
          operate: '10',
          fill: '#80CBC4',
          callback: async () => {
            await PlayModule.moveTo({ x: 10, y: 0 })
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
