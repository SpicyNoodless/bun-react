import {
  Dropdown,
  makeStyles,
  mergeClasses,
  Option,
  Tab,
  TabList,
} from "@fluentui/react-components"
import { CWCConversation, type CWCConversationProps } from "./CWCConversation"

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
})

type CWCConversationDetailProps = {
  conversationA: CWCConversationProps
  conversationB: CWCConversationProps
  metrics: string[]
  defaultMetric: string
} & React.HTMLAttributes<HTMLDivElement>

export const CWCConversationDetail = ({
  conversationA,
  conversationB,
  metrics,
  defaultMetric,
  className,
}: CWCConversationDetailProps) => {
  const styles = useStyles()

  const delta = conversationA.score - conversationB.score

  return (
    <div className={mergeClasses(styles.container, className)}>
      <TabList
        appearance="transparent"
        size="medium"
        defaultSelectedValue="conversation"
      >
        <Tab value="conversation">Conversation</Tab>
        <Tab value="search_tool">Search Tool</Tab>
        <Tab value="meta_data">Meta Data</Tab>
        <Tab value="judgement_reasoning">Judgement Reasoning</Tab>
      </TabList>
      <Dropdown
        placeholder="Select an metric"
        defaultValue={defaultMetric}
        className={styles.metricsSelection}
      >
        {metrics.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Dropdown>
      <div className={styles.conversations}>
        <CWCConversation
          title={conversationA.title}
          link={conversationA.link}
          score={conversationA.score}
          utterance={conversationA.utterance}
          content={conversationA.content}
          className={styles.conversation}
        />
        <CWCConversation
          title={conversationB.title}
          link={conversationB.link}
          score={conversationB.score}
          delta={delta}
          utterance={conversationB.utterance}
          content={conversationB.content}
          className={styles.conversation}
        />
      </div>
    </div>
  )
}

CWCConversationDetail.displayName = "CWCConversationDetail"
