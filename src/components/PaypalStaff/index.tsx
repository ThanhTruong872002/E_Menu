import React, { useState, useEffect } from "react";
import axios from "axios";
import { NotifiIcon, StaffNameIcon } from "../common/icons/icons";


interface IPayPalType {
  selected: string;
  tableId: number | null;
  orderId?: string | null | undefined;
  status?: number | null | undefined;
}

interface OrderDetailItem {
  menu_item_name: string;
  quantity: number;
  price: number;
}

export default function PaypalStaff({ selected, tableId, orderId, status }: IPayPalType) {
  const [tableName, setTableName] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<OrderDetailItem[]>([]);
  const [staffFullname, setStaffFullname] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [guestCount, setGuestCount] = useState<number | null>(null);
  const [orderStatus, setOrderStatus] = useState<number | null>(status ?? null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (tableId !== null) {
          const response = await axios.get(`http://localhost:4000/api/tables/${tableId}`);
          const data = response.data;

          setTableName(data.table_name);
          setGuestCount(data.seat_capacity); // Assuming seat_capacity is the correct property
        }
      } catch (error) {
        console.error("Error fetching table_name:", error);
      }
    };

    fetchData();
  }, [tableId]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (orderId) {
          const response = await axios.get(`http://localhost:4000/api/orderdetails/${orderId}`);
          const data = response.data;
  
          const orderDetails = data.data;
  
          if (Array.isArray(orderDetails)) {
            // Fetch menu items once to create a map for quick access
            const menuItemsResponse = await axios.get("http://localhost:4000/api/menu");
            const menuItemsData = menuItemsResponse.data;
  
            const menuItemsMap = new Map(menuItemsData.map((item: { menu_id: number, menu_item_name: string }) => [item.menu_id, item.menu_item_name]));
  
            // Update order details with menu_item_name
            const updatedOrderDetails = orderDetails.map(item => {
              return {
                ...item,
                menu_item_name: menuItemsMap.get(item.menu_item_id) || 'Unknown Item',
              };
            });
  
            setMenuItems(updatedOrderDetails);
          } else {
            console.error("Fetched data is not an array:", orderDetails);
          }
        } else {
          setMenuItems([]);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
  
    fetchOrderDetails();
  }, [orderId]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setStaffFullname(user.fullname);
    }
  }, []);

  const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateTotalWithDiscount = () => {
    const totalBeforeDiscount = menuItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    const totalAfterDiscount = totalBeforeDiscount - (totalBeforeDiscount * discount) / 100;

    // Convert the result to a number before formatting
    const totalAfterDiscountNumber = Number(totalAfterDiscount.toFixed(2));

    return numberWithCommas(totalAfterDiscountNumber);
  };

  const setDiscountValue = (value: string) => {
    // Remove leading zeros and parse the value
    const parsedValue = parseFloat(value.replace(/^0+/, ''));
  
    // Ensure the parsed value is not less than 0 and not NaN
    const newDiscount = isNaN(parsedValue) ? 0 : Math.max(parsedValue, 0);
  
    setDiscount(newDiscount);
  };

  const handleConfirmationClick = async () => {
    try {
        // Gọi API để cập nhật trạng thái
        const response = await axios.put(`http://localhost:4000/api/updateorderstatus/${orderId}`, {
          status: 2, // Đặt trạng thái mới là 2 khi xác nhận
        });

        if (response.data.success) {
          setOrderStatus(2);
          // Cập nhật trạng thái trong ứng dụng của bạn
          // Bạn có thể sử dụng setStatus hoặc một hàm tương tự để cập nhật trạng thái mà không làm mới toàn bộ trang
          console.log("Xác nhận thành công!");

          // Hiển thị thông báo thành công (nếu cần)
          alert("Xác nhận thành công!");
        } else {
          console.error("Error updating order status:", response.data.message);
          // Hiển thị thông báo lỗi (nếu cần)
          alert("Lỗi khi cập nhật trạng thái đơn hàng");
        }
      
    } catch (error) {
      console.error("Error handling confirmation click:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{tableName ? `Tên bàn: ${tableName}` : "Chọn bàn"}</h2>
        <div className="flex gap-4 items-center text-xl">
          <StaffNameIcon />
          <span className="font-semibold">{staffFullname}</span>
        </div>
      </div>
      {orderId && (
        <div className="mb-4">
          <strong>Order ID:</strong> {orderId}
        </div>
      )}
      <div className="table-container" style={{ overflowX: 'auto' }}>
        <table className="w-full mb-6" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Tên món</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Số lượng</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Đơn giá</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
          {menuItems && menuItems.map((item, index) => (
          <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.menu_item_name}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.quantity}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{numberWithCommas(item.price)}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{numberWithCommas(item.quantity * item.price)}</td>
          </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center text-2xl">
        <div className="font-bold">
          Sức chứa: <span className="font-semibold ml-2">{guestCount}</span>
        </div>
        <div className="flex gap-2 font-bold items-center">
          <label className="mr-2">Giảm giá (%):</label>
          <input
          type="number"
          value={discount}
          onChange={(e) => setDiscountValue(e.target.value)}
          placeholder="Giảm giá (%)"
          className="border px-2 py-1 mr-2 w-20"
        />
        </div>
        <div className="flex gap-2 font-bold">
          <span>Tổng tiền:</span>
          <span className="text-red-500">
            {calculateTotalWithDiscount()} VND
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center text-2xl mt-6">
        {status === 1 || status === 2 ? (
          <>
            <button className="flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-full text-2xl">
              <img className="w-8 h-8" src="./images/Average Price.svg" alt="" />
              <span>Thanh Toán</span>
            </button>
            <button
              onClick={() => {
                if (status === 1) {
                  handleConfirmationClick();
                }
              }}
              disabled={status !== 1}
              className={`flex items-center gap-2 px-8 py-4 rounded-full ${
                status === 1 ? "bg-red-500" : "bg-green-500"
              } text-white text-2xl`}
            >
              <img className="w-8 h-8" src="./images/Food Bar.svg" alt="" />
              <span>
                {status === 1 ? "Xác Nhận" : status === 2 ? "Đã Xác Nhận" : ""}
              </span>
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
