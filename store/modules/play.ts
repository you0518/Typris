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

export interface PlayState {
  confirm: boolean
  mino: number
}

export interface HoldState {
  holded: boolean
  mino: number
}

const deepCopy = (obj: any) => {
  return JSON.parse(JSON.stringify(obj))
}


@Module({dynamic: true, name: 'PlayArea', store})
class PlayArea extends VuexModule {
  public maxWidth: number = 10 + 2
  public maxHeight: number = 20 + 2
  private wall: PlayState = {confirm: true, mino: -1}
  private empty: PlayState = {confirm: false, mino: 0}
  private playArea : PlayState[][] = this.InitPlayArea()
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
  // ランダムでミノを取り出すためのやつ。連番で初期化
  private shuffleMinoList: number[] = [...Array(MinoTemplates.length).keys()]

  private holdMino: HoldState = {
    holded: false,
    mino: -1
  }
  // ゲームオーバー判定
  private isGameOver = false
  // スコア
  private score: number = 0
  // 1ライン消去における得点
  private baseScore: number = 1000

  /**
   * ミノ表示領域を、壁を-1で、ミノ無しを0で初期化する
   */
  private InitPlayArea(): PlayState[][] {
    const playArea: PlayState[][] = new Array(this.maxHeight)

    for (let i = 0; i < this.maxHeight; i++) {
      playArea[i] = new Array(this.maxWidth)
      for (let j = 0; j < this.maxWidth; j++) {
        if (i === 0 || i === this.maxHeight - 1 || j === 0 || j === this.maxWidth - 1) {
          playArea[i][j] = deepCopy(this.wall)
        } else {
          playArea[i][j] = deepCopy(this.empty)
        }
      }
    }
    return playArea
  }

  get getPlayArea() {
    return this.playArea
  }

