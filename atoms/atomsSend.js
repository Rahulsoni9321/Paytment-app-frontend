import { atom, selector } from "recoil";

export const LoadingAtom = atom({
  key: "LoadingAtom",
  default: false,
});

export const AmountAtom = atom({
  key: "AmountAtom",
  default: "",
});

export const MessageAtom = atom({
  key: "MessageAtom",
  default: "",
});
export const TrackerAtom = atom({
  key: "TrackerAtom",
  default: false,
});
