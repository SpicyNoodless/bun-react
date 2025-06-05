import { makeStyles } from "@fluentui/react-components"
import { observer } from "mobx-react-lite"
import { CWCDiagnosisStore } from "@/store/CWCDiagnosisStore"
import { CWCConversationView } from "./CWCConversationView"

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

export const ConversationCompareView = observer(() => {
  const styles = useStyles()

  if (CWCDiagnosisStore.conversationPair === null) {
    return <div className={styles.container}>No utterance selected</div>
  }

  const { control, treatment } = CWCDiagnosisStore.conversationPair
  const delta = treatment.score - control.score

  return (
    <div className={styles.conversations}>
      <CWCConversationView
        title={control.title}
        link={control.link}
        score={control.score}
        utterance={control.utterance}
        content={control.content}
        className={styles.conversation}
      />
      <CWCConversationView
        title={treatment.title}
        link={treatment.link}
        score={treatment.score}
        delta={delta}
        utterance={treatment.utterance}
        content={treatment.content}
        className={styles.conversation}
      />
    </div>
  )
})

ConversationCompareView.displayName = "ConversationCompareView"
