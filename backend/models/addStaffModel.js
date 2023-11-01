const connection = require("./db");

class AddStaffModel {
  static addStaff(account_id, username, password, fullname, role, callback) {
    const sql = "INSERT INTO account (account_id, username, password, fullname, role) VALUES (?, ?, ?, ?, ?)";
    connection.query(
      sql,
      [account_id, username, password, fullname, role],
      function (err, results) {
        if (err) {
          callback("Lỗi truy vấn cơ sở dữ liệu", null);
        } else {
          callback(null, "Thêm nhân viên thành công");
        }
      }
    );
  }

  static getRoles(callback) {
    const sql = "SELECT role_id, role_name FROM role";
    connection.query(sql, (err, results) => {
      if (err) {
        callback("Lỗi truy vấn cơ sở dữ liệu", null);
      } else {
        callback(null, results);
      }
    });
  }

  static checkUsername(username, callback) {
    const sql = "SELECT * FROM account WHERE username = ?";
    connection.query(sql, [username], function (err, results) {
      if (err) {
        callback("Lỗi truy vấn cơ sở dữ liệu", null);
      } else {
        if (results.length > 0) {
          callback("Username đã tồn tại", null);
        } else {
          callback(null, "Username hợp lệ");
        }
      }
    });
  }
}

module.exports = AddStaffModel;
