import { FormLabel } from "@/components/FormLabel"
import { TBody, TDataCell, TDataRow, THead, Table, Th } from "@/components/Table"
import { Tag } from "@/components/Tag"
import { TextField } from "@/components/TextField"
import { useSearchCondition } from "./useSearchCondition"

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
            <Th className="w-36 min-w-[150px]">Part of speech</Th>
            <Th className="w-48 min-w-[190px]">English word</Th>
            <Th className="w-72">Japanese word</Th>
            <Th className="rounded-tr-md">Example sentence</Th>
          </THead>
          <TBody>
            {queryWords.isSuccess && queryWords.data.map(word => (
              <TDataRow key={word.id}>
                <TDataCell className="pl-4">{word.id}</TDataCell>
                <TDataCell><Tag checked={true} text={word.partOfSpeech.name} size="sm" /></TDataCell>
                <TDataCell className="!text-lg">{word.word}</TDataCell>
                <TDataCell>{word.mean}</TDataCell>
                <TDataCell>{word.modelSentence}</TDataCell>
              </TDataRow>
            ))}
          </TBody>
        </Table>
      </section>
    </>
  )
}