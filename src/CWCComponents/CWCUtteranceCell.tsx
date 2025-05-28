import { Label, makeStyles, Text } from "@fluentui/react-components"

export type CWCUtteranceCellProps = {
  text: string
  delta: number
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#EBEFFF",
    borderRadius: "8px",
    border: "1px solid #ccc",
    padding: "8px",
  },
  text: {
    flexBasis: "80%",
    flexShrink: 0,
  },
  delta: {
    marginLeft: "auto",
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

export const CWCUtteranceCell = ({ text, delta }: CWCUtteranceCellProps) => {
  const styles = useStyles()
  const deltaText = delta > 0 ? `+${delta.toFixed(2)}` : `${delta.toFixed(2)}`
  const deltaClass = delta > 0 ? styles.green : styles.red
  return (
    <div className={styles.container}>
      <Text className={styles.text}>{text}</Text>
      <div className={styles.delta}>
        <Label size="small">Delta</Label>
        <Label size="small" className={deltaClass}>
          {deltaText}
        </Label>
      </div>
    </div>
  )
}
