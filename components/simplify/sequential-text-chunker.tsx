import { useEffect } from "react";
import ComponentsFromText from "./components-from-text";
import { useAtom } from "jotai";
import { chunksAtom, currentChunkIndexAtom } from "@/atoms/simplify-atoms";

// Define the types for the SequentialTextChunker props
interface SequentialTextChunkerProps {
  text: string;
  wordsPerChunk?: number;
}

// Main component that handles text chunking and sequential rendering
const SequentialTextChunker: React.FC<SequentialTextChunkerProps> = ({
  text = "",
  wordsPerChunk = 500,
}) => {
  const [currentChunkIndex] = useAtom(currentChunkIndexAtom);
  const [chunks, setChunks] = useAtom(chunksAtom);

  useEffect(() => {
    const chunksArr: string[] = text.trim()
      ? text.split(" ").reduce((acc: string[], word: string) => {
          if (
            !acc.length ||
            acc[acc.length - 1].split(" ").length >= wordsPerChunk
          ) {
            acc.push(word);
          } else {
            acc[acc.length - 1] += ` ${word}`;
          }
          return acc;
        }, [])
      : [];

    setChunks(chunksArr); // Update the chunks state once
  }, [text, wordsPerChunk, setChunks]);

  // Guard clause for when chunks array is empty or currentChunkIndex is invalid
  if (!chunks.length || currentChunkIndex >= chunks.length) {
    return null;
  }

  return (
    <div className="inline h-full  text-sm shadow-sm">
      <ComponentsFromText
        key={currentChunkIndex} // Using currentChunkIndex as key instead of undefined index
        text={chunks[currentChunkIndex]}
      />
    </div>
  );
};

export default SequentialTextChunker;
