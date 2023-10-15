import React, { Children, ReactNode } from 'react'
import {FC} from 'react'
import "./button.css"

interface IButtons {
  children: ReactNode
  login?: string
}

const Button: FC<IButtons> = ({ login, children }) => {
  const classes = login

  return <button className={classes} >{children}</button>;
};


export default  Button