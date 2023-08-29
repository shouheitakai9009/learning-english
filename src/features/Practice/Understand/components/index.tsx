import { WordTable } from "./data-table"
import { PracticeSolution } from "./solution"
import { CharGPTResponseArea } from "./chatgpt-response-area"
import { useRecoilValue } from "recoil"
import { resetCurrentIndex } from "../selectors/understandSelector"

export const PracticeUnderstand = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useRecoilValue(resetCurrentIndex)

  return (
    <div className="flex h-full">
      <section className="w-full h-full bg-white rounded-md overflow-y-scroll">
        <WordTable />
        <PracticeSolution />
        <CharGPTResponseArea />
      </section>
    </div>
  )
}