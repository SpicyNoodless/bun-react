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
  delta?: number
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

  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
  gray: {
    color: "gray",
  },
})

export const CWCConversation = ({
  title,
  link,
  score,
  delta,
  utterance,
  content,
  className,
}: CWCConversationProps) => {
  const styles = useStyles()
  const responses: string[] = new Array(3).fill(content)

  const handleButtonClick = useCallback(() => {
    window.open(link, "_blank", "noopener,noreferrer")
  }, [link])

  const renderDelta = useCallback(() => {
    let deltaClass = styles.gray
    let deltaText = "(+0.00)"
    if (delta > 0) {
      deltaClass = styles.green
      deltaText = `(+${delta.toFixed(2)})`
    } else if (delta < 0) {
      deltaClass = styles.red
      deltaText = `(${delta.toFixed(2)})`
    }

    return <Label className={deltaClass}>{deltaText}</Label>
  }, [delta])

  return (
    <div className={mergeClasses(styles.container, className)}>
      <div className={styles.header}>
        <div className={styles.score}>
          <Label size="large" weight="semibold">
            {title}
          </Label>
          <Label size="medium" weight="regular">
            {score} {delta && renderDelta()}
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
