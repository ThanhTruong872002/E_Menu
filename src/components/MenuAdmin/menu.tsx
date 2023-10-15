import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Admin from "../../pages/admin";

const TABLE_HEAD = [
  "Image",
  "FoodName",
  "Decription",
  "Price",
  "Type",
  "Operation",
];

const LIST_MENU = [
  {
    foodname: "The Burger",
    decription: "delivery fee",
    price: "20.000đ",
    type: "Buger",
  },
  {
    foodname: "Pizza Hut",
    decription: "delivery fee",
    price: "100.000đ",
    type: "Pizza",
  },
  {
    foodname: "The Burger",
    decription: "delivery fee",
    price: "20.000đ",
    type: "Fast Food",
  },
  {
    foodname: "The Burger",
    decription: "delivery fee",
    price: "20.000đ",
    type: "Buger",
  },
  {
    foodname: "The Burger",
    decription: "delivery fee",
    price: "20.000đ",
    type: "Buger",
  },
];

export default function Menu() {
  const navigate = useNavigate();

  return (
    <Admin>
      <div>
        <h2 className="text-[3rem] font-[600] mt-6 ">Manager Menus</h2>
        <div className="flex justify-between mt-20 mb-10">
          {" "}
          <button
            onClick={() => navigate("/admin/addmenu")}
            className="w-[170px] h-[40px] cursor-pointer font-[500] border-[1px] border-solid border-[#ccc] p-3"
          >
            Add dishes
          </button>
          <div className="flex items-center">
            <input
              className="w-[325px] h-[48px] border-[1px] border-solid border-[#ccc] p-3 border-r-0"
              type="text"
              placeholder="Search for food"
            />
            <div className="flex justify-center items-center text-white w-[50px] h-[50px] bg-[#1890FF]">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        </div>

        <Card className=" w-full h-[70vh] overflow-y-scroll">
          <table className="w-full min-w-max table-auto text-left text-[1.8rem] ">
            <thead className="sticky top-0 z-50">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-200  py-8 px-4 bg-gray-200"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-[1.8rem] leading-none "
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {LIST_MENU.map((menuItem) => (
                <tr className="even:bg-blue-gray-50/50 leading-10 ">
                  <td className="p-4">
                    <Typography
                      color="blue-gray"
                      className="font-normal flex items-center"
                    >
                      <img
                        src="https://th.bing.com/th/id/OIP.wAoFxRe0OdQUw8jQhce2ewHaJ4?pid=ImgDet&rs=1"
                        alt=""
                        className="w-[100px] h-[100px] translate-y-[40px]"
                      />
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography color="blue-gray" className="font-medium">
                      {menuItem.foodname}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography color="blue-gray" className="font-normal">
                      {menuItem.decription}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography color="blue-gray" className="font-normal">
                      {menuItem.price}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography color="blue-gray" className="font-normal">
                      {menuItem.type}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography color="blue-gray" className="font-medium">
                      <div className="flex gap-6 ">
                        <span className="text-[#1890ff] cursor-pointer">
                          Edit
                        </span>
                        <span className="text-[#ff4f4f] cursor-pointer">
                          Remove
                        </span>
                      </div>
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </Admin>
  );
}
