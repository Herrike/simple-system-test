import { atom, useAtom } from "jotai";
import { type User } from "../../types/globals";

export const usersAtom = atom<User[] | null>(null);

export const useUsersAtom = () => useAtom(usersAtom);
