import { Pagination } from "antd";
import { PaginationProps } from "antd/lib";
import { useState } from "react";

export default function PaginationMenuCustomer() {
  const [current, setCurrent] = useState(3);

  const onChange: PaginationProps["onChange"] = (page) => {
    console.log(page);
    setCurrent(page);
  };
  return (
    <div className="w-[90%] text-center mt-20 translate-x-28">
      <h2 className="text-[1.6rem] font-[400] ml-8 mb-10 ">
        Showing <span className="font-bold">{current}</span> to <span className="font-bold">{50}</span> results
      </h2>
      <Pagination current={current} onChange={onChange} total={50} />
    </div>
  );
}
