import { Mutation, MutationAction, Action, VuexModule, getModule, Module } from "vuex-module-decorators";
import {MinoTemplates} from '~/types/MinoTemplates'
import shuffle from '@/plugins/shuffle'
import store from '../store'


export interface CurrentMinoState extends Point {
  /**
   * MinoTemplatesのインデックス番号
   * ミノの種類を管理する。
   */
  minoType: number
  /**
   * MinoTemplates.blocksのインデックス番号
   * ミノの回転を管理する
   */
  rotate: number
}

export interface Point {
  x: number
  y: number
}


@Module({dynamic: true, name: 'PlayArea', store})
class PlayArea extends VuexModule {
  public maxWidth: number = 10 + 2
  public maxHeight: number = 20 + 2
  private playArea : number[][] = this.InitPlayArea()
  // ミノの開始基準点
  private startPoint: Point = {
    x: 5,
    y: 1,
  }
  // 現在の描画エリア上のミノの座標
  private currentMino: CurrentMinoState = {
    ...this.startPoint,
    rotate: 0,
    minoType: -1
  }
  // 次に表示操作するミノ一覧（描画される
  private nextMinoList: number[] = []
  // ランダムでミノを取り出すためのやつ
  private shuffleMinoList: number[] = [...Array(MinoTemplates.length).keys()]

  private isGameOver = false
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

  /**
   * 次のミノ一覧をブロックで返す
   */
  get getNextMinoBlockList() {
    return this.nextMinoList.map(el => {
      return MinoTemplates[el].blocks[0]
    })
  }

  get getColorList() {
    return ["white", ...MinoTemplates.map(el => {
      return el.color
    })]
  }

  get getGameOver() {
    return this.isGameOver
  }
  /** 
   * 次のミノ配列を上書きする
   */
  @Mutation
  private SET_NEXT_MINO_LIST(minoList: number[]) {
    this.nextMinoList = minoList
  }
  /** 
   * 次のミノ配列にミノを追加する
   */
  @Mutation
  private ENQUEUE_NEXT_MINO_LIST(mino: number) {
    this.nextMinoList.push(mino)
  }
  /** 
   * 次のミノ配列の先頭からミノを取り出し、新しいミノをpushする
   */
  @Mutation
  private DEQUEUE_NEXT_MINO_LIST() {
    this.currentMino.minoType = this.nextMinoList[0]
    this.nextMinoList.shift()

    this.nextMinoList.push(this.shuffleMinoList[0])
    this.shuffleMinoList.shift()
    if (this.shuffleMinoList.length === 0) {
      this.shuffleMinoList = [...Array(MinoTemplates.length).keys()]
      shuffle(this.shuffleMinoList)
    }
    this.currentMino.rotate = 0
  }

  /**
   * 操作対象のミノの位置を初期状態に戻す
   */
  @Mutation
  private INIT_CURRENT_COORDINATE() {
    this.currentMino.x = this.startPoint.x
    this.currentMino.y = this.startPoint.y
  }

  /**
   * 現在のミノ位置から絶対的に移動する
   * @param x 絶対位置
   * @param y 絶対位置
   */
  @Mutation
  private MOVE_ABSOLUTE_CURRENT_COORDINATE(point: Point) {
    this.currentMino.x = point.x
    this.currentMino.y = point.y
  }

  /**
   * ミノを盤面にセットする。
   * @param delMode ミノを削除するモード
   */
  @Mutation
  private DRAW_MINO(delMode: boolean = false) {
    if (this.currentMino.minoType < 0) {
      return
    }
    const mode = delMode ? -1 : 1
    const playArea = this.playArea
    const pointX = this.currentMino.x
    const pointY = this.currentMino.y
    const currentMinoTemplate = MinoTemplates[this.currentMino.minoType]
    const minoBlock = currentMinoTemplate.blocks[this.currentMino.rotate]
    for (let y = 0; y < minoBlock.length; y++) {
      const xLength = minoBlock[y].length
      for (let x = 0; x < xLength; x++) {
        playArea[pointY + y][pointX + x] += minoBlock[y][x] * mode
      }
    }
    this.playArea = [...playArea]
  }

  /**
   * ミノを回転させる。
   * 
   */
  @Mutation
  private SET_ROTATE() {
    // ミノ回転配列を一巡させるために、ミノ回転配列の長さで割ったあまりが必要になる。
    this.currentMino.rotate = (this.currentMino.rotate + 1) % MinoTemplates[this.currentMino.minoType].blocks.length
  }

  /**
   * 引数に指定した行を削除し、その分空行を追加する
   */
  @Mutation
  private DELETE_PUSH_PLAY_AREA_LINE(lineIndex: number[]) {
    const playArea = this.playArea
    const area: number[] = (new Array(this.maxWidth)).fill(0);
    area[0] = area[area.length - 1] = -1
    lineIndex.forEach((el, index) => {
      playArea.splice(el + index, 1)
      playArea.splice(1, 0, area)
    })
    this.playArea = [...playArea]
  }

