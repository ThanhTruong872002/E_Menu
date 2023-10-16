import React, { useState } from "react";
import MenuStaff from "../MenuStaff";
import PaypalStaff from "../PaypalStaff";
import ReportStaff from "../ReportStaff";
import { DeskRoomIcon, FoodIcon, ReportIcon } from "../common/icons/icons";
import TableStaff from "../TableStaff";

export default function DeskRoom() {
  const [selected, setSelected] = useState("table");

  const handleClick = (item: string) => {
    setSelected(item);
  };

  return (
    <div className="flex p-10 bg-[#182FFF] h-[100vh] gap-6">
      <div className="w-[63%] ">
        <div className="flex gap-2">
          <div
            className={`flex w-[150px] h-[50px] pl-2 items-center gap-2 ${
              selected === "table"
                ? "bg-white text-[#182FFF] rounded-tr-xl rounded-tl-xl"
                : "text-white"
            }`}
          >
            <DeskRoomIcon />
            <h2
              onClick={() => handleClick("table")}
              className="text-[1.8rem] font-[600] cursor-pointer transition-all"
            >
              Phòng bàn
            </h2>
          </div>
          <div
            onClick={() => handleClick("menu")}
            className={`flex w-[150px] h-[50px] pl-2 items-center gap-2 ${
              selected === "menu"
                ? "bg-white text-[#182FFF] rounded-tr-xl rounded-tl-xl"
                : "text-white"
            } `}
          >
            <FoodIcon />
            <h2 className="text-[1.8rem]  font-[600] cursor-pointer transition-all">
              Thực đơn
            </h2>
          </div>
          <div
            onClick={() => handleClick("report")}
            className={`flex w-[150px] h-[50px] pl-2 items-center gap-2 ${
              selected === "report"
                ? "bg-white text-[#182FFF] rounded-tr-xl rounded-tl-xl"
                : "text-white"
            }`}
          >
            <ReportIcon />
            <h2 className="text-[1.8rem] font-[600] cursor-pointer transition-all">
              Báo cáo
            </h2>
          </div>
        </div>
        <div className="bg-white h-[88vh] rounded-b-3xl rounded-tr-3xl p-10">
          {selected === "table" && <TableStaff />}

          {selected === "menu" && <MenuStaff />}

          {selected === "report" && <ReportStaff />}
        </div>
      </div>
      <div className="w-[37%] bg-white h-[88vh] mt-20 rounded-3xl p-10">
        <PaypalStaff />
      </div>
    </div>
  );
}
