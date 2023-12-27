import React from "react";
import { CallIcon, LetterIcon, LocationIcon } from "../common/icons/icons";

export default function CustomerAbout() {
  return (
    <div>
      <div className="py-[100px] w-[90%] mx-auto px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center  gap-20">
          <div className="mb-[100px] ">
            <img
              src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=1980&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="no img"
              className="w-[500px] h-[500px] object-cover rounded-2xl"
            />
            <div className="absolute bottom-[10%] left-[26%] w-[260px] h-[300px] lg:-bottom-10 lg:left-[20%]  lg:w-[350px] lg:h-[280px] bg-[#474747] rounded-xl p-[40px]">
              <h2 className="font-sans text-[1.8rem] lg:text-[2.4rem] font-bold mb-[45px] text-white">
                Come and visit us
              </h2>
              <div className=" flex flex-col gap-8 text-[1.6rem] lg:text-[2rem] font-sans font-[400] text-white">
                <div className="flex gap-[14px]">
                  <CallIcon />
                  <p>(+84) 236.3650403</p>
                </div>
                <div className="flex gap-[14px] w-[267px]">
                  <LetterIcon />
                  <p>foodeats@restaurant.com</p>
                </div>
                <div className="flex gap-[14px] w-[267px]">
                  <LocationIcon />
                  <p>foodeats@restaurant.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-[50%] mb-32 lg:pl-28">
            <h2 className="font-playfair w-[334px] text-[4rem] lg:text-[6rem] font-[500] lg:w-[557px] text-[#2C2F24]">
              We provide healthy food for your family.
            </h2>
            <h3 className="text-[2rem] font-sans font-[500] max-w-[557px] my-6 text-[#2C2F24] leading-[2.8rem]">
              Our story began with a vision to create a unique dining experience
              that merges fine dining, exceptional service, and a vibrant
              ambiance. Rooted in city's rich culinary culture, we aim to honor
              our local roots while infusing a global palate.
            </h3>
            <h4 className="font-sans font-normal text-[#414536] text-[1.8rem] max-w-[557px] leading-10">
              At place, we believe that dining is not just about food, but also
              about the overall experience. Our staff, renowned for their warmth
              and dedication, strives to make every visit an unforgettable
              event.
            </h4>
          </div>
        </div>
        <div className="mt-[120px] flex flex-col lg:flex-row justify-between xl:justify-around items-center  gap-20">
          <div>
            <h2 className="font-playfair text-[4rem] lg:text-[6rem] font-[500] max-w-[557px] text-[#2C2F24]">
              A little information for our valuable guest
            </h2>
            <h4 className="mt-6 font-sans font-normal text-[#414536] text-[1.8rem] max-w-[557px] leading-10">
              At place, we believe that dining is not just about food, but also
              about the overall experience. Our staff, renowned for their warmth
              and dedication, strives to make every visit an unforgettable
              event.
            </h4>
            <div className="mt-[60px] lg:grid lg:grid-cols-2 lg:gap-10 ">
              <div className="mb-10 w-[293px] h-[174px] py-[35px] px-[105px] border-[1px] border-solid border-[#DBDFD0] bg-white rounded-2xl text-center">
                <h2 className="font-playfair text-[5.5rem] font-medium text-[#2C2F24]">
                  3
                </h2>
                <p className="font-sans text-[2rem] text-[#414536] mt-[15px]">
                  Locations
                </p>
              </div>
              <div className="mb-10 w-[293px] h-[174px] py-[35px] px-[105px]  border-[1px] border-solid border-[#DBDFD0] bg-white rounded-2xl text-center">
                <h2 className="font-playfair text-[5.5rem] font-medium text-[#2C2F24]">
                  2023
                </h2>
                <p className="font-sans text-[2rem] text-[#414536] mt-[15px]">
                  Founded
                </p>
              </div>{" "}
              <div className="mb-10 w-[293px] h-[174px] py-[35px] px-[105px]  border-[1px] border-solid border-[#DBDFD0] bg-white rounded-2xl ">
                <h2 className="font-playfair text-[5.5rem] font-medium text-[#2C2F24]">
                  65+
                </h2>
                <p className="font-sans text-[2rem] text-[#414536] mt-[15px] w-[165px] -ml-10">
                  Staff Members
                </p>
              </div>{" "}
              <div className="mb-10 w-[293px] h-[174px] py-[35px] px-[105px]  border-[1px] border-solid border-[#DBDFD0] bg-white rounded-2xl ">
                <h2 className="font-playfair text-[5.5rem] font-medium text-[#2C2F24]">
                  100%
                </h2>
                <p className="font-sans text-[2rem] text-[#414536] mt-[15px] w-[165px] -ml-10 ">
                  Satisfied Customers
                </p>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-[500px] h-[600px] object-cover rounded-2xl"
            />
          </div>
        </div>
        <div className="mt-[120px] flex flex-col justify-between items-center  gap-20">
          <h2 className="font-playfair mx-auto text-[4rem] text-center lg:text-[6rem] font-[500] w-[334px] lg:w-[626px] text-[#2C2F24]">
            What Our Customers Say
          </h2>
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="w-[300px] h-[400px] bg-[#e8e8e5] rounded-2xl shadow-lg py-[45px] px-[35px] ">
              <h2 className="text-[#AD343E] font-bold text-[1.8rem]">
                “The best restaurant”
              </h2>
              <p className="font-sans text-[1.6rem] font-[400] leading-10 my-10">
                Last night, we dined at place and were simply blown away. From
                the moment we stepped in, we were enveloped in an inviting
                atmosphere and greeted with warm smiles.
              </p>
              <div className="flex gap-4 mt-20  items-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="w-[70px] h-[70px] object-cover rounded-[50%]"
                />
                <div>
                  <h4 className="font-bold text-[1.6rem]">Sophire Robson</h4>
                  <p className="font-sans font-[400] mt-2">Los Angeles, CA</p>
                </div>
              </div>
            </div>
            <div className="w-[300px] h-[408px] bg-[#e8e8e5] rounded-2xl shadow-lg py-[45px] px-[30px] ">
              <h2 className="text-[#AD343E] font-bold text-[1.8rem] ">
                “One a kind restaurant”
              </h2>
              <p className="font-sans text-[1.6rem] font-[400] leading-10 my-10">
                The culinary experience at place is first to none. The
                atmosphere is vibrant, the food - nothing short of
                extraordinary. The food was the highlight of our evening. Highly
                recommended.
              </p>
              <div className="flex gap-4 mt-20  items-center">
                <img
                  src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=1780&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="w-[70px] h-[70px] object-cover rounded-[50%]"
                />
                <div>
                  <h4 className="font-bold text-[1.6rem]">Sophire Robson</h4>
                  <p className="font-sans font-[400] mt-2">Los Angeles, CA</p>
                </div>
              </div>
            </div>{" "}
            <div className="w-[300px] h-[408px] bg-[#e8e8e5] rounded-2xl shadow-lg py-[45px] px-[35px] ">
              <h2 className="text-[#AD343E] font-bold text-[1.8rem]">
                “Simply delicious”
              </h2>
              <p className="font-sans text-[1.6rem] font-[400] leading-10 my-10">
                Place exceeded my expectations on all fronts. The ambiance was
                cozy and relaxed, making it a perfect venue for our anniversary
                dinner. Each dish was prepared and beautifully presented.
              </p>
              <div className="flex gap-4 mt-20  items-center">
                <img
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="w-[70px] h-[70px] object-cover rounded-[50%]"
                />
                <div>
                  <h4 className="font-bold text-[1.6rem]">Sophire Robson</h4>
                  <p className="font-sans font-[400] mt-2">Los Angeles, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
