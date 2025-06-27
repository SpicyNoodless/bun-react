import { orchestrator } from "satcheljs"
import { setSearchQuery, setUtterances } from "./searchboxMutator"
import { setSearchQueryAction, setUtterancesAction } from "./searchboxAction"

export function registerSearchBoxOrchestrator() {
  orchestrator(setUtterancesAction, (state) => {
    setUtterances(state.utterances)
  })

  orchestrator(setSearchQueryAction, (state) => {
    setSearchQuery(state.searchQuery)
  })
}
