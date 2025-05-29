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
import InfiniteScroll from "react-infinite-scroll-component"
import React from "react"

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
      <Input contentBefore={<Search16Filled />} />
      <Text>Sort by {<Text>{metric}</Text>} delta</Text>
      <InfiniteScroll
        dataLength={items.length}
        pullDownToRefresh
        next={onFetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items.map((item, index) => (
          <CWCUtteranceCell
            key={useId("utterance-cell-")}
            text={item.text}
            delta={item.delta}
            className={styles.cell}
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}
