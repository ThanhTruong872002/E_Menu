import {  DatePicker, Input, TimePicker } from "antd";
import React from "react";
import Button from "../common/butoons/button";

export default function BookTable() {
  return (
    <div className="bg-[#F9F9F7] pb-[226px]">
      <h2 className="font-playfair text-[8rem] text-center pt-[100px] ">
        Book A Table
      </h2>
      <p className="text-[1.8rem] font-[400] font-sans w-[545px] text-center mx-auto mt-4 leading-10">
        We consider all the drivers of change gives you the components you need
        to change to create a truly happens.
      </p>
      <div className="w-[812px] border-[1px] bg-white rounded-2xl border-solid border-white shadow-2xl mt-[80px]  h-[504px] mx-auto">
        <form action="" className="p-10">
          <div>
            <div className="grid grid-cols-2">
              <div>
                <h2 className="font-[600] text-[1.6rem] font-sans">Date</h2>
                <div className="mt-6">
                  <DatePicker size="large" />
                </div>
              </div>
              <div>
                <h2 className="font-[600] text-[1.6rem] font-sans">Time</h2>
                <div className="mt-6">
                  <TimePicker size="large" />
                </div>
              </div>
              <div className="mt-10">
                <h2 className="font-[600] text-[1.6rem] font-sans">Name</h2>
                <div className="mt-6">
                  <Input size="large" className="w-[80%]" />
                </div>
              </div>
              <div className="mt-10">
                <h2 className="font-[600] text-[1.6rem] font-sans">Phone</h2>
                <div className="mt-6">
                  <Input size="large" className="w-[80%]" />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="font-[600] text-[1.6rem] font-sans">
                Total Person
              </h2>
              <div className="mt-6">
                <Input size="large" className="w-[100%]" />
              </div>
            </div>
            <Button bookTableSubmit={"bookTableSubmit"}>Book A Table</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
