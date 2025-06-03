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
import { InfiniteDynamicList } from "./DynamicHeightList"

type CWCUtteranceListProps = {
  metric: string
  items: CWCUtteranceCellProps[]
  onFetchData?: () => Promise<void>
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

  const renderItem = (index: number) => {
    const item = items[index]
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
      <InfiniteDynamicList
        items={items}
        estimatedItemHeight={50}
        loadMore={onFetchData}
        renderItem={renderItem}
        className={styles.list}
      />
    </div>
  )
}
