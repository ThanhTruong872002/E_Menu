import React, { useState, useEffect} from "react";
import axios from "axios";
import { NotifiIcon, StaffNameIcon } from "../common/icons/icons";

// CSS styles
const styles = `
  .quantity-btn {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 8px 12px;
    font-size: 16px;
    cursor: pointer;
  }

  .quantity-text {
    margin: 0 10px;
    font-size: 18px;
    font-weight: bold;
  }
`;

interface IPayPalType {
  selected: string;
  tableId: number | null;
  orderId?: string | null | undefined;
  status?: number | null | undefined;
}

interface OrderDetailItem {
  menu_item_id: number;
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
  const [quantityChanges, setQuantityChanges] = useState<{ [key: number]: number }>({});

 
  useEffect(() => {
    if (status !== null && status !== undefined) {
      setOrderStatus(status);
    }
  }, [status]);

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
            const menuItemsResponse = await axios.get("http://localhost:4000/api/menu");
            const menuItemsData = menuItemsResponse.data;
  
            const menuItemsMap = new Map(menuItemsData.map((item: { menu_id: number, menu_item_name: string }) => [item.menu_id, item.menu_item_name]));
  
            const updatedOrderDetails = orderDetails.map(item => {
              const quantityFromDB = item.quantity;
              const orderDetailId = item.order_detail_id;
              return {
                ...item,
                quantity: quantityFromDB,
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
      (total, item) =>
        total + (item.quantity + (quantityChanges[item.menu_item_id] || 0)) * item.price,
      0
    );
  
    const totalAfterDiscount = totalBeforeDiscount - (totalBeforeDiscount * discount) / 100;
  
    const totalAfterDiscountNumber = Number(totalAfterDiscount.toFixed(2));
  
    return numberWithCommas(totalAfterDiscountNumber);
  };
  

  const setDiscountValue = (value: string) => {
    const parsedValue = parseFloat(value.replace(/^0+/, ''));

    const newDiscount = isNaN(parsedValue) ? 0 : Math.max(parsedValue, 0);

    setDiscount(newDiscount);
  };

  const incrementQuantity = async (menuItemId: number) => {
    setQuantityChanges((prevChanges) => ({
      ...prevChanges,
      [menuItemId]: (prevChanges[menuItemId] || 0) + 1,
    }));

    await updateOrderStatus();
  };
  

  const decrementQuantity = async (menuItemId: number, decrementValue: number = 1) => {
    setQuantityChanges((prevChanges) => {
      const currentQuantity = prevChanges[menuItemId] || 1;
      const newQuantity = Math.max(0, currentQuantity - decrementValue);
      return {
        ...prevChanges,
        [menuItemId]: newQuantity,
      };
    });
  
    const updatedItems = menuItems.map((item) => {
      if (item.menu_item_id === menuItemId) {
        const newQuantity = Math.max(1, item.quantity - decrementValue);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
  
    setMenuItems(updatedItems);
  
    // Call the API to update the order status
    await updateOrderStatus();
  };

  const updateOrderStatus = async () => {
    setOrderStatus(1);
    try {
      const response = await axios.put(`http://localhost:4000/api/updateorderstatus/${orderId}`, {
        status: 1, // Assuming you want to update the status to 1 when quantity changes
      });
  
      if (response.data.success) {
        console.log("Order status updated successfully!");
      } else {
        console.error("Error updating order status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  
  const handleConfirmationClick = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/updateorderstatus/${orderId}`, {
        status: 2,
      });
  
      if (response.data.success) {
        // Update the local orderStatus state
        setOrderStatus(2);
  
        console.log("Xác nhận thành công!");
        alert("Xác nhận thành công!");
      } else {
        console.error("Lỗi cập nhật trạng thái đơn hàng:", response.data.message);
        alert("Lỗi khi cập nhật trạng thái đơn hàng");
      }
    } catch (error) {
      console.error("Lỗi xử lý click xác nhận:", error);
    }
  };
  
  
  
  const removeMenuItem = async (menuItemId: number) => {
    const userConfirmed = window.confirm("Bạn có muốn xóa món ăn này không?");
  
    if (userConfirmed) {
      try {
        // Make an HTTP DELETE request to remove the order detail from the server
        await axios.delete(`http://localhost:4000/api/orderdetails/${orderId}/${menuItemId}`);
  
        // Update the local state to reflect the removal
        const updatedItems = menuItems.filter((item) => item.menu_item_id !== menuItemId);
        setMenuItems(updatedItems);
  
        // Remove the quantity changes for the deleted item
        const updatedChanges = { ...quantityChanges };
        delete updatedChanges[menuItemId];
        setQuantityChanges(updatedChanges);
  
        console.log("Món ăn đã được xóa thành công!");
        alert("Món ăn đã được xóa thành công!");
      } catch (error) {
        console.error("Error removing menu item:", error);
        alert("Lỗi khi xóa món ăn");
      }
    }
  };

  console.log("Received status:", status);
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
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {menuItems && menuItems.map((item, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.menu_item_name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  <div className="flex items-center">
                    <button className="quantity-btn" onClick={() => decrementQuantity(item.menu_item_id)}>-</button>
                    <span className="quantity-text">{item.quantity + (quantityChanges[item.menu_item_id] || 0)}</span>
                    <button className="quantity-btn" onClick={() => incrementQuantity(item.menu_item_id)}>+</button>
                  </div>
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{numberWithCommas(item.price)}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  {numberWithCommas((item.quantity + (quantityChanges[item.menu_item_id] || 0)) * item.price)}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                  <button className="quantity-btn" onClick={() => removeMenuItem(item.menu_item_id)}>Xóa</button>
                </td>
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
            <button className="flex items-center gap-2 px-8 py-4 bg-red-500 text-white rounded-full text-2xl">
              <span>Hủy</span>
            </button>
            <button
              onClick={handleConfirmationClick}
              disabled={orderStatus !== 1}
              className={`flex items-center gap-2 px-8 py-4 rounded-full ${
                orderStatus === 1 ? "bg-red-500" : "bg-green-500"
              } text-white text-2xl`}
            >
              <img className="w-8 h-8" src="./images/Food Bar.svg" alt="" />
              <span>
                {orderStatus === 1 ? "Xác Nhận" :"Đã Xác Nhận"}
              </span>
            </button>
          </>
        ) : null}
      </div>
      <style>{styles}</style>
    </div>
  );
}