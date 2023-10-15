import React from "react";
import Admin from "../../pages/admin";

export default function HomeAdmin() {
  return (
    <Admin>
      <h2 className="text-[3rem] font-[600] mt-10 flex justify-center">
        OverView
      </h2>
      <div className="w-full h-auto mt-10  grid grid-cols-2 border-[1px] border-solid border-[#ccc]">
        <div className="border-r-[1px] border-solid border-[#ccc] pt-4">
          <h2 className="font-[600] text-[2.4rem] text-center">Revenue</h2>
          <div className="mt-20 flex justify-evenly items-center">
            <h2 className="text-[3.2rem] ">0 VND</h2>
            <div className="flex flex-col items-center">
              <img
                src="./images/money 1.svg"
                alt=""
                className="w-[150px] h-[140px] mb-6"
              />
              <p>Detailed revenue in one day</p>
            </div>
          </div>
          <div className="w-full h-[1px] bg-[#ccc] mt-24"></div>
        </div>
        <div>
          <div className="pt-4">
            <h2 className="font-[600] text-[2.4rem] text-center">
              Number of tables
            </h2>
            <div className="mt-20 flex justify-evenly items-center">
              <h2 className="text-[3.2rem] ">0 Table</h2>
              <div className="flex flex-col items-center">
                <img
                  src="./images/booking 1.svg"
                  alt=""
                  className="w-[150px] h-[140px] mb-6"
                />
                <p className="w-[200px] text-center">
                  Details of number of tables booked per day
                </p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-[#ccc] mt-[44px]"></div>
          </div>
        </div>
        <div className="mt-20">
          <div>
            <h2 className="font-[600] mt-10 text-[2.4rem] text-center">
              Revenue by dish
            </h2>
            <img
              src="./images/chart1 1.svg"
              alt=""
              className=" mx-auto mt-10"
            />
          </div>
        </div>
        <div>
          <div className="mt-20">
            <div>
              <h2 className="font-[600] mt-10 text-[2.4rem] text-center">
                Monthly chart
              </h2>
              <img
                src="./images/chart 2.svg"
                alt=""
                className=" mx-auto mt-10"
              />
            </div>
          </div>
        </div>
      </div>
    </Admin>
  );
}
