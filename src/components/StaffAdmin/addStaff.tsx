import { useForm, SubmitHandler } from 'react-hook-form';
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
  fullname: string;
  role: string;
}

export default function AddStaff() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddStaffForm>();

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
        <h2 className="font-[600] text-[3rem] p-8 mb-10">Add Staff</h2>
        <div>
          <form className="ml-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center">
              <h2 className="w-[170px]">Account :</h2>
              <label>
                <input
                  className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Account"
                  {...register("username", {
                    required: 'Username is required',
                    pattern: {
                      value: /^[^\s]+$/,
                      message: 'Username cannot contain spaces',
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
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.password?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <h2 className="w-[170px]">Full Name :</h2>
              <label className="mt-8">
                <input
                  className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Full Name"
                  {...register("fullname", {
                    required: 'Full name is required',
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
                        console.log(`Selected Role ID: ${selectedRoleId}`);
                      }}
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
                  <p>Loading roles...</p>
                )}
              </div>
            </div>
            <div className="flex items-center mt-20">
              <h2 className="w-[170px]">Operation:</h2>
              <label>
                <button className="border-[1px] border-solid bg-[#1890ff] text-white w-[200px] h-[50px] ml-8 rounded-md">
                  Add Staff
                </button>
              </label>
            </div>
            {successMessage && (
              <div className="text-green-600 font-bold text-xl mt-4">
                {successMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </Admin>
  );
}
