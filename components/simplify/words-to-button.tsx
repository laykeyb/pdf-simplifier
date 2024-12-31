import { callGroqApiProps } from "@/actions/simplify";
import MeaningPopup from "@/components/simplify/meaning-popup";

import "react-tippy/dist/tippy.css";
interface WordsToButtonProps {
  wordOrWordObject: string | callGroqApiProps;
}

const WordsToButton = ({ wordOrWordObject }: WordsToButtonProps) => {
  if (typeof wordOrWordObject === "string") {
    if (!wordOrWordObject?.match(/\b[a-zA-Z]+(?:'[a-zA-Z]+)?\b/)) {
      return (
        <span className="mr-1 cursor-default text-base">
          {wordOrWordObject}
        </span>
      );
    }
  }

  return <MeaningPopup wordOrWordObject={wordOrWordObject} />;
};
export default WordsToButton;
