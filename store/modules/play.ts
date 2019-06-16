import { Mutation, MutationAction, Action, VuexModule, getModule, Module } from "vuex-module-decorators";
import store from '../store'
import Vuex from 'vuex'

@Module({dynamic: true, name: 'PlayArea', store})
class PlayArea extends VuexModule {
  public maxWidth: number = 10 + 2
  public maxHeight: number = 20 + 2
  private playArea : number[][] = this.InitPlayArea()

  /**
   * ミノ表示領域を、壁を-1で、ミノ無しを0で初期化する
   */
  private InitPlayArea(): number[][] {
    const playArea: number[][] = new Array(this.maxHeight)
    playArea[0] = (new Array(this.maxWidth)).fill(-1)
    for (let i = 1; i < this.maxHeight - 1; i++) {
      const area: number[] = (new Array(this.maxWidth)).fill(0);
      area[0] = area[area.length - 1] = -1
      playArea[i] = area
    }
    playArea[playArea.length - 1] = (new Array(this.maxWidth)).fill(-1)
    return playArea
  } 

  get getPlayArea(): number[][] {
    return this.playArea
  }
}
export default getModule(PlayArea);
