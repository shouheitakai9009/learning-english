import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { TBody, TDataCell, TDataRow, THead, Table, Th } from "@/components/Table"
import { Typography } from "@/components/Typography"
import { WordSummary } from "@/components/Word/summary"
import { useRandomFlashWords } from "@/services/queries/Words/useRandomFlashWords"
import classNames from "classnames"
import { useRecoilState } from "recoil"
import { selectedWord } from "../atoms/understandAtom"

export const WordTable = () => {

  const wordsQuery = useRandomFlashWords()
  const [currentIndex, setCurrentIndex] = useRecoilState(selectedWord.index)

  return (
    <Table className={currentIndex !== null ? "mb-32" : ""}>
      <THead>
        <Th className="text-center">単語</Th>
        <Th className="text-center">意味</Th>
        <Th className="text-center">例文</Th>
        <Th className="text-center">単語に触れた回数</Th>
        <Th className="text-center">チェック</Th>
      </THead>
      <TBody>
        {
          wordsQuery.data?.map((word, index) => (
            <TDataRow
              role="button"
              tabIndex={0}
              className={classNames({
                "[&_td]:bg-yellow-50 [&_td]:border-gray-200": currentIndex === index
              })}
              onClick={() =>  setCurrentIndex(index)}
            >
              <TDataCell className="py-4 pl-8">
                <WordSummary word={word} />
              </TDataCell>
              <TDataCell className="w-32">
                <Typography className="text-md">{word.meaning}</Typography>
              </TDataCell>
              <TDataCell>
                {word.definitions.slice(0, 3).map((definition, index) => (
                  <p
                    className={classNames("border-gray-200 py-1 px-2", {
                      "border-t": word.definitions.length > 1 && index > 0
                    })}
                  >
                    <p className="text-sm">{definition.example}</p>
                    <p className="text-gray-500">{definition.exampleJp}</p>
                  </p>
                ))}
              </TDataCell>
              <TDataCell className="w-52 py-2">
                <p className="">
                  {Array(3).fill("").map((_, i) => (
                    <div className="flex items-center">
                      {Array(7).fill("").map((_, j) => (
                        <Icon
                          name="check-circle"
                          className={classNames({
                            "[&_*]:stroke-gray-300 [&_*]:stroke-2 [&_*]:w-6 [&_*]:h-6 inline": true,
                            "[&_*]:!stroke-green-500": word.randomFlashHistories.length - 1 >= (i*10)+j,
                          })}
                        />
                      ))}
                    </div>
                  ))}
                </p>
              </TDataCell>
              <TDataCell className="w-24">
                <div className="flex items-center justify-center">
                  <Button type="submit" size="lg" color="check" className="mr-2">
                    <Icon name="check" />
                  </Button>
                </div>
              </TDataCell>
            </TDataRow>
          ))
        }
      </TBody>
    </Table>
  )
}