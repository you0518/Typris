<template lang="pug">
  b-container.typing-field(fluid)
    b-row
      b-col
        b-form-input(v-model="inputKeys" type="email")
    b-row(v-for="(choice, index) in choices" :key="choice.operate")
      b-col.d-flex.flex-column.justify-content-center(cols="2")
        div.rounded.text-center(:style="{'background-color': choice.fill}") {{choice.operate}}
      b-col 
        div {{senTemps[sentenceList[index]].sentence}}
        div {{senTemps[sentenceList[index]].roman}}

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
      choices: [
        {
          operate: 'DROP',
          fill: '#E57373',
          callback: () => {
            PlayModule.moveDrop()
          }
        },
        {
          operate: '＜＜＜＜',
          fill: '#F06292',
          callback: async () => {
            await PlayModule.moveLeft()
            await PlayModule.moveLeft()
            await PlayModule.moveLeft()
            await PlayModule.moveLeft()
          }
        },
        {
          operate: '＜＜',
          fill: '#F06292',
          callback: async () => {
            await PlayModule.moveLeft()
            await PlayModule.moveLeft()
          }
        },
        {
          operate: '＜',
          fill: '#EC407A',
          callback: () => {
            PlayModule.moveLeft()
          }
        },
        {
          operate: '＞＞＞＞',
          fill: '#BA68C8',
          callback: async () => {
            await PlayModule.moveRight()
            await PlayModule.moveRight()
            await PlayModule.moveRight()
            await PlayModule.moveRight()
          }
        },
        {
          operate: '＞＞',
          fill: '#BA68C8',
          callback: async () => {
            await PlayModule.moveRight()
            await PlayModule.moveRight()
          }
        },
        {
          operate: '＞',
          fill: '#AB47BC',
          callback: () => {
            PlayModule.moveRight()
          }
        },
        {
          operate: 'Ｖ',
          fill: '#7986CB',
          callback: () => {
            PlayModule.moveDown()
          }
        },
        {
          operate: '●',
          fill: '#4DB6AC',
          callback: () => {
            PlayModule.rotate()
          }
        },
        {
          operate: 'HOLD',
          fill: '#81C784',
          callback: () => {
            PlayModule.setHold()
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
      switch (event.key) {
        case 'Backspace':
          this.inputKeys = this.inputKeys.slice(0, -1)
          break
        default:
          this.inputKeys += event.key
      }
      const correct = this.sentenceList.findIndex(el => {
        return this.inputKeys === this.senTemps[el].roman
      })
      console.log(correct)
      if (correct < 0) {
        return
      }
      this.inputKeys = ''
      TypingModule.nextTyping()
      this.choices[correct].callback()
    }
  }
})
</script>

<style lang="sass" scoped>
.typing-field
  font-size: 10px
  &> div
    margin-top: 1rem
    margin-bottom: 1rem
</style>
