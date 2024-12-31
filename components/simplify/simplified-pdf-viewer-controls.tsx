import React from "react";

import { useAtom } from "jotai";
import {
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { chunksAtom, currentChunkIndexAtom } from "@/atoms/simplify-atoms";
export function SimplifiedPdfViewerControls() {
  const [currentChunkIndex, setCurrentChunkIndex] = useAtom(
    currentChunkIndexAtom,
  );
  const [chunks, setChunks] = useAtom(chunksAtom);

  const handleNext = (): void => {
    setCurrentChunkIndex((prev) => Math.min(prev + 1, chunks.length));
  };

  const handlePrev = (): void => {
    setCurrentChunkIndex((prev) => Math.max(prev - 1, 0));
  };
  return (
    <div className="flex w-full justify-center lg:mt-8 mt:4">
      
       
        <div className="flex gap-4">
          <button onClick={handlePrev}  className="rounded-full flex justify-center items-center text-white shadow bg-[AA5DF8]  size-14">
            <FaArrowLeft className="lg:size-10 size-5"  />
          </button>
          <button onClick={handleNext}  className="rounded-full flex justify-center items-center text-white shadow bg-[AA5DF8] size-14">
            <FaArrowRight className="lg:size-10 size-5"/>
          </button>
        </div>
      </div>
  
  );
}
