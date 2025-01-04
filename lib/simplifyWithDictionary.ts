/* eslint-disable */
import nlp from "compromise";
import Bottleneck from "bottleneck";
import rs from "text-readability";

const memoize = require("memoizee");
import { callGroqApiProps } from "../actions/simplify";

// Fixing the getPOS function
const getPOS = ({ previousWord, word, followingWord }: callGroqApiProps) => {
  const doc = nlp(`${previousWord} ${word} ${followingWord}`);
  const wordPos = doc.match(word).out("tags");
  if (!wordPos[0]) {
    return "noun";
  }
  if (!wordPos[0][word]) {
    return "noun";
  }
  if (!wordPos[0][word][0]) {
    return "noun";
  }
  return wordPos[0][word][0].toLowerCase() || "noun"; // Just return the first POS tag
};

const limiter = new Bottleneck({
  reservoir: 30,
  reservoirRefreshAmount: 30,
  reservoirRefreshInterval: 60 * 1000,
  maxConcurrent: 1,
});

const findSimplestWord = (words) => {
  // Skip processing if only one or no words
  if (!words || words.length <= 1) return words?.[0];

  let simplestWord = words[0];
  let lowestScore = rs.fleschKincaidGrade(simplestWord + ".");

  for (const word of words) {
    const readabilityScore = rs.fleschKincaidGrade(word + ".");
    if (readabilityScore < lowestScore) {
      lowestScore = readabilityScore;
      simplestWord = word;
    }
  }

  return simplestWord;
};

const getSynonymFromObject = async ({
  previousWord,
  word,
  followingWord,
}: callGroqApiProps) => {
  const dictionaryApi = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  const POS = getPOS({ previousWord, word, followingWord });

  try {
    const data = await limiter.schedule(async () => {
      const res = await fetch(dictionaryApi + word);
      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }
      return res.json();
    });

    if (!Array.isArray(data) || !data[0]?.meanings) {
      console.log("Invalid API response structure");
      return word;
    }

    let meaningObject = data[0].meanings.find(
      (meaningObject) => meaningObject.partOfSpeech === POS,
    );

    if (!meaningObject && data[0].meanings.length > 0) {
      meaningObject = data[0].meanings[0];
    }

    if (meaningObject) {
      //UNCOMMENT for synonyms (its not reliable)
      // Collect all synonyms
      // const allSynonyms = meaningObject.definitions.reduce((acc, def) => {
      //   if (def.synonyms && def.synonyms.length > 0) {
      //     acc.push(...def.synonyms);
      //   }
      //   return acc;
      // }, []);

      // if (meaningObject.synonyms && meaningObject.synonyms.length > 0) {
      //   allSynonyms.push(...meaningObject.synonyms);
      // }

      // if (allSynonyms.length > 0) {
      //   // Find the simplest synonym
      //   const simplestSynonym = findSimplestWord(allSynonyms);
      //   const simplestWord = findSimplestWord([word,simplestSynonym])
      //   return simplestWord;
      // }

      //for getting the bext meaning not sure its necessary
      // const allMeanings = meaningObject.definitions.reduce((acc, def) => {
      //   if (def.definition && def.definition.length > 0) {
      //     acc.push(...def.definition);
      //   }
      //   return acc;
      // }, []);

      // if (meaningObject.definition && meaningObject.definition.length > 0) {
      //   allMeanings.push(...meaningObject.definition);
      // }

      // if (allMeanings.length > 0) {
      //   // Find the simplest synonym
      //   const simplestMeaning = findSimplestWord(allMeanings);
      //   const simplestWord = findSimplestWord([word, simplestMeaning]);
      //   return simplestWord;
      // }

      return meaningObject.definitions[0]?.definition;
    }

    return word;
  } catch (err) {
    console.log(`Error processing word "${word}":`, err);
    return word;
  }
};

export const getMemoizedSynonymFromObject = memoize(getSynonymFromObject, {
  promise: true,
  maxAge: 1000 * 60 * 60 * 24,
  normalizer: (args) => JSON.stringify(args[0]),
});
