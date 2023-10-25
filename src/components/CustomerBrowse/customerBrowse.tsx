import React from "react";

export default function CustomerBrowse() {
  return (
    <div className="text-center w-full md:w-[90%] mx-auto mb-[120px]">
      <h2 className="text-3xl md:text-4xl lg:text-7xl font-medium my-10 md:my-20">
        Browse Our Menu
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-10">
        <div className="w-[100%] md:w-[306px] md:h-[375px] rounded-2xl border border-solid border-[#ccc] p-8">
          <img src="./images/break-icon.svg" alt="" className="mx-auto" />
          <h2 className="text-2xl font-semibold my-6 lg:text-3xl">Breakfast</h2>
          <p className="text-lg font-normal leading-7 lg:text-2xl">
            In the new era of technology we look in the future with certainty
            and pride for our life.
          </p>
          <h4 className="text-lg font-semibold text-[#AD343E] mt-10 cursor-pointer hover:underline lg:text-3xl">
            Explore Menu
          </h4>
        </div>
        <div className="w-[100%] md:w-[306px] md:h-[375px] rounded-2xl border border-solid border-[#ccc] p-8">
          <img src="./images/dish-icon.svg" alt="" className="mx-auto" />
          <h2 className="text-2xl font-semibold my-6 lg:text-3xl">
            Main Dishes
          </h2>
          <p className="text-lg font-normal leading-7 lg:text-2xl lg:text-2xl">
            In the new era of technology we look in the future with certainty
            and pride for our life.
          </p>
          <h4 className="text-lg font-semibold text-[#AD343E] mt-10 cursor-pointer hover:underline lg:text-3xl">
            Explore Menu
          </h4>
        </div>
        <div className="w-[100%] md:w-[306px] md:h-[375px] rounded-2xl border border-solid border-[#ccc] p-8">
          <img src="./images/drink-icon.svg" alt="" className="mx-auto" />
          <h2 className="text-2xl font-semibold my-6 lg:text-3xl">Drinks</h2>
          <p className="text-lg font-normal leading-7 lg:text-2xl">
            In the new era of technology we look in the future with certainty
            and pride for our life.
          </p>
          <h4 className="text-lg font-semibold text-[#AD343E] mt-10 cursor-pointer hover:underline lg:text-3xl">
            Explore Menu
          </h4>
        </div>
        <div className="w-[100%] md:w-[306px] md:h-[375px] rounded-2xl border border-solid border-[#ccc] p-8">
          <img src="./images/desserts-icon.svg" alt="" className="mx-auto" />
          <h2 className="text-2xl font-semibold my-6 lg:text-3xl">Desserts</h2>
          <p className="text-lg font-normal leading-7 lg:text-2xl">
            In the new era of technology we look in the future with certainty
            and pride for our life.
          </p>
          <h4 className="text-lg font-semibold text-[#AD343E] mt-10 cursor-pointer hover:underline lg:text-3xl">
            Explore Menu
          </h4>
        </div>
      </div>
    </div>
  );
}
