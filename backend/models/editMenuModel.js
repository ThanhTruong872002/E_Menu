const connection = require("./db"); // Đảm bảo rằng bạn đã kết nối cơ sở dữ liệu

class EditMenuModel {
  static getDishById(dishId, callback) {
    const sql = "SELECT * FROM menu WHERE menu_id = ?";
    connection.query(sql, [dishId], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result[0]);
      }
    });
  }

  static updateDishById(dishId, updatedData, callback) {
    const sql = "UPDATE menu SET ? WHERE menu_id = ?";
    connection.query(sql, [updatedData, dishId], (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  }
}

module.exports = EditMenuModel;
