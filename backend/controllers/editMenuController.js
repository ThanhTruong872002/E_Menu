const EditMenuModel = require("../models/editMenuModel");

class EditMenuController {
  static getDish(req, res) {
    const { menu_id } = req.params;

    EditMenuModel.getDishById(menu_id, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
      } else {
        if (!result) {
          res.status(404).json({ error: "Không tìm thấy món ăn với menu_id cung cấp" });
        } else {
          res.status(200).json(result);
        }
      }
    });
  }

  static updateDish(req, res) {
    const { menu_id } = req.params;
    const updatedMenu = req.body;

    const updatedData = {
      menu_item_name: updatedMenu.menu_item_name,
      Description: updatedMenu.Description,
      Price: updatedMenu.Price,
      category_id: updatedMenu.category_id,
    };

    EditMenuModel.updateDishById(menu_id, updatedData, (err, result) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Lỗi khi cập nhật thông tin món ăn",
          error: err.message,
        });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ success: false, message: "Không tìm thấy món ăn với menu_id cung cấp" });
        } else {
          res.status(200).json({ success: true, message: "Cập nhật thông tin món ăn thành công" });
        }
      }
    });
  }
}

module.exports = EditMenuController;
