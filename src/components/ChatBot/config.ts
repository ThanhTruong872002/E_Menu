import { createChatBotMessage } from "react-chatbot-kit";
import DogPicture from "./DogPicture";

const botName = "ExcitementBot";

const config = {
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}`, {
      /* options */
    }),
  ],
  // widgets: [
  //   {
  //     widgetName: "dogPicture",
  //     widgetFunc: () => <DogPicture />,
  //   },
  // ],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
};

export default config;
