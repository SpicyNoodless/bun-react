import {
  Button,
  Label,
  Link,
  makeStyles,
  mergeClasses,
  shorthands,
} from "@fluentui/react-components"
import { Open16Filled } from "@fluentui/react-icons"
import { CWCConversationContent } from "./CWCConversationContent"
import { useCallback } from "react"

export type CWCConversationProps = {
  title: string
  link: string
  score: number
  utterance: string
  content: string
} & React.HTMLAttributes<HTMLDivElement>

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
    justifyContent: "space-between",
  },
  score: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
    marginLeft: "16px",
  },
  devui: {
    backgroundColor: "#EBEFFF",
    color: "#3E45C9",
    ...shorthands.borderColor("#B0BEFF"),
    fontWeight: "semibold",
  },
})

export const CWCConversation = ({
  title,
  link,
  score,
  utterance,
  content,
  className,
}: CWCConversationProps) => {
  const styles = useStyles()
  const responses: string[] = new Array(3).fill(content)

  const handleButtonClick = useCallback(() => {
    window.open(link, "_blank", "noopener,noreferrer")
  }, [link])

  return (
    <div className={mergeClasses(styles.container, className)}>
      <div className={styles.header}>
        <div className={styles.score}>
          <Label size="large" weight="semibold">
            {title}
          </Label>
          <Label size="medium" weight="regular">
            {score}
          </Label>
        </div>
        <Button
          icon={<Open16Filled />}
          iconPosition="after"
          size="small"
          className={styles.devui}
          onClick={handleButtonClick}
        >
          DevUI
        </Button>
      </div>
      <CWCConversationContent utterance={utterance} responses={responses} />
    </div>
  )
}
