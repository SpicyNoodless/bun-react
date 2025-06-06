import { Button } from "@fluentui/react-components"
import { useCallback, useState } from "react"
import { registerCWCDiagnosisOrchestrator } from "./store/CWCDiagnosisOrchestrator"
import { observer } from "mobx-react-lite"
import type { DialogOpenChangeEventHandler } from "@fluentui/react-dialog"
import { DiagnosisPage } from "./CWCComponents/DiagnosisPage"

registerCWCDiagnosisOrchestrator()

export const App = observer(() => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpenChange: DialogOpenChangeEventHandler = useCallback(
    (event, data) => {
      console.log("Dialog open change:", data.open)
      setIsOpen(data.open)
    },
    []
  )
  const mockItems = [
    { id: "1", text: "Item 1" },
    { id: "2", text: "Item 2" },
    { id: "3", text: "Item 3" },
  ]
  return (
    <div>
      <DiagnosisPage isOpen={isOpen} onOpenChange={onOpenChange} />
      {mockItems.map((item) => (
        <Button key={item.id} onClick={() => setIsOpen(true)}>
          {item.text}
        </Button>
      ))}
    </div>
  )
})
