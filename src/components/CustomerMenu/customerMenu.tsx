import { useState } from "react";
import Button from "../common/butoons/button";
import CustomerListItem from "../CustomerListItem";
import PaginationMenuCustomer from "../PaginationMenuCustomer";

export default function CustomerMenu() {
  const [selectedMenu, setSelectedMenu] = useState("All");

  return (
    <div className="bg-[#F9F9F7] pb-[100px]">
      <h2 className="font-sans font-medium text-[54px] lg:text-8xl text-center pt-[100px] ">
        Our Menu
      </h2>

      <p className="text-[1.8rem] w-[90%] px-2 font-normal text-[#2C2F24] font-sans text-center mx-auto mt-4 leading-[3rem] lg:text-[1.8rem] lg:w-[545px]">
        We consider all the drivers of change gives you the components you need
        to change to create a truly happens.
      </p>
      <div className="flex col-span-4 gap-8 items-center justify-center mt-[50px] font-sans text-[1.8rem]">
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
      <CustomerListItem />
      <PaginationMenuCustomer />
    </div>
  );
}
