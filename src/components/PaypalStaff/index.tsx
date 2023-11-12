import React from "react";
import { NotifiIcon, StaffNameIcon, UserIcon } from "../common/icons/icons";

interface IPayPalType {
  selected: string
}

export default function PaypalStaff({ selected } : IPayPalType) {
  return (
    <div>
      <div className="flex gap-[4.8rem]  mb-20  text-[1.8rem] font-[600]">
        <h2 className="text-[#182FFF] font-[700]">Bàn 2 / Lầu 1</h2>
        <h2>Số lượng</h2>
        <h2 className="mr-5">Đơn giá</h2>
        <h2>Thành tiền</h2>
      </div>
      <div className="h-[320px] overflow-y-scroll">
        <div>
          <div className="flex gap-28 mt-10 text-[1.8rem] font-500">
            <h2 className="font-[600] w-[150px]">The Burger Cafe</h2>
            <h2>1</h2>
            <h2>125.000</h2>
            <h2>125.000VND</h2>
          </div>
          <div className="w-full h-[1px] bg-black mt-10"></div>
        </div>
        <div>
          <div className="flex gap-28 mt-10 text-[1.8rem] font-500">
            <h2 className="font-[600] w-[150px]">The Wings Cafe</h2>
            <h2>1</h2>
            <h2>125.000</h2>
            <h2>125.000VND</h2>
          </div>
          <div className="w-full h-[1px] bg-black mt-10"></div>
        </div>
        <div>
          <div className="flex gap-28 mt-10 text-[1.8rem] font-500">
            <h2 className="font-[600] w-[150px]">The Coffee Express</h2>
            <h2>1</h2>
            <h2>125.000</h2>
            <h2>125.000VND</h2>
          </div>
          <div className="w-full h-[1px] bg-black mt-10"></div>
        </div>
        <div>
          <div className="flex gap-28 mt-10 text-[1.8rem] font-500">
            <h2 className="font-[600] w-[150px]">Caprese Sandwich Hub</h2>
            <h2>1</h2>
            <h2>125.000</h2>
            <h2>125.000VND</h2>
          </div>
          <div className="w-full h-[1px] bg-black mt-10"></div>
        </div>
      </div>

      <div className="flex justify-between mt-20 text-[2rem]">
        <h2 className="font-[600]">
          Số lượng khách: <span className="font-[500] ml-10">10</span>
        </h2>
        <div className="flex gap-10 font-[600]">
          <h2>Tổng tiền:</h2>
          <h2 className="text-red-500">650.000 VND</h2>
        </div>
      </div>
      <div className="flex gap-4 items-center text-[2rem] mt-20">
        <StaffNameIcon />
        <h2>Tên Nhân Viên</h2>
      </div>
      <div className="flex text-[2rem] font-bold gap-6 mt-8">
        {selected === "table" ? (
          <div className="flex gap-4 items-center w-[50%] bg-[#FFB700] rounded-3xl justify-center">
            <img src="./images/Average Price.svg" alt="" />
            <h2>Thanh Toán</h2>
          </div>
        ) : (
          <div className="flex gap-4 items-center w-[50%] bg-[#24FF00] rounded-3xl justify-center">
            <img src="./images/Food Bar.svg" alt="" />
            <h2>Đặt Món</h2>
          </div>
        )}

        <div className="flex gap-4 items-center w-[50%] bg-[#FF0101] rounded-3xl justify-center">
          <NotifiIcon />
          <h2>Thông Báo</h2>
        </div>
      </div>
    </div>
  );
}
