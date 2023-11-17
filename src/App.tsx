import React, { useState, useEffect } from "react";
import useRouterElement from "./routes/useRouterElement";
import { createContext, Dispatch, SetStateAction } from "react";
import { MenuData } from "./components/@types/MenuType";
import { PropsType } from "./components/@types/TableType";
import axios from "axios";

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
};

export const MenuContext = createContext<MenuContextData>(initialMenuContext);

export function App() {
  const [showDetailsMenu, setShowDetailMenu] = useState<MenuData[]>(
    initialMenuContext.showDetailsMenu
  );
  const [quantity, setQuantity] = useState(1);

  const routerElement = useRouterElement({ isLoggedIn: true });

  const [listData, setListData] = useState<PropsType[]>(initialListDataTable);

  const [filterListData, setFilterListData] = useState<PropsType[]>(listData);

  const [location, setLocation] = useState(0);

  const getTableData = async () => {
    const res = await axios.get("http://localhost:4000/api/tables");
    if (res.data) {
      setListData(res.data);
      setFilterListData(res.data);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      if (location === 0) {
        setFilterListData(() =>
          listData?.filter((data) => data.location === 0)
        );
      } else if (location === 1) {
        setFilterListData(() =>
          listData?.filter((data) => data.location === 1)
        );
      } else if (location === 2) {
        setFilterListData(() =>
          listData?.filter((data) => data.location === 2)
        );
      }
    };
    filterData();
  }, [location]);

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
      }}
    >
      <div>{routerElement}</div>
    </MenuContext.Provider>
  );
}
