import { Icon } from "@/components/Icon"
import { WordWithSuccessType } from "../useGame"

interface Props {
  results: WordWithSuccessType[]
}

export const ProgressArea = ({ results }: Props) => {
  return (
    <section className="flex items-center justify-center h-20 w-full">
      <p className="mr-6 tracking-widest">
        <span className="font-bold text-4xl mr-1">{results.length}</span>/10
      </p>
      <ul className="flex items-center">
        {Array(10).fill("").map((_, index) => (
          <li key={index} className="flex items-center">
            {
              results?.[index] === undefined
                ?
                <Icon name="fire" className="[&_*]:stroke-gray-300 [&_*]:w-8 [&_*]:h-8" />
                :
                results[index].success
                  ?
                  <Icon name="check-circle" className="[&_*]:stroke-green-600 [&_*]:stroke-2 [&_*]:w-8 [&_*]:h-8" />
                  :
                  <Icon name="x-circle" className="[&_*]:stroke-red-600 [&_*]:stroke-2 [&_*]:w-8 [&_*]:h-8" />
            }
            {index < 9 && <p className="h-[1px] w-6 bg-gray-500" />}
          </li>
        ))}
      </ul>
    </section>
  )
}