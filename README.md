# Learning English App
完全に高井専用の英単語学習アプリです。
英単語APIを用いて150,000単語を取得しながら、毎日の記録やミスした単語の復習などができる汎用的なセルフ学習アプリです。

## Purpose
覚えた英単語を話すことができ、聞くことができ、理解できる。

## Features

### Random flash
10題で1セットのフラッシュカードを連続でクリアしていく
間違えた単語は次回セットでも出題され、新規単語が加わった10題をクリアしていく...これを繰り返し1日30-50語は完璧に覚えよう！

#### 出題形式
- `english-to-japanese` 日本語訳を回答する
- `japanese-to-english` 英語訳を回答する
- `part-of-speech` 品詞を回答する

#### 回答画面のUI
- 今まで覚えた単語数
- 今日覚えた単語数
- 今日間違えた単語数
- nセット目
- ヘッダー
  - 出題形式の説明テキスト
- 英単語フィールド
  - 英単語
  - 音声アイコン
  - 英単語発音記号
- 回答フィールド
  - `english-to-japanese` ならテキストフィールド
  - `japanese-to-english ならテキストフィールド
  - `part-of-speech` ならタグ一覧