import Chatbot from "react-chatbot-kit";
import MessageParser from "../ChatBot/MessageParser";
import config from "../ChatBot/config";
import ActionProvider from "../ChatBot/ActionProvider";
import "react-chatbot-kit/build/main.css";

export default function CustomerHero() {
  return (
    <div className="relative">
      <img
        src="./images/bg.svg"
        alt=""
        className="w-full mx-auto text-center "
      />
      <img
        src="./images/title.svg"
        alt=""
        className="absolute top-[20%] left-[23%] lg:left-[28%] lg:top-[15%]"
        style={{ maxWidth: "55%" }}
      />
      <div className="flex justify-center mx-auto text-center mt-10">
        <Chatbot
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          config={config}
        />
      </div>
    </div>
  );
}
