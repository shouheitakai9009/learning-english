import { usePartOfSpeech } from "@/services/queries/PartOfSpeeches"
import { useWords } from "@/services/queries/Words"
import { PartOfSpeech } from "@/types/api"
import { useCallback, useMemo, useState } from "react"

export const useSearchCondition = () => {

  const [searchPartOfSpeechIds, setSearchPartOfSpeechIds] = useState<PartOfSpeech['id'][]>([])
  const [searchJapaneseWord, setSearchJapaneseWord] = useState<string>('')
  const [searchEnglishWord, setSearchEnglishWord] = useState<string>('')

  const queryWords = useWords({
    japaneseWord: searchJapaneseWord,
    englishWord: searchEnglishWord,
    partOfSpeechIds: searchPartOfSpeechIds,
  })
  const queryPartOfSpeech = usePartOfSpeech()

  const onChangeSearchPartOfSpeech = useCallback((id: PartOfSpeech['id'] ) => {
    const index = searchPartOfSpeechIds.findIndex(pId => pId === id)
    if (index === -1) setSearchPartOfSpeechIds([...searchPartOfSpeechIds, id])
    else setSearchPartOfSpeechIds(state => state.filter(s => s !== id))
  }, [searchPartOfSpeechIds, setSearchPartOfSpeechIds])

  const displaySearchCondition = useMemo((): string => {
    let searchResultText = ''
    if (searchJapaneseWord !== '') {
      searchResultText += `日本語に "${searchJapaneseWord}" を含む`
    }
    if (searchEnglishWord !== '') {
      searchResultText += `${searchResultText !== '' ? ' | ' : ''}英語に "${searchEnglishWord}" を含む  `
    }
    if (searchPartOfSpeechIds.length > 0) {
      let partOfSpeechText = ''
      searchPartOfSpeechIds.map(id => {
        partOfSpeechText += `、${queryPartOfSpeech.data?.find(q => q.id === id)?.name}`
      })
      searchResultText += `${searchResultText !== '' ? ' | ' : ''}品詞に "${partOfSpeechText.substring(1)}" を含む`
    }
    return searchResultText
  }, [searchPartOfSpeechIds, searchJapaneseWord, searchEnglishWord, queryPartOfSpeech])

  return {
    searchPartOfSpeechIds,
    searchJapaneseWord,
    searchEnglishWord,
    queryWords,
    queryPartOfSpeech,
    displaySearchCondition,
    onChangeSearchPartOfSpeech,
    setSearchJapaneseWord,
    setSearchEnglishWord,
  }
}