/* eslint-disable no-template-curly-in-string */
import axios from "axios";
import { MenuData } from "../@types/MenuType";
import Button from "../common/butoons/button";
import { CartIcon, SearchIcon, StartIcon } from "../common/icons/icons";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopupMenu from "./popupMenu";
import unidecode from "unidecode";

export default function CustomerMenuQR() {
  const { table_id } = useParams();

  const [selected, setSelected] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [listMenuItem, setListMenuItem] = useState<MenuData[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuData | null>(null);
  const [filteredMenuData, setFilteredMenuData] = useState<MenuData[]>(listMenuItem);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFood, setTypeFood] = useState("appetizer");
  const popupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const togglePopup = (menuItem: any) => {
    setShowPopup(!showPopup);
    const newItem = {
      ...menuItem,
      quantity: 0,
    };
    setSelectedMenuItem(newItem);
  };

  useEffect(() => {
    const getListMenu = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/menu");
        if (res.data) {
          setListMenuItem(res.data);
          setFilteredMenuData(res.data);
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };
    getListMenu();
  }, []);

  useEffect(() => {
    console.log("Received table_id:", table_id);
    const filterTypeFood = () => {
      if (typeFood === "all") {
        setFilteredMenuData(listMenuItem);
      }
      if (typeFood === "appetizer") {
        setFilteredMenuData(() =>
          listMenuItem.filter((data) => data.category_name === "appetizer")
        );
      } else if (typeFood === "main course") {
        setFilteredMenuData(() =>
          listMenuItem.filter((data) => data.category_name === "main course")
        );
      } else if (typeFood === "drink") {
        setFilteredMenuData(() =>
          listMenuItem.filter((data) => data.category_name === "drink")
        );
      } else if (typeFood === "dessert") {
        setFilteredMenuData(() =>
          listMenuItem.filter((data) => data.category_name === "dessert")
        );
      }
    };
    filterTypeFood();
  }, [typeFood]);

  

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredMenuData = listMenuItem.filter((menuItem) =>
      unidecode(menuItem.menu_item_name.toLowerCase()).includes(
        unidecode(searchTerm.toLowerCase())
      )
    );
    setFilteredMenuData(filteredMenuData);
  };

  const handleShowPopup = () => {
    setShowPopup(false);
  };
  return (
    <div
      className="relative"
      // onClick={() => OutSideClickHandler(popupRef, handleShowPopup)}
    >
      <header className="w-full bg-[#FFFAE3] h-[70px] p-[18px] flex justify-between">
        <img src="/images/Logo.svg" alt="" className="w-[140px]" />
        <div
          onClick={() => navigate(`/customer/menuqr/cart/${table_id}`)}
        >
          <CartIcon />
        </div>
      </header>
      <div className="w-[95%] mx-auto">
        <div className="flex items-center gap-4 border-[1px] border-solid border-[#B3B3B3]  w-full h-[46px] px-4 mt-[42px] rounded-lg">
          <SearchIcon />
          <input
            onChange={handleSearch}
            value={searchTerm}
            type="text"
            name="search"
            placeholder="Search food"
            className="border-none focus:outline-none"
          />
        </div>
        <div className="mt-[28px] flex gap-2 ">
          <div
            onClick={() => {
              setSelected("all");
              setTypeFood("all");
            }}
          >
            <Button
              buttonQr={selected === "all" ? "selectMenuQR" : "buttonQr"}
            >
              All
            </Button>
          </div>
          <div
            onClick={() => {
              setSelected("appetizer");
              setTypeFood("appetizer");
            }}
          >
            <Button
              buttonQr={selected === "appetizer" ? "selectMenuQR" : "buttonQr"}
            >
              Appetizer
            </Button>
          </div>
          <div
            onClick={() => {
              setSelected("mainDish");
              setTypeFood("main course");
            }}
          >
            <Button
              buttonQr={selected === "mainDish" ? "selectMenuQR" : "buttonQr"}
            >
              Main Dishes
            </Button>
          </div>
          <div
            onClick={() => {
              setSelected("Drink");
              setTypeFood("drink");
            }}
          >
            <Button
              buttonQr={selected === "Drink" ? "selectMenuQR" : "buttonQr"}
            >
              Drink
            </Button>
          </div>
          <div
            onClick={() => {
              setSelected("Desserts");
              setTypeFood("dessert");
            }}
          >
            <Button
              buttonQr={selected === "Desserts" ? "selectMenuQR" : "buttonQr"}
            >
              Desserts
            </Button>
          </div>
        </div>
        {showPopup && (
          <PopupMenu
            selectedMenuItem={selectedMenuItem}
            setShowPopup={setShowPopup}
          />
        )}
        <div
          className="mt-[30px] grid grid-cols-2 gap-6
           overflow-y-scroll
           overflow-x-hidden"
        >
          {filteredMenuData.map((item, index) => (
            <div
              className="w-[100%] shadow-2xl rounded-lg cursor-pointer"
              onClick={() => togglePopup(item)}
              key={index}
            >
              <img
                src={`http://localhost:4000/uploads${item.Image}`}
                alt=""
                className="h-[160px] object-cover rounded-2xl w-[95%]"
              />
              <div className="p-3">
                <h2 className="text-[1.6rem] font-medium mt-3 h-[32px]">
                  {item.menu_item_name}
                </h2>
                <div className="flex gap-3 items-center mt-2">
                  <StartIcon />
                  <p className="text-[1.4rem] text-[#B3B3B3] font-medium">
                    4.9
                  </p>
                </div>
                <p className="mt-3 text-[1.6rem] font-semibold ml-[2px]">
                  {item.Price.toLocaleString()} VND
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
