import React, { useState } from "react";
import MenuStaff from "../MenuStaff";
import PaypalStaff from "../PaypalStaff";
import ReportStaff from "../ReportStaff";
import { DeskRoomIcon, FoodIcon, ReportIcon } from "../common/icons/icons";
import TableStaff from "../TableStaff";

export default function DeskRoom() {
  const [selected, setSelected] = useState("table");
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  const handleTableClick = (tableId: number) => {
    setSelectedTableId(tableId);
  };

  const handleClick = (item: string) => {
    setSelected(item);
  };

  return (
    <div className="flex p-10 bg-blue-900 h-screen gap-6">
      <div className={`${selected === "report" ? "w-full" : "w-3/5"}`}>
        <div className="flex gap-2">
          <div
            className={`flex w-1/4 h-16 pl-2 items-center gap-2 ${
              selected === "table"
                ? "bg-blue-100 text-blue-900 rounded-tr-3xl rounded-tl-3xl"
                : "text-white"
            }`}
          >
            <DeskRoomIcon />
            <h2
              onClick={() => handleClick("table")}
              className="text-2xl font-semibold cursor-pointer transition-all"
            >
              Table
            </h2>
          </div>
          <div
            onClick={() => handleClick("menu")}
            className={`flex w-1/4 h-16 pl-2 items-center gap-2 ${
              selected === "menu"
                ? "bg-blue-100 text-blue-900 rounded-tr-3xl rounded-tl-3xl"
                : "text-white"
            } `}
          >
            <FoodIcon />
            <h2 className="text-2xl font-semibold cursor-pointer transition-all">
              Menu
            </h2>
          </div>
          <div
            onClick={() => handleClick("report")}
            className={`flex w-1/4 h-16 pl-2 items-center gap-2 ${
              selected === "report"
                ? "bg-blue-100 text-blue-900 rounded-tr-3xl rounded-tl-3xl"
                : "text-white"
            }`}
          >
            <ReportIcon />
            <h2 className="text-2xl font-semibold cursor-pointer transition-all">
              Report
            </h2>
          </div>
        </div>
        <div className="bg-white h-5/6 rounded-b-3xl rounded-tr-3xl p-10 mt-4">
          {selected === "table" && <TableStaff onTableClick={handleTableClick} />}

          {selected === "menu" && <MenuStaff />}

          {selected === "report" && <ReportStaff />}
        </div>
      </div>
      {selected !== "report" && (
        <div className="w-2/5 bg-white h-5/6 mt-20 rounded-3xl p-10">
          {/* Pass selectedTableId down to PaypalStaff */}
          {selected !== "report" && <PaypalStaff selected={selected} tableId={selectedTableId} />}
        </div>
      )}
    </div>
  );
}
