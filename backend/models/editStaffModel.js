const connection = require("./db");

class EditStaffModel {
  static getAccount(username, callback) {
    const sql = "SELECT * FROM account WHERE username = ?";
    connection.query(sql, [username], (err, results) => {
      if (err) {
        callback("Lỗi truy vấn cơ sở dữ liệu", null);
      } else if (results.length > 0) {
        callback(null, results[0]);
      } else {
        callback(null, null);
      }
    });
  }

  static updateAccount(username, password, fullname, role, callback) {
    const sql = "UPDATE account SET password = ?, fullname = ?, role = ? WHERE username = ?";
    connection.query(sql, [password, fullname, role, username], (err, result) => {
      if (err) {
        callback("Lỗi khi cập nhật tài khoản", null);
      } else {
        callback(null, "Cập nhật tài khoản thành công");
      }
    });
  }
}

module.exports = EditStaffModel;
