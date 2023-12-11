import React from "react";
import Button from "../common/butoons/button";
import Input from "../Input";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function CustomerContact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    // resolver: yubResolver
  });

  const onsubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <div className="bg-[#F9F9F7] pb-[226px]">
      <h2 className="font-sans font-medium text-[54px] lg:text-8xl text-center pt-[100px] ">
        Contact Us
      </h2>
      <p className="text-[1.8rem] w-[90%] px-2 font-normal text-[#2C2F24] font-sans text-center mx-auto mt-4 leading-[3rem] lg:text-[1.8rem] lg:w-[545px] ">
        We consider all the drivers of change gives you the components you need
        to change to create a truly happens.
      </p>
      <div className="lg:w-[812px] border-[1px] bg-white rounded-2xl border-solid border-white shadow-2xl mt-[80px]  lg:h-[504px] mx-auto">
        <form className="p-10" onSubmit={onsubmit}>
          <div>
            <div className="grid lg:grid-cols-2 grid-cols-1">
              <div className="mt-10">
                <h2 className="font-[600] text-[1.6rem] font-sans">Name</h2>
                <div className="mt-6">
                  <Input
                    placeholder="Enter your name"
                    register={register}
                    type="text"
                    name="name"
                    errorsMessage={errors.name?.message}
                  />
                </div>
              </div>
              <div className="mt-10">
                <h2 className="font-[600] text-[1.6rem] font-sans">Email</h2>
                <div className="mt-6">
                  <Input
                    placeholder="Enter your email address"
                    register={register}
                    type="text"
                    name="email"
                    errorsMessage={errors.email?.message}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="font-[600] text-[1.6rem] font-sans">Subject</h2>
              <div className="mt-6">
                <Input
                  placeholder="Write a subject"
                  register={register}
                  type="text"
                  name="subject"
                  errorsMessage={errors.subject?.message}
                />
              </div>
            </div>
            <div className="mt-10">
              <h2 className="font-[600] text-[1.6rem] font-sans">Message</h2>
              <div className="mt-6">
                <Input
                  placeholder="Write your message"
                  register={register}
                  type="text"
                  name="message"
                  errorsMessage={errors.message?.message}
                  className="h-[140px] rounded-[16px]"
                />
              </div>
            </div>
            <Button bookTableSubmit={"bookTableSubmit"}>Send</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
