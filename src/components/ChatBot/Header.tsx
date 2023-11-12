import React from "react";
import { CloseIcon, MoreIcon } from "../common/icons/icons";

export default function Header() {
  return (
    <div className="px-4 pb-4">
      <div className="mt-2 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <img
            src="./images/chatbot.jpg"
            alt=""
            className="w-[40px] h-[40px] object-cover"
          />
          <div className="text-[1.1rem] mr-10">
            <h2 className="text-left">Chatbot</h2>
            <p className="font-[400] text-[#667085] mt-1">Support Agent</p>
          </div>
        </div>
        <div className="flex gap-8">
          <img
            src="./images/Frame.svg"
            alt=""
            className="w-[20px] h-[20px] object-cover"
          />
          <img
            src="./images/Frame1.svg"
            alt=""
            className="w-[20px] h-[20px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
