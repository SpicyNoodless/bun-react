import { registerCWCDiagnosisOrchestrator } from "./store/CWCDiagnosisOrchestrator"
import { observer } from "mobx-react-lite"
import { TaggedSearchBox } from "./SearchBox/TaggedSearchBox"
import { useEffect } from "react"
import { registerSearchBoxOrchestrator } from "./store/searchbox/searchboxOrchestrator"
import { mockUtterances } from "./store/searchbox/mockUtterances"
import { filteredUtterances } from "./store/searchbox/searchboxSelector"
import { setUtterancesAction } from "./store/searchbox/searchboxAction"

registerCWCDiagnosisOrchestrator()
registerSearchBoxOrchestrator()

export const App = observer(() => {
  const tags = ["tag1", "tag2", "tag3", "tag4"]

  useEffect(() => {
    setUtterancesAction(mockUtterances)
  }, [])

  const utterances = filteredUtterances.get()

  return (
    <div>
      <TaggedSearchBox tags={tags} />
      <div>
        <h2>Filtered Utterances</h2>
        <ul>
          {utterances.map((utterance) => (
            <li key={utterance.key}>
              {utterance.text} (Delta: {utterance.delta})
              {utterance.tags && utterance.tags.length > 0 && (
                <span> - Tags: {utterance.tags.join(", ")}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})
