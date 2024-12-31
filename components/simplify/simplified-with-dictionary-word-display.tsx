import { useEffect, useState } from "react";

import { callGroqApiProps } from "@/actions/simplify";
import { getMemoizedSynonymFromObject } from "@/lib/simplifyWithDictionary";

const SimplifiedWithDictionaryWordDisplay = ({
  word,
  previousWord,
  followingWord,
}: callGroqApiProps) => {
  const [simplifiedWord, setSimplifiedWord] = useState<string>("");

  useEffect(() => {
    const fetchSimplifiedWord = async () => {
      const simplifiedWord = await getMemoizedSynonymFromObject({
        word,
        previousWord,
        followingWord,
      });
      setSimplifiedWord(simplifiedWord);
    };
    fetchSimplifiedWord();
  }, []);
  if (!simplifiedWord) {
    return <span>loading...</span>;
  }
  return <span>{simplifiedWord}</span>;
};
export default SimplifiedWithDictionaryWordDisplay;
