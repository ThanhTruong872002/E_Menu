import React, { Children, ReactNode } from "react";
import { FC } from "react";
import "./button.css";

interface IButtons {
  children: ReactNode;
  login?: string;
  bookTable?: string;
  bookTableSubmit?: string | undefined;
  customerMenu?: string
}

const Button: FC<IButtons> = ({
  login,
  children,
  bookTable,
  bookTableSubmit,
  customerMenu,
}) => {
  const classes = login || bookTable || bookTableSubmit || customerMenu;

  return <button className={classes}>{children}</button>;
};

export default Button;
