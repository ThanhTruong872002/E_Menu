const AddMenuModel = require("../models/addMenuModel");

class addMenuController {
  static uploadImage(req, res) {
    const imageFile = req.file;

    AddMenuModel.uploadImage(imageFile, (imageURL) => {
      if (!imageURL) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng tải lên một tệp ảnh",
        });
      }

      res
        .status(200)
        .json({ success: true, message: "Tải ảnh lên thành công", imageURL });
    });
  }

  static addDish(req, res) {
    const {
      menu_item_name,
      Description,
      Price,
      category_id,
      image: imageFileName,
    } = req.body;

    AddMenuModel.addDish(
      menu_item_name,
      Description,
      Price,
      category_id,
      imageFileName,
      (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Lỗi khi lưu món ăn vào cơ sở dữ liệu",
            error: err.message,
          });
        }

        res.status(200).json({
          success: true,
          message: "Món ăn đã được thêm thành công",
        });
      }
    );
  }

  static getTypes(req, res) {
    AddMenuModel.getTypes((err, results) => {
      if (err) {
        res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
      } else {
        res.json(results);
      }
    });
  }
}

module.exports = addMenuController;
