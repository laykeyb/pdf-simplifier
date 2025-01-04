import { atom } from "jotai";



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
export const useAiAtom = atom(false)
export const difficultyLevelAtom = atom(-10)

