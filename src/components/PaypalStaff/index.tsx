import React, { useState, useEffect } from "react";
import axios from "axios";
import { NotifiIcon, StaffNameIcon } from "../common/icons/icons";

// CSS styles
const styles = `
  /* Thêm kiểu cho cửa sổ hóa đơn */
  .invoice-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: white;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .invoice-buttons {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .payment-button,
  .cancel-button {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
  }

  .payment-button {
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
  }

  .cancel-button {
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
  }
`;

interface IPayPalType {
  selected: string;
  tableId: number | null;
  orderId?: string | null | undefined;
  status?: number | null | undefined;
  orderDate?: string | null | undefined;
}

interface OrderDetailItem {
  order_detail_id: number;
  menu_item_id: number;
  menu_item_name: string;
  quantity: number;
  price: number;
}

interface TransactionType {
  type_id: number;
  type_name: string;
}

export default function PaypalStaff({ selected, tableId, orderId, status, orderDate }: IPayPalType) {
  const [tableName, setTableName] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<OrderDetailItem[]>([]);
  const [staffFullname, setStaffFullname] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [guestCount, setGuestCount] = useState<number | null>(null);
  const [orderStatus, setOrderStatus] = useState<number | null>(status ?? null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderCreationTime, setOrderCreationTime] = useState<Date | null>(null);
  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>([]);
  const [selectedTransactionType, setSelectedTransactionType] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>("Tiền mặt");
  const [userAccountId, setUserAccountId] = useState<number | null>(null);

  
  useEffect(() => {
    const fetchTransactionTypes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/transactiontypes");
        const data = response.data;
  
        // Handle the case where data is null or undefined
        if (data) {
          setTransactionTypes(data.data); // Assuming the transaction types are inside the "data" property
          console.log("Transaction types:", data.data); // Log the transaction types
        }
      } catch (error) {
        console.error("Error fetching transaction types:", error);
      }
    };
  
    fetchTransactionTypes();
  }, []);


  useEffect(() => {
    const currentDateTime = new Date();
    setOrderCreationTime(currentDateTime);
  }, []);
  

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
          setGuestCount(data.seat_capacity);
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
              return {
                ...item,
                order_detail_id: item.order_detail_id,
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
      setUserAccountId(user.account_id);
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

    const totalAfterDiscountNumber = Number(totalAfterDiscount.toFixed(2));

    return numberWithCommas(totalAfterDiscountNumber);
  };

  const setDiscountValue = (value: string) => {
    const parsedValue = parseFloat(value.replace(/^0+/, ''));

    const newDiscount = isNaN(parsedValue) ? 0 : Math.max(parsedValue, 0);

    setDiscount(newDiscount);
  };

  const updateOrderStatus = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/updateorderstatus/${orderId}`, {
        status: 1,
      });

      if (response.data.success) {
        setOrderStatus(1);
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
      await Promise.all(
        menuItems.map(async (item) => {
          await axios.put(`http://localhost:4000/api/updatequantity/${item.order_detail_id}`, {
            quantity: item.quantity,
          });
        })
      );
  
      const response = await axios.put(`http://localhost:4000/api/updateorderstatus/${orderId}`, {
        status: 2,
      });
  
      if (response.data.success) {
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

        console.log("Món ăn đã được xóa thành công!");
        alert("Món ăn đã được xóa thành công!");
      } catch (error) {
        console.error("Error removing menu item:", error);
        alert("Lỗi khi xóa món ăn");
      }
    }
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const clampedQuantity = Math.max(1, newQuantity); // Ensure the quantity is at least 1
    const updatedItems = menuItems.map((menuItem, i) =>
      i === index ? { ...menuItem, quantity: clampedQuantity } : menuItem
    );
    setMenuItems(updatedItems);
    updateOrderStatus(); 
  };

  const handlePayment = () => {
    setShowInvoice(true);
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(e.target.value);
    setSelectedTransactionType(selectedValue);
    const selectedType = transactionTypes.find((type) => type.type_id === selectedValue);
    if (selectedType) {
      setSelectedPaymentMethod(selectedType.type_name);
    } else {
      console.warn("Selected type_id not found.");
    }
  };

  const handlePaymentConfirmation = async () => {
    try {
      // Tính tổng số tiền trước khi áp dụng giảm giá
      const totalBeforeDiscount = menuItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
  
      // Tính số tiền được giảm giá
      const discountAmount = (totalBeforeDiscount * discount) / 100;
  
      // Tính tổng số tiền sau khi áp dụng giảm giá
      const totalAfterDiscount = totalBeforeDiscount - discountAmount;
  
      const totalAfterDiscountNumber = Number(totalAfterDiscount.toFixed(2));
  
      // Chuỗi chứa thông tin chi tiết hóa đơn
      const transactionDescription = menuItems.map(item => `${item.menu_item_name}\t${item.quantity}\t${item.price}\t${item.quantity * item.price}`).join('\n');
  
      // Thêm thông tin giảm giá vào chuỗi
      const discountInfo = `\nDiscount Percentage: ${discount}%\nDiscount Amount: ${discountAmount}\nTotal Before Discount: ${totalBeforeDiscount}\nTotal After Discount: ${totalAfterDiscountNumber}`;
      const transactionDescriptionWithDiscount = `${discountInfo}\n${transactionDescription}`;
  
      // Assuming transaction_type is already defined
      const transactionData = {
        account_id: userAccountId, // Assuming userAccountId is available in the component state
        transaction_type: selectedTransactionType,
        amount: totalAfterDiscountNumber,
        transaction_date: orderCreationTime, // Assuming orderCreationTime is available in the component state
        transaction_description: discountInfo,
      };
  
      // Make an HTTP POST request to add transaction data to the "transactions" table
      const response = await axios.post("http://localhost:4000/api/transactions", transactionData);
  
      if (response.data.success) {
        await axios.delete(`http://localhost:4000/api/orderdetails/${orderId}`);
        await axios.delete(`http://localhost:4000/api/orders/${orderId}`);
        await axios.put(`http://localhost:4000/api/tablesStaff/${tableId}`, {
          status: 1, 
        });
        console.log("Transaction data added successfully!");
        alert("Thanh toán thành công!");
        resetDisplayedData();
      } else {
        console.error("Error adding transaction data:", response.data.message);
        // Handle error as needed
      }
    } catch (error) {
      console.error("Error handling payment confirmation:", error);
      // Handle error as needed
    }
  };

  const handleCancellation = async () => {
    try {
      console.log("Cancelling order...");
  
      // Call the necessary APIs to handle cancellation
      await axios.delete(`http://localhost:4000/api/orderdetails/${orderId}`);
      await axios.delete(`http://localhost:4000/api/orders/${orderId}`);
      await axios.put(`http://localhost:4000/api/tablesStaff/${tableId}`, {
        status: 1,
      });
  
      // Display a success message
      console.log("Hủy bàn thành công!");
      alert("Hủy bàn thành công!");
      resetDisplayedData();
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Lỗi khi hủy bàn");
    }
  };

  const resetDisplayedData = () => {
    setMenuItems([]);
    setTableName(null);
    setGuestCount(null);
    setDiscount(0);
    setOrderStatus(null);
    setOrderCreationTime(null);
    setStaffFullname(null);
    setUserAccountId(null);
  };
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {tableName ? `Tên bàn: ${tableName}` : "Chọn bàn"}
        </h2>
        <div className="flex gap-4 items-center text-xl">
          <StaffNameIcon />
          <span className="font-semibold">{staffFullname}</span>
        </div>
      </div>
      <div className="flex justify-between">
        {orderId && (
          <div className="mb-4">
            <strong>Order ID:</strong> {orderId}
          </div>
        )}
        {orderDate && (
          <div className="font-semibold ml-4">
            <strong>Checkin:</strong> {new Date(orderDate).toLocaleString()}
          </div>
        )}
      </div>
      <div className="table-container" style={{ overflowX: 'auto' }}>
        <table className="w-full mb-6" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Tên món</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Số lượng</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Đơn giá</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Thành tiền</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}></th>
            </tr>
          </thead>
         <tbody>
          {menuItems && menuItems.map((item, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{item.menu_item_name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                  className="border px-2 py-1 w-20"
                />
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{numberWithCommas(item.price)}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                {numberWithCommas(item.quantity * item.price)}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                <button onClick={() => removeMenuItem(item.menu_item_id)}>Xóa</button>
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
      <br></br>
      <div>
        <label className="mr-2">Phương thức thanh toán:</label>
        <select
          value={selectedTransactionType}
          onChange={handlePaymentMethodChange}
          className="border px-2 py-1 mr-2"
        >
          {transactionTypes.length > 0 &&
            transactionTypes.map((type) => (
              <option key={type.type_id} value={type.type_id}>
                {type.type_name}
              </option>
            ))}
        </select>
      </div>
      <div className="flex justify-between items-center text-2xl mt-6">
        {status === 1 || status === 2 ? (
          <>
            <button className="flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-full text-2xl" onClick={handlePayment}>
              <img className="w-8 h-8" src="./images/Average Price.svg" alt="" />
              <span>Thanh Toán</span>
            </button>
            <button
              className="flex items-center gap-2 px-8 py-4 bg-red-500 text-white rounded-full text-2xl"
              onClick={handleCancellation}
            >
              <span>Hủy Bàn</span>
            </button>
            {showInvoice && (
              <div className="invoice-modal">
              <h2 className="text-xl font-bold">Hóa Đơn</h2>
              {/* Hiển thị thông tin hóa đơn */}
              <p><strong>Tên bàn:</strong> {tableName}</p>
              <p><strong>Nhân viên:</strong> {staffFullname}</p>
              <p><strong>Order ID:</strong> {orderId}</p>
              <p> </p>
              {orderDate && (
                <div>
                  <strong>In:</strong> {new Date(orderDate).toLocaleString()}
                </div>
              )}
              {orderCreationTime && (
                <div>
                 <strong>Out:</strong> {orderCreationTime.toLocaleString()}
                </div>
              )}
              {/* Hiển thị thông tin chi tiết hóa đơn */}
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
                      <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                        {numberWithCommas(item.quantity * item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <span>{selectedPaymentMethod}</span>
              </div>
              <div className="flex justify-between items-center text-2xl mt-6">
                <div className="flex gap-2 font-bold">
                  <label className="mr-2">Giảm giá (%):</label>
                  <span>{discount}</span>
                </div>
                <div className="flex gap-2 font-bold">
                  <span>Tổng tiền:</span>
                  <span className="text-red-500">{calculateTotalWithDiscount()} VND</span>
                </div>
              </div>
              <div className="invoice-buttons">
              <button className="payment-button" onClick={() => { handlePayment(); handlePaymentConfirmation(); }}>
                Thanh Toán
              </button>
                <button className="cancel-button" onClick={() => setShowInvoice(false)}>
                  Hủy
                </button>
              </div>
            </div>
                  )}
              <button
              onClick={handleConfirmationClick}
              disabled={orderStatus !== 1}
              className={`flex items-center gap-2 px-8 py-4 rounded-full ${
                orderStatus === 1 ? "bg-red-500" : "bg-green-500"
              } text-white text-2xl`}
            >
              <img className="w-8 h-8" src="./images/Food Bar.svg" alt="" />
              <span>
                {orderStatus === 1 ? "Xác Nhận" : "Đã Xác Nhận"}
              </span>
            </button>
          </>
        ) : null}
      </div>
      <style>{styles}</style>
    </div>
  );
}
