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
import PlayModule from './play'

@Module({ dynamic: true, name: 'TypingArea', store })
class TypingGame extends VuexModule {
  // 選択肢の数。
  private choicesLength = PlayModule.maxWidth - 2
  private shuffleSentences = [...Array(this.choicesLength).keys()]
  private sentenceList: number[] = this.initTyping()

  initTyping() {
    shuffle(this.shuffleSentences)
    return this.shuffleSentences.slice(0, this.choicesLength)
  }

  get getSentenceList() {
    return this.sentenceList
  }

  get getSentenceTemplates() {
    return SentenceTemplates
  }

  @Mutation
  private SET_SENTENCE_LIST(sentenceList: number[]) {
    this.sentenceList = sentenceList
  }
  @Action
  nextTyping() {
    shuffle(this.shuffleSentences)
    this.SET_SENTENCE_LIST(this.shuffleSentences.slice(0, this.choicesLength))
  }
}

export default getModule(TypingGame)
