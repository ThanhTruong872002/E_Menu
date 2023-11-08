import React, { useState, useEffect } from "react";
import Admin from "../../pages/admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = [
  "Table Name",
  "Number of People",
  "QR Code",
  "Location",
  "Actions",
];

interface TableData {
  table_name: string;
  seat_capacity: string;
  qr_code: string;
  location: string;
}

export default function Table() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<TableData[]>([]);

  useEffect(() => {
    // Fetch table data from your API endpoint
    fetch("http://localhost:4000/api/tables")
      .then((response) => response.json())
      .then((data: TableData[]) => setTableData(data))
      .catch((error) => console.error("Error fetching table data", error));
  }, []);

  const handleEdit = (table: TableData) => {
    // Handle the Edit action for the selected table
    console.log("Edit table:", table);
  };

  const handleDelete = (table: TableData) => {
    // Handle the Delete action for the selected table
    console.log("Delete table:", table);
  };

  return (
    <Admin>
      <div>
        <h2 className="text-[3rem] font-[600] mt-6 ">Manage The Dining Table</h2>
        <div className="flex justify-between mt-20 mb-10">
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
        <Card className="w-full h-[66vh] overflow-y-scroll">
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
              {tableData.map((table, index) => (
                <tr
                  className={index % 2 === 0 ? "even:bg-blue-gray-50/50 leading-10" : ""}
                  key={index}
                >
                  <td className="p-4">
                    <Typography color="blue-gray" className="font-normal ml-20">
                      {table.table_name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography color="blue-gray" className="font-normal ml-20">
                      {table.seat_capacity}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography color="blue-gray" className="font-normal">
                      {table.qr_code}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography color="blue-gray" className="font-normal">
                      {table.location}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-6">
                      <button
                        className="text-[#1890ff] cursor-pointer"
                        onClick={() => handleEdit(table)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-[#ff4f4f] cursor-pointer"
                        onClick={() => handleDelete(table)}
                      >
                        Delete
                      </button>
                    </div>
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
