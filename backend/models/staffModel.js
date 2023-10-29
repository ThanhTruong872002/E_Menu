const db = require('./db'); // Import tệp db.js

class StaffModel {
  // Phương thức để lấy danh sách nhân viên
  static getAllStaff(callback) {
    const sql = `
      SELECT account.account_id, account.username, account.fullname, role.role_name
      FROM account
      INNER JOIN role ON account.role = role.role_id`;
    db.query(sql, (err, results) => {
      if (err) {
        callback("Lỗi truy vấn cơ sở dữ liệu", null);
      } else {
        callback(null, results);
      }
    });
  }

  // Phương thức để xóa tài khoản nhân viên
  static deleteStaff(username, callback) {
    const sql = "DELETE FROM account WHERE username = ?";
    db.query(sql, [username], (err, result) => {
      if (err) {
        callback("Lỗi khi xóa tài khoản", null);
      } else {
        callback(null, "Xóa tài khoản thành công");
      }
    });
  }
}

module.exports = StaffModel;
