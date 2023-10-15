import { Card, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Admin from "../../pages/admin";

const TABLE_HEAD = [
  "Tài khoản",
  "Mật khẩu",
  "Họ Tên",
  "Email",
  "SĐT",
  "Thao Tác",
];

export interface User {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  maNhom: string | null;
  maLoaiNguoiDung: string;
  hoTen: string;
}

export default function Staff() {
  const navigate = useNavigate();

  const [listUsers, setListUsers] = useState<User[]>([
    {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: null,
      maLoaiNguoiDung: "",
      hoTen: "",
    },
  ]);

  const getListUsers = async () => {
    const res = await axios.get(
      `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&soTrang=1&soPhanTuTrenTrang=20`
    );
    if (res) {
      console.log(res.data);
      setListUsers(res.data.items);
    }
  };

  useEffect(() => {
    getListUsers();
  }, []);

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
            Add staff
          </button>
          <div className="flex items-center">
            <input
              className="w-[325px] h-[48px] border-[1px] border-solid border-[#ccc] p-3 border-r-0"
              type="text"
              placeholder="Search for account"
            />
            <div className="flex justify-center items-center text-white w-[50px] h-[50px] bg-[#1890FF]">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        </div>

        <Card className=" w-full h-[66vh] overflow-y-scroll">
          <table className="w-full min-w-max table-auto text-left text-[1.8rem] ">
            <thead className="sticky top-0 ">
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
              {listUsers.map((users) => (
                <tr className="even:bg-blue-gray-50/50 leading-10 ">
                  <td className="p-4">
                    <Typography color="blue-gray" className="font-normal ">
                      {users.taiKhoan}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography color="blue-gray" className="font-normal">
                      {users.matKhau}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography color="blue-gray" className="font-normal">
                      {users.hoTen}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography color="blue-gray" className="font-normal">
                      {users.email}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography color="blue-gray" className="font-normal">
                      {users.soDt}
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
