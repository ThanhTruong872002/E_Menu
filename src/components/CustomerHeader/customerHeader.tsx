import React from 'react'
import Button from '../common/butoons/button'

export default function CustomerHeader() {
  return (
    <div className="bg-[#FFFAE3]">
      <div className="w-[90%] mx-auto flex justify-between items-center py-10 ">
        <img src="./images/Logo.svg" alt="" />
        <div>
          <ul className="flex gap-10 font-500 ">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Menu</li>
            <li className="cursor-pointer">Contact</li>
          </ul>
        </div>
        <div>
          <Button bookTable="bookTable">Book A Table</Button>
        </div>
      </div>
    </div>
  );
}
