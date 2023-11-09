import React, { useState, useEffect } from "react";
import Admin from "../../pages/admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEdit,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";
import QRCode from "qrcode.react";
import { toPng } from "html-to-image";
import unidecode from "unidecode";

const TABLE_HEAD = [
  "Table Name",
  "Number of People",
  "QR Code",
  "Location",
  "Actions",
];

interface TableData {
  table_id: number;
  table_name: string;
  seat_capacity: number;
  qr_code: string;
  location: string;
}

export default function Table() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

    // Save the table_id of the selected table
    setSelectedTableId(table.table_id);
  };

  const handleDelete = (table: TableData) => {
    // Handle the Delete action for the selected table
    console.log("Delete table:", table);
  };

  const lowercaseTableData = tableData.map((table) => ({
    ...table,
    table_name: table.table_name.toLowerCase(),
  }));

  const normalizedSearchQuery = unidecode(searchQuery).toLowerCase();

  const filteredTableData = lowercaseTableData.filter((table) => {
    return unidecode(table.table_name)
      .toLowerCase()
      .includes(normalizedSearchQuery);
  });

  return (
    <Admin>
      <div>
        <h2 className="text-[3rem] font-[600] mt-6 ">
          Manage The Dining Table
        </h2>
        <div className="flex justify-between mt-20 mb-10">
          <h2 className="text-[3rem] font-[600] mt-6">
            Manage The Dining Table
          </h2>
        </div>
        <br></br>
        <div className="flex justify-between items-center">
          <div>
            <button
              onClick={() => navigate("/admin/addtable")}
              className="w-[170px] h-[48px] cursor-pointer font-[500] border-[1px] border-solid border-[#ccc] p-3"
            >
              <FontAwesomeIcon icon={faPlus} /> Thêm Bàn
            </button>
          </div>
          <div className="flex items-center">
            <input
              className="w-[325px] h-[48px] border-[1px] border-solid border-[#ccc] p-3 border-r-0"
              type="text"
              placeholder="Tìm kiếm theo tên bàn"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex justify-center items-center text-white w-[50px] h-[50px] bg-[#1890FF]">
              <FontAwesomeIcon icon={faSearch} />
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
                    className={
                      index % 2 === 0
                        ? "even:bg-blue-gray-50/50 leading-10"
                        : ""
                    }
                    key={index}
                  >
                    <td className="p-4">
                      <Typography
                        color="blue-gray"
                        className="font-normal ml-20"
                      >
                        {table.table_name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        color="blue-gray"
                        className="font-normal ml-20"
                      >
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
        <Card className="w-full h-[66vh] overflow-y-scroll">
          <table className="w-full min-w-max table-auto text-left text-[1.8rem]">
            <thead className="sticky top-0">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-200 py-8 px-4 bg-gray-200"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-[1.8rem] leading-none"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {filteredTableData.map((table, index) => (
                <tr
                  className={
                    index % 2 === 0 ? "even:bg-blue-gray-50/50 leading-10" : ""
                  }
                  key={table.table_id}
                  style={{ borderBottom: "2px solid #000" }}
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
                    <div className="mt-4" id="qrCodeContainer">
                      <QRCode
                        value={`http://192.168.1.7:3000/customer/menuqr/${table.table_id}`}
                      />
                    </div>
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
