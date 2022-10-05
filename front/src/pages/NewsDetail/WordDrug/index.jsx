import React from "react";

export default function WordDrug({ word, selectedWord, onWordDrugClick }) {
  return (
    <div
      className={`word-drug ${
        selectedWord && selectedWord.eng === word ? "on" : ""
      }`}
      onClick={() => onWordDrugClick(word)}
    >
      {word}
    </div>
  );
}
