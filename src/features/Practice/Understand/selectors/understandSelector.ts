import { selector } from "recoil";
import { selectedWord } from "../atoms/understandAtom";

export const resetCurrentIndex = selector({
  key: "reset-current-index",
  get: ({ get }) => {
    return get(selectedWord.index)
  },
  set: ({ reset, get }) => {
    console.log("やほー", get(selectedWord.index))
    if (get(selectedWord.index) === null) {
      reset(selectedWord.multiple)
      reset(selectedWord.prompt)
      reset(selectedWord.requestCount)
      reset(selectedWord.text)
      reset(selectedWord.submitting)
    }
  },
})