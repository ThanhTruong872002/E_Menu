import React, { useEffect, useState } from "react";
import { ArrowBack } from "../common/icons/icons";
import Button from "../common/butoons/button";
import { useNavigate, useParams } from "react-router-dom";
import { MenuContext } from "../../App";
import { useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export default function CustomerMenuCart() {
  const navigate = useNavigate();

  let { table_id } = useParams();

  const { showDetailsMenu, setShowDetailMenu } = useContext(MenuContext);
  console.log(showDetailsMenu);

  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [lastTotal, setLastTotal] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleTotalBill = () => {
    const totalBill = showDetailsMenu.reduce((total, item) => {
      const price = item.Price;
      const quantity = item.quantity;
      return total + price * quantity;
    }, 0);
    setTotal(totalBill);
  };

  const handleTax = () => {
    const TaxMoney = 0;
    setTax(TaxMoney);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleLastTotal = () => {
    const totalAmount = tax + total;
    setLastTotal(totalAmount);
  };

  const handleDeleteAll = async () => {
    const confirmResult = await Swal.fire({
      title: "Delete all items",
      text: "Are you sure you want to delete all items in your cart?",
      confirmButtonText: "Yes, Delete",
      showCancelButton: true,
    });

    if (confirmResult.isConfirmed) {
      const updatedDetailsMenu = [...showDetailsMenu];
      updatedDetailsMenu.splice(0, updatedDetailsMenu.length);
      setShowDetailMenu(updatedDetailsMenu);
      Swal.fire("Deleted!", "All items have been deleted.", "success");
      setLastTotal(0);
      setTotal(0);
      setTax(0);
    }
  };

  const handleOrder = async () => {
    if (showDetailsMenu.length === 0) {
      Swal.fire({
        title: "Cart is Empty",
        text: "Please add orders before checking out",
        confirmButtonText: "Ok",
        showCancelButton: true,
      });
    } else {
      try {
        const response = await axios.put(
          "http://139.180.187.232:4000/api/updateTableStatus",
          {
            tableId: table_id,
            newStatus: 3,
          }
        );

        if (response.status !== 200) {
          console.log("Error updating table status");
          return;
        }

        const orderResponse = await axios.post(
          "http://139.180.187.232:4000/api/createOrder",
          {
            tableId: table_id,
            status: 1,
            showDetailsMenu: showDetailsMenu,
          }
        );

        if (orderResponse.status === 200) {
          console.log("Order placed successfully");
          setOrderPlaced(true);
        } else {
          console.log("Error creating order");
        }
      } catch (error) {
        console.error("Error performing the request:", error);
      }

      Swal.fire({
        icon: "success",
        title: "You have placed your order successfully!",
        width: 600,
        padding: "3em",
        color: "#6add6a",
        background:
          "#fff url(https://sweetalert2.github.io/#examplesimages/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://gif-avatars.com/img/100x100/nyan-cat.gif")
          top right 
          no-repeat
        `,
        confirmButtonColor: "#298b29",
      });
      setShowDetailMenu([]);
    }
  };
  useEffect(() => {
    console.log(
      "Menu Item IDs:",
      showDetailsMenu.map((item) => item.menu_id)
    );
    handleTotalBill();
    handleTax();
    handleLastTotal();

    if (orderPlaced) {
      console.log("Có món được gọi. Thực hiện các công việc cần thiết.");
    }
  }, [
    total,
    tax,
    orderPlaced,
    handleTotalBill,
    handleLastTotal,
    showDetailsMenu,
  ]);

  return (
    <div>
      <header className="py-[16px] px-[20px] flex items-center gap-[16px] h-[50px] shadow-lg">
        <div
          onClick={() => navigate(`/customer/menuqr/${table_id}`)}
          className="cursor-pointer"
        >
          <ArrowBack />
        </div>
        <h2 className="text-[2rem] font-semibold">Detail Cart</h2>
      </header>
      <div className="py-[30px] px-[20px]">
        <div className="flex flex-col gap-10 h-[320px] overflow-y-auto overflow-x-hidden">
          {showDetailsMenu.map((item, index) => (
            <div key={index} className="flex items-center">
              <div>
                <img
                  src={`http://139.180.187.232:4000/uploads${item.Image}`}
                  alt=""
                  className="w-[80px] h-[80px] object-cover rounded-xl mr-4"
                />
              </div>
              <div className="text-[1.6rem] font-semibold">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="w-[100px]">{item.menu_item_name}</h4>
                    <p className="mt-6 text-[1.4rem] ml-1">
                      {item.Price.toLocaleString()} VND
                    </p>
                  </div>
                  <div className="flex gap-6 items-center ml-36">
                    <span className="text-[1.8rem]">x{item.quantity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h4
            onClick={handleDeleteAll}
            className="text-[1.6rem] text-[#008C8C] font-medium mt-6 text-center"
          >
            Delete all items
          </h4>
        </div>

        <div className="mt-10">
          <h2 className="text-[2rem] font-semibold">Total</h2>
          <div className="flex justify-between">
            <h4 className="text-[1.6rem[ font-[400] my-[16px]">Sub Total</h4>
            <p className="font-medium text-[500] mt-6">
              {total.toLocaleString("en-US")}
            </p>
          </div>
          <div className="flex justify-between">
            <h4 className="text-[1.6rem[ font-[400] mb-[16px]">VAT</h4>
            <p className="font-medium text-[500]">
              {tax.toLocaleString("en-US")}
            </p>
          </div>
          <div className="h-[1px] w-full bg-[#ccc]"></div>
          <h2 className="flex justify-end text-[2rem] font-semibold mt-[16px]">
            {lastTotal.toLocaleString("en-US")} VND
          </h2>
        </div>

        <div className="mt-[20px] ">
          <div className="flex gap-6 text-[2rem] font-[400]">
            <h2>Total:</h2>
            <p className="font-semibold">
              {lastTotal.toLocaleString("en-US")} VND
            </p>
          </div>
          <div className="mt-[16px]" onClick={handleOrder}>
            <Button cartButton={"cartButton"}>Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
