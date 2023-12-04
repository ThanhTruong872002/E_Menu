const db = require('./db'); // Import tệp db.js để thực hiện kết nối đến cơ sở dữ liệu MySQL

const Login = {
  checkLogin: (username, password, callback) => {
    db.query('SELECT * FROM account WHERE username = ? AND password = ?', [username, password], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length > 0) {
        const userRole = results[0].role;
        const fullname = results[0].fullname;
        
        return callback(null, { success: true, message: "Đăng nhập thành công", role: userRole, fullname: fullname });
      } else {
        return callback(null, { success: false, message: "Đăng nhập thất bại" });
      }
    });
  },
};

module.exports = Login;

