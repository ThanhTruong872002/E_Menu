import React, { useState } from "react";
import useRouterElement from "./routes/useRouterElement";
import { createContext, Dispatch, SetStateAction } from "react";
import { MenuData } from "./components/@types/MenuType";

const initialDetailsMenu: MenuData[] = [
];

interface MenuContextData {
  showDetailsMenu: MenuData[];
  setShowDetailMenu: Dispatch<SetStateAction<MenuData[]>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const initialMenuContext: MenuContextData = {
  showDetailsMenu: initialDetailsMenu,
  setShowDetailMenu: () => null,
  quantity: 1,
  setQuantity: () => null,
};

export const MenuContext = createContext<MenuContextData>(initialMenuContext);

export function App() {
  const [showDetailsMenu, setShowDetailMenu] = useState<MenuData[]>(
    initialMenuContext.showDetailsMenu
  );

  const [quantity, setQuantity] = useState(1);

  const routerElement = useRouterElement({ isLoggedIn: true });

  return (
    <MenuContext.Provider
      value={{ showDetailsMenu, setShowDetailMenu, quantity, setQuantity }}
    >
      <div>{routerElement}</div>
    </MenuContext.Provider>
  );
}
