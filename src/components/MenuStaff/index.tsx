import { Input } from "antd";
import { SearchProps } from "antd/lib/input";
export default function MenuStaff() {
  const { Search } = Input;

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <div>
      <div className="flex gap-6 text-[2rem] font-[500] items-center">
        <h2>ALL</h2>
        <h2>BEER</h2>
        <h2>CLASSIC COCKTAILS</h2>
        <h2>APPETIZER</h2>
        <h2>MAIN DISH</h2>
        <h2>DESERTS</h2>
        <Search
          placeholder="Search for food"
          onSearch={onSearch}
          style={{ width: 250 }}
          className="ml-20"
        />
      </div>
      <div className="w-full bg-black my-6 h-[1px]"></div>
      <div className="py-8 grid grid-cols-4 grid-rows-2 gap-20">
        <div>
          <img
            src="./images/menu_food.svg"
            alt=""
            className="w-[180px] h-[120px] object-cover rounded-md"
          />
          <h2 className="text-[1.8rem] font-bold my-2">The Burger Cafe</h2>
          <p className="text-[1.6rem] my-4 text-[#575363] font-[600]">
            125.000 VND
          </p>
          <p className="text-[14px] text-[#575363] font-bold mb-3 mt-3 ">
            Time:
            <span className="font-[600] text-black ml-32 ">20 min</span>
          </p>
          <p className="text-[14px] text-[#575363] font-bold mb-3 mt-3">
            Food Type:
            <span className="font-[600] text-black ml-16 ">Burger</span>
          </p>
        </div>
        <div>
          <img
            src="./images/menu_food.svg"
            alt=""
            className="w-[180px] h-[120px] object-cover rounded-md"
          />
          <h2 className="text-[1.8rem] font-bold my-2">The Burger Cafe</h2>
          <p className="text-[1.6rem] my-4 text-[#575363] font-[600]">
            125.000 VND
          </p>
          <p className="text-[14px] text-[#575363] font-bold mb-3 mt-3 ">
            Time:
            <span className="font-[600] text-black ml-32 ">20 min</span>
          </p>
          <p className="text-[14px] text-[#575363] font-bold mb-3 mt-3">
            Food Type:
            <span className="font-[600] text-black ml-16 ">Burger</span>
          </p>
        </div>{" "}
        <div>
          <img
            src="./images/menu_food.svg"
            alt=""
            className="w-[180px] h-[120px] object-cover rounded-md"
          />
          <h2 className="text-[1.8rem] font-bold my-2">The Burger Cafe</h2>
          <p className="text-[1.6rem] my-4 text-[#575363] font-[600]">
            125.000 VND
          </p>
          <p className="text-[14px] text-[#575363] font-bold mb-3 mt-3 ">
            Time:
            <span className="font-[600] text-black ml-32 ">20 min</span>
          </p>
          <p className="text-[14px] text-[#575363] font-bold mb-3 mt-3">
            Food Type:
            <span className="font-[600] text-black ml-16 ">Burger</span>
          </p>
        </div>{" "}
        <div>
          <img
            src="./images/menu_food.svg"
            alt=""
            className="w-[180px] h-[120px] object-cover rounded-md"
          />
          <h2 className="text-[1.8rem] font-bold my-2">The Burger Cafe</h2>
          <p className="text-[1.6rem] my-4 text-[#575363] font-[600]">
            125.000 VND
          </p>
          <p className="text-[14px] text-[#575363] font-bold mb-3 mt-3 ">
            Time:
            <span className="font-[600] text-black ml-32 ">20 min</span>
          </p>
          <p className="text-[14px] text-[#575363] font-bold mb-3 mt-3">
            Food Type:
            <span className="font-[600] text-black ml-16 ">Burger</span>
          </p>
        </div>
        <div>
          <img
            src="./images/menu_food.svg"
            alt=""
            className="w-[180px] h-[120px] object-cover rounded-md"
          />
          <h2 className="text-[1.8rem] font-bold my-2">The Burger Cafe</h2>
          <p className="text-[1.6rem] my-4 text-[#575363] font-[600]">
            125.000 VND
          </p>
          <p className="text-[14px] text-[#575363] font-bold mb-3 mt-3 ">
            Time:
            <span className="font-[600] text-black ml-32 ">20 min</span>
          </p>
          <p className="text-[14px] text-[#575363] font-bold mb-3 mt-3">
            Food Type:
            <span className="font-[600] text-black ml-16 ">Burger</span>
          </p>
        </div>{" "}
        <div>
          <img
            src="./images/menu_food.svg"
            alt=""
            className="w-[180px] h-[120px] object-cover rounded-md"
          />
          <h2 className="text-[1.8rem] font-bold my-2">The Burger Cafe</h2>
          <p className="text-[1.6rem] my-4 text-[#575363] font-[600]">
            125.000 VND
          </p>
          <p className="text-[14px] text-[#575363] font-bold mb-3 mt-3 ">
            Time:
            <span className="font-[600] text-black ml-32 ">20 min</span>
          </p>
          <p className="text-[14px] text-[#575363] font-bold mb-3 mt-3">
            Food Type:
            <span className="font-[600] text-black ml-16 ">Burger</span>
          </p>
        </div>{" "}
        <div>
          <img
            src="./images/menu_food.svg"
            alt=""
            className="w-[180px] h-[120px] object-cover rounded-md"
          />
          <h2 className="text-[1.8rem] font-bold my-2">The Burger Cafe</h2>
          <p className="text-[1.6rem] my-4 text-[#575363] font-[600]">
            125.000 VND
          </p>
          <p className="text-[14px] text-[#575363] font-bold mb-3 mt-3 ">
            Time:
            <span className="font-[600] text-black ml-32 ">20 min</span>
          </p>
          <p className="text-[14px] text-[#575363] font-bold mb-3 mt-3">
            Food Type:
            <span className="font-[600] text-black ml-16 ">Burger</span>
          </p>
        </div>{" "}
        <div>
          <img
            src="./images/menu_food.svg"
            alt=""
            className="w-[180px] h-[120px] object-cover rounded-md"
          />
          <h2 className="text-[1.8rem] font-bold my-2">The Burger Cafe</h2>
          <p className="text-[1.6rem] my-4 text-[#575363] font-[600]">
            125.000 VND
          </p>
          <p className="text-[14px] text-[#575363] font-bold mb-3 mt-3 ">
            Time:
            <span className="font-[600] text-black ml-32 ">20 min</span>
          </p>
          <p className="text-[14px] text-[#575363] font-bold mb-3 mt-3">
            Food Type:
            <span className="font-[600] text-black ml-16 ">Burger</span>
          </p>
        </div>
      </div>
    </div>
  );
}
