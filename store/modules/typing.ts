import {
  Mutation,
  Action,
  VuexModule,
  getModule,
  Module
} from 'vuex-module-decorators'
import { SentenceTemplates } from '@/types/SentenceTemplates'
import shuffle from '@/plugins/shuffle'
import store from '../store'

@Module({ dynamic: true, name: 'TypingArea', store })
class TypingGame extends VuexModule {
  // 選択肢の数。
  private choicesLength = 13
  private shuffleSentences = [...Array(SentenceTemplates.length).keys()]
  private sentenceList: number[] = this.initTyping()

  initTyping() {
    shuffle(this.shuffleSentences)
    return this.shuffleSentences.splice(0, this.choicesLength)
  }

  get getSentenceList() {
    return this.sentenceList
  }

  get getSentenceTemplates() {
    return SentenceTemplates
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
  @Action
  nextTyping(correctIndex: number) {
    this.SET_NEXT_SENTENCE(correctIndex)
  }
}

export default getModule(TypingGame)
