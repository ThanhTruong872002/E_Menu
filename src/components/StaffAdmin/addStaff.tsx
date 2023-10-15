import { useForm } from "react-hook-form";
import { rules } from "../../utils/rules";
import Admin from "../../pages/admin";

interface IAddStaffForm {
  username: string;
  password: string;
  fullname: string;
  email: string;
  phonenumber: string;
}

export default function AddStaff() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddStaffForm>();

  const onSumbit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Admin>
      <div>
        <h2 className="font-[600] text-[3rem] p-8 mb-10">Add Staff</h2>
        <div>
          <form className="ml-10" onSubmit={onSumbit}>
            <div className="flex items-center">
              <h2 className="w-[170px]">Account :</h2>
              <label>
                <input
                  className=" ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Account"
                  {...register("username", rules.username)}
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
                  className=" ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="password"
                  placeholder="Password"
                  {...register("password", rules.password)}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.password?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <h2 className="w-[170px]">Email:</h2>
              <label className="mt-4">
                <input
                  className=" ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Email"
                  {...register("email", rules.email)}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.email?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <h2 className="w-[170px]">Phone Number :</h2>
              <label className="mt-4">
                <input
                  className=" ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Phone Number"
                  {...register("phonenumber", rules.phonenumber)}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem]  text-[1.4rem] text-center">
                  {errors.phonenumber?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <h2 className="w-[170px]">Full Name :</h2>
              <label className="mt-8">
                <input
                  className=" ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Full Name"
                  {...register("fullname", rules.fullname)}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.fullname?.message}
                </div>
              </label>
            </div>

            <div className="flex items-center mt-20">
              <h2 className="w-[170px]">Operation:</h2>
              <label>
                <button className="border-[1px] border-solid bg-[#1890ff] text-white w-[200px] h-[50px] ml-8 rounded-md">
                  Add Staff
                </button>
              </label>
            </div>
          </form>
        </div>
      </div>
    </Admin>
  );
}
