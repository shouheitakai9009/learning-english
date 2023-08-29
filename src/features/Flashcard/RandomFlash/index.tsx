import { WordHistoryArea } from "./word-history-area"
import { QuestionArea } from "./Main/question-area"
import { AnswerArea } from "./Main/answer-area"
import { ProgressArea } from "./Main/progress-area"
import { useGame } from "./useGame"
import { ResultArea } from "./Main/result-area"
import { AnimatedCard } from "@/components/Layout/animated-card"

export const RandomFlash = () => {

  const {
    controls,
    isFlipped,
    wordsQuery,
    results,
    answerText,
    currentIndex,
    setAnswerText,
    handleRotate,
    onAnswer,
  } = useGame()

  const onSubmit = () => {
    if (isFlipped) {
      handleRotate()
    } else {
      onAnswer(answerText)
    }
  }

  return (
    <div className="flex h-full">
      <section className="w-full h-full bg-white rounded-md mr-6 py-6 px-8">
        <ProgressArea results={results} />
        <AnimatedCard
          controls={controls}
          className="w-full h-72"
          frontComponent={
            <QuestionArea
              isFlipped={isFlipped}
              word={wordsQuery.data?.[currentIndex] ?? null}
            />
          }
          backComponent={
            <ResultArea
              success={results?.[results.length - 1]?.success ?? false}
              word={wordsQuery.data?.[results.length - 1] ?? null}
            />
          }
        />
        <AnswerArea
          disabled={isFlipped}
          text={answerText}
          onChangeText={setAnswerText}
          onSubmit={onSubmit}
          onUnknown={() => onAnswer()}
        />
      </section>
      <div className="flex flex-col justify-between">
        <section className="w-80 overflow-y-scroll h-full bg-white rounded-md py-6 px-8">
          <h2 className="text-sm text-gray-500">単語履歴</h2>
          <WordHistoryArea />
        </section>
      </div>
    </div>
  )
}