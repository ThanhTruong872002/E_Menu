import React, { useState } from "react";
import MenuStaff from "../MenuStaff";
import PaypalStaff from "../PaypalStaff";
import ReportStaff from "../ReportStaff";
import Notify from "../Notify";
import TableStaff from "../TableStaff";

import {
  DeskRoomIcon,
  FoodIcon,
  NotifiIcon,
  ReportIcon,
} from "../common/icons/icons";

export default function DeskRoom() {
  const [selected, setSelected] = useState("table");
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [selectedOrderDate, setSelectedOrderDate] = useState<string | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleTableClick = (
    tableId: number,
    orderId?: string | null,
    status?: number | null,
    orderDate?: string | null
  ) => {
    setSelectedTableId(tableId);
    setSelectedOrderId(orderId || null);
    setSelectedStatus(status || null);
    setSelectedOrderDate(orderDate || null);
  };

  const handleClick = (item: string) => {
    setSelected(item);
  };
  

  return (
    <div className="flex p-10 bg-blue-900 h-screen gap-6">
      <div
        className={`${
          selected === "report" || selected === "notify" ? "w-full" : "w-3/5"
        }`}
      >
        <div className="flex gap-2">
          <div
            className={`flex w-[170px] h-[50px] pl-2 items-center gap-2 ${
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
            className={`flex w-[170px] h-[50px] pl-2 items-center gap-2 ${
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
            onClick={() => handleClick("notify")}
            className={`flex w-[170px] h-[50px] pl-2 items-center gap-2 ${
              selected === "notify"
                ? "bg-white text-blue-900 rounded-tr-xl rounded-tl-xl"
                : "text-white"
            }`}
          >
            <NotifiIcon />
            <h2 className="text-2xl font-[600] cursor-pointer transition-all">
              Notification
            </h2>
          </div>
          <div
            onClick={() => handleClick("report")}
            className={`flex w-[170px] h-[50px] pl-2 items-center gap-2 ${
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
        <div className="bg-white h-[92%] rounded-3xl p-10 mt-4">
          {selected === "table" && (
            <TableStaff onTableClick={handleTableClick} />
          )}

          {selected === "menu" && <MenuStaff />}

          {selected === "report" && <ReportStaff />}

          {selected === "notify" && <Notify />}
        </div>
      </div>
      {selected !== "report" && selected !== "notify" && (
        <div className="w-2/5 bg-white h-[92%] mt-24 rounded-3xl p-10">
          {selected !== "report" && (
            <PaypalStaff
              selected={selected}
              tableId={selectedTableId}
              orderId={selectedOrderId}
              status={selectedStatus}
              orderDate={selectedOrderDate}
            />
          )}
        </div>
      )}
    </div>
  );
}
