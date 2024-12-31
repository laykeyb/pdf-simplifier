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
        content: `give the simpler synonym of "${word}" that will replace it in this text "${previousWord} ${word} ${followingWord}" .The answer should be a word or at most a short phrase.If one word will capture the meaning well use a phrase. Ignore the word undefined if you see it.If the word is already simple return the word no need to simplify.DON'T simplify proper nouns, return it as it is`,
      },
      {
        role: "system",
        content: "return ONLY the answer and nothing else",
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



