import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
      <div
        onClick={() => navigate("/")}
        className="h-[80px] shadow-md flex justify-end items-center p-10"
      >
        <h2 className="text-[1.8rem] font-[500] cursor-pointer">Log out</h2>
      </div>
  );
}
