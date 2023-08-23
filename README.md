# Learning English App
完全に高井専用の英単語学習アプリです。
英単語APIを用いて150,000単語を取得しながら、毎日の記録やミスした単語の復習などができる汎用的なセルフ学習アプリです。

## Purpose
覚えた英単語を話すことができ、聞くことができ、理解できる。

## Solution
- 一言で言うと、`英語学習GPT`
- マイストレージには、学ぶべき英単語がバッファされていく
- スペースドリピテーション的にそれらを消化することにポイントが貯まる
- どのように英単語を貯めるか？
  - 英語記事のURLを貼って、まずは読む、わからない単語をチェックして、バッファしていく
  - レベルに応じた単語課題を出し、間違えたものをバッファ
  - 穴埋め問題、間違えたらバッファ
- マイストレージで穴埋めまたはクイズ、わからないところを先生に聞ける

## Technical
どのように実装するか？データ構造、画面設計など。
- データ構造
  - words
    - id: number autoincrement primary
    - english_word: string unique
    - japanese_word: string not null
    - level: beginner, intermediate, advanced, not professional null
    - sentence: string not null
    - part_of_speech: noun | pronoun | verb | adjective | adverb | preposition | conjection | interjection
  - last_answers
    - id
    - word_id
    - count
    - answer_format: quiz | sentence
    - result: 0 | 1
    - answer_date
  - completed_words
    - id
    - word_id


## Learning details
- エラーレスラーニング（Errorless Learning）
  - 初めての単語練習で扱う学習方法です。ユーザが間違える前に正解を教えることで間違えた情報を記憶するリスクを防ぐ方法です。
- アクティブリコール（Active Recall）
  - 学習済みの英単語を、英文章として穴埋め部分に出題したり、クイズ形式にしたり、記憶の定着化を目指す学習方法です。
- スペースドリピテーション（Spaced Repetition）
  - いわゆる繰り返し学習で、同じ単語に何回も出会うことを目的としています。
- インターリービング学習（Interleaved Learning）
  - 似たような単語ではなく、ランダムな順序で別カテゴリの英単語を学ぶための学習方法です。

## Values
- Gamification
- Modern UI