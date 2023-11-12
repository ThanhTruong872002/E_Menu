import React, { useState, useEffect } from "react";


const FlashCard = ({ question, answer, incrementIndex } :any) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => setShowAnswer(false), [question]);

  return (
    <>
      <div
        className="p-[15px] rounded-md bg-[#f1e6e6] text-[1.2rem]"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {!showAnswer && question}
        {showAnswer && answer}
      </div>
      {showAnswer && (
        <button
          onClick={incrementIndex}
          className="bg-transparent p-[8px] rounded-lg border-blue-400 m-[5px] w-[150px] text-[1.2rem]"
        >
          Next question
        </button>
      )}
    </>
  );
};

export default FlashCard;
