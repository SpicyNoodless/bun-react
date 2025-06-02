import {
  Input,
  makeStyles,
  mergeClasses,
  Text,
  useId,
} from "@fluentui/react-components"
import {
  CWCUtteranceCell,
  type CWCUtteranceCellProps,
} from "./CWCUtteranceCell"
import { Search16Filled } from "@fluentui/react-icons"
import { InfiniteScrollList } from "./WindowScrollList"

type CWCUtteranceListProps = {
  metric: string
  items: CWCUtteranceCellProps[]
  onFetchData?: () => void
} & React.HTMLAttributes<HTMLDivElement>

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%",
    height: "100%",
  },
  cell: {
    marginBottom: "8px",
  },
  list: {
    height: "300",
  },
})

export const CWCUtteranceList = ({
  metric,
  items,
  className,
  onFetchData,
}: CWCUtteranceListProps) => {
  const styles = useStyles()
  const cellIdPrefix = useId("utterance-cell-")

  const renderItem = (item: CWCUtteranceCellProps) => {
    return (
      <CWCUtteranceCell
        key={`${cellIdPrefix}-${item.id}`}
        text={item.text}
        delta={item.delta}
      />
    )
  }

  return (
    <div className={mergeClasses(styles.container, className)}>
      <Input contentBefore={<Search16Filled />} />
      <Text>Sort by {<Text>{metric}</Text>} delta</Text>
      <InfiniteScrollList
        data={items}
        loadMore={onFetchData}
        itemHeight={90}
        renderItem={renderItem}
      />
    </div>
  )
}
