import { mutatorAction } from "satcheljs"
import { searchBoxStore as store } from "./searchboxStore"
import type { Utterance } from "./utterance"

export const setUtterances = mutatorAction(
  "setUtterances",
  (utterances: Utterance[]) => {
    store.utterances = utterances
  }
)

export const setSearchQuery = mutatorAction(
  "setSearchQuery",
  (searchQuery: string) => {
    store.searchQuery = searchQuery
  }
)
