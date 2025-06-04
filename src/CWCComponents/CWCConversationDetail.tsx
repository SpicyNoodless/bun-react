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
    maxWidth: "20%",
    borderRadius: "8px",
  },
  conversations: {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    flexGrow: 1,
    overflowY: "auto",
  },
})

const dropDownItems = [
  "Metrics: sbsleo_score_a",
  "Metrics: sbsleo_score_b",
  "Metrics: sbsleo_score_c",
]

type CWCConversationDetailProps = {
  conversationA: CWCConversationProps
  conversationB: CWCConversationProps
} & React.HTMLAttributes<HTMLDivElement>

export const CWCConversationDetail = ({
  conversationA,
  conversationB,
  className,
}: CWCConversationDetailProps) => {
  const styles = useStyles()

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
        className={styles.metricsSelection}
      >
        {dropDownItems.map((option) => (
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
        />
        <CWCConversation
          title={conversationB.title}
          link={conversationB.link}
          score={conversationB.score}
          utterance={conversationB.utterance}
          content={conversationB.content}
        />
      </div>
    </div>
  )
}

CWCConversationDetail.displayName = "CWCConversationDetail"
