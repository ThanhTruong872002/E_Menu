import React, { useState, useEffect } from "react";
import useRouterElement from "./routes/useRouterElement";
import { createContext, Dispatch, SetStateAction } from "react";
import { MenuData } from "./types/MenuType";
import { PropsType } from "./types/TableType";
import axios from "axios";
import { useQuery } from "react-query";
import { getTableData } from "./apis/table.api";

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
  const routerElement = useRouterElement({ isLoggedIn: true });
  const [quantity, setQuantity] = useState(1);
  const [listData, setListData] = useState<PropsType[]>(initialListDataTable);
  const [filterListData, setFilterListData] = useState<PropsType[]>(listData);
  const [location, setLocation] = useState(0);

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
      setFilterListData(listData?.filter((data) => data.location === location));
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
