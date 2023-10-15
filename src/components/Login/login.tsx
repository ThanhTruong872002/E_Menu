import { useState } from "react";
import Button from "../common/butoons/button";
import { BagIcon, PassIcon, UserIcon } from "../common/icons/icons";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { rules } from "../../utils/rules";

interface IFormLogin {
  username: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>();

  const onSubmit = handleSubmit((data) => {
    if (
      data.username === "Thanhtruong02" &&
      data.password === "Thanhtruong@02"
    ) {
      navigate("/admin");
    }if (data.username === "Thanhtruong02" && data.password === "Thanhtruong@022")
     {
      navigate("/manager")
    }
    console.log(data);
  });

  return (
    <div className=" flex h-[100vh]">
      <div className="w-[50%] flex flex-col items-center justify-center text-center bg-[#FAFAFD] ">
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
        <form className="mt-[60px] flex flex-col gap-12" onSubmit={onSubmit}>
          <div>
            <div className="flex justify-between items-center px-4 w-[460px] h-[50px] border-[1px] border-solid border-[#ccc] rounded-[10px] ">
              <input
                className="w-[436px] h-[26px] outline-none"
                type="text"
                placeholder="Username"
                {...register("username", rules.username)}
              />
              <UserIcon />
            </div>
            <div className="mt-4 text-red-600 min-h-[1.25rem] text-lg">
              {errors.username?.message}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center px-4 w-[460px] h-[50px] border-[1px] border-solid border-[#ccc] rounded-[10px] ">
              <input
                className="w-[436px] h-[26px] outline-none"
                type="password"
                placeholder="Password"
                {...register("password", rules.password)}
              />
              <PassIcon />
            </div>
            <div className="mt-4 text-red-600 min-h-[1.25rem] text-lg">
              {errors.password?.message}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <input type="checkbox" />
              <p className="text-[1.5rem] font-[500] text-[#9E9DA8] ">
                Set as default card
              </p>
            </div>
            <p className="text-[1.5rem] font-[500] text-[#0071DC]">
              Recovery Password
            </p>
          </div>
          <div>
            <Button login="login">Login</Button>
          </div>
        </form>
        <div className="flex gap-4 font-[400] text-[1.8rem] mt-32">
          <p className="text-[#9E9DA8]">Don’t have an account yet?</p>
          <p className="text-[#0071DC]">Sign Up</p>
        </div>
      </div>
    </div>
  );
}
