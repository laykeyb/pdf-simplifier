import rs from "text-readability";
import { useEffect, useState } from "react";

interface WordMeaningDisplay {
  word: string;
}

const WordMeaningDisplay = ({ word }: WordMeaningDisplay) => {
  const dictionaryApi = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  // Set state for meaning
  const [meaning, setMeaning] = useState<string>("");

  // Function to fetch the meaning of the word
  const getWordMeaning = async (word: string) => {
    try {
      const res = await fetch(dictionaryApi + word);
      const data = await res.json();
      console.log(data);
      return (
        data[0].meanings[0].definitions[0].definition || "Meaning not found"
      ); // Add safety in case data is missing
    } catch (err) {
      console.log(err);
      return "Error fetching meaning"; // Handle error case
    }
  };

  // Use useEffect to fetch the word meaning
  useEffect(() => {
    const fetchMeaning = async () => {
      if (rs.fleschReadingEase(word) > 60) {
        setMeaning("word is too simple")
        return
      }
      const meaning = await getWordMeaning(word);
      setMeaning(meaning);
      // handleChunkComplete();
    };

    fetchMeaning(); // Call the function
  }, [word]); // Only run again if the word changes

  return <span>{meaning}</span>;
};

export default WordMeaningDisplay;
