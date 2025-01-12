"use server";

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
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Simplify the word "${word}" in the following context: "${previousWord} ${word} ${followingWord}". If a simpler word is possible, use it; otherwise, keep the word as is. If the word is a proper noun, leave it unchanged. Only return the simplified word or phrase.`,
      },
      {
        role: "system",
        content: "Return ONLY the simplified word or phrase, nothing else.",
      },
    ],
    model: "llama3-8b-8192",
  });

  return response;
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
  const simplified = await callGroqAPI({ previousWord, word, followingWord });
  return simplified.choices[0]?.message?.content || "";
};
