import {
  Input,
  makeStyles,
  mergeClasses,
  SearchBox,
} from "@fluentui/react-components"
import { Search16Filled } from "@fluentui/react-icons"
import { UtteranceList } from "./UtteranceList"
import { observer } from "mobx-react-lite"
import { CWCDiagnosisStore } from "@/store/CWCDiagnosisStore"

type CWCUtteranceListProps = {
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
    backgroundColor: "#F7F8FA",
  },
  cell: {
    marginBottom: "8px",
  },
})

export const CWCUtteranceList = observer(
  ({ className, onFetchData }: CWCUtteranceListProps) => {
    const styles = useStyles()
    const items = CWCDiagnosisStore.utterances

    return (
      <div className={mergeClasses(styles.container, className)}>
        <div className={styles.header}>
          <SearchBox
            placeholder={"Search utterance"}
            contentBefore={<Search16Filled />}
            className={styles.searchBox}
          />
        </div>
        <UtteranceList items={items} onFetchData={onFetchData} />
      </div>
    )
  }
)
