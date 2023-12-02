import React, { useState, FormEvent } from 'react';
import Button from "../common/butoons/button";
import { BagIcon } from "../common/icons/icons";
import Input from "../common/input/input";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

interface IFormLogin {
  username: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState<IFormLogin>({
    username: '',
    password: '',
  });

  const [loginSuccess, setLoginSuccess] = useState<boolean | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/account', formLogin);
      console.log("Response from server:", response.data); 
      if (response.data.success) {
        const userRole = response.data.role;
        console.log("User Role:", userRole); // In ra giá trị role để kiểm tra
        if (userRole === 1) {
          // Đăng nhập thành công và có vai trò ADMIN, thực hiện chuyển hướng
          setLoginSuccess(true);
          navigate("/admin/staff");
        } else if(userRole === 2) {
          // Đăng nhập thành công và có vai trò là cashier, thực hiện chuyển hướng
          setLoginSuccess(true);
          navigate("/cashier")
        }
        else{
          // Đăng nhập thành công và có vai trò là manager, thực hiện chuyển hướng
          setLoginSuccess(true);
          navigate("/manager")
        }
      } else {
        // Đăng nhập thất bại
        setLoginSuccess(false);
        setLoginError("Đăng nhập thất bại. Vui lòng kiểm tra tên người dùng và mật khẩu của bạn.");
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu đăng nhập:', error);
    }
  };

  return (
    <div className="flex h-[100vh]">
      <div className="w-[50%] flex flex-col items-center justify-center text-center bg-[#FAFAFD]">
        <div className="w-[500px] h-[400px]">
          <img src="./images/Images.svg" alt="" className="block" />
        </div>
      </div>
      <div className="w-[50%] flex flex-col justify-center items-center text-center">
        <div className="flex gap-4 items-center">
          <BagIcon />
          <h2 className="text-[2.2rem] font-[700]">E-menu</h2>
        </div>
        <div className="mt-20">
          <h2 className="font-[500] text-[3rem]">Hello Again!</h2>
          <p className="mt-6 w-[80%] mx-auto text-[1.5rem] font-[500] text-[#9E9DA8]">
            Welcome back to sign in. As a returning customer, you have access to
            your previously saved all information.
          </p>
        </div>
        <form className="mt-[60px] flex flex-col gap-12" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={formLogin.username}
            onChange={(e) => setFormLogin({ ...formLogin, username: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Password"
            value={formLogin.password}
            onChange={(e) => setFormLogin({ ...formLogin, password: e.target.value })}
          />
          {loginSuccess === false && (
            <p className="text-red-600 min-h-[1.25rem] text-lg">{loginError}</p>
          )}
          <Button login="login">Login</Button>
        </form>
      </div>
    </div>
  );
}