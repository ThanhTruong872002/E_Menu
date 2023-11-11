import { createChatBotMessage } from "react-chatbot-kit";
import DogPicture from "./DogPicture";
import Avatar from "./Avatar";
import Header from "./Header";

const botName = "FoodEats";

const config = {
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}`, {
      /* options */
    }),
  ],
  widgets: [
    {
      widgetName: "dogPicture",
      widgetFunc: (props: any) => <DogPicture />,
      props: "",
      mapStateToProps: [],
    },
  ],
  botName: botName,

  customComponents: {
    botAvatar: (props: any) => <Avatar />,
    header: (props: any) => <Header />,
  },

  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#667085",
    },
  },
};

export default config;
