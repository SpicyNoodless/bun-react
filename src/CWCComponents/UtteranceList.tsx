import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  useTableFeatures,
  type TableColumnDefinition,
  useTableSelection,
  TableCellLayout,
  createTableColumn,
  makeStyles,
  Spinner,
  useTableSort,
  type TableColumnId,
  TableHeader,
  TableHeaderCell,
  Text,
} from "@fluentui/react-components"
import { CWCUtteranceCell } from "./CWCUtteranceCell"
import { useCallback, useState } from "react"
import { v4 as uuidv4 } from "uuid"

type UtteranceItem = {
  text: string
  delta: number
}

const columns: TableColumnDefinition<UtteranceItem>[] = [
  createTableColumn<UtteranceItem>({
    columnId: "utterance",
    compare: (a, b) => {
      return a.delta - b.delta
    },
  }),
]

const useStyles = makeStyles({
  container: {
    overflowY: "auto",
    scrollbarWidth: "none",
    ":hover": {
      scrollbarWidth: "thin",
    },
  },
  table: {
    borderCollapse: "unset",
    padding: "0 16px 0 0",
  },
  cell: {
    width: "100%",
    borderRadius: "8px",
  },
  row: {
    borderRadius: "8px",
  },
})

type UtteranceListProps = {
  items: UtteranceItem[]
  metric: string
  onFetchData?: () => Promise<void>
}

export const UtteranceList = ({
  items,
  metric,
  onFetchData,
}: UtteranceListProps) => {
  const styles = useStyles()
  const [isLoading, setIsLoading] = useState(false)

  const {
    getRows,
    selection: { toggleRow, isRowSelected },
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSelection({
        selectionMode: "single",
        defaultSelectedItems: new Set([1]),
      }),
      useTableSort({
        defaultSortState: {
          sortColumn: "utterance",
          sortDirection: "descending",
        },
      }),
    ]
  )

  const headerSortProps = (columnId: TableColumnId) => ({
    onClick: (e: React.MouseEvent) => {
      console.log("Header clicked:", columnId)
      toggleColumnSort(e, columnId)
    },
    sortDirection: getSortDirection(columnId),
  })

  const rows = sort(
    getRows((row) => {
      const selected = isRowSelected(row.rowId)
      return {
        ...row,
        onClick: (e: React.MouseEvent) => {
          console.log("Row clicked:", row.rowId)
          toggleRow(e, row.rowId)
        },
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === " ") {
            e.preventDefault()
            toggleRow(e, row.rowId)
          }
        },
        selected,
        appearance: selected ? ("brand" as const) : ("none" as const),
      }
    })
  )

  const handleFetchData = useCallback(async () => {
    console.log("Fetching data...")

    setIsLoading(true)
    try {
      await onFetchData()
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [onFetchData])

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const threshold = 100
    const element = e.currentTarget
    const isAtBottom =
      element.scrollHeight - element.scrollTop <=
      element.clientHeight + threshold
    if (isAtBottom && !isLoading && onFetchData) {
      handleFetchData()
    }
  }

  return (
    <div className={styles.container} onScroll={onScroll}>
      <Table sortable={true} className={styles.table}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell {...headerSortProps("utterance")}>
              Sort by <Text weight="semibold">{metric}</Text> delta
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => (
            <TableRow
              onClick={onClick}
              onKeyDown={onKeyDown}
              aria-selected={selected}
              appearance={appearance}
              key={uuidv4()}
            >
              <TableCell className={styles.row}>
                <TableCellLayout className={styles.cell}>
                  <CWCUtteranceCell text={item.text} delta={item.delta} />
                </TableCellLayout>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isLoading && <Spinner />}
    </div>
  )
}
