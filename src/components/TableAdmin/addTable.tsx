import React, { useState, useEffect } from "react";
import Admin from "../../pages/admin";
import { useForm } from "react-hook-form";
import { Input, Select, Space, message } from "antd";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode.react";

interface ILocation {
  location_id: number;
  location_name: string;
}

interface IAddTableForm {
  table_name: string;
  seat_capacity: number;
  location: number;
}

export default function AddTable() {
  const [selectedValue, setSelectedValue] = useState<number | undefined>();
  const [tableId, setTableId] = useState<string | null>(null);
  const [locations, setLocations] = useState<ILocation[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddTableForm>();

  useEffect(() => {
    // Fetch location data from your API endpoint
    axios
      .get("http://localhost:4000/api/locations")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const generateQRCode = () => {
    // Generate a unique identifier for the table
    const newTableId = uuidv4();

    // Set the QR code text using the tableId
    setTableId(newTableId);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!tableId) {
        generateQRCode();
        if (!tableId) {
          return;
        }
      }

      if (!selectedValue) {
        // Trường "Location" không được bỏ trống
        message.error("Please select a location.");
        return;
      }

      // Send a request to create the table
      const response = await axios.post("http://localhost:4000/api/tables", {
        table_name: data.table_name,
        seat_capacity: data.seat_capacity,
        location: selectedValue,
        status: 1,
        qr_code: `http://localhost:3000/menu/${tableId || ""}`, // Sửa URL đích
      });

      if (response.status === 200) {
        console.log(`Table added with ID: ${response.data.table_id}`);
        // Display a success message
        message.success("Table added successfully.");
      } else {
        message.error("Failed to add the table.");
      }
    } catch (error) {
      console.error("Error adding the table:", error);
      message.error("Failed to add the table.");
    }
  });

  return (
    <Admin>
      <div>
        <h2 className="font-[600] text-[3rem] p-8 mb-14">Add Table</h2>
        <div>
          <form className="ml-10" onSubmit={onSubmit}>
            <div className="flex items-center mt-20">
              <h2 className="w-[170px]">Table Name</h2>
              <label>
                <input
                  className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Table Name"
                  {...register("table_name")}
                />
              </label>
            </div>
            <div className="flex items-center mt-14">
              <h2 className="w-[170px]">Seat Capacity</h2>
              <label>
                <input
                  className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="number"
                  placeholder="Seat Capacity"
                  {...register("seat_capacity")}
                />
              </label>
            </div>
            <div className="flex items-center mt-14">
              <h2 className="w-[170px]">Location</h2>
              <label>
                <Select
                  style={{ width: 200 }}
                  placeholder="Select Location"
                  value={selectedValue}
                  onChange={(value) => {
                    setSelectedValue(value);
                  }}
                >
                  {locations.map((location) => (
                    <Select.Option
                      key={location.location_id}
                      value={location.location_id}
                    >
                      {location.location_name}
                    </Select.Option>
                  ))}
                </Select>
              </label>
            </div>
            <div className="flex items-center mt-14">
              <h2 className="w-[170px]">Operation:</h2>
              <label>
                <button
                  type="submit"
                  className="border-[1px] border-solid bg-[#1890ff] text-white w-[200px] h-[50px] ml-8 rounded-md"
                >
                  Add Table
                </button>
              </label>
            </div>
          </form>
        </div>
        {tableId && (
          <div className="flex items-center mt-14">
            <h2 className="w-[170px]">QR Code</h2>
            <label className="mt-4">
              <Space direction="vertical" align="center">
                <QRCode value={tableId || "-"} />
              </Space>
            </label>
          </div>
        )}
      </div>
    </Admin>
  );
}
