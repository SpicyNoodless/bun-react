import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  Button,
  Divider,
  makeStyles,
} from "@fluentui/react-components"
import { Dismiss24Regular } from "@fluentui/react-icons"
import { mockCellItems, mockConversation } from "../data/mockData"
import { CWCUtteranceList } from "./CWCUtteranceList"
import { useState } from "react"
import { type CWCUtteranceCellProps } from "./CWCUtteranceCell"
import { cloneDeep } from "lodash"
import { CWCConversationDetail } from "./CWCConversationDetail"

const useStyles = makeStyles({
  container: {
    width: "90%",
    height: "90%",
    maxWidth: "90%",
    maxHeight: "90%",
    padding: "16px",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    height: "100%",
  },
  body: {
    height: "100%",
  },
  cellList: {
    flexBasis: "20%",
    flexShrink: 0,
  },
  detail: {
    height: "100%",
    flexGrow: 1,
  },
})

const metrics = [
  "Metrics: groundleo_claimbreak_multiturn1.2",
  "Metrics: citation_multiturn1.2",
  "Metrics: sbsleov2_multiturn",
  "Metrics: sbsleov3_multiturn",
]

type CWCDiagnosisPageProps = {
  experimentName: string
}

export function CWCDiagnosisPage({ experimentName }: CWCDiagnosisPageProps) {
  const [cellItems, setCellItems] = useState<CWCUtteranceCellProps[]>(
    mockCellItems.slice(0, 12)
  )

  const onFetchData = async () => {
    if (cellItems.length >= 20) {
      console.log("No more data to fetch")
      return
    }
    await new Promise((resolve) => setTimeout(resolve, 3000))
    console.log("fetch data")
    const nextItems = cloneDeep(cellItems)
    setCellItems((prevItems) => [...prevItems, ...nextItems])
  }

  const styles = useStyles()
  return (
    <Dialog modalType="alert" className={styles.container}>
      <DialogTrigger disableButtonEnhancement>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface className={styles.container}>
        <DialogBody className={styles.body}>
          <DialogTitle>
            {"Utterance Diagnosis of " + experimentName}
          </DialogTitle>
          <DialogTitle
            action={
              <DialogTrigger action="close">
                <Button appearance="subtle" icon={<Dismiss24Regular />} />
              </DialogTrigger>
            }
          ></DialogTitle>
          <DialogContent>
            <div className={styles.content}>
              <CWCUtteranceList
                metric="sbsleo_score_a"
                items={cellItems}
                onFetchData={onFetchData}
                className={styles.cellList}
              />
              <Divider vertical={true} />
              <CWCConversationDetail
                conversationA={mockConversation[0]}
                conversationB={mockConversation[1]}
                metrics={metrics}
                defaultMetric={metrics[0]}
                className={styles.detail}
              />
            </div>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}
