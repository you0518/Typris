import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import { SentenceTemplates } from '@/types/SentenceTemplates'
import shuffle from '@/plugins/shuffle'

@Module({ stateFactory: true, namespaced: true, name: 'typing' })
export default class Typing extends VuexModule {
  // 選択肢の数。
  private readonly choicesLength = 5
  private shuffleSentences = [...Array(SentenceTemplates.length).keys()]
  private sentenceList!: number[]
  // タイプしたワードの数
  private typeWord: number = 0

  get getSentenceList() {
    return this.sentenceList
  }

  get getSentenceTemplates() {
    return SentenceTemplates
  }

  get getTypeWord() {
    return this.typeWord
  }

  @Mutation
  private INIT_TYPING() {
    shuffle(this.shuffleSentences)
    this.sentenceList = this.shuffleSentences.splice(0, this.choicesLength)
  }

  @Mutation
  private SET_NEXT_SENTENCE(correctIndex: number) {
    this.sentenceList[correctIndex] = this.shuffleSentences[0]
    this.shuffleSentences.shift()
    if (this.shuffleSentences.length === 0) {
      this.shuffleSentences = [...Array(SentenceTemplates.length).keys()]
      shuffle(this.shuffleSentences)
    }
  }

  @Mutation
  private COUNT_TYPE_WORD() {
    this.typeWord++
  }

  @Action
  initTyping() {
    this.INIT_TYPING()
  }

  @Action
  nextTyping(correctIndex: number) {
    this.SET_NEXT_SENTENCE(correctIndex)
  }

  @Action
  countTypeWord() {
    this.COUNT_TYPE_WORD()
  }
}
