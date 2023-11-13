import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { PropsType } from "../@types/TableType";
import { MenuContext } from "../../App";

export default function TableStaff() {
  const { setLocation, filterListData } = useContext(MenuContext);

  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="flex gap-10 text-[2rem] font-[500]">
        <h2
          className={`${
            selected === 0 ? "text-[#182FFF] " : ""
          } font-[600] cursor-pointer`}
          onClick={() => {
            setLocation(0);
            setSelected(0);
          }}
        >
          All
        </h2>
        <h2
          className={`${selected === 1 ? "text-[#182FFF]" : ""} cursor-pointer`}
          onClick={() => {
            setLocation(1);
            setSelected(1);
          }}
        >
          1st Floor
        </h2>
        <h2
          className={`${selected === 2 ? "text-[#182FFF]" : ""} cursor-pointer`}
          onClick={() => {
            setLocation(2);
            setSelected(2);
          }}
        >
          2st Floor
        </h2>
        <h2
          className={`${selected === 3 ? "text-[#182FFF]" : ""} cursor-pointer`}
          onClick={() => {
            setLocation(3);
            setSelected(3);
          }}
        >
          3st Floor
        </h2>
      </div>
      <div className="w-full bg-black my-6 h-[1px]"></div>
      <div className="flex flex-col gap-4 text-[2rem] font-[600]">
        <h2>
          In use: <span className="text-[#182FFF] ml-2">6/32</span>
        </h2>
        <h2>
          Reserved: <span className="text-[#24FF00] ml-2">2/32</span>
        </h2>
      </div>
      <div className="pt-10  grid grid-cols-8 grid-rows-4 gap-20 cursor-pointer">
        {filterListData?.map((table, index) => (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 80 80"
              fill="none"
            >
              <path
                d="M3.07692 30.7955L0 29.0909V21.8182L40 0L80 21.8182V29.0909L76.9231 30.7955V61.1364C76.9231 62.5758 76.4984 63.6553 75.649 64.375C74.7997 65.0947 73.6859 65.4545 72.3077 65.4545C70.9295 65.4545 69.8157 65.0947 68.9663 64.375C68.117 63.6553 67.6923 62.5758 67.6923 61.1364V35.7955L44.6154 48.4091V75.6818C44.6154 77.1212 44.1907 78.2008 43.3413 78.9205C42.492 79.6402 41.3782 80 40 80C38.6218 80 37.508 79.6402 36.6587 78.9205C35.8093 78.2008 35.3846 77.1212 35.3846 75.6818V48.4091L12.3077 35.7955V61.1364C12.3077 62.5758 11.883 63.6553 11.0337 64.375C10.1843 65.0947 9.07051 65.4545 7.69231 65.4545C6.3141 65.4545 5.20032 65.0947 4.35096 64.375C3.5016 63.6553 3.07692 62.5758 3.07692 61.1364V30.7955Z"
                fill={` ${
                  table.status === 1
                    ? "#000"
                    : table.status === 2
                    ? "#24FF00"
                    : table.status === 3
                    ? "#182FFF"
                    : ""
                }`}
              />
            </svg>
            <h2 className="mt-2 text-[1.6rem] font-[500] w-[100px]">
              {table.table_name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
