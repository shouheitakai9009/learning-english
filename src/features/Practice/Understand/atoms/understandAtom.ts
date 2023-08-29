
import { atom } from "recoil";

export const selectedWord = {
  requestCount: atom<number>({ key: 'selected-word-requestCount-state', default: 0 }),
  multiple: atom<boolean>({ key: 'selected-word-multiple-state', default: false }),
  submitting: atom<boolean>({ key: 'selected-word-submitting-state', default: false }),
  prompt: atom<string | null>({ key: 'selected-word-prompt', default: null }),
  text: atom<string>({ key: 'selected-word-text', default: "" }),
  index: atom<number | null>({
    key: 'selected-word-index-state',
    default: null,
  }),
}
