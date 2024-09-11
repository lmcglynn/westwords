import wordBank from "./Components/Wordbank.txt";

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async () => {
  let wordSet;
  let theWord;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");
      theWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordSet = new Set(wordArr);
    });
  return { wordSet, theWord };
};