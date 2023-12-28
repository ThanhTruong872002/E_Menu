import React, { useState, useEffect } from "react";
import useRouterElement from "./routes/useRouterElement";
import { createContext, Dispatch, SetStateAction } from "react";
import { MenuData } from "./types/MenuType";
import { PropsType } from "./types/TableType";
import axios from "axios";
import { useQuery } from "react-query";
import { getTableData } from "./apis/table.api";
import { getMenuData } from "./apis/menu.api";

const initialDetailsMenu: MenuData[] = [];
const initialListDataTable: PropsType[] = [];
interface MenuContextData {
  showDetailsMenu: MenuData[];
  setShowDetailMenu: Dispatch<SetStateAction<MenuData[]>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  listData: PropsType[];
  setListData: React.Dispatch<React.SetStateAction<PropsType[]>>;
  filterListData: PropsType[];
  setFilterListData: React.Dispatch<React.SetStateAction<PropsType[]>>;
  location: number;
  setLocation: React.Dispatch<React.SetStateAction<number>>;
  addDishStaff: MenuData[];
  setAddDishStaff: Dispatch<SetStateAction<MenuData[]>>;
  // listMenuItem: MenuData[];
  // setListMenuItem: Dispatch<SetStateAction<MenuData[]>>;
  filteredMenuData: MenuData[];
  setFilteredMenuData: Dispatch<SetStateAction<MenuData[]>>;
  // typeFood: string;
  setTypeFood: React.Dispatch<React.SetStateAction<string>>;
}

const initialMenuContext: MenuContextData = {
  showDetailsMenu: initialDetailsMenu,
  setShowDetailMenu: () => null,
  quantity: 1,
  setQuantity: () => null,
  listData: initialListDataTable,
  setListData: () => null,
  filterListData: initialListDataTable,
  setFilterListData: () => null,
  location: 0,
  setLocation: () => null,
  addDishStaff: initialDetailsMenu,
  setAddDishStaff: () => null,
  // listMenuItem: initialDetailsMenu,
  // setListMenuItem: () => null,
  filteredMenuData: initialDetailsMenu,
  setFilteredMenuData: () => null,
  // typeFood: "",
  setTypeFood: () => null
};

export const MenuContext = createContext<MenuContextData>(initialMenuContext);

export function App() {
  const [showDetailsMenu, setShowDetailMenu] = useState<MenuData[]>(
    initialMenuContext.showDetailsMenu
  );
  const routerElement = useRouterElement({
    isLoggedIn: true,
    loginSuccess: true,
  });

  const [quantity, setQuantity] = useState(1);
  const [listData, setListData] = useState<PropsType[]>(initialListDataTable);
  const [filterListData, setFilterListData] = useState<PropsType[]>(listData);
  const [location, setLocation] = useState(0);
  const [addDishStaff, setAddDishStaff] = useState<MenuData[]>([]);

  const [listMenuItem, setListMenuItem] = useState<MenuData[]>([]);
  const [filteredMenuData, setFilteredMenuData] =
    useState<MenuData[]>(listMenuItem);

  const [typeFood, setTypeFood] = useState("appetizer");


  // List Table 

  const {
    data: tableData,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["api/tables"],
    queryFn: async () => {
      const res = await getTableData();
      return res.data;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setListData(tableData);
      setFilterListData(tableData);
    }
  }, [isSuccess, tableData]);

    useEffect(() => {
      const filterData = () => {
        setFilterListData(
          listData?.filter((data) => data.location === location)
        );
      };
      filterData();
    }, [location]);






    // List Item Menu 

  const { data: ListMenuData, isSuccess: MenuSucces } = useQuery({
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
    if (MenuSucces) {
      setListMenuItem(ListMenuData);
      setFilteredMenuData(ListMenuData);
    }
  }, [isSuccess, ListMenuData]);

  useEffect(() => {
    const filterTypeFood = () => {
      if (typeFood === "all") {
        setFilteredMenuData(listMenuItem);
      } else {
        setFilteredMenuData(() =>
          listMenuItem.filter((data) => data.category_name === typeFood)
        );
      }
    };
    filterTypeFood();
  }, [typeFood]);



  return (
    <MenuContext.Provider
      value={{
        showDetailsMenu,
        setShowDetailMenu,
        quantity,
        setQuantity,
        listData,
        setListData,
        filterListData,
        setFilterListData,
        location,
        setLocation,
        addDishStaff,
        setAddDishStaff,
        filteredMenuData,
        setFilteredMenuData,
        setTypeFood,
      }}
    >
      <div>{routerElement}</div>
    </MenuContext.Provider>
  );
}
