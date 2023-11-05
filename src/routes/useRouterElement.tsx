import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "../components/Login/login";
import Staff from "../components/StaffAdmin/staff";
import Menu from "../components/MenuAdmin/menu";
import AddStaff from "../components/StaffAdmin/addStaff";
import AddMenu from "../components/MenuAdmin/addMenu";
import AddTable from "../components/TableAdmin/addTable";
import Table from "../components/TableAdmin/table";
import Manager from "../pages/staff";
import Customers from "../pages/customers/customer";
import CustomerLayout from "../components/Layouts/CustomerLayout/customerLayout";
import PrivateRoute from "./PrivateRoute";
import EditStaff from "../components/StaffAdmin/editStaff";
import BookTable from "../components/BookTable/bookTable";
import CustomerMenu from "../components/CustomerMenu/customerMenu";
import CustomerAbout from "../components/CustomerAbout";
import CustomerMenuQR from "../components/CustomerMenuQR";
import CustomerContact from "../components/CustomerContact";
import CustomerMenuCart from "../components/CustomerMenuCart";
import EditMenu  from "../components/MenuAdmin/editMenu";

export default function useRouterElement({ 
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const routerElement = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/admin/staff",
      element: <PrivateRoute isLoggedIn={isLoggedIn} element={<Staff />} />,
    },
    {
      path: "/admin/addstaff",
      element: <PrivateRoute isLoggedIn={isLoggedIn} element={<AddStaff />} />,
    },
    {
      path: "/admin/menu",
      element: <PrivateRoute isLoggedIn={isLoggedIn} element={<Menu />} />,
    },
    {
      path: "/admin/addmenu",
      element: <PrivateRoute isLoggedIn={isLoggedIn} element={<AddMenu />} />,
    },
    {
      path:"/admin/editmenu/:menu_id",
      element: <PrivateRoute isLoggedIn={isLoggedIn} element={<EditMenu/>} />,
    },    
    {
      path: "/admin/table",
      element: <PrivateRoute isLoggedIn={isLoggedIn} element={<Table />} />,
    },
    {
      path: "/admin/addtable",
      element: <PrivateRoute isLoggedIn={isLoggedIn} element={<AddTable />} />,
    },
    {
      path: "/manager",
      element: <Manager />,
    },
    {
      path: "/",
      element: (
        <CustomerLayout>
          <Customers />
        </CustomerLayout>
      ),
    },
    {
      path: "/admin/editstaff/:username", // Định nghĩa một route mới cho EditStaff
      element: <PrivateRoute isLoggedIn={isLoggedIn} element={<EditStaff />} />,
    },
    {
      path: "/customer/booktable",
      element: (
        <CustomerLayout>
          <BookTable />
        </CustomerLayout>
      ),
    },
    {
      path: "/customer/menu",
      element: (
        <CustomerLayout>
          <CustomerMenu />
        </CustomerLayout>
      ),
    },
    {
      path: "/customer/about",
      element: (
        <CustomerLayout>
          <CustomerAbout />
        </CustomerLayout>
      ),
    },
    {
      path: "/customer/contact",
      element: (
        <CustomerLayout>
          <CustomerContact />
        </CustomerLayout>
      ),
    },
    {
      path: "/customer/menuqr",
      element: <CustomerMenuQR />,
    },
    {
      path: "/customer/menuqr/cart",
      element: <CustomerMenuCart/>
    }
  ]);

  return routerElement;
}
