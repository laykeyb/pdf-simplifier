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
        content: `simplify "${word}" in context "${previousWord} ${word} ${followingWord}"`
      },
      {
        role: "system",
        content: `You are a word simplification engine. When I give you a word and its context, your ONLY response should be a simpler version of that word. 

Input format: simplify "complexWord" in context "before complexWord after"

Rules:
1. ALWAYS return a simpler alternative - never return the original word unless it's a proper noun or already the simplest possible form (like "cat" or "run")

2. The simpler version must:
   - Be immediately understandable to a 10-year-old
   - Keep the exact same meaning
   - Work grammatically in the original context
   - Match the original's tense and number
   - Keep the same part of speech
   - Be 1-3 words maximum

3. Output format:
   - Just the simple word/phrase alone
   - No explanations
   - No quotes
   - Match original capitalization

Example inputs/outputs:
"commenced" in context "they commenced working" → began
"utilize" in context "we utilize tools" → use
"expeditious" in context "an expeditious response" → quick
"methodology" in context "the methodology works" → method
"optimal" in context "the optimal solution" → best`,
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



