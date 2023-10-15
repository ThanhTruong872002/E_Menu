import { ReactNode, useState } from "react";
import Header from "../../components/Header";
import SideBar from "../../components/SideBarAdmin";

interface AdminProps {
  children: ReactNode;
}

export default function Admin({ children }: AdminProps) {
  const [changeWidthTable, setChangeWidthTable] = useState(false);

  const changeWidth = changeWidthTable ? "w-[95%]" : "w-[85%]";

  return (
    <div className="flex h-[100vh]">
      <SideBar
        changeWidthTable={changeWidthTable}
        setChangeWidthTable={setChangeWidthTable}
      />
      <div className={`${changeWidth}`}>
        <Header />
        <div className="px-10">{children}</div>
      </div>
    </div>
  );
}
