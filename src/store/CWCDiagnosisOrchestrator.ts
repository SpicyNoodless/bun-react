import { orchestrator } from "satcheljs"
import {
  setConversationPair,
  setSelectedMetric,
  setSelectedTab,
  setSelectedUtterance,
  setUtterances,
} from "./CWCDiagnosisMutator"
import {
  setConversationPairAction,
  setSelectedMetricAction,
  setSelectedTabAction,
  setSelectedUtteranceAction,
  setUtterancesAction,
} from "./CWCDiagnosisAction"

export function registerCWCDiagnosisOrchestrator() {
  orchestrator(setUtterancesAction, (state) => {
    setUtterances(state.utterances)
  })

  orchestrator(setSelectedTabAction, (state) => {
    setSelectedTab(state.tab)
  })

  orchestrator(setSelectedMetricAction, (state) => {
    setSelectedMetric(state.metric)
  })

  orchestrator(setSelectedUtteranceAction, (state) => {
    setSelectedUtterance(state.utterance)
  })

  orchestrator(setConversationPairAction, (state) => {
    setConversationPair(state.pair)
  })
}
