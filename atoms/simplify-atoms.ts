import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";



export const extractedTextAtom = atom("")
export const isExtractingAtom = atom(false)
export const historyAtom = atom<(string | {
    previousWord: string;
    word: string;
    followingWord: string;
})[][]>([])
export const simplifyAtom = atom(false)
export const currentChunkIndexAtom = atom(0)
export const chunksAtom = atom([])
export const useAiAtom = atomWithStorage('useAi',false)
export const difficultyLevelAtom = atom(-60)

