import { DatePicker, Select } from "antd";
import type { DatePickerProps } from "antd";
import React, { useState } from "react";
import type { SizeType } from "antd/es/config-provider/SizeContext";

export default function DatePickerStaff() {
     const [size, setSize] = useState<SizeType>("large");

     const onChange: DatePickerProps["onChange"] = (date, dateString) => {
       console.log(date, dateString);
     };

     const handleChange = (value: string) => {
       console.log(`selected ${value}`);
     };
  return (
    <div className="w-[20%]">
      <div className="w-[300px] h-[400px] border-[1px] border-solid border-[#ccc]">
        <div>
          <h2 className=" flex justify-center items-center text-white w-[300px] h-[50px] bg-[#4B5DFF]">
            Thời gian giao dịch
          </h2>
          <div className="flex justify-center mt-4">
            {" "}
            <DatePicker
              onChange={onChange}
              size={size}
              className="text-black "
            />
          </div>
        </div>
        <div>
          <h2 className=" mt-10 flex justify-center items-center text-white w-[300px] h-[50px] bg-[#4B5DFF]">
            Nhân viên phụ trách
          </h2>
          <div className="flex justify-center mt-4">
            <Select
              defaultValue="Tất cả"
              style={{ width: 200, height: 45 }}
              onChange={handleChange}
              options={[
                { value: "Tất cả", label: "Tất cả" },
                { value: "Nguyễn Văn B", label: "Nguyễn Văn B" },
                { value: "Nguyễn Văn C", label: "Nguyễn Văn C" },
                {
                  value: "Nguyễn Văn D",
                  label: "Nguyễn Văn D",
                  disabled: true,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
