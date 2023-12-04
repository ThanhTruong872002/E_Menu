import React, { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { Select, Button, message } from "antd";
import Admin from "../../pages/admin";
import axios from "axios";
import { rules } from "../../utils/rules";
import { config } from "process";
import { useNavigate } from "react-router-dom";

interface IAddMenuForm {
  menu_item_name: string;
  Description: string;
  Price: string;
  category_id: number;
  image: File | null;
}

interface Category {
  category_id: number;
  category_name: string;
}

export default function AddMenu() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddMenuForm>();

  const [selectedValue, setSelectedValue] = useState<number>(0);
  const [categoryData, setCategoryData] = useState<Category[] | undefined>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("menu_item_name", data.menu_item_name);
    formData.append("Description", data.Description);
    formData.append("Price", data.Price);
    formData.append("category_id", selectedValue.toString());

    if (selectedImage) {
      // Tải ảnh lên máy chủ và nhận URL của ảnh
      const imageFormData = new FormData();
      imageFormData.append("image", selectedImage);

      axios
        .post("http://localhost:4000/api/uploadImage", imageFormData)
        .then((response) => {
          if (response.data.imageURL) {
            // Gán URL của ảnh vào trường image trong dữ liệu món ăn
            formData.append("image", response.data.imageURL);
            const config = {
              headers: { "Content-Type": "application/json" },
            };

            axios
              .post("http://localhost:4000/api/addDish", formData, config)
              .then((response) => {
                if (response.data.success) {
                  message.success(response.data.message);
                  navigate("/admin/menu");
                } else {
                  message.error("Lỗi khi thêm món ăn.");
                }
              })
              .catch((error) => {
                message.error("Lỗi khi thêm món ăn: " + error.message);
              });
          } else {
            message.error("Lỗi khi tải ảnh lên máy chủ.");
          }
        })
        .catch((error) => {
          message.error("Lỗi khi tải ảnh lên máy chủ: " + error.message);
        });
    } else {
      message.error("Chưa chọn ảnh.");
    }
  });
  useEffect(() => {
    axios.get("http://localhost:4000/api/types").then((response) => {
      setCategoryData(response.data);
    });
  }, []);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      setSelectedImage(selectedFile);

      const imageUrl = URL.createObjectURL(selectedFile);
      setImagePreview(imageUrl);
      console.log(selectedFile);
    } else {
      message.error("Chưa chọn ảnh");
    }
  };

  return (
    <Admin>
      <div>
        <h2 className="font-[600] text-[3rem] p-8 mb-10">Add Dish</h2>
        <div className="ml-20">
          <form className="ml-10" onSubmit={onSubmit}>
            <div className="flex items-center mt-10">
              <h2 className="w-[170px]">Image</h2>
              <label className="mt-8 ml-8">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            {imagePreview && (
              <div className="flex items-center mt-10">
                <h2 className="w-[170px]">Image Preview</h2>
                <label className="mt-8 ml-8">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: "200px" }}
                  />
                </label>
              </div>
            )}
          </form>
        </div>
        <div className="ml-20">
          <form className="ml-10" onSubmit={onSubmit}>
            <div className="flex items-center mt-10">
              <h2 className="w-[170px]"> Food Name </h2>
              <label className="mt-4">
                <input
                  className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Food Name"
                  {...register("menu_item_name", rules.foodname)}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.menu_item_name?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center mt-10">
              <h2 className="w-[170px]">Description</h2>
              <label className="mt-4">
                <input
                  className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Description"
                  {...register("Description", rules.description)}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.Description?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center mt-10">
              <h2 className="w-[170px]">Price</h2>
              <label className="mt-4">
                <input
                  className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="number"
                  placeholder="Price"
                  {...register("Price", rules.price)}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.Price?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center mt-10">
              <h2 className="w-[170px]">Type</h2>
              <label className="mt-8 ml-8">
                <Select
                  value={selectedValue}
                  style={{ width: 120 }}
                  onChange={(value) => {
                    setSelectedValue(value);
                  }}
                >
                  {categoryData?.map((category) => (
                    <Select.Option
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.category_name}
                    </Select.Option>
                  ))}
                </Select>
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.category_id?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center mt-20">
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
