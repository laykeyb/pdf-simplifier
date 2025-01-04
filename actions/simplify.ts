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
        content: `simplify: ${word} | context: ${previousWord} ${word} ${followingWord}`
      },
      {
        role: "system",
        content: `You are an advanced text simplification engine. When given text in this format:
"simplify: word | context: surroundingWords (word) surroundingWords"

Follow these precise rules:
1. Return ONLY the simplest equivalent word or phrase that:
   - A 5th-grade student would understand
   - Preserves the exact meaning in the given context
   - Maintains grammatical correctness
   - Keeps the same part of speech as the original word

2. Word handling:
   - Keep proper nouns unchanged (names, places, brands)
   - Keep basic words unchanged (if already simple)
   - Keep domain-specific technical terms unchanged
   - Keep idioms as complete phrases

3. Output must be:
   - Maximum 4 words long
   - Same verb tense as original (if verb)
   - Same plurality as original (if noun)
   - Same capitalization pattern as original

4. Never include:
   - Explanations
   - Definitions
   - Multiple alternatives
   - Quotation marks

Example:
Input: "simplify: endeavor | context: they will endeavor to finish"
Output: try`,
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



