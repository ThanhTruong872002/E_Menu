import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Admin from "../../pages/admin";
import unidecode from "unidecode";

interface MenuData {
  menu_id: string;
  Image: string;
  menu_item_name: string;
  Description: string;
  Price: string;
  category_name: string;
}

const menuDividerStyle = {
  borderTop: "1px solid #ccc",
  width: "100%",
};

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState<MenuData[]>([]);
  const [filteredMenuData, setFilteredMenuData] = useState<MenuData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/menu");
        setMenuData(response.data);
        setFilteredMenuData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredMenuData = menuData.filter((menuItem) =>
      unidecode(menuItem.menu_item_name.toLowerCase()).includes(
        unidecode(searchTerm.toLowerCase())
      )
    );
    setFilteredMenuData(filteredMenuData);
  };

  const handleDeleteMenuItem = async (menuItemId: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/deleteDish/${menuItemId}`);

      // Cập nhật cả hai mảng menuData và filteredMenuData
      const updatedMenuData = menuData.filter(
        (menuItem) => menuItem.menu_id !== menuItemId
      );
      setMenuData(updatedMenuData);
      setFilteredMenuData(updatedMenuData);
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  return (
    <Admin>
      <div>
        <h2 className="text-[3rem] font-[600] mt-6">Menu Management</h2>
        <div className="flex justify-between mt-20 mb-10">
          <button
            onClick={() => navigate("/admin/addmenu")}
            className="w-[170px] h-[40px] cursor-pointer font-[500] border-[1px] border-solid border-[#ccc] p-3"
          >
            Add Dish
          </button>
          <div className="flex items-center">
            <input
              className="w-[325px] h-[48px] border-[1px] border-solid border-[#ccc] p-3 border-r-0"
              type="text"
              placeholder="Search for a food item"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="flex justify-center items-center text-white w-[50px] h-[50px] bg-[#1890FF]">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        </div>
        <Card className="w-full h-[80vh] overflow-y-scroll">
          <table className="w-full min-w-max table-auto text-left text-[1.8rem]">
            <thead className="sticky top-0 z-50">
              <tr>
                {[
                  "Image",
                  "Food Name",
                  "Description",
                  "Price",
                  "Category",
                  "Action",
                ].map((head, index) => (
                  <th
                    key={index}
                    className="border-b border-blue-gray-200 py-8 px-4 bg-gray-200"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-[1.8rem] leading-none"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
              {filteredMenuData.map((menuItem, index) => (
                <React.Fragment key={index}>
                  <tr
                    className={
                      index % 2 === 0
                        ? "even:bg-blue-gray-50/50 leading-10"
                        : "odd:bg-blue-gray-50/50 leading-10"
                    }
                  >
                    <td className="p-4">
                      <Typography
                        color="blue-gray"
                        className="font-normal flex items-center"
                      >
                        <img
                          src={`http://localhost:4000/uploads${menuItem.Image}`}
                          alt={menuItem.menu_item_name}
                          className="w-[100px] h-[100px] translate-y-[40px] object-cover rounded-xl"
                        />
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography color="blue-gray" className="font-medium">
                        {menuItem.menu_item_name}
                      </Typography>
                    </td>
                    <td className="p-4 ">
                      <Typography
                        color="blue-gray"
                        className="font-normal -translate-y-[40px]"
                        style={{ maxWidth: "200px" }}
                      >
                        {menuItem.Description}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography color="blue-gray" className="font-normal">
                        {menuItem.Price}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography color="blue-gray" className="font-normal">
                        {menuItem.category_name}
                      </Typography>
                    </td>
                    <td className="p-4">
                    <Typography color="blue-gray" className="font-medium">
                      <div className="flex gap-6">
                        <span
                          className="text-[#1890ff] cursor-pointer"
                          onClick={() => navigate(`/admin/editmenu/${menuItem.menu_id}`)}
                        >
                          Edit
                        </span>
                        <span
                          className="text-[#ff4f4f] cursor-pointer"
                          onClick={() => handleDeleteMenuItem(menuItem.menu_id)}
                        >
                          Delete
                        </span>
                      </div>
                    </Typography>
                  </td>
                  </tr>
                  <tr>
                    <td colSpan={6} style={menuDividerStyle}></td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </Admin>
  );
};

export default Menu;
