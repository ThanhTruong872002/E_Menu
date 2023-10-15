import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "../components/Login/login";
import Staff from "../components/StaffAdmin/staff";
import Menu from "../components/MenuAdmin/menu";
import AddStaff from "../components/StaffAdmin/addStaff";
import AddMenu from "../components/MenuAdmin/addMenu";
import HomeAdmin from "../components/HomeAdmin";
import AddTable from "../components/TableAdmin/addTable";
import Table from "../components/TableAdmin/table";
import Manager from "../pages/staff";

export default function useRouterElement() {
  const routerElement = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/admin",
      element: <HomeAdmin />,
    },
    {
      path: "/admin/staff",
      element: <Staff />,
    },
    {
      path: "/admin/addstaff",
      element: <AddStaff />,
    },
    {
      path: "/admin/menu",
      element: <Menu />,
    },
    {
      path: "/admin/addmenu",
      element: <AddMenu />,
    },
    {
      path: "/admin/table",
      element: <Table />,
    },
    {
      path: "/admin/addtable",
      element: <AddTable />,
    },
    {
      path:"/manager",
      element: <Manager/>
    }
  ]);
  return routerElement;
}
