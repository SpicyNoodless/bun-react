import { setSearchQueryAction } from "@/store/searchbox/searchboxAction"
import { SearchBox } from "@fluentui/react-components"

type TaggedSearchBoxProps = {
  tags?: string[]
}

export const TaggedSearchBox = ({ tags }: TaggedSearchBoxProps) => {
  return (
    <SearchBox
      placeholder="Search utterances..."
      clearButtonAriaLabel="Clear search"
      onChange={(e, data) => {
        setSearchQueryAction(data.value || "")
      }}
      tags={tags}
    />
  )
}
