import React from "react";

export default function CustomerBrowse() {
  return (
    <div className="text-center w-full md:w-[90%] mx-auto mb-[120px]">
      <h2 className="my-20 text-5xl font-sans lg:text-7xl font-semibold">
        Browse Our Menu
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-10">
        <div className="w-[300px] h-[396px] mx-auto rounded-[3rem] shadow-2xl border border-solid border-[#ccc] p-8 lg:w-[100%] ">
          <img src="./images/break-icon.svg" alt="" className="mx-auto mt-10" />
          <h2 className="text-3xl font-semibold my-6 ">Breakfast</h2>
          <p className="text-[1.6rem] leading-10 font-normal text-[#414536] lg:text-2xl">
            In the new era of technology we look in the future with certainty
            and pride for our life.
          </p>
          <h4 className="text-[1.6rem] font-semibold text-[#AD343E] mt-16 cursor-pointer hover:underline lg:text-3xl">
            Explore Menu
          </h4>
        </div>
        <div className="w-[300px] h-[396px] mx-auto rounded-[3rem] shadow-2xl border border-solid border-[#ccc] p-8 lg:w-[100%]">
          <img src="./images/dish-icon.svg" alt="" className="mx-auto mt-10" />
          <h2 className="text-3xl font-semibold my-6 lg:text-3xl">
            Main Dishes
          </h2>
          <p className="text-[1.6rem] leading-10 font-normal text-[#414536] lg:text-2xl">
            In the new era of technology we look in the future with certainty
            and pride for our life.
          </p>
          <h4 className="text-[1.6rem] font-semibold text-[#AD343E] mt-16 cursor-pointer hover:underline lg:text-3xl">
            Explore Menu
          </h4>
        </div>
        <div className="w-[300px] h-[396px] mx-auto rounded-[3rem] shadow-2xl border border-solid border-[#ccc] p-8 lg:w-[100%]">
          <img src="./images/drink-icon.svg" alt="" className="mx-auto mt-10" />
          <h2 className="text-3xl font-semibold my-6 ">Drinks</h2>
          <p className="text-[1.6rem] leading-10 font-normal text-[#414536] lg:text-2xl">
            In the new era of technology we look in the future with certainty
            and pride for our life.
          </p>
          <h4 className="text-[1.6rem] font-semibold text-[#AD343E] mt-16 cursor-pointer hover:underline lg:text-3xl">
            Explore Menu
          </h4>
        </div>
        <div className="w-[300px] h-[396px] mx-auto rounded-[3rem] shadow-2xl border border-solid border-[#ccc] p-8 lg:w-[100%]">
          <img
            src="./images/desserts-icon.svg"
            alt=""
            className="mx-auto mt-10"
          />
          <h2 className="text-3xl font-semibold my-6 ">Desserts</h2>
          <p className="text-[1.6rem] leading-10 font-normal text-[#414536] lg:text-2xl">
            In the new era of technology we look in the future with certainty
            and pride for our life.
          </p>
          <h4 className="text-[1.6rem] font-semibold text-[#AD343E] mt-16 cursor-pointer hover:underline lg:text-3xl">
            Explore Menu
          </h4>
        </div>
      </div>
    </div>
  );
}
