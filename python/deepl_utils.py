# import deepl
from google.cloud import translate as translater

API_KEY = 'ac2e49b9-a3d0-30fd-c1ff-9c1801654634'
PROJECT_ID = 'learning-english-397213'
IS_DUMMY = False
# translator = deepl.Translator(API_KEY)
def translate(english_text):
  if IS_DUMMY == False:
    # return translator.translate_text(english_text, target_lang='JA').text
    client = translater.TranslationServiceClient()
    location = "global"
    parent = f"projects/{PROJECT_ID}/locations/{location}"
    response = client.translate_text(
      request={
        "parent": parent,
        "contents": [english_text],
        "mime_type": "text/plain",
        "source_language_code": "en-US",
        "target_language_code": "ja",
      }
    )
    return response.translations[0].translated_text if len(response.translations) > 0 else ""

  else:
    return "dummy text"