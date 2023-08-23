import pandas as pd
import mysql.connector
import datetime

df = pd.read_excel("./words_list.xlsx", sheet_name='V(修正１ 冊子)')

# 品詞の日本語表記から英語表記へのマッピング
part_of_speech_mapping = {
  '冠': 'article',
  '名': 'noun',
  '代': 'pronoun',
  '動': 'verb',
  '形': 'adjective',
  '副': 'adverb',
  '前': 'preposition',
  '接': 'conjunction',
  '間': 'interjection',
  '助': 'auxiliaryverb',
}

connection = mysql.connector.connect(
  user='root',
  database='english_db'
)
cursor = connection.cursor(buffered=True)
query = '''
INSERT INTO `Word` (`word`,`partOfSpeechId`,`mean`,`modelSentence`,`modelSentenceMean`,`createdAt`,`updatedAt`, `deleted`)
VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
'''

for index, row in df.iterrows():
  print(f"current index {index}", row["単語"], part_of_speech_mapping.get(row["品詞"], "unknown"))
  cursor.execute(query, (
    row["単語"],
    part_of_speech_mapping.get(row["品詞"], "unknown"),
    row["意味"],
    row["例文"],
    row["例文の意味"],
    datetime.datetime.now(),
    datetime.datetime.now(),
    0
  ))

connection.commit()
connection.close()