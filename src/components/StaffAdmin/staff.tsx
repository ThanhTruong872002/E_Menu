import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Admin from "../../pages/admin";
import unidecode from "unidecode";

const TABLE_HEAD = ["Account", "Fullname", "Role", "Action"];

interface User {
  account_id: string;
  username: string;
  fullname: string;
  role_name: string;
}

export default function Staff() {
  const navigate = useNavigate();
  const [listUsers, setListUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLastAdmin, setIsLastAdmin] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const getListUsers = async () => {
    try {
      const response = await axios.get(
        "http://139.180.187.232:4000/api/accounts-with-roles"
      );
      if (response.data.staff) {
        setListUsers(response.data.staff);

        const adminCount = response.data.staff.filter(
          (user: User) => user.role_name === "admin"
        ).length;
        setIsLastAdmin(adminCount === 1);
      } else {
        console.log("Không có dữ liệu người dùng từ máy chủ.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ máy chủ: ", error);
    }
  };

  const handleRemoveAccount = (username: string) => {
    // Confirm the deletion with a user
    const confirmDelete = window.confirm(`Are you sure you want to delete the account "${username}"?`);
  
    // If the user confirms the deletion, proceed
    if (confirmDelete) {
      // Check if it's the last admin account
      if (isLastAdmin) {
        console.error("Cannot delete the last admin account.");
        return;
      }
  
      // Send a DELETE request to the server
      axios
        .delete(`http://139.180.187.232:4000/api/deleteAccount/${username}`)
        .then((response) => {
          console.log("Account deleted successfully.");
          // Update the list of users after successful deletion
          getListUsers();
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
        });
    }
  };
  

  const handleEditAccount = (user: User) => {
    navigate(`/admin/editstaff/${user.username}`, { state: { user } });
  };

  useEffect(() => {
    getListUsers();
  }, []);

  const filteredUsers = listUsers.filter((user) => {
    const fullNameWithoutDiacritics = unidecode(user.fullname).toLowerCase();
    const searchQueryWithoutDiacritics = unidecode(searchQuery).toLowerCase();
    return fullNameWithoutDiacritics.includes(searchQueryWithoutDiacritics);
  });

  return (
    <Admin>
      <div>
        <h2 className="text-[3rem] font-[600] mt-6 ">Employee Manager</h2>
        <div className="flex justify-between mt-20 mb-10">
          {" "}
          <button
            onClick={() => navigate("/admin/addstaff")}
            className="w-[170px] h-[40px] cursor-pointer font-[500] border-[1px] border-solid border-[#ccc] p-3"
          >
            Add Account
          </button>
          <div className="flex items-center">
            <input
              className="w-[325px] h-[48px] border-[1px] border-solid border-[#ccc] p-3 border-r-0"
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="flex justify-center items-center text-white w-[50px] h-[50px] bg-[#1890FF]">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        </div>
        <table className="w-full min-w-max table-auto text-left text-[1.8rem] ">
          <thead className="sticky top-0 ">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-200  py-8 px-4 bg-gray-200"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {filteredUsers.map((user) => (
              <tr
                key={user.username}
                className="even:bg-blue-gray-50/50 leading-10"
              >
                <td className="p-4">{user.username}</td>
                <td className="p-4">{user.fullname}</td>
                <td className="p-4">{user.role_name}</td>
                <td className="p-4">
                  <div className="flex gap-6">
                    <span
                      className="text-[#1890ff] cursor-pointer"
                      onClick={() => handleEditAccount(user)}
                    >
                      Edit
                    </span>
                    <span
                      className="text-[#ff4f4f] cursor-pointer"
                      onClick={() => handleRemoveAccount(user.username)}
                    >
                      Remove
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}
