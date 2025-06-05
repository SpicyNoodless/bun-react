import type { Utterance } from "@/types/utterance"
import {
  Label,
  makeStyles,
  mergeClasses,
  Text,
} from "@fluentui/react-components"
import { useCallback } from "react"

export type CWCUtteranceCellProps = Utterance &
  React.HTMLAttributes<HTMLDivElement>

const useStyles = makeStyles({
  container: {
    width: "90%",
    padding: "8px",
    display: "flex",
    gap: "16px",
  },
  delta: {
    display: "flex",
    gap: "8px",
    marginLeft: "auto",
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
  text: {
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    maxWidth: "80%",
  },
})

export const CWCUtteranceCell = ({
  text,
  delta,
  className,
}: CWCUtteranceCellProps) => {
  const styles = useStyles()

  const renderDelta = useCallback(() => {
    let deltaClass = styles.gray
    let deltaText = "+0.00"
    if (delta > 0) {
      deltaClass = styles.green
      deltaText = `+${delta.toFixed(2)}`
    } else if (delta < 0) {
      deltaClass = styles.red
      deltaText = `${delta.toFixed(2)}`
    }
    return (
      <Label size="small" className={deltaClass}>
        {deltaText}
      </Label>
    )
  }, [delta])

  return (
    <div className={mergeClasses(styles.container, className)}>
      <Text truncate={true} className={styles.text}>
        {text}
      </Text>
      <div className={styles.delta}>{renderDelta()}</div>
    </div>
  )
}
