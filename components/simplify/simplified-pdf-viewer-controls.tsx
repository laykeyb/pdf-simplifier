import React, { useState } from "react";

import { useAtom } from "jotai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { chunksAtom, currentChunkIndexAtom } from "@/atoms/simplify-atoms";
import { Input } from "../ui/input";
export function SimplifiedPdfViewerControls() {
  const [currentChunkIndex, setCurrentChunkIndex] = useAtom(
    currentChunkIndexAtom,
  );
  const [value, setValue] = useState(currentChunkIndex);
  const [chunks] = useAtom(chunksAtom);

  const handleNext = (): void => {
    setCurrentChunkIndex((prev) => Math.min(prev + 1, chunks.length));
  };

  const handlePrev = (): void => {
    setCurrentChunkIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleChange = (e) => {
    const inputValue = e.target.value
    const numberValue = parseInt(inputValue)
    setValue( numberValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentChunkIndex(value -1);
  };
  return (
    <div className="mt:4 flex w-full flex-col items-center lg:mt-8">
      <div className="text-center text-xs text-gray-600">
        Page {currentChunkIndex + 1} of {chunks.length}
      </div>
      <div className="flex gap-4">
        <button
          onClick={handlePrev}
          className="flex size-14 items-center justify-center rounded-full bg-[AA5DF8] text-white shadow hover:bg-accent/20"
        >
          <FaArrowLeft className="size-5 lg:size-10" />
        </button>
        <button
          onClick={handleNext}
          className="flex size-14 items-center justify-center rounded-full bg-[AA5DF8] text-white shadow hover:bg-accent/20"
        >
          <FaArrowRight className="size-5 lg:size-10" />
        </button>
          </div>
        <form onSubmit={handleSubmit}>
          <Input
            type="number"
            min={1}
            max={chunks.length}
            value={value}
            onChange={handleChange}
          />
        </form>
    </div>
  );
}
