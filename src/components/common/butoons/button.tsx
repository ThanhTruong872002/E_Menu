import React, { Children, ReactNode } from "react";
import { FC } from "react";
import "./button.css";

interface IButtons {
  children: ReactNode;
  login?: string;
  bookTable?: string;
  bookTableSubmit?: string | undefined;
  customerMenu?: string;
  buttonQr?: string;
  cartButton?: string
}

const Button: FC<IButtons> = ({
  login,
  children,
  bookTable,
  bookTableSubmit,
  customerMenu,
  buttonQr,
  cartButton
}) => {
  const classes =
    login ||
    bookTable ||
    bookTableSubmit ||
    customerMenu ||
    buttonQr ||
    cartButton

  return <button className={classes}>{children}</button>;
};

export default Button;
