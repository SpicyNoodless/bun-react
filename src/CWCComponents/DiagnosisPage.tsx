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
import { CWCUtteranceList } from "./CWCUtteranceList"
import { useCallback, useEffect } from "react"
import { cloneDeep } from "lodash"
import { DetailView } from "./DetailView"
import { CWCDiagnosisStore } from "../store/CWCDiagnosisStore"
import {
  setConversationPairAction as setConversationPairAction,
  setSelectedMetricAction,
  setUtterancesAction,
} from "../store/CWCDiagnosisAction"
import { mockCellItems, mockConversation, mockMetrics } from "../data/mockData"
import { observer } from "mobx-react-lite"
import type { DialogOpenChangeEventHandler } from "@fluentui/react-dialog"

const useStyles = makeStyles({
  container: {
    width: "90%",
    height: "90%",
    maxWidth: "90%",
    maxHeight: "90%",
    padding: "16px",
  },
  dialogContent: {
    paddingTop: "20px",
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
    flexBasis: "80%",
    height: "100%",
    flexGrow: 1,
  },
})

type DiagnosisPageProps = {
  isOpen: boolean
  onOpenChange?: DialogOpenChangeEventHandler
}

export const DiagnosisPage = observer(
  ({ isOpen, onOpenChange }: DiagnosisPageProps) => {
    const metrics = mockMetrics

    // TODO: set selected metric & conversation pair to first utterance
    const onFetchData = useCallback(async () => {
      if (CWCDiagnosisStore.utterances.length === 0) {
        console.log("fetch initial data")
        setUtterancesAction(mockCellItems.slice(0, 5))
      }

      if (CWCDiagnosisStore.utterances.length >= 20) {
        console.log("No more data to fetch")
        return
      }

      console.log("fetch data")
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const nextItems = cloneDeep(CWCDiagnosisStore.utterances)
      setUtterancesAction([...CWCDiagnosisStore.utterances, ...nextItems])
    }, [])

    useEffect(() => {
      onFetchData()
      setConversationPairAction({
        control: mockConversation[0],
        treatment: mockConversation[1],
      })
      setSelectedMetricAction(metrics[0])
    }, [])

    const styles = useStyles()
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange} modalType="alert">
        <DialogSurface className={styles.container}>
          <DialogBody className={styles.body}>
            <DialogTitle>
              {"Utterance Diagnosis of experiment (cwc_control: cwc_treatment)"}
            </DialogTitle>
            <DialogTitle
              action={
                <DialogTrigger action="close">
                  <Button appearance="subtle" icon={<Dismiss24Regular />} />
                </DialogTrigger>
              }
            ></DialogTitle>
            <DialogContent className={styles.dialogContent}>
              <div className={styles.content}>
                <CWCUtteranceList
                  onFetchData={onFetchData}
                  className={styles.cellList}
                />
                <Divider vertical={true} />
                <DetailView
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
)
