/* eslint-disable */
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
    return <span className="bg-orange-200">loading...</span>;
  }
  if (word === simplifiedWord) {
    return <span>{word}</span>
  }
  return (
    <span>
      <span className="bg-orange-200">{word}</span>{" "}
      <span className="bg-purple-200">[{simplifiedWord}]</span>
    </span>
  );
};
export default SimplifiedWithDictionaryWordDisplay;
