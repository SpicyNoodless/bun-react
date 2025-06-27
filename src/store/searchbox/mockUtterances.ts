import type { Utterance } from "./utterance"

export const mockUtterances: Utterance[] = [
  {
    key: "1",
    text: "This is the first utterance.",
    delta: 0.1,
    tags: ["tag1", "tag2"],
  },
  {
    key: "2",
    text: "This is the second utterance.",
    delta: 0.2,
    tags: ["tag1", "tag3"],
  },
  {
    key: "3",
    text: "This is the third utterance.",
    delta: -0.05,
    tags: ["tag2", "tag4"],
  },
  {
    key: "4",
    text: "This is the fourth utterance with more text to simulate a longer utterance.",
    delta: 0.15,
  },
  {
    key: "5",
    text: "This is the fifth utterance.",
    delta: -0.1,
  },
]
