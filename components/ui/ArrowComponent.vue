<template lang="pug">
  .arrow-component.d-flex.flex-column.justify-content-center
    .arrow-component-vector(:class="`${vector}-arrow`" :style="{'border-color': borderStyle}")
    .text-center
      b {{ text[0] }}
    .text-center {{ text[1] }}


</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    text: {
      type: Array,
      default: () => ['', '']
    },
    fill: {
      type: String,
      default: 'black'
    },
    vector: {
      type: String,
      default: 'left'
    }
  },
  computed: {
    borderStyle(): string {
      switch (this.vector) {
        case 'bottom':
          return `${this.fill} transparent transparent transparent`
        case 'left':
          return `transparent ${this.fill} transparent transparent`
        case 'right':
          return `transparent transparent transparent ${this.fill}`
        default:
          return ''
      }
    }
  }
})
</script>
<style lang="sass" scoped>
.arrow-component
  width: 100px
  height: 70px
  position: relative
  font-size: 1rem
  &-vector
    width: 0
    height: 0
    position: absolute
    top: 0
    bottom: 0
    right: 0
    left: 0
    margin: auto
    z-index: -1
  .bottom-arrow
    border-style: solid
    border-width: 70px 30px 0 30px

  .left-arrow
    border-style: solid
    border-width: 30px 70px 30px 0

  .right-arrow
    border-style: solid
    border-width: 30px 0 30px 70px
</style>
