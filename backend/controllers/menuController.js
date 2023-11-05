const MenuModel = require("../models/menuModel");

class MenuController {
  static getMenuItems(req, res) {
    MenuModel.getMenuItems((err, results) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json(results);
      }
    });
  }

  static deleteDish(req, res) {
    const { id } = req.params;

    MenuModel.deleteDishById(id, (error) => {
      if (error) {
        res.status(500).json({ error: "Lỗi khi xóa món ăn từ menu" });
      } else {
        res.status(200).json({ message: "Xóa món ăn thành công" });
      }
    });
  }
}

module.exports = MenuController;
