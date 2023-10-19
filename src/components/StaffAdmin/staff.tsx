import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Admin from "../../pages/admin";

const TABLE_HEAD = ['Tài khoản', 'Mật khẩu', 'Họ Tên', 'Vai trò', 'Thao Tác'];

interface User {
  account_id: string;
  username: string;
  password: string;
  fullname: string;
  role_id: string; // Trường chứa ID của vai trò
}

interface Role {
  id: string;
  name: string;
}

export default function Staff() {
  const navigate = useNavigate();
  const [listUsers, setListUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getListUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/accounts-with-roles');

      if (response.data.accounts) {
        setListUsers(response.data.accounts);
      } else {
        console.log('Không có dữ liệu người dùng từ máy chủ.');
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu từ máy chủ: ', error);
    }
  }

  const handleRemoveAccount = (username: string) => {
    axios.delete(`http://localhost:4000/api/deleteAccount/${username}`)
      .then(response => {
        console.log('Tài khoản đã được xóa thành công.');
        getListUsers(); // Tải lại danh sách tài khoản sau khi xóa
      })
      .catch(error => {
        console.error('Lỗi khi xóa tài khoản:', error);
      });
  }

  const handleEditAccount = (user: User) => {
    // Chuyển tới trang chỉnh sửa và truyền thông tin tài khoản
    navigate(`/admin/editstaff/${user.username}`, { state: { user } });
  }

  useEffect(() => {
    getListUsers();
  }, []);

  return (
    <Admin>
      <div>
        <h2 className="text-[3rem] font-[600] mt-6 ">Employee Manager</h2>
        <div className="flex justify-between mt-20 mb-10">
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
              placeholder="Tìm kiếm tài khoản"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            {listUsers
              .filter((user) => user.fullname.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((user) => (
                <tr key={user.username} className="even:bg-blue-gray-50/50 leading-10">
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{user.password}</td>
                  <td className="p-4">{user.fullname}</td>
                  <td className="p-4">{user.role_id}</td>
                  <td className="p-4">
                    <div className="flex gap-6">
                      <span
                        className="text-[#1890ff] cursor-pointer"
                        onClick={() => handleEditAccount(user)}
                      >
                        Chỉnh sửa
                      </span>
                      <span
                        className="text-[#ff4f4f] cursor-pointer"
                        onClick={() => handleRemoveAccount(user.username)}
                      >
                        Xóa
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
