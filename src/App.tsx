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
  TabList,
  Tab,
  Dropdown,
  Option,
} from "@fluentui/react-components"
import { Dismiss24Regular } from "@fluentui/react-icons"
import { CWCConversation } from "./CWCComponents/CWCConversation"
import { mockCellItems, mockConversation } from "./data/mockData"
import { CWCUtteranceList } from "./CWCComponents/CWCUtteranceList"
import React from "react"
import { type CWCUtteranceCellProps } from "./CWCComponents/CWCUtteranceCell"
import { cloneDeep } from "lodash"

const cellItems = [
  "Can you come up with a funny out-of-office message?",
  "Can you explain how to implement error enums and option enums in Rust?",
  "A client is asking for a feature that allows them to export their data in a specific format. How would you approach this?",
  "Can you explain the concept of ownership in Rust?",
  "Can you come up with a funny out-of-office message?",
  "Can you explain how to implement error enums and option enums in Rust?",
  "A client is asking for a feature that allows them to export their data in a specific format. How would you approach this?",
  "Can you explain the concept of ownership in Rust?",
  "Can you come up with a funny out-of-office message?",
  "Can you explain how to implement error enums and option enums in Rust?",
  "A client is asking for a feature that allows them to export their data in a specific format. How would you approach this?",
  "Can you explain the concept of ownership in Rust?",
]

const dropDownItems = [
  "Metrics: sbsleo_score_a",
  "Metrics: sbsleo_score_b",
  "Metrics: sbsleo_score_c",
]

const useStyles = makeStyles({
  title: {
    marginBottom: "160px",
  },
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
  details: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "8px",
    gap: "16px",
  },
  metricsSelection: {
    maxWidth: "30%",
  },
  tabList: {
    font: "caption",
  },
  conversations: {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    flexGrow: 1,
  },
})

export function App() {
  const [cellItems, setCellItems] = React.useState<CWCUtteranceCellProps[]>(
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
          <DialogTitle>Utterance Diagnosis</DialogTitle>
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
              <div className={styles.details}>
                <TabList
                  appearance="transparent"
                  size="medium"
                  defaultSelectedValue="conversation"
                >
                  <Tab value="conversation">Conversation</Tab>
                  <Tab value="search_tool">Search Tool</Tab>
                  <Tab value="meta_data">Meta Data</Tab>
                  <Tab value="judgement_reasoning">Judgement Reasoning</Tab>
                </TabList>
                <Dropdown
                  placeholder="Select an metric"
                  className={styles.metricsSelection}
                >
                  {dropDownItems.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Dropdown>
                <div className={styles.conversations}>
                  <CWCConversation
                    title={mockConversation[0].title}
                    link={mockConversation[0].link}
                    score={mockConversation[0].score}
                    utterance={mockConversation[0].utterance}
                    content={mockConversation[0].content}
                  />
                  <CWCConversation
                    title={mockConversation[1].title}
                    link={mockConversation[1].link}
                    score={mockConversation[1].score}
                    utterance={mockConversation[1].utterance}
                    content={mockConversation[1].content}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

export default App
