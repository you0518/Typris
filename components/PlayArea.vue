<template lang="pug">
  .play-area.d-flex.flex-column.align-items-center
    svg(xmlns="http://www.w3.org/2000/svg"
      :width="playAreaWidth"
      :height="playAreaHeight"
      :viewBox="`0 0 ${playAreaWidth} ${playAreaHeight}`")
      template(v-for="(row, i) in playArea")
        template(v-for="(point, j) in row")
          //- 空列の描画
          rect(v-if="point.mino!==-1"
            :y="i * blockSize"
            :x="j * blockSize"
            :width="blockSize"
            :height="blockSize"
            :fill="colColor[(j - 1) % colColor.length].fill"
            stroke="white"
            :stroke-width="strokeWidth")
          //- 壁の描画
          rect(v-else
            :y="i * blockSize"
            :x="j * blockSize"
            :width="blockSize"
            :height="blockSize"
            fill="#795548"
            stroke="#3E2723"
            :stroke-width="strokeWidth")
      template(v-for="(row, i) in playArea")
        template(v-for="(point, j) in row")
          //- ミノの描画
          //- 後から描画しないと、罫線同士が重なりレイアウトに違和感が出る。
          rect(v-if="point.mino > 0"
            :y="i * blockSize"
            :x="j * blockSize"
            :width="blockSize"
            :height="blockSize"
            :fill="fillColorList[point.mino]"
            :stroke="strokeColorList[point.mino]"
            :stroke-width="strokeWidth")
    b-button(@click="startPlay" variant="danger") リスタート
    b-modal#result-modal(ref="result-modal" cancel-title="閉じる" ok-title="もう一度プレイする" title="RESULT" @ok="startPlay")
      b-container(fluid)
        b-row
          b-col(cols="8")
            h4 SCORE
          b-col
            h4 {{ score }}
        b-row
          b-col(cols="8")
            h4 タイピングワード数
          b-col
            h4 {{ typeWord }}
        b-row.text-right
          b-col
            a(
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              class="twitter-share-button"
              data-show-count="true"
              :data-text="`タイピングで落ちゲー #TYPIS スコアは ${score} 点、タイピングワード数は ${typeWord} でした！`"
              data-hashtags="TYPRIS") シェア
              script(async src="https://platform.twitter.com/widgets.js" charset="utf-8")
</template>
<script lang="ts">
import Vue from 'vue'
import PlayAreaModule from '@/store/modules/play'
import TypingModule from '@/store/modules/typing'

export default Vue.extend({
  data() {
    return {
      // タイマー番号
      interval: 0,
      // ゲーム開始時のミノ落下時間[ms]
      speed: 1500,
      // 上げてくスピードの段階
      baseSpeed: 0.8,
      // 1マスのサイズ[px]
      blockSize: 25,
      strokeWidth: 1,
      colColor: [
        { fill: '#FFEBEE', stroke: '#EF9A9A' },
        { fill: '#F3E5F5', stroke: '#CE93D8' },
        { fill: '#E8EAF6', stroke: '#9FA8DA' },
        { fill: '#E1F5FE', stroke: '#81D4FA' },
        { fill: '#E8F5E9', stroke: '#A5D6A7' },
        { fill: '#F1F8E9', stroke: '#C5E1A5' },
        { fill: '#FFF3E0', stroke: '#FFCC80' },
        { fill: '#FBE9E7', stroke: '#FFAB91' },
        { fill: '#EFEBE9', stroke: '#BCAAA4' },
        { fill: '#E0F2F1', stroke: '#80CBC4' }
      ]
    }
  },
  computed: {
    /**
     * プレイ領域の幅[px]
     */
    playAreaWidth(): number {
      return this.blockSize * PlayAreaModule.maxWidth
    },
    /**
     * プレイ領域の高さ[px]
     */
    playAreaHeight(): number {
      return this.blockSize * (PlayAreaModule.maxHeight + 1)
    },
    playArea() {
      // 直接importしたものをsvgでつかうと、cannot find PlayAreaModuleと言われてしまうため。
      return PlayAreaModule.getPlayArea
    },
    /**
     * ミノ塗りつぶしの色
     */
    fillColorList() {
      return PlayAreaModule.getColorList
    },
    /**
     * ミノの枠色
     */
    strokeColorList() {
      return PlayAreaModule.getStrokeColorList
    },
    /**
     * ゲームオーバーを監視するために必要
     */
    gameOver() {
      return PlayAreaModule.getGameOver
    },
    /**
     * レベルを監視するために必要
     */
    level() {
      return PlayAreaModule.getLevel
    },
    score() {
      return PlayAreaModule.getScore
    },
    typeWord() {
      return TypingModule.getTypeWord
    }
  },
  watch: {
    gameOver() {
      window.clearInterval(this.interval)
      const modal = this.$refs['result-modal'] as any
      modal.show()
    },
    level() {
      window.clearInterval(this.interval)
      this.interval = window.setInterval(
        () => PlayAreaModule.moveDown(),
        this.speed * this.baseSpeed ** this.level
      )
    }
  },
  async mounted() {
    await this.startPlay()
  },
  methods: {
    async startPlay() {
      if (this.interval) {
        window.clearInterval(this.interval)
      }
      await PlayAreaModule.startPlay()
      this.interval = window.setInterval(
        () => PlayAreaModule.moveDown(),
        this.speed
      )
    }
  }
})
</script>

<style lang="sass" scoped>
.play-area
</style>
