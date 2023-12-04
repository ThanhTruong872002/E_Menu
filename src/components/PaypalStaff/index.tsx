import React, { useState, useEffect } from "react";
import axios from "axios";
import { NotifiIcon, StaffNameIcon } from "../common/icons/icons";
interface IPayPalType {
  selected: string;
  tableId: number | null;
}

interface MenuItem {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export default function PaypalStaff({ selected, tableId }: IPayPalType) {
  const [tableName, setTableName] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [staffFullname, setStaffFullname] = useState<string | null>(null); // Thêm state để lưu fullname

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (tableId !== null) {
          const response = await axios.get(`http://localhost:4000/api/tables/${tableId}`);
          const data = response.data;

          setTableName(data.table_name);
        }
      } catch (error) {
        console.error("Error fetching table_name:", error);
      }
    };
    fetchData();
  }, [tableId]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        if (tableId !== null) {
          const response = await axios.get(`http://localhost:4000/api/menu/${tableId}`);
          const data = response.data;

          setMenuItems(data);
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, [tableId]);

  useEffect(() => {
    // Lấy thông tin fullname từ localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setStaffFullname(user.fullname);
    }
  }, []); 

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{tableName ? `Tên bàn: ${tableName}` : "Chọn bàn"}</h2>
        <div className="flex gap-4 items-center text-xl">
          <StaffNameIcon />
        <span className="font-semibold">{staffFullname}</span>
        </div>
      </div>

      <table className="w-full mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2">Tên món</th>
            <th className="py-2">Số lượng</th>
            <th className="py-2">Đơn giá</th>
            <th className="py-2">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">{item.name}</td>
              <td className="py-2">{item.quantity}</td>
              <td className="py-2">{item.unitPrice}</td>
              <td className="py-2">{item.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center text-2xl">
        <div className="font-bold">
          Số lượng khách: <span className="font-semibold ml-2">10</span>
        </div>
        <div className="flex gap-2 font-bold">
          <span>Tổng tiền:</span>
          <span className="text-red-500">650.000 VND</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-2xl mt-6">
        <button className="flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-full text-2xl">
          <img className="w-8 h-8" src="./images/Average Price.svg" alt="" />
          <span>Thanh Toán</span>
        </button>

        <button
          className={`flex items-center gap-2 px-8 py-4 rounded-full ${
            selected === "table" ? "bg-red-500" : "bg-green-500"
          } text-white text-2xl`}
        >
          <img className="w-8 h-8" src="./images/Food Bar.svg" alt="" />
          <span>{selected === "table" ? "Xác Nhận" : "Thông Báo"}</span>
        </button>
      </div>
    </div>
  );
}
