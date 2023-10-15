import React from 'react'
import {FC} from 'react'
import { PassIcon, UserIcon } from '../icons/icons';

interface IInput {
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  setRenderError?:
    | React.Dispatch<
        React.SetStateAction<{
          username: string;
          password: string;
        }>
      >
    | undefined;

}

 const Input: FC<IInput> = ({ type, placeholder, onChange,value,setRenderError }) => {

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
   if (setRenderError) {
     setRenderError({
       username: "",
       password: "",
     });
   }
  };

   return (
     <div className="flex justify-between items-center px-4 w-[460px] h-[50px] border-[1px] border-solid border-[#ccc] rounded-[10px] ">
       <input
         className="w-[436px] h-[26px] outline-none"
         type={type}
         placeholder={placeholder}
         onChange={(e) => handleOnChange(e)}
         value={value}
       />
       {type === "text" ? <UserIcon /> : <PassIcon />}
     </div>
   );
 };

export default Input
