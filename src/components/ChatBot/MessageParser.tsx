import React from "react";

const MessageParser = ({ children, actions }: any) => {
  const parse = (message: any) => {
    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("xin chào")
    ) {
      actions.handleHello();
    }
    if(message.includes("Javascript") || message.includes("js")) {
      actions.handleJavascriptQuiz();
    }
    if (
      message.includes("cún") ||
      message.includes("dog") ||
      message.includes("chó")
    ) {
      actions.handleDog();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
