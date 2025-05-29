import {
  Label,
  makeStyles,
  mergeClasses,
  Text,
} from "@fluentui/react-components"

export type CWCUtteranceCellProps = {
  text: string
  delta: number
} & React.HTMLAttributes<HTMLDivElement>

const useStyles = makeStyles({
  container: {
    width: "90%",
    backgroundColor: "#EBEFFF",
    borderRadius: "8px",
    border: "1px solid #ccc",
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
    <div className={mergeClasses(styles.container, className)}>
      <Text truncate={true} className={styles.text}>
        {text}
      </Text>
      <div className={styles.delta}>
        <Label size="small" className={deltaClass}>
          {deltaText}
        </Label>
      </div>
    </div>
  )
}
