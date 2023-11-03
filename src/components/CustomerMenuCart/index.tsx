import React from "react";
import { ArrowBack, IncreaseIcon, ReduceIcon } from "../common/icons/icons";
import Button from "../common/butoons/button";
import { useNavigate } from "react-router-dom";
import { MenuContext } from "../../App";
import { useContext } from "react";

export default function CustomerMenuCart() {
  const navigate = useNavigate();

  const { quantity, showDetailsMenu } = useContext(MenuContext);

  return (
    <div>
      <header className="py-[16px] px-[20px] flex items-center gap-[16px] h-[70px] shadow-lg">
        <div onClick={() => navigate("/customer/menuQR")} className="cursor-pointer">
          <ArrowBack />
        </div>
        <h2 className="text-[2rem] font-semibold">Detail Cart</h2>
      </header>
      <div className="py-[30px] px-[20px]">
        <div className="flex flex-col gap-10 h-[320px] overflow-y-auto overflow-x-hidden">
          {showDetailsMenu.map((item, index) => (
            <div key={index} className="flex items-center">
              <div>
                <img
                  src={`http://localhost:4000/uploads${item.Image}`}
                  alt=""
                  className="w-[80px] h-[80px] object-cover rounded-xl mr-4"
                />
              </div>
              <div className="text-[1.6rem] font-medium">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="w-[100px]">{item.menu_item_name}</h4>
                    <p className="mt-6">$6</p>
                  </div>
                  <div className="flex gap-6 items-center ml-36">
                    <span className="text-[1.8rem]">x{quantity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h4 className="text-[1.6rem] text-[#008C8C] font-medium mt-6 text-center">
            Delete all items
          </h4>
        </div>

        <div className="mt-10">
          <h2 className="text-[2rem] font-semibold">Total</h2>
          <div className="flex justify-between">
            <h4 className="text-[1.6rem[ font-[400] my-[16px]">Sub Total</h4>
            <p className="font-medium text-[500]">%25</p>
          </div>
          <div className="flex justify-between">
            <h4 className="text-[1.6rem[ font-[400] mb-[16px]">VAT 10%</h4>
            <p className="font-medium text-[500]">$2.5</p>
          </div>
          <div className="h-[1px] w-full bg-[#ccc]"></div>
          <h2 className="flex justify-end text-[2rem] font-semibold mt-[16px]">
            $27.5
          </h2>
        </div>

        <div className="mt-[20px] ">
          <div className="flex gap-6 text-[2rem] font-[400]">
            <h2>Total:</h2>
            <p className="font-semibold">$27.5</p>
          </div>
          <div className="mt-[16px]">
            <Button cartButton={"cartButton"}>Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
