import { useState } from "react";
import Button from "../common/butoons/button";

export default function CustomerMenu() {
  const [selectedMenu, setSelectedMenu] = useState("All");

  return (
    <div className="bg-[#F9F9F7] pb-[200px]">
      <h2 className="font-playfair text-[8rem] text-center pt-[100px] ">
        Our Menu
      </h2>
      <p className="text-[1.8rem] font-[400] font-sans w-[545px] text-center mx-auto mt-4 leading-10">
        We consider all the drivers of change gives you the components you need
        to change to create a truly happens.
      </p>
      <div className="flex gap-8 items-center justify-center mt-[50px] font-sans text-[1.8rem]">
        <div onClick={() => setSelectedMenu("All")}>
          <Button
            customerMenu={selectedMenu === "All" ? "selected" : "customerMenu"}
          >
            All
          </Button>
        </div>
        <div onClick={() => setSelectedMenu("Breakfast")}>
          <Button
            customerMenu={
              selectedMenu === "Breakfast" ? "selected" : "customerMenu"
            }
          >
            Breakfast
          </Button>
        </div>
        <div onClick={() => setSelectedMenu("MainDishes")}>
          <Button
            customerMenu={
              selectedMenu === "MainDishes" ? "selected" : "customerMenu"
            }
          >
            Main Dishes
          </Button>
        </div>
        <div onClick={() => setSelectedMenu("Drinks")}>
          <Button
            customerMenu={
              selectedMenu === "Drinks" ? "selected" : "customerMenu"
            }
          >
            Drinks
          </Button>
        </div>
        <div onClick={() => setSelectedMenu("Desserts")}>
          <Button
            customerMenu={
              selectedMenu === "Desserts" ? "selected" : "customerMenu"
            }
          >
            Desserts
          </Button>
        </div>
      </div>
    </div>
  );
}
