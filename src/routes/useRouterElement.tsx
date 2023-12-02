import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
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
import EditMenu from "../components/MenuAdmin/editMenu";
import EditTable from "../components/TableAdmin/editTable";

const useRouterElement = ({ isLoggedIn, loginSuccess }: { isLoggedIn: boolean; loginSuccess: boolean | null }) => {
  const routerElement = useRoutes([
    { path: "/login", element: <Login /> },
    {
      path: "/admin/staff",
      element: <PrivateRoute isLoggedIn={isLoggedIn} loginSuccess={loginSuccess} element={<Staff />} />,
    },
    {
      path: "/admin/addstaff",
      element: <PrivateRoute isLoggedIn={isLoggedIn} loginSuccess={loginSuccess} element={<AddStaff />} />,
    },
    {
      path: "/admin/menu",
      element: <PrivateRoute isLoggedIn={isLoggedIn} loginSuccess={loginSuccess} element={<Menu />} />,
    },
    {
      path: "/admin/addmenu",
      element: <PrivateRoute isLoggedIn={isLoggedIn} loginSuccess={loginSuccess} element={<AddMenu />} />,
    },
    {
      path: "/admin/editmenu/:menu_id",
      element: <PrivateRoute isLoggedIn={isLoggedIn} loginSuccess={loginSuccess} element={<EditMenu />} />,
    },
    {
      path: "/admin/table",
      element: <PrivateRoute isLoggedIn={isLoggedIn} loginSuccess={loginSuccess} element={<Table />} />,
    },
    {
      path: "/admin/addtable",
      element: <PrivateRoute isLoggedIn={isLoggedIn} loginSuccess={loginSuccess} element={<AddTable />} />,
    },
    {
      path: "/admin/edittable/:table_id",
      element: <PrivateRoute isLoggedIn={isLoggedIn} loginSuccess={loginSuccess} element={<EditTable />} />,
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
      path: "/admin/editstaff/:username",
      element: <PrivateRoute isLoggedIn={isLoggedIn} loginSuccess={loginSuccess} element={<EditStaff />} />,
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
    { path: `/customer/menuqr/:table_id`, element: <CustomerMenuQR /> },
    { path: "/customer/menuqr/cart/:table_id", element: <CustomerMenuCart /> },
    // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập thành công
    {
      path: "*", 
      element: <PrivateRoute isLoggedIn={isLoggedIn} loginSuccess={loginSuccess} element={<Navigate to="/login" />} />
    },
  ]);

  return routerElement;
};

export default useRouterElement;
