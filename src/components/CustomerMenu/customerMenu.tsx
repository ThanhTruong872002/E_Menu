import { useContext, useState } from "react";
import Button from "../common/butoons/button";
import PaginationMenuCustomer from "../PaginationMenuCustomer";
import { MenuContext } from "../../App";

export default function CustomerMenu() {
  const [selectedMenu, setSelectedMenu] = useState("All");

  const { filteredMenuData, setTypeFood } = useContext(MenuContext)
  return (
    <div className="bg-[#F9F9F7] pb-[100px]">
      <h2 className="font-sans font-medium text-[54px] font-semibold lg:text-8xl text-center pt-[100px] ">
        Our Menu
      </h2>

      <p className="text-[1.8rem] w-[90%] px-2 font-normal text-[#2C2F24] font-sans text-center mx-auto mt-4 leading-[3rem] lg:text-[1.8rem] lg:w-[545px]">
        We consider all the drivers of change gives you the components you need
        to change to create a truly happens.
      </p>
      <div className="flex col-span-4 gap-8 items-center justify-center mt-[50px] font-semibold text-[1.6rem]">
        <div
          onClick={() => {
            setSelectedMenu("all");
            setTypeFood("all");
          }}
        >
          <Button
            customerMenu={selectedMenu === "all" ? "selected" : "customerMenu"}
          >
            All
          </Button>
        </div>
        <div
          onClick={() => {
            setSelectedMenu("appetizer");
            setTypeFood("appetizer");
          }}
        >
          <Button
            customerMenu={
              selectedMenu === "appetizer" ? "selected" : "customerMenu"
            }
          >
            Appetizer
          </Button>
        </div>
        <div
          onClick={() => {
            setSelectedMenu("mainDish");
            setTypeFood("main course");
          }}
        >
          <Button
            customerMenu={
              selectedMenu === "mainDish" ? "selected" : "customerMenu"
            }
          >
            Main Dishes
          </Button>
        </div>
        <div
          onClick={() => {
            setSelectedMenu("Drink");
            setTypeFood("drink");
          }}
        >
          <Button
            customerMenu={
              selectedMenu === "Drink" ? "selected" : "customerMenu"
            }
          >
            Drinks
          </Button>
        </div>
        <div
          onClick={() => {
            setSelectedMenu("Desserts");
            setTypeFood("dessert");
          }}
        >
          <Button
            customerMenu={
              selectedMenu === "Desserts" ? "selected" : "customerMenu"
            }
          >
            Desserts
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 w-[90%] mx-auto gap-10">
        {filteredMenuData?.map((item, index) => (
          <div
            key={index}
            className="mt-16 w-[270px] flex flex-col gap-10 items-center justify-center border border-w-[1px] border-solid border-[#ccc] pb-4 rounded-2xl"
          >
            <img
              src={`http://localhost:4000/uploads${item.Image}`}
              alt="NoImage"
              className="max-w-[270px] max-h-[220px] object-cover rounded-2xl"
            />
            <h4 className="text-[#AD343E] text-[2.4rem] font-bold">
              {item.Price.toLocaleString()} VND
            </h4>
            <h2 className="font-sans text-[2rem] font-bold">
              {item.menu_item_name}
            </h2>
            <p className="w-[246px]  text-center font-sans text-[1.6rem] font-light">
              {item.Description}
            </p>
          </div>
        ))}
      </div>
      <PaginationMenuCustomer />
    </div>
  );
}
