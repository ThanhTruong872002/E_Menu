import { Input } from "antd";
import { SearchProps } from "antd/lib/input";
import { MenuData } from "../../types/MenuType";
import { useState, useEffect, useContext } from "react";
import unidecode from "unidecode";
import { useQuery } from "react-query";
import { getMenuData } from "../../apis/menu.api";
import { MenuContext } from "../../App";
import axios from "axios";

interface IMenuStaff {
  tableId?: number | null;
}

export default function MenuStaff({ tableId }: IMenuStaff) {
  const { Search } = Input;

  const { addDishStaff, setAddDishStaff } = useContext(MenuContext);

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => console.log(info?.source, value);
  const [listMenuItem, setListMenuItem] = useState<MenuData[]>([]);
  const [filteredMenuData, setFilteredMenuData] =
    useState<MenuData[]>(listMenuItem);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFood, setTypeFood] = useState("all");
  const [selected, setSelected] = useState(0);

  console.log(addDishStaff);

  const { data, isSuccess } = useQuery({
    queryKey: ["api/menu"],
    queryFn: async () => {
      try {
        const res = await getMenuData();
        return res.data;
      } catch (error) {
        console.log("Error fetching menu data:", error);
        throw error;
      }
    },
  });
  useEffect(() => {
    if (isSuccess) {
      setListMenuItem(data);
      setFilteredMenuData(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    const filterTypeFood = () => {
      if (typeFood === "all") {
        setFilteredMenuData(listMenuItem);
      } else {
        setFilteredMenuData(
          listMenuItem.filter((item) => item.category_name === typeFood)
        );
      }
    };
    filterTypeFood();
  }, [typeFood, listMenuItem]);

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

  const handleMenuItemClick = async (menuItem: MenuData) => {
    try {
      if (menuItem) {
        const checkedItemIndex = addDishStaff.findIndex(
          (item) => item.menu_id === menuItem.menu_id
        );

        if (checkedItemIndex !== -1) {
          // Nếu món đã tồn tại, xóa nó khỏi danh sách
          const updatedMenuItems = [...addDishStaff];
          updatedMenuItems.splice(checkedItemIndex, 1);
          setAddDishStaff(updatedMenuItems);
        } else
          setAddDishStaff([
            {
              ...menuItem,
              quantity: 1,
            },
          ]);
      }
      const response = await axios.put(
        "http://localhost:4000/api/updateTableStatus",
        {
          tableId: tableId,
          newStatus: 3,
        }
      );
      if (response.status !== 200) {
        console.log("Error updating table status");
        return;
      }
      const orderResponse = await axios.post(
        "http://localhost:4000/api/createOrder",
        {
          tableId: tableId,
          status: 1,
          showDetailsMenu: addDishStaff,
        }
      );
      if (orderResponse.status === 200) {
        console.log("Order placed successfully");
      } else {
        console.log("Error creating order");
      }
    } catch (error) {
      console.error("Error performing the request:", error);
    }
  };
  return (
    <div>
      <div className="flex gap-6 text-[1.8rem] font-[500] items-center">
        <div className="flex gap-10">
          <h2
            className={`${
              selected === 0 ? "text-[#182FFF] " : ""
            } font-[600] cursor-pointer`}
            onClick={() => {
              setTypeFood("all");
              setSelected(0);
            }}
          >
            All
          </h2>
          <h2
            className={`${
              selected === 1 ? "text-[#182FFF] " : ""
            } font-[600] cursor-pointer`}
            onClick={() => {
              setTypeFood("appetizer");
              setSelected(1);
            }}
          >
            Appetizer
          </h2>
          <h2
            className={`${
              selected === 2 ? "text-[#182FFF] " : ""
            } font-[600] cursor-pointer`}
            onClick={() => {
              setTypeFood("main course");
              setSelected(2);
            }}
          >
            Main Course
          </h2>
          <h2
            className={`${
              selected === 3 ? "text-[#182FFF] " : ""
            } font-[600] cursor-pointer`}
            onClick={() => {
              setTypeFood("drink");
              setSelected(3);
            }}
          >
            Drinks
          </h2>
          <h2
            className={`${
              selected === 4 ? "text-[#182FFF] " : ""
            } font-[600] cursor-pointer`}
            onClick={() => {
              setTypeFood("dessert");
              setSelected(4);
            }}
          >
            Desserts
          </h2>
        </div>
        <Search
          placeholder="Search for food"
          onSearch={onSearch}
          style={{ width: 200 }}
          className="ml-60"
          size="large"
          onChange={handleSearch}
          value={searchTerm}
        />
      </div>
      <div className="w-full bg-black my-6 h-[1px]"></div>
      <div className=" py-8  overflow-y-scroll h-[600px]">
        <div className="grid grid-cols-4 grid-rows-2 gap-10">
          {filteredMenuData.map((item) => (
            <div
              key={item.menu_id}
              className="border-[1px] border-solid border-[#ccc] rounded-xl cursor-pointer"
              onClick={() => handleMenuItemClick(item)}
            >
              <img
                src={`http://localhost:4000/uploads${item.Image}`}
                alt=""
                className="w-[100%] h-[140px] object-cover rounded-md"
              />
              <div className="p-2">
                <h2 className="text-[1.6rem] font-bold my-2">
                  {item.menu_item_name}
                </h2>
                <p className="text-[1.6rem] my-4 text-[#575363] font-[600]">
                  {item.Price.toLocaleString()}VND
                </p>
                <p className="text-[14px] text-[#575363] font-bold mb-3 mt-3 ">
                  Time:
                  <span className="font-[600] text-black ml-32 ">20 min</span>
                </p>
                <p className="text-[14px] text-[#575363] font-bold mb-3 mt-3">
                  Type:
                  <span className="font-[600] text-black ml-20 ">
                    {item.category_name}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
