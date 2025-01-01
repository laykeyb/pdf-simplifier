import React from "react";

import { useAtom } from "jotai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { chunksAtom, currentChunkIndexAtom } from "@/atoms/simplify-atoms";
export function SimplifiedPdfViewerControls() {
  const [currentChunkIndex, setCurrentChunkIndex] = useAtom(
    currentChunkIndexAtom,
  );
  const [chunks] = useAtom(chunksAtom);

  const handleNext = (): void => {
    setCurrentChunkIndex((prev) => Math.min(prev + 1, chunks.length));
  };

  const handlePrev = (): void => {
    setCurrentChunkIndex((prev) => Math.max(prev - 1, 0));
  };
  return (
    <div className="mt:4 flex w-full flex-col items-center lg:mt-8">
      <div className="text-center text-xs text-gray-600">
        Page {currentChunkIndex + 1} of {chunks.length}
      </div>
      <div className="flex gap-4">
        <button
          onClick={handlePrev}
          className="flex size-14 items-center justify-center rounded-full bg-[AA5DF8] text-white shadow"
        >
          <FaArrowLeft className="size-5 lg:size-10" />
        </button>
        <button
          onClick={handleNext}
          className="flex size-14 items-center justify-center rounded-full bg-[AA5DF8] text-white shadow"
        >
          <FaArrowRight className="size-5 lg:size-10" />
        </button>
      </div>
    </div>
  );
}
