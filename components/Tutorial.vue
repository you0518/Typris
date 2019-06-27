<template lang="pug">
  .tutorial
    p 英単語のタイピングによってブロックを操作する落ちゲーです。
    h4 操作方法
    p 下記のように、アイコン上に英単語が表示されます。対応する英単語をタイピングすることでブロックを操作します。
    .d-flex.flex-column
      .d-flex.justify-content-center
        hold.operate-component(
          :fill="choices[0].fill"
          :text="[choices[0].operate, choices[0].explain]")
      .d-flex.justify-content-center
        arrow.operate-component(vector="left"
          :fill="choices[3].fill"
          :text="[choices[3].operate, choices[3].explain]")
        rotate.operate-component(
          :fill="choices[1].fill"
          :text="[choices[1].operate, choices[1].explain]")
        arrow.operate-component(vector="right"
          :fill="choices[4].fill"
          :text="[choices[4].operate, choices[4].explain]")
      .d-flex.justify-content-center
        arrow.operate-component(vector="bottom"
          :fill="choices[2].fill"
          :text="[choices[2].operate, choices[2].explain]")
    h4 対応環境
    ul 
      li PCのみ。スマートフォン、タブレットは未対応
    h4 対応ブラウザ
    ul
      li Chrome
      li Microsoft Edge
      li FireFox
      li Safari

</template>

<script lang="ts">
import Vue from 'vue'
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
      choices: [
        {
          operate: 'HOLD',
          fill: '#E91E63',
          explain: '操作中のブロックをホールドします'
        },
        {
          operate: 'ROTATE',
          fill: '#2196F3',
          explain: '操作中のブロックを時計回りに回転します'
        },
        {
          operate: 'DROP',
          fill: '#4CAF50',
          explain: '操作中のブロックを一番下へ移動します'
        },
        {
          operate: 'LEFT',
          fill: '#CE93D8',
          explain: '操作中のブロックを左へ移動します'
        },
        {
          operate: 'RIGHT',
          fill: '#EF9A9A',
          explain: '操作中のブロックを右へ移動します'
        }
      ]
    }
  }
})
</script>

<style lang="sass" scoped>
.operate-component
  width: 310px
  height: 120px
  font-size: 1rem
  marigin: 1rem
</style>
