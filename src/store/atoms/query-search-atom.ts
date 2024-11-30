import { atom, useAtom } from "jotai";

export const querySearchAtom = atom<string>("");

export const useQuerySearchAtom = () => useAtom(querySearchAtom);
