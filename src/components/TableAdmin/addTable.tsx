import React, { useState } from "react";
import Admin from "../../pages/admin";
import { useForm } from "react-hook-form";
import { rules } from "../../utils/rules";
import { Input, QRCode, Select, Space } from "antd";

interface IAddStaffForm {
  table: string;
  qrCode: string;
  isActive: string;
  numberPeople: string;
}

export default function AddTable() {
  const [selectedValue, setSelectedValue] = useState("");
  const [text, setText] = React.useState("https://ant.design/");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddStaffForm>();

  const onSumbit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <Admin>
      <div>
        <h2 className="font-[600] text-[3rem] p-8 mb-14">Add Table</h2>
        <div>
          <form className="ml-10" onSubmit={onSumbit}>
            <div className="flex items-center mt-20">
              <h2 className="w-[170px]">Table Name</h2>
              <label>
                <input
                  className=" ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Table"
                  {...register("table")}
                />
              </label>
            </div>
            <div className="flex items-center mt-14">
              <h2 className="w-[170px]">QR Code</h2>
              <label className="mt-4">
                <Space direction="vertical" align="center">
                  <QRCode value={text || "-"} />
                  <Input
                    placeholder="-"
                    maxLength={60}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </Space>
              </label>
            </div>
            <div className="flex items-center mt-14">
              <h2 className="w-[170px]">Is Active</h2>
              <label className="mt-4 ml-10">
                <Select
                  defaultValue="Active"
                  style={{ width: 120 }}
                  options={[
                    { value: "Active", label: "Active" },
                    { value: "noActive", label: "No Active" },
                  ]}
                  onChange={(value) => setSelectedValue(value)}
                />
              </label>
            </div>
            <div className="flex items-center mt-14">
              <h2 className="w-[170px]">Number People</h2>
              <label className="mt-4">
                <input
                  className=" ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Number People"
                  {...register("numberPeople")}
                />
              </label>
            </div>

            <div className="flex items-center mt-14 ">
              <h2 className="w-[170px]">Operation:</h2>
              <label>
                <button className="border-[1px] border-solid bg-[#1890ff] text-white w-[200px] h-[50px] ml-8 rounded-md">
                  Add Table
                </button>
              </label>
            </div>
          </form>
        </div>
      </div>
    </Admin>
  );
}
