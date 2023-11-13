import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }: any) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage("Hello. Nice to meet you.", {
      widget: "options",
    });
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleJavascriptQuiz = () => {
    const message = createChatBotMessage(
      "Fantastic. Here is your quiz. Good luck!",
      {
        widget: "javascriptQuiz",
      }
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  const handleDog = () => {
    const botMessage = createChatBotMessage(
      "Here's a nice dog picture for you!",
      {
        widget: "dogPicture",
      }
    );

    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleDog,
            handleJavascriptQuiz,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
