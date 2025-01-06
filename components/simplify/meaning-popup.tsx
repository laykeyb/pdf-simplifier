/* eslint-disable */
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tippy";
import WordMeaningDisplay from "./word-meaning-display";
import SimplifiedWordDisplay from "./simplified-word-display";
import { callGroqApiProps } from "@/actions/simplify";
import SimplifiedWithDictionaryWordDisplay from "./simplified-with-dictionary-word-display";
import { useAtom } from "jotai";
import { useAiAtom } from "@/atoms/simplify-atoms";
import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

interface MeaningPopupProps {
  wordOrWordObject: string | callGroqApiProps;
}

const MeaningPopup = ({ wordOrWordObject }: MeaningPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [useAi] = useAtom(useAiAtom);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false); // Automatically close the tooltip after 2 seconds (2000ms)
      }, 3000);

      // Cleanup the timer when the component unmounts or when `open` changes
      return () => clearTimeout(timer);
    }
  }, [open]); // Trigger when `open` changes

  if (typeof wordOrWordObject === "string") {
    return (
      <Tippy
        content={
          <div className="flex cursor-default">
            {isOpen && <WordMeaningDisplay word={wordOrWordObject} />}
            <span onClick={close} className="cursor-pointer">
              <X />
            </span>
          </div>
        }
        trigger="click"
        maxWidth="8rem"
        
      >
        
        <span onClick={open} className="inline cursor-pointer active:bg-green-300">
          {wordOrWordObject}
        </span>
      </Tippy>
      // <Tooltip
      //   theme="light"
      //   open={isOpen}
      //   interactive
      //   title={wordOrWordObject}
      //   html={
      //     <div className="flex  cursor-default">
      //       <WordMeaningDisplay word={wordOrWordObject} />
      //       <span onClick={close} className="cursor-pointer">
      //         <X />
      //       </span>
      //     </div>
      //   }
      //   size="big"
      //   position="top"
      //   trigger="click"
      // >
      //   <p onClick={open} className="cursor-pointer inline">
      //     {wordOrWordObject}
      //   </p>
      // </Tooltip>
    );
  }

  if (typeof wordOrWordObject === "object") {
    return (
      <Tooltip
        theme="light"
        open={isOpen}
        interactive
        title={wordOrWordObject.word}
        // html={
        //   <div className="flex cursor-default">
        //     <WordMeaningDisplay word={word} />
        //     <span onClick={close} className="cursor-pointer">
        //       <X />
        //     </span>
        //   </div>
        // }
        size="big"
        position="top"
        trigger="click"
      >
        <span onClick={open} className="inline cursor-pointer bg-orange-300">
          {/* <SimplifiedWordDisplay
            previousWord={wordOrWordObject.previousWord}
            word={wordOrWordObject.word}
            followingWord={wordOrWordObject.followingWord}
          /> */}
          {useAi ? (
            <SimplifiedWordDisplay
              previousWord={wordOrWordObject.previousWord}
              word={wordOrWordObject.word}
              followingWord={wordOrWordObject.followingWord}
            />
          ) : (
            <SimplifiedWithDictionaryWordDisplay
              previousWord={wordOrWordObject.previousWord}
              word={wordOrWordObject.word}
              followingWord={wordOrWordObject.followingWord}
            />
          )}
        </span>
      </Tooltip>
    );
  }
};
export default MeaningPopup;
