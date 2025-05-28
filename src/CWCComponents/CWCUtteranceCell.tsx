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
  },
  delta: {
    float: "right",
    display: "flex",
    gap: "8px",
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
})

export const CWCUtteranceCell = ({
  text,
  delta,
  className,
}: CWCUtteranceCellProps) => {
  const styles = useStyles()
  const deltaText = delta > 0 ? `+${delta.toFixed(2)}` : `${delta.toFixed(2)}`
  const deltaClass = delta > 0 ? styles.green : styles.red
  return (
    <div className={mergeClasses(styles.container, className)}>
      <p>{text}</p>
      <div className={styles.delta}>
        <Label size="small">Delta</Label>
        <Label size="small" className={deltaClass}>
          {deltaText}
        </Label>
      </div>
    </div>
  )
}