  get getHoldMinoBlock() {
    if (this.holdMino.mino < 0) {
      return []
    }
    return MinoTemplates[this.holdMino.mino].blocks[0]
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

  
  get getStrokeColorList() {
    return ["white", ...MinoTemplates.map(el => {
      return el.stroke
    })]
  }

  get getGameOver() {
    return this.isGameOver
  }

  get getScore() {
    return this.score
  }
  /** 
   * 次のミノ配列を上書きする
   */
  @Mutation
  private SET_NEXT_MINO_LIST(minoList: number[]) {
    this.nextMinoList = minoList
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
    this.currentMino.x = this.startPoint.x
    this.currentMino.y = this.startPoint.y
  }

  /**
   * ミノを指定した座標に描画する
   */
  @Mutation
  private MOVE_TO(moveTo: Point) {
    if (this.currentMino.minoType < 0) {
      return
    }
    const playArea = this.playArea
    const currentX = this.currentMino.x
    const currentY = this.currentMino.y
    const currentMinoTemplate = MinoTemplates[this.currentMino.minoType]
    const minoBlock = currentMinoTemplate.blocks[this.currentMino.rotate]

    // 遷移元のミノを消す
    for (let y = 0; y < minoBlock.length; y++) {
      const xLength = minoBlock[y].length
      for (let x = 0; x < xLength; x++) {
        // 次のミノ取り出し時には遷移元ミノは確定したので消しちゃだめ。
        if (playArea[currentY + y][currentX + x].confirm) {
          continue
        }
        // ミノの空欄部分で、playAreaを消しちゃだめ
        if (minoBlock[y][x] === 0) {
          continue
        }
        playArea[currentY + y][currentX + x] = deepCopy(this.empty)
      }
    }

    // 遷移先に描画する
    for (let y = 0; y < minoBlock.length; y++) {
      const xLength = minoBlock[y].length
      for (let x = 0; x < xLength; x++) {
        if (minoBlock[y][x] === 0) {
          continue
        }
        playArea[moveTo.y + y][moveTo.x + x].mino   = minoBlock[y][x]
      }
    }
    this.currentMino.x = moveTo.x
    this.currentMino.y = moveTo.y
    this.playArea = [...playArea]
  }

  /**
   * ミノを回転させる。
   * 
   */
  @Mutation
  private SET_ROTATE() {
    const playArea = this.playArea
    const currentX = this.currentMino.x
    const currentY = this.currentMino.y
    const currentMinoTemplate = MinoTemplates[this.currentMino.minoType]
    const minoBlock = currentMinoTemplate.blocks[this.currentMino.rotate]
    // ミノ回転配列を一巡させるために、ミノ回転配列の長さで割ったあまりが必要になる。
    const rotate = (this.currentMino.rotate + 1) % MinoTemplates[this.currentMino.minoType].blocks.length
    const rotatedMinoBlock = currentMinoTemplate.blocks[rotate]
    this.currentMino.rotate = rotate

    // 遷移元のミノを消す
    for (let y = 0; y < minoBlock.length; y++) {
      const xLength = minoBlock[y].length
      for (let x = 0; x < xLength; x++) {
        // ミノの空欄部分で、playAreaを消しちゃだめ
        if (minoBlock[y][x] === 0) {
          continue
        }
        playArea[currentY + y][currentX + x] = deepCopy(this.empty)
      }
    }

    // 遷移先に描画する
    for (let y = 0; y < rotatedMinoBlock.length; y++) {
      const xLength = rotatedMinoBlock[y].length
      for (let x = 0; x < xLength; x++) {
        // ミノの空欄部分で、playAreaを消しちゃだめ
        if (rotatedMinoBlock[y][x] === 0) {
          continue
        }
        playArea[currentY + y][currentX + x].mino   = rotatedMinoBlock[y][x]
      }
    }
    this.playArea = [...playArea]
  }

  /**
   * 引数に指定した行を削除し、その分空行を追加する
   */
  @Mutation
  private DELETE_PUSH_PLAY_AREA_LINE(lineIndex: number[]) {
    const playArea = this.playArea
    const row: PlayState[] = new Array(this.maxWidth)
    for (let i = 0; i < row.length; i++) {
      if (i === 0 || i === row.length - 1) {
        row[i] = deepCopy(this.wall)
      } else {
        row[i] = deepCopy(this.empty)
      }
    }
    lineIndex.forEach((el, index) => {
      playArea.splice(el + index, 1)
      playArea.splice(1, 0, deepCopy(row))
    })
    this.score += (this.baseScore * lineIndex.length) * (1 + (lineIndex.length - 1) * 0.1)
    this.playArea = [...playArea]
  }

  /**
   * これ以上動けないミノを盤面に確定させる。
   */
  @Mutation
  private CONFIRM_PLAY_AREA() {
    const currentX = this.currentMino.x
    const currentY = this.currentMino.y
    const currentMinoTemplate = MinoTemplates[this.currentMino.minoType]
    const minoBlock = currentMinoTemplate.blocks[this.currentMino.rotate]

    for (let y = 0; y < minoBlock.length; y++) {
      const xLength = minoBlock[y].length
      for (let x = 0; x < xLength; x++) {
        if (minoBlock[y][x] === 0) {
          continue
        }
        this.playArea[currentY + y][currentX + x].confirm = true
      }
    }
  }

  @Mutation
  private SET_GAME_OVER() {
    this.isGameOver = true
  }

  /**
   * 操作中のミノとホールドミノを入れ替える。
   */
  @Mutation
  private SET_HOLD() {
    [this.currentMino.minoType, this.holdMino.mino] = [this.holdMino.mino, this.currentMino.minoType]
    this.holdMino.holded = true
    const currentX = this.currentMino.x
    const currentY = this.currentMino.y
    const minoTemplate = MinoTemplates[this.holdMino.mino]
    const minoBlock = minoTemplate.blocks[this.currentMino.rotate]

    // ホールド前のミノを消す
    for (let y = 0; y < minoBlock.length; y++) {
      const xLength = minoBlock[y].length
      for (let x = 0; x < xLength; x++) {
        // ミノの空欄部分で、playAreaを消しちゃだめ
        if (minoBlock[y][x] === 0) {
          continue
        }
        this.playArea[currentY + y][currentX + x] = deepCopy(this.empty)
      }
    }
  }
  


  @Action
  startPlay() {
    shuffle(this.shuffleMinoList)
    const minoList = this.shuffleMinoList.splice(4)
    this.SET_NEXT_MINO_LIST(minoList)
    this.DEQUEUE_NEXT_MINO_LIST()
    this.MOVE_TO(this.startPoint)
  }

/**
 * 指定した座標へミノが移動可能かどうかを判定する
 * 移動可能の時は、元のミノは削除済みである
 * @param moveTo 移動先座標（絶対）
 */
  @Action
  canMove(moveTo: Point) {  
    const currentMinoTemplate = MinoTemplates[this.currentMino.minoType]
    const minoBlock = currentMinoTemplate.blocks[this.currentMino.rotate]
    const yLength = minoBlock.length
    for (let y = 0; y < yLength; y++) {
      const xLength = minoBlock[y].length
      for (let x = 0; x < xLength; x++) {
        if (minoBlock[y][x] === 0) {
          continue
        }
        const point = this.playArea[moveTo.y + y][moveTo.x + x]
        if (point.confirm && point.mino !== 0) {
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
    this.MOVE_TO(moveTo)
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
    this.MOVE_TO(moveTo)
  }
  /**
   * 操作ミノを下へ移動させる
   */
  @Action
  async moveDown() {
    const moveTo: Point = {x: this.currentMino.x, y: this.currentMino.y + 1}
    if (await this.canMove(moveTo)) {
      console.log("yea  ")
      this.MOVE_TO(moveTo)
      return
    }
    await this.deleteLine()
  }
  /**
   * 操作ミノを落下させる
   */
  @Action
  async moveDrop() {
    const moveTo: Point = {x: this.currentMino.x, y: this.currentMino.y + 1}
    while (await this.canMove(moveTo)) {
      moveTo.y++
    }
    moveTo.y--
    this.MOVE_TO(moveTo)
    await this.deleteLine()
  }
  /**
   * 操作ミノを回転させる
   */
  @Action
  rotate() {
    const currentMinoTemplate = MinoTemplates[this.currentMino.minoType]
    const rotatedMinoBlock = currentMinoTemplate.blocks[(this.currentMino.rotate + 1) % currentMinoTemplate.blocks.length]
    // 回転方向がすでにブロックで埋められているかを判定する
    for (let y = 0; y < rotatedMinoBlock.length; y++) {
      for (let x = 0; x < rotatedMinoBlock[y].length; x++) {
        if (rotatedMinoBlock[y][x] === 0) {
          continue
        }
        const point = this.playArea[this.currentMino.y + y][this.currentMino.x + x]
        if (point.confirm && point.mino !== 0) {
          return
        }
      }
    }
    this.SET_ROTATE()
  }
   /**
   * ライン消去処理を行う
   */
  @Action
  async deleteLine() {
    this.holdMino.holded = false
    this.CONFIRM_PLAY_AREA()
    // ブロックで埋められていたので、ラインを消し、次のミノを取り出す操作を実行する。
    const delIndex: number[] = []
    for (let i = this.playArea.length - 2; i > 0; i--) {
      if (this.playArea[i].every(el => el.confirm)) {
        delIndex.push(i)
        continue
      }
      // 行が壁と空のみの場合、これ以上上にミノがないためライン消去処理完了
      if (this.playArea[i].every(el => el.mino <= 0)) {
        break;
      }
    }
    if (delIndex.length !== 0) {
      this.DELETE_PUSH_PLAY_AREA_LINE(delIndex)
    }
    this.DEQUEUE_NEXT_MINO_LIST()
    this.MOVE_TO(this.startPoint)
    if (!await this.canMove(this.startPoint)) {
      this.SET_GAME_OVER()
    }
    
  }

  @Action
  setHold() {
    if (this.holdMino.holded) {
      return
    }
    this.SET_HOLD()
    if (this.currentMino.minoType < 0) {
      this.DEQUEUE_NEXT_MINO_LIST()
    }
    
    this.MOVE_TO(this.startPoint)
  }
}
export default getModule(PlayArea);