  @Mutation
  private SET_GAME_OVER() {
    this.isGameOver = true
  }


  @Action
  startPlay() {
    shuffle(this.shuffleMinoList)
    const minoList = this.shuffleMinoList.splice(4)
    this.SET_NEXT_MINO_LIST(minoList)
    this.DRAW_MINO(true)
    this.DEQUEUE_NEXT_MINO_LIST()
    this.DRAW_MINO()
  }

/**
 * 指定した座標へミノが移動可能かどうかを判定する
 * 移動可能の時は、元のミノは削除済みである
 * @param moveTo 移動先座標（絶対）
 */
  @Action
  canMove(moveTo: Point) {
    this.DRAW_MINO(true)
    const currentMinoTemplate = MinoTemplates[this.currentMino.minoType]
    const minoBlock = currentMinoTemplate.blocks[this.currentMino.rotate]
    const yLength = minoBlock.length
    for (let y = 0; y < yLength; y++) {
      const xLength = minoBlock[y].length
      for (let x = 0; x < xLength; x++) {
        if (minoBlock[y][x] === 0) {
          continue
        }
        if (this.playArea[moveTo.y + y][moveTo.x + x] !== 0) {
          this.DRAW_MINO()
          return false
        }
      }
    }
    return true
  }
  /**
   * 操作中のミノを左隣へ移動させる。
   */
  @Action
  async moveLeft() {
    const moveTo: Point = {x: this.currentMino.x - 1, y: this.currentMino.y}
    if (!await this.canMove(moveTo)) {
      return
    }
    this.MOVE_ABSOLUTE_CURRENT_COORDINATE(moveTo)
    this.DRAW_MINO()
  }
  /**
   * 操作ミノを右隣へ移動させる
   */
  @Action
  async moveRight() {
    const moveTo: Point = {x: this.currentMino.x + 1, y: this.currentMino.y}
    if (!await this.canMove(moveTo)) {
      return
    }
    this.MOVE_ABSOLUTE_CURRENT_COORDINATE(moveTo)
    this.DRAW_MINO()
  }
  /**
   * 操作ミノを下へ移動させる
   */
  @Action
  async moveDown() {
    const moveTo: Point = {x: this.currentMino.x, y: this.currentMino.y + 1}
    if (await this.canMove(moveTo)) {
      this.MOVE_ABSOLUTE_CURRENT_COORDINATE(moveTo)
      this.DRAW_MINO()
      return
    }
    await this.deleteLine()
  }
  /**
   * 操作ミノを落下させる
   */
  @Action
  async moveDrop() {
    const moveTo: Point = {x: this.currentMino.x, y: this.playArea.length - 2}
    while (!await this.canMove(moveTo)) {
      moveTo.y--
      if (moveTo.y === 0) {
        return
      }
    }
    this.MOVE_ABSOLUTE_CURRENT_COORDINATE(moveTo)
    this.DRAW_MINO()
    await this.deleteLine()
  }
  /**
   * 操作ミノを回転させる
   */
  @Action
  rotate() {
    // 回転前の操作ミノが、判定の邪魔になるので削除する
    this.DRAW_MINO(true)
    const currentMinoTemplate = MinoTemplates[this.currentMino.minoType]
    const rotatedMinoBlock = currentMinoTemplate.blocks[(this.currentMino.rotate + 1) % currentMinoTemplate.blocks.length]
    // 回転方向がすでにブロックで埋められているかを判定する
    for (let y = 0; y < rotatedMinoBlock.length; y++) {
      for (let x = 0; x < rotatedMinoBlock[y].length; x++) {
        const point = this.playArea[this.currentMino.y + y][this.currentMino.x + x]
        // 回転不可能なので、削除した回転前ミノを元に戻す
        if (point !== 0) {
          this.DRAW_MINO()
          return
        }
      }
    }
    this.SET_ROTATE()
    this.DRAW_MINO()
  }
   /**
   * ライン消去処理を行う
   */
  @Action
  async deleteLine() {
    // ブロックで埋められていたので、ラインを消し、次のミノを取り出す操作を実行する。
    const delIndex: number[] = []
    for (let i = this.playArea.length - 2; i > 0; i--) {
      if (this.playArea[i].every(el => el > 0 || el === -1)) {
        delIndex.push(i)
      }
      // これ以上行が埋まっていないため。
      if (this.playArea[i].every(el => el <= 0)) {
        break;
      }
    }
    if (delIndex.length !== 0) {
      this.DELETE_PUSH_PLAY_AREA_LINE(delIndex)
    }
    this.INIT_CURRENT_COORDINATE()
    this.DEQUEUE_NEXT_MINO_LIST()
    this.DRAW_MINO()

  }
}
export default getModule(PlayArea);
