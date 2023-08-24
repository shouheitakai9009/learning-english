import { FormLabel } from "@/components/FormLabel"
import { TBody, TDataCell, TDataRow, THead, Table, Th } from "@/components/Table"
import { Tag } from "@/components/Tag"
import { TextField } from "@/components/TextField"
import { useSearchCondition } from "./useSearchCondition"
import { Icon } from "@/components/Icon"
import { Word } from "@/types/api"
import test from '@/assets/materials/background.png'

export const Words = () => {

  const {
    searchEnglishWord,
    searchJapaneseWord,
    searchPartOfSpeechIds,
    displaySearchCondition,
    queryPartOfSpeech,
    queryWords,
    onChangeSearchPartOfSpeech,
    setSearchEnglishWord,
    setSearchJapaneseWord
  } = useSearchCondition()

  const onPlayWord = (word: Word) => {
    const audio = new Audio(word.soundUrl)
    audio.play()
  }

  return (
    <>
      <h1 className="text-2xl mb-4 bold">All words</h1>
      <section className="py-4 px-6 bg-slate-50 rounded-lg">
        <div className="mb-6">
          {queryPartOfSpeech.isSuccess && <>
            <FormLabel>品詞から探す</FormLabel>
              <div className="flex flex-wrap items-center mt-2">
                {queryPartOfSpeech.data?.map(partOfSpeech => (
                  <Tag
                    key={partOfSpeech.id}
                    checked={searchPartOfSpeechIds.some(s => s === partOfSpeech.id)}
                    text={partOfSpeech.name}
                    id={partOfSpeech.id}
                    onChange={() => onChangeSearchPartOfSpeech(partOfSpeech.id)}
                  />
                ))}
              </div>
          </>}
        </div>
        <div className="flex">
          <div className="mr-4">
            <FormLabel>日本語から探す（部分一致）</FormLabel>
            <div>
              <TextField
                value={searchJapaneseWord}
                placeholder="例）りん"
                className="h-10 px-4 rounded-md w-96 border border-slate-200"
                onChange={e => setSearchJapaneseWord(e.target.value)}
              />
            </div>
          </div>
          <div>
            <FormLabel>英語から探す（部分一致）</FormLabel>
            <div>
              <TextField
                value={searchEnglishWord}
                placeholder="例）appl"
                className="h-10 px-4 rounded-md w-96 border border-slate-200"
                onChange={e => setSearchEnglishWord(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="mt-6 overflow-x-scroll">
        <div className="flex justify-end">
          <span>検索条件: [ {displaySearchCondition} ]</span>
          <span className="ml-4">{queryWords.data?.length}件</span>
        </div>
        <Table className="min-w-full">
          <THead className="sticky">
            <Th className="w-20 min-w-[80px] rounded-tl-md pl-4">ID</Th>
            <Th className="w-48 min-w-[190px]">Word</Th>
            <Th className="rounded-tr-md">Definition</Th>
          </THead>
          <TBody>
            {queryWords.isSuccess && queryWords.data.map(word => (
              <TDataRow key={word.id}>
                <TDataCell className="pl-4">{word.id}</TDataCell>
                <TDataCell className="!text-lg py-1">
                  <div className="flex items-center">
                    {word.word}
                    {word.soundUrl && (
                      <Icon name="musical-note"
                        className="[&_*]:w-5 [&_*]:h-5 ml-2 [&_*]:stroke-pink-500"
                        onClick={() => onPlayWord(word)}
                      />
                    )}
                  </div>
                  <span className="text-gray-500 text-sm">{word.phonetic}</span>
                </TDataCell>
                <TDataCell className="py-1">
                  {word.definitions.map(definition => (
                    <div className="flex mb-1">
                      <span className="text-sm border border-black w-5 h-5 flex items-center justify-center mr-1">{word.partOfSpeech.name.substring(0,1)}</span>
                      <span className="text-sm">{definition.definitionJp}</span>
                    </div>
                  ))}
                </TDataCell>
              </TDataRow>
            ))}
          </TBody>
        </Table>
      </section>
    </>
  )
}