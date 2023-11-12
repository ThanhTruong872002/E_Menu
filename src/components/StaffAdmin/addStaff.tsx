import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Admin from '../../pages/admin';

interface IRole {
  role_id: number;
  role_name: string;
}

interface IAddStaffForm {
  username: string;
  password: string;
  confirmPassword: string;
  fullname: string;
  role: string;
}

export default function AddStaff() {
  const {
    register,
    handleSubmit,
    control, // Định nghĩa đối tượng control
    formState: { errors },
  } = useForm<IAddStaffForm>();

  const confirmPassword = useWatch({ name: 'confirmPassword', control });

  const [roles, setRoles] = useState<IRole[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IAddStaffForm> = async (data) => {
    try {
      // Trước khi thực hiện yêu cầu POST, kiểm tra username
      const isUsernameValid = await checkUsername(data.username);
      if (!isUsernameValid) {
        // Hiển thị thông báo lỗi
        setSuccessMessage('Username đã bị trùng vui lòng sử dụng Username khác!');
        return;
      }

      if (data.password !== data.confirmPassword) {
        // Xác nhận mật khẩu không khớp
        setSuccessMessage('Xác nhận mật khẩu không khớp. Vui lòng kiểm tra lại.');
        return;
      }

      // Thực hiện yêu cầu POST để thêm nhân viên
      const selectedRoleObject = roles.find((role) => role.role_name === selectedRole);
      if (selectedRoleObject) {
        const selectedRoleID = selectedRoleObject.role_id;
        await axios.post('http://localhost:4000/api/addStaff', { ...data, role: selectedRoleID });
        setSuccessMessage('Nhân viên đã được thêm thành công.');
      }
    } catch (error) {
      console.error('Lỗi khi thêm nhân viên:', error);
    }
  };

  const checkUsername = async (username: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/checkUsername?username=${username}`);
      return response.data.success;
    } catch (error) {
      console.error('Lỗi khi kiểm tra username:', error);
      return false;
    }
  };

  useEffect(() => {
    axios.get('http://localhost:4000/api/roles')
      .then(response => {
        setRoles(response.data.roles);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách vai trò:', error);
      });
  }, []);

  return (
    <Admin>
      <div>
        <h2 className="font-[600] text-[3rem] p-8 mb-10">Add new account</h2>
        <div>
          <form className="ml-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center">
              <h2 className="w-[170px]">Username :</h2>
              <label>
                <input
                  className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Username"
                  {...register("username", {
                    required: 'Tên đăng nhập là bắt buộc',
                    pattern: {
                      value: /^[^\s]+$/,
                      message: 'Tên đăng nhập không được chứa khoảng trắng',
                    },
                  })}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.username?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <h2 className="w-[170px]"> Password :</h2>
              <label className="mt-4">
                <input
                  className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
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
              <h2 className="w-[170px]">Confirm password :</h2>
              <label className="mt-4">
                <input
                  className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="password"
                  placeholder="Confirm password"
                  {...register("confirmPassword", {
                    required: 'Please confirm your password',
                    validate: (value) => value === confirmPassword || 'Mật khẩu không khớp',
                  })}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.confirmPassword?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <h2 className="w-[170px]">Fullname :</h2>
              <label className="mt-8">
                <input
                  className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Fullname"
                  {...register("fullname", {
                    required: 'Full Name is required',
                  })}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.fullname?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <h2 className="w-[170px]">Role :</h2>
              <div className="flex items-center">
                {roles.length > 0 ? (
                  <label>
                    <select
                      className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                      value={selectedRole}
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        setSelectedRole(selectedValue);
                        const selectedRoleId = roles.find((role) => role.role_name === selectedValue)?.role_id;
                        console.log(`ID Vai trò đã chọn: ${selectedRoleId}`);
                      }}
                    >
                      <option value="">Chose a role</option>
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
                  <p>Loading...</p>
                )}
              </div>
            </div>
            <div className="flex items-center mt-20">
              <label>
                <button className="border-[1px] border-solid bg-[#1890ff] text-white w-[200px] h-[50px] ml-8 rounded-md">
                  Thêm Nhân Viên
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
