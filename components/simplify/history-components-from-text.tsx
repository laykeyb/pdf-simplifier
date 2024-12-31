"use client";
import WordsToButton from "./words-to-button";

const HistoryComponentsFromText = ({
  simplifiedWordsArray,
}): React.ReactNode => {
  return (
    <div className="flex max-h-96 flex-row flex-wrap items-center justify-center overflow-y-scroll">
      {simplifiedWordsArray.map((wordOrWordObject, index) => (
        <WordsToButton wordOrWordObject={wordOrWordObject} key={index} />
      ))}
    </div>
  );
};

export default HistoryComponentsFromText;
