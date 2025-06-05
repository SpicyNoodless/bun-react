import { makeStyles, mergeClasses, Text } from "@fluentui/react-components"
import Markdown from "react-markdown"

type CWCConversationContentProps = {
  utterance: string
  responses: string[]
} & React.HTMLAttributes<HTMLDivElement>

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ccc",
    borderRadius: "12px",
    gap: "16px",
    padding: "16px",
    flexGrow: 1,
    overflowY: "auto",
  },
  utterance: {
    backgroundColor: "#EBEFFF",
    borderRadius: "8px",
    border: "1px solid #ccc",
    padding: "8px",
  },
  response: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
})

export const CWCConversationContentView = ({
  utterance,
  responses,
  className,
}: CWCConversationContentProps) => {
  const styles = useStyles()

  return (
    <div className={mergeClasses(styles.container, className)}>
      {responses.map((response, index) => (
        <div key={index} className={styles.response}>
          <Text className={styles.utterance}>{utterance}</Text>
          <Markdown>{response}</Markdown>
        </div>
      ))}
    </div>
  )
}

CWCConversationContentView.displayName = "CWCConversationContentView"
