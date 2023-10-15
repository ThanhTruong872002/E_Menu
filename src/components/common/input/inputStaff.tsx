import React, { useState } from "react";
import { FC } from "react";

interface IInputAddStaff {
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string | undefined;
//   onChange: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

export const InputAddStaff: FC<IInputAddStaff> = ({
  type,
  placeholder,
  value,
//   onChange,
}) => {
//   const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     onChange(e);
//   };

  return (
    <input
      className=" ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
      type={type}
      placeholder={placeholder}
      value={value}
    />
  );
};
