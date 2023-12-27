import React from "react";
import CustomerHero from "../../components/CustomerHero/customerHero";
import CustomerBrowse from "../../components/CustomerBrowse/customerBrowse";

export default function Customers() {
  return (
    <div className="relative">
      <CustomerHero />
      <CustomerBrowse />
      <a
        className="fixed top-[50%] right-0 cursor-pointer flex items-center pr-10"
        href="https://landbot.online/v3/H-2077473-VW5TBSMASN4LJABU/index.html"
      >
        <img
          src="./images/avatar-landbot-1.png"
          alt=""
          className="w-[70px] h-[70px]"
        />
      </a>
    </div>
  );
}
