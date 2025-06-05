import { mutatorAction } from "satcheljs"
import { CWCDiagnosisStore as store } from "./CWCDiagnosisStore"
import type { DiagnosisTab } from "@/types/diagnosisTab"
import type { Utterance } from "@/types/utterance"
import type { Conversation } from "@/types/conversation"
import type { Pair } from "@/types/pair"

export const setSelectedTab = mutatorAction(
  "setSelectedTab",
  (tab: DiagnosisTab) => {
    store.selectedTab = tab
  }
)

export const setUtterances = mutatorAction(
  "setUtterances",
  (utterances: Utterance[]) => {
    store.utterances = utterances
  }
)

export const setSelectedMetric = mutatorAction(
  "setSelectedMetric",
  (metric: string | null) => {
    store.selectedMetric = metric
  }
)

export const setSelectedUtterance = mutatorAction(
  "setSelectedUtterance",
  (utterance: Utterance | null) => {
    store.selectedUtterance = utterance
  }
)

export const setConversationPair = mutatorAction(
  "setConversationPair",
  (pair?: Pair<Conversation>) => {
    store.conversationPair = pair
  }
)
