import React from "react";

export default function Options(props: any) {
  const options = [
    {
      text: "Javascript",
      handler: props.actionProvider.handleJavascriptQuiz,
      id: 1,
    },
    { text: "Python", handler: () => {}, id: 2 },
    { text: "Golang", handler: () => {}, id: 3 },
  ];
  const buttonsMarkup = options.map((option) => (
    <button
      key={option.id}
      onClick={option.handler}
      className="m-[5px] rounded-xl p-[6px] border-blue-500 bg-transparent text-center border-[2px] border-solid text-[1rem]"
    >
      {option.text}
    </button>
  ));
  return <div className="flex flex-wrap gap-4">{buttonsMarkup}</div>;
}
