import type { Conversation } from "@/types/conversation"
import type { DiagnosisTab } from "@/types/diagnosisTab"
import type { Pair } from "@/types/pair"
import type { Utterance } from "@/types/utterance"
import { action } from "satcheljs"

export const setSelectedTabAction = action(
  "setSelectedTabAction",
  (tab: DiagnosisTab) => ({
    tab,
  })
)

export const setUtterancesAction = action(
  "setUtterancesAction",
  (utterances: Utterance[]) => ({
    utterances,
  })
)

export const setSelectedMetricAction = action(
  "setSelectedMetricAction",
  (metric: string | null) => ({
    metric,
  })
)

export const setSelectedUtteranceAction = action(
  "setSelectedUtteranceAction",
  (utterance: Utterance | null) => ({
    utterance,
  })
)

export const setConversationPairAction = action(
  "setConversationPair",
  (pair: Pair<Conversation>) => ({
    pair,
  })
)
