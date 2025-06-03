import {
  Input,
  makeStyles,
  mergeClasses,
  Text,
} from "@fluentui/react-components"
import { type CWCUtteranceCellProps } from "./CWCUtteranceCell"
import { Search16Filled } from "@fluentui/react-icons"
import { UtteranceList } from "./UtteranceList"
import { mockCellItems } from "@/data/mockData"

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
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  searchBox: {
    borderRadius: "8px",
    marginRight: "16px",
  },
  cell: {
    marginBottom: "8px",
  },
})

export const CWCUtteranceList = ({
  metric,
  items,
  className,
  onFetchData,
}: CWCUtteranceListProps) => {
  const styles = useStyles()

  return (
    <div className={mergeClasses(styles.container, className)}>
      <div className={styles.header}>
        <Input
          placeholder={"Search utterance"}
          contentBefore={<Search16Filled />}
          className={styles.searchBox}
        />
      </div>
      <UtteranceList items={items} metric={metric} onFetchData={onFetchData} />
    </div>
  )
}
