import pandas as pd
import mysql.connector
import datetime
import requests
import deepl_utils

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
insert_word_query = '''
INSERT INTO `Word` (`word`,`partOfSpeechId`,`phonetic`,`soundUrl`,`origin`, `originJp`, `createdAt`,`updatedAt`, `deleted`)
VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)
'''

insert_definition_query = '''
INSERT INTO `Definition` (`wordId`,`definition`,`definitionJp`,`example`,`exampleJp`,`isPrimary`) VALUES (%s,%s,%s,%s,%s,%s)
'''

insert_synonym_query = '''
INSERT INTO `Synonym` (`wordId`,`synonym`) VALUES (%s,%s)
'''

insert_antonym_query = '''
INSERT INTO `Antonym` (`wordId`,`antonym`) VALUES (%s,%s)
'''

select_word_query = '''
SELECT `id` FROM `Word` WHERE `word` = %s AND `partOfSpeechId` = %s
'''

select_definition_query = '''
SELECT `id` FROM `Definition` WHERE `definition` = %s OR `example` = %s
'''

# ------- Delete all --------
delete_antonym_query = 'DELETE FROM `Antonym`'
delete_synonym_query = 'DELETE FROM `Synonym`'
delete_definition_query = 'DELETE FROM `Definition`'
delete_word_query = 'DELETE FROM `Word`'
cursor.execute(delete_definition_query)
cursor.execute(delete_synonym_query)
cursor.execute(delete_antonym_query)
cursor.execute(delete_word_query)
print('Completed deleting all data ----')

# ------- Loop Start --------
master_words = []
for index, row in df.iloc[1201:1210].iterrows(): master_words.append(row["単語"])

try:
  for index, master_word in enumerate(master_words):
    response = requests.get(f'https://api.dictionaryapi.dev/api/v2/entries/en/{master_word}')
    for word in list(response.json()):
      if type(word) is not dict: continue
      dWord, dPhonetic, dOrigin, dOriginJp, dAudioUrl, dPartOfSpeech = (
        word.get('word'),
        word.get('phonetic'),
        word.get('origin') if 'origin' in word else "",
        deepl_utils.translate(word.get('origin')) if 'origin' in word else "",
        '',
        '',
      )

      # --------- Phonetics
      for phonetic in word.get('phonetics'):
        if 'audio' in phonetic and phonetic.get('audio') != None:
          dAudioUrl = phonetic.get('audio')

      # --------- Meanings
      dDefinitions, dSynonyms, dAntonyms, existWordId = [], [], [], None
      for meaning in word.get('meanings'):
        if 'partOfSpeech' in meaning and meaning.get('partOfSpeech') != None:
          dPartOfSpeech = meaning.get('partOfSpeech').replace(' ', '')
          # Note: 既にWordに存在する場合はそのID、なければNoneが入るぞ
          cursor.execute(select_word_query, (dWord, dPartOfSpeech))
          print(cursor.fetchone())
          if cursor.fetchone() != None and existWordId == None: existWordId = cursor.fetchone()
          # --------- Definitions
          for i, definition in enumerate(meaning.get('definitions')):
            if definition.get('definition') == None or definition.get('example') == None: continue
            cursor.execute(select_definition_query, (definition.get('definition'), definition.get('example')))
            if cursor.fetchone() == None:
              dDefinition = {
                "definition": definition.get('definition'),
                "definitionJp": deepl_utils.translate(definition.get('definition')),
                "example": definition.get('example'),
                "exampleJp": deepl_utils.translate(definition.get('example')),
                "isPrimary": i == 0,
              }
              dDefinitions.append(dDefinition)
          # --------- Synonyms
          dSynonyms = meaning.get('synonyms')
          # --------- Antonyms
          dAntonyms = meaning.get('antonyms')

      # -------- Insert Word Table
      if dPhonetic == None: continue
      lastrowid = None
      print('最終的なやつ',existWordId)
      if existWordId == None:
        cursor.execute(insert_word_query, (
          dWord,
          dPartOfSpeech.replace(' ', ''),
          dPhonetic,
          dAudioUrl,
          dOrigin,
          dOriginJp,
          datetime.datetime.now(),
          datetime.datetime.now(),
          0
        ))
        lastrowid = cursor.lastrowid
      else:
        lastrowid = existWordId[0]

      if len(dDefinitions) > 0:
        for dDefinition in dDefinitions:
          try:
            cursor.execute(insert_definition_query, (
              lastrowid,
              dDefinition['definition'],
              dDefinition['definitionJp'],
              dDefinition['example'],
              dDefinition['exampleJp'],
              dDefinition['isPrimary'],
            ))
          except mysql.connector.errors.IntegrityError as e:
            print(f'dDefinitions: キー重複でエラッタ {e}')

      if len(dSynonyms) > 0:
        for dSynonym in dSynonyms:
          try:
            cursor.execute(insert_synonym_query, (lastrowid, dSynonym))
          except mysql.connector.errors.IntegrityError as e:
            print(f'dSynonyms: キー重複でエラッタ {e}')

      if len(dAntonyms) > 0:
        for dAntonym in dAntonyms:
          try:
            cursor.execute(insert_synonym_query, (lastrowid, dAntonym))
          except mysql.connector.errors.IntegrityError as e:
            print(f'dAntonyms: キー重複でエラッタ {e}')

      print(index, dWord, dPartOfSpeech, dPhonetic)
except Exception as e:
  print(e)
  connection.commit()
finally:
  connection.commit()

connection.close()