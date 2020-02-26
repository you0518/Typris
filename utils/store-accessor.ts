/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Play from '~/store/play'
import Typing from '~/store/typing'

let play: Play
let typing: Typing

function initialiseStores(store: Store<any>): void {
  play = getModule(Play, store)
  typing = getModule(Typing, store)
}

export { initialiseStores, play, typing }
