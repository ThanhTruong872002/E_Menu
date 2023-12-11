import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Button from "../common/butoons/button";
import { useNavigate } from "react-router-dom";
export default function CustomerHeader() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-[#FFFAE3] relative">
      <div className="w-full lg:w-[90%] mx-auto flex justify-between items-center py-5 md:py-10 ">
        <div onClick={() => navigate("/")}>
          <img
            src="./images/Logo.svg"
            alt=""
            className="pl-10 w-[140px] h-[40px] lg:w-[170px] lg:h-full"
          />
        </div>
        <div className="mb-4 md:mb-0 hidden md:flex text-[2.2rem]">
          <ul className="flex gap-10 font-semibold font-playfair ">
            <li className="cursor-pointer" onClick={() => navigate("/")}>
              Home
            </li>
            <li
              className="cursor-pointer"
              onClick={() => navigate("/customer/about")}
            >
              About
            </li>
            <li
              className="cursor-pointer"
              onClick={() => navigate("/customer/menu")}
            >
              Menu
            </li>
            <li
              className="cursor-pointer"
              onClick={() => navigate("/customer/contact")}
            >
              Contact
            </li>
          </ul>
        </div>
        <div className="md:hidden px-10 relative">
          <FontAwesomeIcon
            icon={faBars}
            size="2x"
            className="cursor-pointer"
            onClick={handleMenuClick}
          />
          {isMenuOpen && (
            <div className="mt-2 px-10 absolute top-full -left-28  bg-white border w-[160px]  border-gray-300 rounded-xl shadow-lg z-50 transform opacity-100 transition-all duration-300 ease-in-out">
              <ul className="flex flex-col gap-8 p-4 font-semibold">
                <li className="cursor-pointer" onClick={() => navigate("/")}>
                  Home
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => navigate("/customer/about")}
                >
                  About
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/customer/menu");
                    handleMenuClick();
                  }}
                >
                  Menu
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => navigate("/customer/contact")}
                >
                  Contact
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => navigate("/customer/bookTable")}
                >
                  Book Table
                </li>
              </ul>
            </div>
          )}
        </div>
        <div
          className="hidden md:block"
          onClick={() => navigate("/customer/booktable")}
        >
          <Button bookTable="bookTable">Book A Table</Button>
        </div>
      </div>
    </div>
  );
}
