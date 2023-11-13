import React from "react";

export default function Avatar() {
  return (
    <div>
      <img
        className="w-[35px] h-[35px] object-cover rounded-[50%] border-[1px] border-solid border-[#ccc] p-1"
        src="./images/chatbot.jpg"
        alt="chat bot"
      />
    </div>
  );
}
