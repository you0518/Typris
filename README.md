# Typris

> My ultimate Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```
# 基本実装方針
- 幅 (10 + 2) * 高さ (20 + 2)の2次元配列をプレイ領域として定義。プレイ領域に入る値を以下に定義
- -1 ： プレイ領域の外壁
- 0 ： 何も入っていない
- 1 ~ 6 ： 各種ミノが入っている。数値とミノの形はMinoTemplates.tsを参照