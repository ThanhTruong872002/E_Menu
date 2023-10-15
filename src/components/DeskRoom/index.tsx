import React from "react";
import MenuStaff from "../MenuStaff";
import PaypalStaff from "../PaypalStaff";
import ReportStaff from "../ReportStaff";
import { DeskRoomIcon, FoodIcon, ReportIcon } from "../common/icons/icons";
import TableStaff from "../TableStaff";

export default function DeskRoom() {
  return (
    <div className="flex p-10 bg-[#182FFF] h-[100vh] gap-6">
      <div className="w-[63%] ">
        <div className="flex gap-2">
          <div className="flex w-[150px] h-[50px] pl-2 items-center gap-2 bg-white rounded-tr-xl rounded-tl-xl">
            <DeskRoomIcon />
            <h2 className="text-[1.8rem] text-[#182FFF] font-[600] cursor-pointer transition-all">
              Phòng bàn
            </h2>
          </div>
          <div className="flex w-[150px] h-[50px] pl-2 items-center gap-2 ">
            <FoodIcon />
            <h2 className="text-[1.8rem] text-white font-[600] cursor-pointer transition-all">
              Thực đơn
            </h2>
          </div>
          <div className="flex w-[150px] h-[50px] pl-2 items-center gap-2 ">
            <ReportIcon />
            <h2 className="text-[1.8rem] text-white font-[600] cursor-pointer transition-all">
              Báo cáo
            </h2>
          </div>
        </div>
        <div className="bg-white h-[88vh] rounded-b-3xl rounded-tr-3xl p-10">
          <div className="flex gap-6 text-[2rem] font-[500]">
            <h2 className="text-[#182FFF] font-[600]">Tất cả</h2>
            <h2>Lầu 2</h2>
            <h2>Lầu 3</h2>
            <h2>Phòng Vip</h2>
          </div>
          <div className="w-full bg-black my-6 h-[1px]"></div>
          <div className="flex flex-col gap-4 text-[2rem] font-[600]">
            <h2>
              Sử dụng: <span className="text-[#182FFF] ml-2">6/32</span>
            </h2>
            <h2>
              Đặt trước: <span className="text-[#24FF00] ml-2">2/32</span>
            </h2>
          </div>
          {/* <TableStaff /> */}
          < MenuStaff/>
          {/* <ReportStaff /> */}
        </div>
      </div>
      <div className="w-[37%] bg-white h-[88vh] mt-20 rounded-3xl p-10">
        <PaypalStaff />
      </div>
    </div>
  );
}
