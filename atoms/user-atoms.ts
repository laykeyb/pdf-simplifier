import { atom } from "jotai";
import {atomWithStorage} from 'jotai/utils'

export const simplifiedTextAtom = atom("");
export const simplificationLevelAtom = atom([100]);
export const isPremiumAtom = atom(false);
export const dailyPagesRemainingAtom = atomWithStorage("dailyPagesRemainin",400);
