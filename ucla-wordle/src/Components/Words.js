import wordbank from './Wordbank.txt';

export const boardDefault = [
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""],
    ["", "", "", "", ""],
];

export const generateWord = async () => {
    let word;
    let wordset;
        
    await fetch(wordbank)
        .then((response) => response.text())
        .then((result) => {
            const wordArr = result.split("\n");
            word = wordArr[Math.floor(Math.random() * wordbank.length)];
            wordset = new Set(wordArr);
        });
        return { wordset, word };
};