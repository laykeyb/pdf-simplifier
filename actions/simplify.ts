"use server";
import { prompt, systemPrompt } from "@/lib/promptsOld";
import Bottleneck from "bottleneck";
import Groq from "groq-sdk";
export interface callGroqApiProps {
  previousWord: string;
  word: string;
  followingWord: string;
}

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY!,
});

const callGroqAPI = async ({
  previousWord,
  word,
  followingWord,
}: callGroqApiProps) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Given "${word}" from the sentence fragment "${previousWord} ${word} ${followingWord}", return ONLY its simplest equivalent that:

1. ANY 10-year-old native English speaker would instantly understand
2. Fits perfectly in the original sentence
3. Has exactly the same meaning
4. Uses the fewest possible words
5. Keeps grammar, tense, and number matching

Rules:
- If it's already simple, return the exact same word
- Never simplify names of people, places, or organizations 
- For verbs, keep exact same tense
- For nouns, keep exact same plural/singular form
- Maximum 3 words in the simplified version
- Match the original capitalization
- No explanations, just the simple version
- No quotation marks in the output
- No alternative options

Examples:
Input: "commenced" from "they commenced working"
Output: began

Input: "utilized" from "she utilized tools"
Output: used

Input: "eloquent" from "an eloquent speech"
Output: clear`
      },
      
    ],
    model: "llama3-8b-8192",
  });
};
// Create a limiter with specific rate limit rules
// const limiter = new Bottleneck({
//   // maxConcurrent: 1, // Only one request at a time
//   //   minTime: 1000, // Minimum 3 seconds between requests
// });

export const getSimplifiedObjectWithTextFromTextWithGroqAPI = async ({
  previousWord,
  word,
  followingWord,
}: callGroqApiProps) => {
  // const limitedGroqAPI = limiter.wrap(callGroqAPI);
  const simplified = await callGroqAPI({previousWord, word, followingWord});
  return simplified.choices[0]?.message?.content || "" ;
};



