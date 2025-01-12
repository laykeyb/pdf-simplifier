"use client";
import WordsToButton from "./words-to-button";

const HistoryComponentsFromText = ({
  simplifiedWordsArray,
}): React.ReactNode => {
  return (
    <div className="inline max-h-96  overflow-y-scroll">
      {simplifiedWordsArray.map((wordOrWordObject, index) => (
        <WordsToButton wordOrWordObject={wordOrWordObject} key={index} />
      ))}
    </div>
  );
};

export default HistoryComponentsFromText;
