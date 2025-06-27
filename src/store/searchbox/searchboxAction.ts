import { action } from "satcheljs"
import type { Utterance } from "./utterance"

export const setUtterancesAction = action(
  "setUtterancesAction",
  (utterances: Utterance[]) => ({
    utterances,
  })
)

export const setSearchQueryAction = action(
  "setSearchQueryAction",
  (searchQuery: string) => ({
    searchQuery,
  })
)
