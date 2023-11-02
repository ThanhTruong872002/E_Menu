import axios from "axios";
import { MenuData } from "../@types/MenuType";
import Button from "../common/butoons/button";
import {
  CartIcon,
  IncreaseIcon,
  ReduceIcon,
  SearchIcon,
  StartIcon,
} from "../common/icons/icons";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerMenuQR() {
  const [selected, setSelected] = useState("breakfast");
  const [showPopup, setShowPopup] = useState(false);
  const [listMenuItem, setListMenuItem] = useState<MenuData[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuData | null>(
    null
  );

  const navigate = useNavigate();

  const togglePopup = (menuItem: MenuData | null) => {
    setShowPopup(!showPopup);
    setSelectedMenuItem(menuItem);
  };

  useEffect(() => {
    const getListMenu = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/menu");
        if (res.data) {
          setListMenuItem(res.data);
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    getListMenu();

    document.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleScroll);
    };
  }, [showPopup]);

  const handleScroll = (event: any) => {
    // Ngăn chặn cuộn trang khi popup hiển thị
    if (showPopup) {
      event.preventDefault();
    }
  };
  return (
    <div className="relative">
      <header className="w-full bg-[#FFFAE3] h-[70px] p-[18px] flex justify-between">
        <img src="/images/Logo.svg" alt="" className="w-[140px]" />
        <div
          className="cursor-pointer"
          onClick={() => navigate("/customer/menuqr/cart")}
        >
          <CartIcon />
        </div>
      </header>
      <div className="w-[95%] mx-auto">
        <div className="flex items-center gap-4 border-[1px] border-solid border-[#B3B3B3]  w-full h-[46px] px-4 mt-[42px] rounded-lg">
          <SearchIcon />
          <input
            type="text"
            name="search"
            placeholder="Search food"
            className="border-none focus:outline-none"
          />
        </div>
        <div className="mt-[28px] flex gap-4 ">
          <div onClick={() => setSelected("breakfast")}>
            <Button
              buttonQr={selected === "breakfast" ? "selectMenuQR" : "buttonQr"}
            >
              Breakfast
            </Button>
          </div>
          <div onClick={() => setSelected("mainDish")}>
            <Button
              buttonQr={selected === "mainDish" ? "selectMenuQR" : "buttonQr"}
            >
              Main Dishes
            </Button>
          </div>
          <div onClick={() => setSelected("Drink")}>
            <Button
              buttonQr={selected === "Drink" ? "selectMenuQR" : "buttonQr"}
            >
              Drink
            </Button>
          </div>
          <div onClick={() => setSelected("Desserts")}>
            <Button
              buttonQr={selected === "Desserts" ? "selectMenuQR" : "buttonQr"}
            >
              Desserts
            </Button>
          </div>
        </div>
        {showPopup && (
          <div className="fixed top-[260px] w-[98%] bg-white mx-auto pb-10 transition ease-in-out delay-150">
            <img
              src={`http://localhost:4000/uploads${selectedMenuItem?.Image}`}
              alt=""
              className="w-full rounded-2xl h-[300px] object-cover"
            />
            <div>
              <div className="p-4 flex justify-between">
                <div>
                  <h2 className="font-[600] text-[2rem] mb-2">
                    {selectedMenuItem?.menu_item_name}
                  </h2>
                  <div className="flex gap-3 mt-2">
                    <div className="flex gap-1">
                      <StartIcon />
                      <StartIcon />
                      <StartIcon />
                      <StartIcon />
                      <StartIcon />
                    </div>
                    <p>4.8</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <ReduceIcon />
                  1
                  <IncreaseIcon />
                </div>
              </div>
              <p className="font-semibold text-[2.2rem] mt-2 ml-4 ">$6</p>
              <div>
                <Button cartButton={"cartButton"}>Add To Cart</Button>
              </div>
            </div>
          </div>
        )}
        <div
          className="mt-[30px] grid grid-cols-2 gap-6
           overflow-y-scroll
           overflow-x-hidden"
        >
          {listMenuItem.map((item, index) => (
            <div
              className="w-[160px] shadow-2xl rounded-lg cursor-pointer"
              onClick={() => togglePopup(item)}
              key={index}
            >
              <img
                src={`http://localhost:4000/uploads${item.Image}`}
                alt=""
                className="h-[160px] object-cover rounded-2xl w-[95%]"
              />
              <div className="p-3">
                <h2 className="text-[1.6rem] font-medium mt-3 ">
                  {item.menu_item_name}
                </h2>
                <div className="flex gap-3 items-center mt-2">
                  <StartIcon />
                  <p className="text-[1.4rem] text-[#B3B3B3] font-medium">
                    4.9
                  </p>
                </div>
                <p className="mt-3 text-[1.6rem] font-semibold ml-[2px]">$4</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
