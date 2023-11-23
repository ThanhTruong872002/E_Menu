import { DatePicker, TimePicker } from "antd";
import Button from "../common/butoons/button";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { useState } from "react";
import { DatePickerProps } from "antd/lib";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Schema, schema } from "../../utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";



dayjs.extend(customParseFormat);

export default function BookTable() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: yupResolver(schema),
  });

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    setDate(dateString);
  };

  const onChangeTime = (time: Dayjs | null, timeString: string) => {
    if (time !== null) {
      setTime(timeString);
    } else {
      setTime("00:00:00");
    }
  };

  const onsubmit = handleSubmit((data) => {
    const newData = { ...data, time: time, date: date };
    console.log(newData);
  });

  return (
    <div className="bg-[#F9F9F7] pb-[226px]">
      <h2 className="font-sans font-semibold text-5xl lg:text-8xl text-center pt-[100px] ">
        Book A Table
      </h2>
      <p className="lg:text-[1.8rem] text-[1.8rem] px-2 font-[400] font-sans lg:w-[545px] text-center mx-auto mt-4 leading-10">
        We consider all the drivers of change gives you the components you need
        to change to create a truly happens.
      </p>
      <div className="lg:w-[812px] border-[1px] bg-white rounded-2xl border-solid border-white shadow-2xl mt-[80px]  lg:h-[504px] mx-auto">
        <form className="p-10" onSubmit={onsubmit}>
          <div>
            <div className="grid lg:grid-cols-2 grid-cols-1">
              <div>
                <h2 className="font-[600] text-[1.6rem] font-sans">Date</h2>
                <div className="mt-6">
                  <DatePicker
                    onChange={onChangeDate}
                    size="large"
                    className="w-[80%]"
                  />
                </div>
              </div>
              <div>
                <h2 className="font-[600] text-[1.6rem] font-sans mt-10 lg:mt-0">
                  Time
                </h2>
                <div className="mt-6">
                  <TimePicker
                    onChange={onChangeTime}
                    size="large"
                    className="w-[80%]"
                  />
                </div>
              </div>
              <div className="mt-10">
                <h2 className="font-[600] text-[1.6rem] font-sans">Name</h2>
                <div className="mt-6">
                  <Input
                    name="name"
                    register={register}
                    placeholder="Enter your name table"
                    type="text"
                    errorsMessage={errors.name?.message}
                  />
                </div>
              </div>
              <div className="mt-10">
                <h2 className="font-[600] text-[1.6rem] font-sans">Phone</h2>
                <div className="mt-6">
                  <Input
                    placeholder="Enter your phone number"
                    register={register}
                    type="text"
                    name="phone_number"
                    errorsMessage={errors.phone_number?.message}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="font-[600] text-[1.6rem] font-sans">
                Total Person
              </h2>
              <div className="mt-6">
                <Input
                  placeholder="Enter your phone number"
                  register={register}
                  type="text"
                  name="total_person"
                  errorsMessage={errors.total_person?.message}
                />
              </div>
            </div>
            <Button bookTableSubmit={"bookTableSubmit"}>Book A Table</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
