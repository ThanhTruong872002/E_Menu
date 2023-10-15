import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HomeIcon,
  MenuIcon,
  StaffIcon,
  TableIcon,
} from "../common/icons/icons";

interface ISideBar {
  changeWidthTable: boolean;
  setChangeWidthTable: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideBar({
  changeWidthTable,
  setChangeWidthTable,
}: ISideBar) {
  const navigate = useNavigate();

  return (
    <>
      {!changeWidthTable && (
        <div className='w-[15%] flex flex-col justify-between bg-[url("https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/movie-details-bg.jpg")] py-10'>
          <div className="flex flex-col gap-16 mt-20">
            <div
              onClick={() => navigate("/admin")}
              className="flex ml-4 gap-10 items-center cursor-pointer h-[54px] justify-center hover:bg-[#1890ff]"
            >
              <HomeIcon />
              <h2 className="text-[2rem] text-white">Home</h2>
            </div>
            <div
              onClick={() => navigate("/admin/staff")}
              className="flex gap-10 items-center cursor-pointer h-[54px] justify-center hover:bg-[#1890ff]"
            >
              <StaffIcon />
              <h2 className="text-[2rem] text-white">Staff</h2>
            </div>
            <div
              onClick={() => navigate("/admin/menu")}
              className="flex gap-10 items-center cursor-pointer h-[54px] justify-center hover:bg-[#1890ff]"
            >
              <MenuIcon />
              <h2 className="text-[2rem] text-white">Menu</h2>
            </div>
            <div
              onClick={() => navigate("/admin/table")}
              className="flex gap-10 items-center cursor-pointer h-[54px] justify-center hover:bg-[#1890ff]"
            >
              <TableIcon />
              <h2 className="text-[2rem] text-white">Table</h2>
            </div>
          </div>
          <div
            className="flex justify-center cursor-pointer p-4"
            onClick={() => setChangeWidthTable(!changeWidthTable)}
          >
            <ArrowLeftIcon />
          </div>
        </div>
      )}
      {changeWidthTable && (
        <div className='w-[5%]  flex flex-col justify-between bg-[url("https://www.bhdstar.vn/wp-content/themes/bhd/assets/images/movie-details-bg.jpg")] py-10'>
          <div>
            <div
              onClick={() => navigate("/admin")}
              className="flex gap-10 items-center cursor-pointer h-[54px] justify-center hover:bg-[#1890ff]"
            >
              <HomeIcon />
            </div>
            <div
              onClick={() => navigate("/admin/staff")}
              className="flex mt-10 gap-10 items-center cursor-pointer h-[54px] justify-center hover:bg-[#1890ff]"
            >
              <StaffIcon />
            </div>
            <div
              onClick={() => navigate("/admin/menu")}
              className="flex gap-10 items-center mt-10 cursor-pointer h-[54px] justify-center hover:bg-[#1890ff] mr-3"
            >
              <MenuIcon />
            </div>
            <div
              onClick={() => navigate("/admin/table")}
              className="flex gap-10 items-center mt-10 cursor-pointer h-[54px] justify-center hover:bg-[#1890ff] mr-3"
            >
              <TableIcon />
            </div>
          </div>

          <div
            className="flex justify-center cursor-pointer p-4"
            onClick={() => setChangeWidthTable(!changeWidthTable)}
          >
            <ArrowRightIcon />
          </div>
        </div>
      )}
    </>
  );
}
