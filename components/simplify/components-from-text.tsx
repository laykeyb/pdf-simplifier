"use client";
import rs from "text-readability";
import WordsToButton from "./words-to-button";

import {
  callGroqApiProps,
  getSimplifiedObjectWithTextFromTextWithGroqAPI,
} from "@/actions/simplify";
import { getMemoizedSynonymFromObject } from "@/lib/simplifyWithDictionary";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { difficultyLevelAtom, historyAtom } from "@/atoms/simplify-atoms";

const getSimplifiedText = async (toBeSimplifiedObject: callGroqApiProps) => {
  try {
    const simplifiedObject =
      await getSimplifiedObjectWithTextFromTextWithGroqAPI(
        toBeSimplifiedObject,
      );
    console.log(simplifiedObject);
    return simplifiedObject;
  } catch (error) {
    console.log(error);
  }
};

// const findDifficultWordMatch = (words: string[]) => {
//   const simplifiedWordsArray = words.map((word, index) => {
//     // Add a period to make it a valid sentence for the readability score
//     const ratedWord = rs.fleschReadingEase(word + '.');
//     console.log('Rating for', word, ':', ratedWord);

//     if (ratedWord !== undefined) {
//       if (ratedWord < 65) {
//       // Use array index instead of indexOf for better reliability
//       const previousWord = index > 0 ? words[index - 1] : null;
//       const followingWord = index < words.length - 1 ? words[index + 1] : null;

//       const toBeSimplifiedObject = {
//         previousWord,
//         word,
//         followingWord
//       };

//       console.log(toBeSimplifiedObject);
//       return toBeSimplifiedObject;
//     }}

//     // Return original word if rating is undefined
//     return word;
//   });

//   return simplifiedWordsArray;
// };
const findDifficultWordMatch = (words: string[], difficulyLevel: number) => {
  const simplifiedWordsArray = words.map((word, index) => {
    if (typeof word !== "string") return word;
    // if (!word.match(/^[A-Za-z]+$/)) return word
    const ratedWord = rs.fleschReadingEase(word + ".");
    // console.log("Rating for "+word+":"+ratedWord);

    if (ratedWord !== undefined) {
      if (ratedWord < difficulyLevel) {
        const previousWord = words[words.indexOf(word) - 1] || ",";
        const followingWord = words[words.indexOf(word) + 1] || ",";
        const toBeSimplifiedObject = { previousWord, word, followingWord };
        console.log(toBeSimplifiedObject);
        console.log(getMemoizedSynonymFromObject(toBeSimplifiedObject));

        return toBeSimplifiedObject;
      }
    }
    return word;
  });

  return simplifiedWordsArray;
};

const ComponentsFromText = ({ text }): React.ReactNode => {
  const [history, setHistory] = useAtom(historyAtom);
  const [difficultyLevel, setDifficultyLevel] = useAtom(difficultyLevelAtom);

  const words = text.split(/([a-zA-Z]+(?:'[a-zA-Z]+)?)|([^a-zA-Z0-9\s])/g);
  const simplifiedWordsArray = findDifficultWordMatch(words, difficultyLevel);


  useEffect(() => {
    setHistory(prevHistory => {
      const maxHistorySize = 3; // Change this number to adjust how many items you want to keep
      const newHistory = [...prevHistory, simplifiedWordsArray];
      return newHistory.slice(-maxHistorySize); // Only keep the most recent items
    });
    console.log("History :" + history);
  }, []);
  return simplifiedWordsArray.map((wordOrWordObject, index) => (
    <WordsToButton wordOrWordObject={wordOrWordObject} key={index} />
  ));
};

export default ComponentsFromText;
