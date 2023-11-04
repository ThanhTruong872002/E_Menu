import React, { useState, useContext } from "react";
import { IncreaseIcon, ReduceIcon, StartIcon } from "../common/icons/icons";
import { MenuData } from "../@types/MenuType";
import Button from "../common/butoons/button";
import { MenuContext } from "../../App";

interface PropsType {
  selectedMenuItem: MenuData | null;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PopupMenu({ selectedMenuItem, setShowPopup }: PropsType) {
  const { setShowDetailMenu, quantity, setQuantity } = useContext(MenuContext);

  const hanldeAddToCart = (menuItem: MenuData | null) => {
    if (menuItem) {
      setShowDetailMenu((prev) => [...prev, menuItem]);
      setShowPopup(false);
    }
  };
  const handleIncreaseIcon = () => {
    setQuantity(quantity + 1);
  };

  const hanldeReduceIcon = () => {
    if (quantity <= 0) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div>
      <div className="fixed top-[260px] w-[98%] bg-white mx-auto pb-10 transition ease-in-out delay-150">
        <img
          src={`http://localhost:4000/uploads${selectedMenuItem?.Image}`}
          alt=""
          className="w-full rounded-2xl h-[300px] object-cover"
        />
        <div>
          <div className="p-4 flex justify-between">
            <div>
              <h2 className="font-[600] text-[2rem] mb-2">
                {selectedMenuItem?.menu_item_name}
              </h2>
              <div className="flex gap-3 mt-2">
                <div className="flex gap-1">
                  <StartIcon />
                  <StartIcon />
                  <StartIcon />
                  <StartIcon />
                  <StartIcon />
                </div>
                <p>4.8</p>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div onClick={hanldeReduceIcon} className="cursor-pointer">
                <ReduceIcon />
              </div>
              <span className="w-[12px]"> {quantity}</span>
              <div onClick={handleIncreaseIcon} className="cursor-pointer">
                <IncreaseIcon />
              </div>
            </div>
          </div>
          <p className="font-semibold text-[2.2rem] mt-2 ml-4 ">$6</p>
          <div onClick={() => hanldeAddToCart(selectedMenuItem)}>
            <Button cartButton={"cartButton"}>Add To Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
