const connection = require("./db");

class MenuModel {
  static getMenuItems(callback) {
    const sql = `
      SELECT *
      FROM menu
      INNER JOIN foodcategor ON menu.category_id = foodcategor.category_id
    `;

    connection.query(sql, (err, results) => {
      if (err) {
        callback("Lỗi truy vấn cơ sở dữ liệu", null);
      } else {
        callback(null, results);
      }
    });
  }

  static deleteDishById(dishId, callback) {
    const sql = "DELETE FROM menu WHERE menu_id = ?";
    connection.query(sql, [dishId], (error, results) => {
      if (error) {
        callback(error);
      } else {
        callback(null);
      }
    });
  }
  
}

module.exports = MenuModel;
