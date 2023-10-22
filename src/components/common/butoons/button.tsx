import React, { Children, ReactNode } from 'react'
import {FC} from 'react'
import "./button.css"

interface IButtons {
  children: ReactNode
  login?: string
  bookTable?:string
}

const Button: FC<IButtons> = ({ login, children, bookTable }) => {
  const classes = login || bookTable

  return <button  className={classes}>{children}</button>;
};


export default  Button