import {
  Button,
  Label,
  Link,
  makeStyles,
  Tab,
  TabList,
  Text,
} from "@fluentui/react-components"
import { Open16Filled } from "@fluentui/react-icons"

export type CWCConversationProps = {
  title: string
  link: string
  score: {
    key: string
    value: number
  }
  utterance: string
  content: string
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
  },
  score: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
    marginLeft: "16px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ccc",
    borderRadius: "12px",
    gap: "16px",
    padding: "16px",
  },
  utterance: {
    backgroundColor: "#EBEFFF",
    borderRadius: "8px",
    border: "1px solid #ccc",
    padding: "8px",
  },
})

export const CWCConversation = ({
  title,
  link,
  score,
  utterance,
  content,
}: CWCConversationProps) => {
  const styles = useStyles()
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Label size="large" weight="semibold">
          {title}
        </Label>
        <Link href={link}>
          <Open16Filled />
        </Link>
        <div className={styles.score}>
          <Label>{score.key}</Label>
          <Label weight="semibold">{score.value}</Label>
        </div>
      </div>
      <div className={styles.content}>
        <TabList
          appearance="subtle-circular"
          size="small"
          defaultSelectedValue="sydney_reply"
        >
          <Tab value="sydney_reply">Sydney reply</Tab>
          <Tab value="sydney_searches">Sydney searches</Tab>
          <Tab value="iterations">Iterations</Tab>
          <Tab value="reasoning">Reasoning</Tab>
        </TabList>
        <Text className={styles.utterance}>{utterance}</Text>
        <Text>{content}</Text>
      </div>
    </div>
  )
}
