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
import type React from "react"

type CWCUtteranceListProps = {
  metric: string
  items: CWCUtteranceCellProps[]
} & React.HTMLAttributes<HTMLDivElement>

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%",
  },
})

export const CWCUtteranceList = ({
  metric,
  items,
  className,
}: CWCUtteranceListProps) => {
  const styles = useStyles()
  return (
    <div className={mergeClasses(styles.container, className)}>
      <Input contentBefore={<Search16Filled />} />
      <Text>Sort by {<Text>{metric}</Text>} delta</Text>
      <InfiniteScroll
        dataLength={items.length}
        next={() => {}}
        hasMore={false}
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
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}
