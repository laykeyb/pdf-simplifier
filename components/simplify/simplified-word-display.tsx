/* eslint-disable */
import { getSimplifiedObjectWithTextFromTextWithGroqAPI } from "@/actions/simplify";
import { useEffect, useState } from "react";

interface SimplifiedWordDisplayProps {
  previousWord: string;
  word: string;
  followingWord: string;
}

const SimplifiedWordDisplay = (
  {word,previousWord,followingWord}: SimplifiedWordDisplayProps,
) => {
  const [simplifiedWord, setSimplifiedWord] = useState<string>("");

  useEffect(() => {
    const fetchSimplifiedWord = async () => {
      const simplifiedWord =
        await getSimplifiedObjectWithTextFromTextWithGroqAPI(
          {word,previousWord,followingWord}
        );
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
export default SimplifiedWordDisplay;
