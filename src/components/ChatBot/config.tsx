import { createChatBotMessage } from "react-chatbot-kit";
import DogPicture from "./DogPicture";
import Avatar from "./Avatar";
import Header from "./Header";
import Options from "../Options/Options";
import Quiz from "../Quizz/Quiz";

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
      widgetFunc: (props: any) => <DogPicture {...props} />,
      props: "",
      mapStateToProps: [],
    },
    {
      widgetName: "options",
      widgetFunc: (props: any) => <Options {...props} />,
      props: "",
      mapStateToProps: [],
    },
    {
      widgetName: "javascriptQuiz",
      widgetFunc: (props: any) => <Quiz {...props} />,
      props: {
        questions: [
          {
            question: "What is closure?",
            answer:
              "Closure is a way for a function to retain access to it's enclosing function scope after the execution of that function is finished.",
            id: 1,
          },
          {
            question: "Explain prototypal inheritance",
            answer:
              "Prototypal inheritance is a link between an object and an object store that holds shared properties. If a property is not found on the host object, javascript will check the prototype object.",
            id: 2,
          },
        ],
      },
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
