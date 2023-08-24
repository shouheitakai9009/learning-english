import deepl

API_KEY = 'ac2e49b9-a3d0-30fd-c1ff-9c1801654634'
IS_DUMMY = False
translator = deepl.Translator(API_KEY)
def translate(english_text):
  if IS_DUMMY == True:
    return translator.translate_text(english_text, target_lang='JA').text
  else:
    return "dummy text"