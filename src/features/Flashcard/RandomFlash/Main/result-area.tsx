import { Icon } from "@/components/Icon"
import { WordWithRandomFlash } from "@/types/api"

interface Props {
  success: boolean
  word: WordWithRandomFlash | null
}

export const ResultArea = ({ success, word }: Props) => {

  return (
    <div className="px-8">
      {
        success
          ?
          <p className="flex items-center justify-center h-16">
            <Icon name="check" className="[&_*]:stroke-green-600 [&_*]:stroke-2 [&_*]:w-12 [&_*]:h-12" />
            <span className="text-2xl text-green-600 font-bold">正解</span>
          </p>
          :
          <p className="flex items-center justify-center h-16">
            <Icon name="x-mark" className="[&_*]:stroke-red-600 [&_*]:stroke-2 [&_*]:w-12 [&_*]:h-12" />
            <span className="text-2xl text-red-600 font-bold">不正解</span>
          </p>
      }
      <p className="overflow-y-scroll h-52">
        <span className="text-2xl font-bold">{word?.word}</span>
        <div className="mt-4">
          {word?.definitions.map(definition => (
            <div key={definition.id} className="text-md mb-4">
              ・{definition.definitionJp}
            </div>
          ))}
        </div>
      </p>
    </div>
  )
}