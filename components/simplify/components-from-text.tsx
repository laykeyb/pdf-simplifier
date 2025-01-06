/* eslint-disable */
"use client";
import rs from "text-readability";
import WordsToButton from "./words-to-button";

import {simpleWords} from "@/data/simple-words"
import { getMemoizedSynonymFromObject } from "@/lib/simplifyWithDictionary";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { difficultyLevelAtom, historyAtom } from "@/atoms/simplify-atoms";

// const getSimplifiedText = async (toBeSimplifiedObject: callGroqApiProps) => {
//   try {
//     const simplifiedObject =
//       await getSimplifiedObjectWithTextFromTextWithGroqAPI(
//         toBeSimplifiedObject,
//       );
//     console.log(simplifiedObject);
//     return simplifiedObject;
//   } catch (error) {
//     console.log(error);
//   }
// };

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
const simpleWordsArray = new Set(simpleWords);
const findDifficultWordMatchFromWordList = (words: string[], simpleWordsArray: Set<string>) => {

  const simplifiedWordsArray = words.map((word, index) => {
    if (typeof word !== "string") return word;
    
    // Check if the word is a single space or contains non-alphabetic characters (punctuation)
    const isPunctuationOrSpace = /^\s*$/.test(word) || /[^a-zA-Z]/.test(word);
    
    if (isPunctuationOrSpace || simpleWordsArray.has(word.toLowerCase())) {
      return word;
    }
      // Get surrounding words safely
      const prev3 = words[index - 3] || '';
      const prev2 = words[index - 2] || '';
      const prev1 = words[index - 1] || '';
      
      const next1 = words[index + 1] || '';
      const next2 = words[index + 2] || '';
      const next3 = words[index + 3] || '';

      const previousWord = `${prev1} ${prev2} ${prev3}`.trim();
      const followingWord = `${next1} ${next2} ${next3}`.trim();

      const toBeSimplifiedObject = { previousWord, word, followingWord };
      console.log(toBeSimplifiedObject);
      console.log(getMemoizedSynonymFromObject(toBeSimplifiedObject));

      return toBeSimplifiedObject;
    
    
  });

  return simplifiedWordsArray;
};

const findDifficultWordMatch = (words: string[], difficulyLevel: number) => {
  const simplifiedWordsArray = words.map((word, index) => {
    if (typeof word !== "string") return word;

    const ratedWord = rs.fleschReadingEase(word + ".");

    if (ratedWord !== undefined && ratedWord < difficulyLevel) {
      // Get surrounding words safely
      const prev3 = words[index - 3] || '';
      const prev2 = words[index - 2] || '';
      const prev1 = words[index - 1] || '';
      
      const next1 = words[index + 1] || '';
      const next2 = words[index + 2] || '';
      const next3 = words[index + 3] || '';

      const previousWord = `${prev1} ${prev2} ${prev3}`.trim();
      const followingWord = `${next1} ${next2} ${next3}`.trim();

      const toBeSimplifiedObject = { previousWord, word, followingWord };
      console.log(toBeSimplifiedObject);
      console.log(getMemoizedSynonymFromObject(toBeSimplifiedObject));

      return toBeSimplifiedObject;
    }
    return word;
  });

  return simplifiedWordsArray;
};

const ComponentsFromText = ({ text }): React.ReactNode => {
  const [history, setHistory] = useAtom(historyAtom);
  const [difficultyLevel] = useAtom(difficultyLevelAtom);

  const words = text.split(/([a-zA-Z]+(?:'[a-zA-Z]+)?)|([^a-zA-Z0-9\s])/g);
  const simplifiedWordsArray = findDifficultWordMatchFromWordList(words,simpleWordsArray);


  useEffect(() => {
    setHistory(prevHistory => {
      const maxHistorySize = 3; // Change this number to adjust how many items you want to keep
      const newHistory = [...prevHistory, simplifiedWordsArray];
      return newHistory.slice(-maxHistorySize); // Only keep the most recent items
    });
    // console.log("History :" + history);
  }, []);
  return simplifiedWordsArray.map((wordOrWordObject, index) => (
    <WordsToButton wordOrWordObject={wordOrWordObject} key={index} />
  ));
};

export default ComponentsFromText;
