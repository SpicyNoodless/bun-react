type DiagnosisTab = "conversation" | "search_tool" | "meta_data" | "judgement_reasoning"

export type Utterance = {
  text: string
  delta: number
}

type ICWCDiagnosisStore = {
  selectedTab: DiagnosisTab
  utterances: Utterance[]
  selectedMetric: string
  selectedUtterance: Utterance | null
}
