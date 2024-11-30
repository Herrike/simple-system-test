import { atom, useAtom } from "jotai";
import { type Repo } from "../../types/globals";

export const usersReposAtom = atom<Repo[] | null>(null);

export const useUserReposAtom = () => useAtom(usersReposAtom);
