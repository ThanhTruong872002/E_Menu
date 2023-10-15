import React, { useState } from "react";
import Admin from "../../pages/admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Table Name", "Number of People", "IsActive", "Operation"];

export interface Table {
  table_name: string;
  number_of_people: string;
  isActive: string;
}

export default function Table() {
  const navigate = useNavigate();

  const listable = [
    {
      table_name: "1",
      number_of_people: "10",
      isActive: "Active",
    },
    {
      table_name: "1",
      number_of_people: "10",
      isActive: "Active",
    },
    {
      table_name: "1",
      number_of_people: "10",
      isActive: "Active",
    },
    {
      table_name: "1",
      number_of_people: "10",
      isActive: "Active",
    },
    {
      table_name: "1",
      number_of_people: "10",
      isActive: "Active",
    },
    {
      table_name: "1",
      number_of_people: "10",
      isActive: "Active",
    },
    {
      table_name: "1",
      number_of_people: "10",
      isActive: "Active",
    },
    {
      table_name: "1",
      number_of_people: "10",
      isActive: "Active",
    },
    {
      table_name: "1",
      number_of_people: "10",
      isActive: "Active",
    },
    {
      table_name: "1",
      number_of_people: "10",
      isActive: "Active",
    },
    {
      table_name: "1",
      number_of_people: "10",
      isActive: "Active",
    },
    {
      table_name: "1",
      number_of_people: "10",
      isActive: "Active",
    },
    {
      table_name: "1",
      number_of_people: "10",
      isActive: "Active",
    },
    {
      table_name: "1",
      number_of_people: "10",
      isActive: "Active",
    },
  ];
  return (
    <Admin>
      <div>
        <h2 className="text-[3rem] font-[600] mt-6 ">
          Manage The Dining Table
        </h2>
        <div className="flex justify-between mt-20 mb-10">
          {" "}
          <button
            onClick={() => navigate("/admin/addtable")}
            className="w-[170px] h-[40px] cursor-pointer font-[500] border-[1px] border-solid border-[#ccc] p-3"
          >
            Add Table
          </button>
          <div className="flex items-center">
            <input
              className="w-[325px] h-[48px] border-[1px] border-solid border-[#ccc] p-3 border-r-0"
              type="text"
              placeholder="Search for dining table"
            />
            <div className="flex justify-center items-center text-white w-[50px] h-[50px] bg-[#1890FF]">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        </div>
        <Card className=" w-full h-[66vh] overflow-y-scroll">
          <table className="w-full min-w-max table-auto text-left text-[1.8rem] ">
            <thead className="sticky top-0 ">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-200  py-8 px-4 bg-gray-200"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-[1.8rem] leading-none "
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {listable.map((tables) => (
                <tr className="even:bg-blue-gray-50/50 leading-10 ">
                  <td className="p-4">
                    <Typography color="blue-gray" className="font-normal ml-20">
                      {tables.table_name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography color="blue-gray" className="font-normal ml-20">
                      {tables.number_of_people}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography color="blue-gray" className="font-normal">
                      {tables.isActive}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography color="blue-gray" className="font-medium">
                      <div className="flex gap-6 ">
                        <span className="text-[#1890ff] cursor-pointer">
                          Edit
                        </span>
                        <span className="text-[#ff4f4f] cursor-pointer">
                          Remove
                        </span>
                      </div>
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </Admin>
  );
}
