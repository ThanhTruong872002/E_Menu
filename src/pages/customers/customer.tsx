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
        href="https://landbot.online/v3/H-1784001-WBAR2Y2WDSUO3XO2/index.html"
      >
        <img
          src="./images/avatar-landbot-1.png"
          alt=""
          className="w-[50px] h-[50px]"
        />
      </a>
    </div>
  );
}
