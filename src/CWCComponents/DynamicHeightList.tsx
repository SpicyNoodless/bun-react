import { makeStyles, Spinner } from "@fluentui/react-components"
import { useEffect, useRef, useState } from "react"
import { VariableSizeList } from "react-window"
import Autosizer from "react-virtualized-auto-sizer"

type DynamicHeightListProps<T> = {
  items: T[]
  estimatedItemHeight?: number
  loadMore: () => Promise<void>
  renderItem: (index: number) => React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const useStyles = makeStyles({
  row: {
    paddingBottom: "8px",
  },
})

export const InfiniteDynamicList = <T,>({
  items,
  estimatedItemHeight = 50,
  loadMore,
  renderItem,
  className,
}: DynamicHeightListProps<T>) => {
  const [isLoading, setIsLoading] = useState(false)
  const listRef = useRef<VariableSizeList>(null)
  const rowHeights = useRef<Record<number, number>>({})

  const styles = useStyles()

  const loadMoreItems = async () => {
    if (isLoading) return

    setIsLoading(true)
    await loadMore()
    setIsLoading(false)
  }

  const handleScroll = ({ scrollOffset }: { scrollOffset: number }) => {
    const list = listRef.current
    if (!list) return

    const listHeight = list.props.height as number
    const totalItemHeight = items.length * estimatedItemHeight
    if (scrollOffset > totalItemHeight - listHeight * 1.5) {
      loadMoreItems()
    }
  }

  const getItemSize = (index: number) => {
    return rowHeights.current[index] || 50 // 默认高度50px
  }

  const Row = ({
    index,
    style,
  }: {
    index: number
    style: React.CSSProperties
  }) => {
    const rowRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      // delay to ensure the row is rendered before measuring
      setTimeout(() => {
        if (!rowRef.current) return
        const height = rowRef.current.getBoundingClientRect().height
        rowHeights.current = { ...rowHeights.current, [index]: height }
        listRef.current?.resetAfterIndex(index)
      }, 50)
    }, [index])

    return (
      <div style={style}>
        <div ref={rowRef} className={styles.row}>
          {renderItem(index)}
        </div>
      </div>
    )
  }

  return (
    <Autosizer disableWidth>
      {({ height }) => (
        <>
          <VariableSizeList
            ref={listRef}
            height={height}
            width="100%"
            itemCount={items.length}
            itemSize={getItemSize}
            onScroll={handleScroll}
            className={className}
          >
            {Row}
          </VariableSizeList>
          {isLoading && <Spinner />}
        </>
      )}
    </Autosizer>
  )
}
