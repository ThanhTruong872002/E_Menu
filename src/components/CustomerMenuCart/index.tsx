import React from 'react'
import { ArrowBack, IncreaseIcon, ReduceIcon } from '../common/icons/icons'
import Button from '../common/butoons/button';

export default function CustomerMenuCart() {  
  return (
    <div>
      <header className="py-[16px] px-[20px] flex items-center gap-[16px] h-[70px] shadow-lg">
        <ArrowBack />
        <h2 className="text-[2rem] font-semibold">Detail Cart</h2>
      </header>
      <div className="py-[30px] px-[20px]">
        <div className="flex flex-col gap-10 h-[320px] overflow-y-auto overflow-x-hidden">
          <div className="flex items-center">
            <div>
              <img
                src="/images/img1.png"
                alt=""
                className="w-[80px] h-[80px] object-cover rounded-xl mr-4"
              />
            </div>
            <div className="text-[1.6rem] font-medium">
              <div className="flex justify-between items-center">
                <div>
                  <h4>Noodle Ex</h4>
                  <p className="mt-6">$6</p>
                </div>
                <div className="flex gap-6 items-center ml-32">
                  <ReduceIcon />
                  1
                  <IncreaseIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <img
                src="/images/img1.png"
                alt=""
                className="w-[80px] h-[80px] object-cover rounded-xl mr-4"
              />
            </div>
            <div className="text-[1.6rem] font-medium">
              <div className="flex justify-between items-center">
                <div>
                  <h4>Noodle Ex</h4>
                  <p className="mt-6">$6</p>
                </div>
                <div className="flex gap-6 items-center ml-32">
                  <ReduceIcon />
                  1
                  <IncreaseIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <img
                src="/images/img1.png"
                alt=""
                className="w-[80px] h-[80px] object-cover rounded-xl mr-4"
              />
            </div>
            <div className="text-[1.6rem] font-medium">
              <div className="flex justify-between items-center">
                <div>
                  <h4>Noodle Ex</h4>
                  <p className="mt-6">$6</p>
                </div>
                <div className="flex gap-6 items-center ml-32">
                  <ReduceIcon />
                  1
                  <IncreaseIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <img
                src="/images/img1.png"
                alt=""
                className="w-[80px] h-[80px] object-cover rounded-xl mr-4"
              />
            </div>
            <div className="text-[1.6rem] font-medium">
              <div className="flex justify-between items-center">
                <div>
                  <h4>Noodle Ex</h4>
                  <p className="mt-6">$6</p>
                </div>
                <div className="flex gap-6 items-center ml-32">
                  <ReduceIcon />
                  1
                  <IncreaseIcon />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-[1.6rem] text-[#008C8C] font-medium mt-6 text-center">
            Delete all items
          </h4>
        </div>

        <div className="mt-10">
          <h2 className="text-[2rem] font-semibold">Total</h2>
          <div className="flex justify-between">
            <h4 className="text-[1.6rem[ font-[400] my-[16px]">Sub Total</h4>
            <p className="font-medium text-[500]">%25</p>
          </div>
          <div className="flex justify-between">
            <h4 className="text-[1.6rem[ font-[400] mb-[16px]">VAT 10%</h4>
            <p className="font-medium text-[500]">$2.5</p>
          </div>
          <div className="h-[1px] w-full bg-[#ccc]"></div>
          <h2 className="flex justify-end text-[2rem] font-semibold mt-[16px]">
            $27.5
          </h2>
        </div>

        <div className="mt-[20px] ">
          <div className="flex gap-6 text-[2rem] font-[400]">
            <h2>Total:</h2>
            <p className="font-semibold">$27.5</p>
          </div>
          <div className="mt-[16px]">
            <Button cartButton={"cartButton"}>Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
