import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Admin from "../../pages/admin";

interface ICategory {
  category_id: number;
  category_name: string;
}

interface IMenuItem {
  menu_item_name: string;
  Description: string;
  Price: string;
  category_id: number;
  image: string;
}

interface IEditMenuForm {
  menu_item_name: string;
  Description: string;
  Price: string;
  category_id: number;
  image: FileList;
}

export default function EditMenu() {
  const { menu_id } = useParams();
  useEffect(() => {
    console.log("menu_id received:", menu_id);
  }, [menu_id]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IEditMenuForm>();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [menuItemData, setMenuItemData] = useState<IMenuItem | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<FileList | null>(null);
  console.log(imagePreview);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/types")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách loại món ăn:", error);
      });

    axios

      .get(`http://localhost:4000/api/menu/${menu_id}`)
      .then((response) => {
        const menuData = response.data;
        setMenuItemData(menuData);
        setValue("menu_item_name", menuData.menu_item_name);
        setValue("Description", menuData.Description);
        setValue("Price", menuData.Price);
        setValue("category_id", menuData.category_id.toString());
        // Gán ảnh hiện tại cho hiển thị xem trước
        setImagePreview(`http://localhost:4000/uploads${menuData.Image}`);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin món ăn:", error);
      });
  }, [menu_id, setValue]);

  const onSubmit: SubmitHandler<IEditMenuForm> = async (data) => {
    console.log("category_id:", data.category_id);
    const category_id = data.category_id.toString();
    try {
      const formData = new FormData();
      formData.append("menu_item_name", data.menu_item_name);
      formData.append("Description", data.Description);
      formData.append("Price", data.Price.toString());
      formData.append("category_id", category_id.toString()); // Sử dụng giá trị kiểu số

      if (selectedImage) {
        formData.append("image", selectedImage[0]);
      }

      await axios.put(
        `http://localhost:4000/api/editDish/${menu_id}`,
        formData
      );
      setSuccessMessage("Thông tin món ăn đã được cập nhật thành công.");
    } catch (error) {
      console.error("Lỗi khi cập nhật món ăn:", error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files;
      setSelectedImage(selectedFile);

      const imageUrl = URL.createObjectURL(selectedFile[0]);
      setImagePreview(imageUrl);
    }
  };

  return (
    <Admin>
      <div>
        <h2 className="font-[600] text-[3rem] p-8 mb-10">Edit dishes</h2>
        <div>
          <form className="ml-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center">
              <h2 className="w-[170px]">Food's name:</h2>
              <label>
                <input
                  className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  {...register("menu_item_name")}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.menu_item_name?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <h2 className="w-[170px]">Details:</h2>
              <label className="mt-4">
                <input
                  className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="text"
                  placeholder="Mô Tả"
                  {...register("Description")}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.Description?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <h2 className="w-[170px]">Prices:</h2>
              <label className="mt-4">
                <input
                  className="ml-8 p-3 w-[720px] h-[40px] border-[1px] border-solid border-[#ccc]"
                  type="number"
                  placeholder="Giá Tiền"
                  {...register("Price")}
                />
                <div className="mt-4 text-red-600 min-h-[1.25rem] text-[1.4rem] text-center">
                  {errors.Price?.message}
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <h2 className="w-[170px]">Type Foods:</h2>
              <label className="mt-8 ml-8">
                <select
                  {...register("category_id")}
                  className="p-3 border-[1px] border-solid border-[#ccc]"
                >
                  {categories.map((category) => (
                    <option
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex items-center mt-10">
              <h2 className="w-[170px]">Image:</h2>
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
                <h2 className="w-[170px]">Preview Image:</h2>
                <label className="mt-8 ml-8">
                  <img
                    src={imagePreview}
                    alt="Xem Trước"
                    style={{ maxWidth: "200px" }}
                  />
                </label>
              </div>
            )}
            <div className="flex items-center justify-center mt-20">
              <label>
                <button className="border-[1px] border-solid bg-[#1890ff] text-white w-[250px] h-[50px]  rounded-md">
                  Update
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
