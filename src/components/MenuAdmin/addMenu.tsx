import { useForm } from "react-hook-form";
import { rules } from "../../utils/rules";
import { Button, Upload, UploadProps, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import Admin from "../../pages/admin";

interface IAddMenuForm {
  image: string;
  foodname: string;
  decription: string;
  price: string;
  type: string;
}

export default function AddMenu() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddMenuForm>();

  const [imageBase64, setImageBase64] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const props: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    async onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        try {
          // Đọc file ảnh và chuyển thành dữ liệu base64
          const base64Data = await getBase64(info.file.originFileObj as File);
          if (setImageBase64) {
            setImageBase64(base64Data);
          }
          // Do something with the base64 data, for example, send it to the server
        } catch (error) {
          console.error("Error converting to base64:", error);
        }
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const onSumbit = handleSubmit((datas) => {
    datas = { ...datas, image: imageBase64 };
    datas = { ...datas, type: selectedValue };

    console.log(datas);
  });

  return (
    <Admin>
      <div>
        <h2 className="font-[600] text-[3rem] p-8 mb-10">Add Dish</h2>
        <div className="ml-20">
          <form className="ml-10" onSubmit={onSumbit}>
            <div className="flex items-center mt-10">
              <h2>Image </h2>
              <label className="ml-56">
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Choose Image</Button>
                </Upload>
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center"></div>
              </label>
            </div>
            <div className="flex items-center mt-10 ">
              <h2 className="w-[170px]"> Food Name </h2>
              <label className="mt-4">
                <input
                  className=" ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Food Name"
                  {...register("foodname", rules.foodname)}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.foodname?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center mt-10">
              <h2 className="w-[170px]">Decription</h2>
              <label className="mt-4">
                <input
                  className=" ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Decription"
                  {...register("decription", rules.decription)}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.decription?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center mt-10">
              <h2 className="w-[170px]">Price</h2>
              <label className="mt-4">
                <input
                  className=" ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Price"
                  {...register("price", rules.type)}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem]  text-[1.4rem] text-center">
                  {errors.price?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center mt-10">
              <h2 className="w-[170px]">Type</h2>
              <label className="mt-8 ml-8">
                <Select
                  defaultValue="Fast Food"
                  style={{ width: 120 }}
                  options={[
                    { value: "Fast Food", label: "FastFood" },
                    { value: "The Buger", label: "The Buger" },
                    { value: "Pizza", label: "Pizza" },
                    { value: "Dish", label: "Dish" },
                  ]}
                  onChange={(value) => setSelectedValue(value)}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.type?.message}
                </div>
              </label>
            </div>

            <div className="flex items-center mt-20">
              <h2 className="w-[170px]">Operation:</h2>
              <label>
                <button className="border-[1px] border-solid bg-[#1890ff] text-white w-[200px] h-[50px] ml-8 rounded-md">
                  Add Dish
                </button>
              </label>
            </div>
          </form>
        </div>
      </div>
    </Admin>
  );
}
