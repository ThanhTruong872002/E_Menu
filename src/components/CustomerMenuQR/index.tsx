import Button from "../common/butoons/button";
import { CartIcon, SearchIcon, StartIcon } from "../common/icons/icons";
import { useState } from "react";

export default function CustomerMenuQR() {
  const [selected, setSelected] = useState("breakfast");

  return (
    <div>
      <header className="w-full bg-[#FFFAE3] h-[70px] p-[18px] flex justify-between">
        <img src="/images/Logo.svg" alt="" className="w-[140px]" />
        <div>
          <CartIcon />
        </div>
      </header>
      <div className="w-[95%] mx-auto">
        <div className="flex items-center gap-4 border-[1px] border-solid border-[#B3B3B3]  w-full h-[46px] px-4 mt-[42px] rounded-lg">
          <SearchIcon />
          <input
            type="text"
            name="search"
            placeholder="Search food"
            className="border-none focus:outline-none"
          />
        </div>
        <div className="mt-[28px] flex gap-4 ">
          <div onClick={() => setSelected("breakfast")}>
            <Button
              buttonQr={selected === "breakfast" ? "selectMenuQR" : "buttonQr"}
            >
              Breakfast
            </Button>
          </div>
          <div onClick={() => setSelected("mainDish")}>
            <Button
              buttonQr={selected === "mainDish" ? "selectMenuQR" : "buttonQr"}
            >
              Main Dishes
            </Button>
          </div>
          <div onClick={() => setSelected("Drink")}>
            <Button
              buttonQr={selected === "Drink" ? "selectMenuQR" : "buttonQr"}
            >
              Drink
            </Button>
          </div>
          <div onClick={() => setSelected("Desserts")}>
            <Button
              buttonQr={selected === "Desserts" ? "selectMenuQR" : "buttonQr"}
            >
              Desserts
            </Button>
          </div>
        </div>
        <div className="mt-[30px] grid grid-cols-2 gap-6 overflow-y-scroll overflow-x-hidden">
          <div className="w-[160px] shadow-2xl rounded-lg">
            <img
              src="/images/img1.png"
              alt=""
              className="h-[160px] object-cover rounded-2xl"
            />
            <div className="p-3">
              <h2 className="text-[1.6rem] font-medium mt-3 ">
                Meatball Sweatie
              </h2>
              <div className="flex gap-3 items-center mt-2">
                <StartIcon />
                <p className="text-[1.4rem] text-[#B3B3B3] font-medium">4.9</p>
              </div>
              <p className="mt-3 text-[1.6rem] font-semibold ml-[2px]">$4</p>
            </div>
          </div>
          <div className="w-[160px] shadow-2xl rounded-lg">
            <img
              src="/images/img1.png"
              alt=""
              className="h-[160px] object-cover rounded-2xl"
            />
            <div className="p-3">
              <h2 className="text-[1.6rem] font-medium mt-3 ">
                Meatball Sweatie
              </h2>
              <div className="flex gap-3 items-center mt-2">
                <StartIcon />
                <p className="text-[1.4rem] text-[#B3B3B3] font-medium">4.9</p>
              </div>
              <p className="mt-3 text-[1.6rem] font-semibold ml-[2px]">$4</p>
            </div>
          </div>
          <div className="w-[160px] shadow-2xl rounded-lg">
            <img
              src="/images/img1.png"
              alt=""
              className="h-[160px] object-cover rounded-2xl"
            />
            <div className="p-3">
              <h2 className="text-[1.6rem] font-medium mt-3 ">
                Meatball Sweatie
              </h2>
              <div className="flex gap-3 items-center mt-2">
                <StartIcon />
                <p className="text-[1.4rem] text-[#B3B3B3] font-medium">4.9</p>
              </div>
              <p className="mt-3 text-[1.6rem] font-semibold ml-[2px]">$4</p>
            </div>
          </div>
          <div className="w-[160px] shadow-2xl rounded-lg">
            <img
              src="/images/img1.png"
              alt=""
              className="h-[160px] object-cover rounded-2xl"
            />
            <div className="p-3">
              <h2 className="text-[1.6rem] font-medium mt-3 ">
                Meatball Sweatie
              </h2>
              <div className="flex gap-3 items-center mt-2">
                <StartIcon />
                <p className="text-[1.4rem] text-[#B3B3B3] font-medium">4.9</p>
              </div>
              <p className="mt-3 text-[1.6rem] font-semibold ml-[2px]">$4</p>
            </div>
          </div>
          <div className="w-[160px] shadow-2xl rounded-lg">
            <img
              src="/images/img1.png"
              alt=""
              className="h-[160px] object-cover rounded-2xl"
            />
            <div className="p-3">
              <h2 className="text-[1.6rem] font-medium mt-3 ">
                Meatball Sweatie
              </h2>
              <div className="flex gap-3 items-center mt-2">
                <StartIcon />
                <p className="text-[1.4rem] text-[#B3B3B3] font-medium">4.9</p>
              </div>
              <p className="mt-3 text-[1.6rem] font-semibold ml-[2px]">$4</p>
            </div>
          </div>
          <div className="w-[160px] shadow-2xl rounded-lg">
            <img
              src="/images/img1.png"
              alt=""
              className="h-[160px] object-cover rounded-2xl"
            />
            <div className="p-3">
              <h2 className="text-[1.6rem] font-medium mt-3 ">
                Meatball Sweatie
              </h2>
              <div className="flex gap-3 items-center mt-2">
                <StartIcon />
                <p className="text-[1.4rem] text-[#B3B3B3] font-medium">4.9</p>
              </div>
              <p className="mt-3 text-[1.6rem] font-semibold ml-[2px]">$4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
