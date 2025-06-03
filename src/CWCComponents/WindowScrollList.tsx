import { FixedSizeList as List } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import React from "react"

interface InfiniteListProps<T> {
  data: T[]
  loadMore: () => void
  itemHeight: number
  sortField?: keyof T
  searchFields?: (keyof T)[]
  renderItem: (item: T) => React.ReactNode
}

export function InfiniteScrollList<T>({
  data,
  loadMore,
  itemHeight,
  renderItem,
}: InfiniteListProps<T>) {
  const itemCount = data.length

  const Row = ({
    index,
    style,
  }: {
    index: number
    style: React.CSSProperties
  }) => {
    if (index === itemCount - 1) {
      loadMore()
    }

    return <div style={style}>{renderItem(data[index])}</div>
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          itemCount={itemCount}
          itemSize={itemHeight}
          width={width}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  )
}
