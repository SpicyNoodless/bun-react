import { VariableSizeList as List } from "react-window"
import React, { useRef, useState, useEffect } from "react"

// 动态高度项的示例数据
type ItemData = {
  id: number
  content: string
}

const DynamicHeightList = () => {
  const [items, setItems] = useState<ItemData[]>([])
  const listRef = useRef<List>(null)
  const rowHeights = useRef<Record<number, number>>({})

  // 初始化数据
  useEffect(() => {
    setItems(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        content: `Item ${i} - ${"Lorem ipsum ".repeat(
          Math.floor(Math.random() * 10)
        )}`,
      }))
    )
  }, [])

  // 动态获取行高（带缓存）
  const getItemSize = (index: number) => {
    return rowHeights.current[index] || 50 // 默认高度50px
  }

  // 渲染单个项
  const Row = ({
    index,
    style,
  }: {
    index: number
    style: React.CSSProperties
  }) => {
    const rowRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (rowRef.current) {
        // 测量实际高度并更新缓存
        const height = rowRef.current.getBoundingClientRect().height
        rowHeights.current = { ...rowHeights.current, [index]: height }
        // 通知列表更新布局
        listRef.current?.resetAfterIndex(index)
      }
    }, [index])

    return (
      <div style={style}>
        <div
          ref={rowRef}
          style={{
            padding: "10px",
            borderBottom: "1px solid #eee",
            whiteSpace: "pre-wrap",
          }}
        >
          {items[index].content}
        </div>
      </div>
    )
  }

  return (
    <List
      ref={listRef}
      height={500}
      width="100%"
      itemCount={items.length}
      itemSize={getItemSize}
    >
      {Row}
    </List>
  )
}

export const InfiniteDynamicList = ({ className }: { className?: string }) => {
  const [items, setItems] = useState<ItemData[]>(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      content: `Item ${i} - ${"Lorem ipsum ".repeat(
        Math.floor(Math.random() * 10)
      )}`,
    }))
  )
  const [isLoading, setIsLoading] = useState(false)
  const listRef = useRef<List>(null)
  const rowHeights = useRef<Record<number, number>>({})

  // 加载更多数据
  const loadMoreItems = async () => {
    console.log("load more items")
    if (isLoading) return

    setIsLoading(true)
    // 模拟API请求
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newItems = Array.from({ length: 10 }, (_, i) => ({
      id: items.length + i,
      content: `Item ${items.length + i} - ${"New content ".repeat(
        Math.floor(Math.random() * 5)
      )}`,
    }))

    setItems((prev) => [...prev, ...newItems])
    setIsLoading(false)
  }

  // 滚动处理
  const handleScroll = ({ scrollOffset }: { scrollOffset: number }) => {
    const list = listRef.current
    if (!list) return

    const offset = list.props.height as number
    const threshold = list.props.itemCount * 30 // 简单阈值判断

    if (scrollOffset > threshold - offset) {
      loadMoreItems()
    }
  }

  // 动态获取行高（带缓存）
  const getItemSize = (index: number) => {
    return rowHeights.current[index] || 50 // 默认高度50px
  }

  // 渲染单个项
  const Row = ({
    index,
    style,
  }: {
    index: number
    style: React.CSSProperties
  }) => {
    const rowRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (rowRef.current) {
        // 测量实际高度并更新缓存
        const height = rowRef.current.getBoundingClientRect().height
        rowHeights.current = { ...rowHeights.current, [index]: height }
        // 通知列表更新布局
        listRef.current?.resetAfterIndex(index)
      }
    }, [index])

    return (
      <div style={style}>
        <div
          ref={rowRef}
          style={{
            padding: "10px",
            borderBottom: "1px solid #eee",
            whiteSpace: "pre-wrap",
          }}
        >
          {items[index].content}
        </div>
      </div>
    )
  }

  return (
    <>
      <List
        ref={listRef}
        height={500}
        width="100%"
        itemCount={items.length}
        itemSize={getItemSize}
        onScroll={handleScroll}
        className={className}
      >
        {Row}
      </List>
      {isLoading && <div>Loading more items...</div>}
    </>
  )
}
