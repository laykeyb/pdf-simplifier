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
    return <span>loading...</span>
  }
  return <span>{simplifiedWord}</span>;
};
export default SimplifiedWordDisplay;
