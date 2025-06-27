import { computed } from "mobx"
import { searchBoxStore as store } from "./searchboxStore"

export const filteredUtterances = computed(() => {
  const searchQuery = store.searchQuery
  const utterances = store.utterances
  console.log("searchQuery", searchQuery)
  console.log("utterances", utterances)
  if (!searchQuery || searchQuery.trim() === "" || utterances.length === 0) {
    return utterances
  }

  return utterances.filter((utterance) =>
    utterance.text.toLowerCase().includes(searchQuery.toLowerCase())
  )
})
