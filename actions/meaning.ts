"use server"

const dictionaryApi = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export const getWordMeaning = async (word: string) => {
    try {
      const res = await fetch(dictionaryApi + word);
      const data = await res.json();
      console.log(data);
  
      return data[0].word;
    } catch (err) {
      console.log(err);
    }
  };