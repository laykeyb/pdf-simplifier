

export const prompt = "Can you reword this text for me?";

// const systemPrompt = "Reword the following text to make it simpler and easier to understand. Do not summarize, alter the meaning, or add anything extra. Keep the word count as close as possible to the original. Only return the reworded text in markdown format, nothing else.";
export const systemPrompt = `
    Rewrite the following text to:

    - Use simpler, more accessible language
    - Maintain the original meaning exactly
    - Keep the word count as close to the original as possible
    - Do not summarize or add any new information
    - Format the text for clean PDF conversion:

      - Use clean, consistent markdown headings only for chapters and what absolutely needs heading
      - Ensure proper line spacing
      - Use clear paragraph breaks
      - Avoid complex formatting that might not translate well to PDF


    Return only the reworded text in markdown format
    Ensure readability and professional appearance for document conversion`;
