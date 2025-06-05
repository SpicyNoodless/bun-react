import type { Conversation } from "@/types/conversation"
import type { DiagnosisTab } from "@/types/diagnosisTab"
import type { Pair } from "@/types/pair"
import type { Utterance } from "@/types/utterance"
import { createStore } from "satcheljs"

type ICWCDiagnosisStore = {
  selectedTab: DiagnosisTab
  utterances: Utterance[]
  selectedMetric?: string
  selectedUtterance?: Utterance
  conversationPair?: Pair<Conversation>
  searchToolPair?: Pair<string>
  metadataPair?: Pair<string>
  reasoningPair?: Pair<string>
}

const initialState: ICWCDiagnosisStore = {
  selectedTab: "conversation",
  utterances: [],
  selectedMetric: null,
  selectedUtterance: null,
  conversationPair: null,
  searchToolPair: null,
  metadataPair: null,
  reasoningPair: null,
}

export const CWCDiagnosisStore = createStore<ICWCDiagnosisStore>(
  "CWCDiagnosisStore",
  Object.assign({}, initialState)
)()
