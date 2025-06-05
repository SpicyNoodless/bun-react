import { observer } from "mobx-react-lite"
import {
  Dropdown,
  makeStyles,
  mergeClasses,
  Option,
  Tab,
  TabList,
  type OptionOnSelectData,
  type SelectionEvents,
  type SelectTabEventHandler,
} from "@fluentui/react-components"
import { ConversationCompareView } from "./ConversationCompare"
import { CWCDiagnosisStore } from "@/store/CWCDiagnosisStore"
import {
  setSelectedMetricAction,
  setSelectedTabAction,
} from "@/store/CWCDiagnosisAction"
import type { DiagnosisTab } from "@/types/diagnosisTab"
import { SearchToolCompareView } from "./SearchToolCompare"
import { MetadataCompareView } from "./MetadataCompare"
import { ReasoningCompareView } from "./ReasoningCompare"
import { useCallback } from "react"

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "8px",
    gap: "16px",
  },
  metricsSelection: {
    maxWidth: "30%",
    borderRadius: "8px",
    backgroundColor: "#F7F8FA",
  },
  conversations: {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    flexGrow: 1,
    overflowY: "auto",
  },
  conversation: {
    flexBasis: "50%",
  },
  truncatedText: {
    overflowX: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
})

type DetailViewProps = {
  metrics: string[]
  defaultMetric: string
} & React.HTMLAttributes<HTMLDivElement>

export const DetailView = observer(
  ({ metrics, defaultMetric, className }: DetailViewProps) => {
    const styles = useStyles()

    const renderCompareView = () => {
      switch (CWCDiagnosisStore.selectedTab) {
        case "conversation":
          return <ConversationCompareView />
        case "search_tool":
          return <SearchToolCompareView />
        case "meta_data":
          return <MetadataCompareView />
        case "judgement_reasoning":
          return <ReasoningCompareView />
        default:
          return <div>Should never fallback to here</div>
      }
    }

    const onTabSelect: SelectTabEventHandler = useCallback((_, data) => {
      setSelectedTabAction(data.value as DiagnosisTab)
    }, [])

    const onOptionSelect = useCallback(
      (event: SelectionEvents, data: OptionOnSelectData) => {
        console.log("Selected metric:", data)
        setSelectedMetricAction(data.optionValue)
      },
      []
    )

    return (
      <div className={mergeClasses(styles.container, className)}>
        <TabList
          appearance="transparent"
          size="medium"
          defaultSelectedValue="conversation"
          onTabSelect={onTabSelect}
        >
          <Tab value="conversation" on>
            Conversation
          </Tab>
          <Tab value="search_tool">Search Tool</Tab>
          <Tab value="meta_data">Meta Data</Tab>
          <Tab value="judgement_reasoning">Judgement Reasoning</Tab>
        </TabList>
        <Dropdown
          placeholder="Select an metric"
          button={
            <span className={styles.truncatedText}>
              {`Metric: ${CWCDiagnosisStore.selectedMetric}`}
            </span>
          }
          defaultValue={defaultMetric}
          className={styles.metricsSelection}
          onOptionSelect={onOptionSelect}
        >
          {metrics.map((option) => (
            <Option key={option} value={option}>
              {`Metrics: ${option}`}
            </Option>
          ))}
        </Dropdown>
        {renderCompareView()}
      </div>
    )
  }
)

DetailView.displayName = "CWCConversationDetailView"
