import { Icon } from "@/components/Icon"
import { TDataCell, TDataRow, Table } from "@/components/Table"
import { useRandomFlashHistory } from "@/services/queries/RandomFlashHistory"

export const WordHistoryArea = () => {

  const historiesQuery = useRandomFlashHistory()

  return (
    <Table>
      {historiesQuery.data?.map(history => (
        <TDataRow key={history.id}>
          <TDataCell className="w-full text-xl">{history.word.word}</TDataCell>
          <TDataCell className="px-2">
            {
              history.success
                ?
                <Icon name="check-circle" className="[&_*]:stroke-green-600" />
                :
                <Icon name="x-circle" className="[&_*]:stroke-red-600" />
            }
          </TDataCell>
        </TDataRow>
      ))}
    </Table>
  )
}