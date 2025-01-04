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
        content: `Given a word "${word}" in the context "${previousWord} ${word} ${followingWord}", provide its simpler equivalent according to these rules:

1. Return a single word if it can fully capture the meaning
2. Use a brief phrase (2-4 words) only if necessary for clarity
3. Return the original word if:
   - It is already simple
   - It is a proper noun (name, place, brand, etc.)
   - It is a technical term that shouldn't be simplified
4. Context handling:
   - Ignore "undefined" if it appears in the context
   - Consider the surrounding words to ensure the replacement maintains grammatical correctness
5. Format:
   - Return only the simplified word/phrase without explanation
   - Preserve the original capitalization pattern
   - Keep any necessary punctuation attached to the word

Example inputs and outputs:
"abundant" → "plenty"
"circumvent" → "go around"
"Microsoft" → "Microsoft"
"simple" → "simple"`,
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



