import { createStore } from "satcheljs"
import type { Utterance } from "./utterance"

type ISearchBoxStore = {
  utterances: Utterance[]
  searchQuery?: string
}

const initialState: ISearchBoxStore = {
  utterances: [],
}

export const searchBoxStore = createStore<ISearchBoxStore>(
  "searchBoxStore",
  Object.assign({}, initialState)
)()
