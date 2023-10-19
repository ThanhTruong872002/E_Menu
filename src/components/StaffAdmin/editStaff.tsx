import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Admin from '../../pages/admin';

interface IRole {
  role_id: number;
  role_name: string;
}

interface IUserData {
  username: string;
  password: string;
  fullname: string;
  role_name: string;
}

interface IEditStaffForm {
  username: string;
  password: string;
  confirmPassword: string; // Thêm trường xác nhận mật khẩu
  fullname: string;
  role: string;
}

export default function EditStaff() {
  const { username } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IEditStaffForm>();

  const [roles, setRoles] = useState<IRole[]>([]);
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/roles')
      .then(response => {
        setRoles(response.data.roles);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách vai trò:', error);
      });

    axios.get(`http://localhost:4000/api/getAccount/${username}`)
      .then(response => {
        const userData = response.data.account;
        setUserData(userData);
        setValue('username', userData.username);
        setValue('password', userData.password);
        setValue('confirmPassword', userData.password); // Đặt giá trị mặc định cho confirmPassword
        setValue('fullname', userData.fullname);
        setValue('role', userData.role_name);
      })
      .catch(error => {
        console.error('Lỗi khi lấy thông tin tài khoản:', error);
      });
  }, [username, setValue]);

  const onSubmit: SubmitHandler<IEditStaffForm> = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        // Kiểm tra xác nhận mật khẩu
        setSuccessMessage('Xác nhận mật khẩu không khớp.');
        return;
      }

      const selectedRoleObject = roles.find((role) => role.role_name === data.role);
      if (selectedRoleObject) {
        const selectedRoleID = selectedRoleObject.role_id;
        await axios.put(`http://localhost:4000/api/updateAccount/${username}`, { ...data, role: selectedRoleID });
        setSuccessMessage('Thông tin tài khoản đã được cập nhật thành công.');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật tài khoản:', error);
    }
  };

  return (
    <Admin>
      <div>
        <h2 className="font-[600] text-[3rem] p-8 mb-10">Chỉnh Sửa Tài Khoản</h2>
        <div>
          <form className="ml-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center">
              <h2 className="w-[170px]">Tên đăng nhập :</h2>
              <label>
                <input
                  className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Tên đăng nhập"
                  value={userData?.username}
                  disabled
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.username?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <h2 className="w-[170px]"> Mật khẩu :</h2>
              <label className="mt-4">
                <input
                  className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="password"
                  placeholder="Mật khẩu"
                  {...register('password', {
                    required: 'Mật khẩu là bắt buộc',
                    minLength: {
                      value: 8,
                      message: 'Mật khẩu phải có ít nhất 8 ký tự',
                    },
                  })}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.password?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <h2 className="w-[170px]">Xác nhận mật khẩu :</h2>
              <label className="mt-4">
                <input
                  className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  {...register('confirmPassword', {
                    required: 'Xác nhận mật khẩu là bắt buộc',
                  })}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.confirmPassword?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <h2 className="w-[170px]">Họ và Tên :</h2>
              <label className="mt-8">
                <input
                  className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Họ và Tên"
                  {...register('fullname', {
                    required: 'Họ và Tên là bắt buộc',
                  })}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.fullname?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <h2 className="w-[170px]">Vai trò :</h2>
              <div className="flex items-center">
                {roles.length > 0 ? (
                  <label>
                    <select
                      className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                      {...register('role')}
                      defaultValue={userData ? userData.role_name : ''}
                    >
                      <option value="">Chọn vai trò</option>
                      {roles.map((role) => (
                        <option key={role.role_id} value={role.role_name}>
                          {role.role_name}
                        </option>
                      ))}
                    </select>
                    <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                      {errors.role && <span>{errors.role.message}</span>}
                    </div>
                  </label>
                ) : (
                  <p>Đang tải vai trò...</p>
                )}
              </div>
            </div>
            <div className="flex items-center mt-20">
              <h2 className="w-[170px]">Thao tác:</h2>
              <label>
                <button className="border-[1px] border-solid bg-[#1890ff] text-white w-[200px] h-[50px] ml-8 rounded-md">
                  Lưu Thay Đổi
                </button>
              </label>
            </div>
            {successMessage && (
              <div className="text-red-600 font-bold text-xl mt-4">
                {successMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </Admin>
  );
}
