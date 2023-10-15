const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Sử dụng middleware cors với tùy chọn để cho phép truy cập từ tên miền frontend
const corsOptions = {
  origin: 'http://localhost:3000', // Tên miền frontend của bạn
  optionsSuccessStatus: 200, // Mã trạng thái thành công cho tùy chọn preflight
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Kết nối đến cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'emenu'
});

connection.connect(function(err) {
  if (err) {
    console.error('Lỗi kết nối cơ sở dữ liệu:', err);
  } else {
    console.log('Kết nối đến cơ sở dữ liệu thành công');
  }
});

// Định nghĩa tuyến đường để truy vấn dữ liệu từ cơ sở dữ liệu
app.get('/api/account', (req, res) => {
  const sql = "SELECT * FROM account";
  connection.query(sql, function(err, results) {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    } else {
      res.json({ account: results });
    }
  });
});

// Định nghĩa tuyến đường POST để kiểm tra đăng nhập
app.post('/api/account', (req, res) => {
  // Lấy dữ liệu từ yêu cầu POST
  const { username, password } = req.body;

  // Thực hiện kiểm tra đăng nhập
  const sql = `SELECT * FROM account WHERE username = ? AND password = ?`;
  connection.query(sql, [username, password], function(err, results) {
    if (err) {
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    } else {
      if (results.length > 0) {
        // cột role trong cơ sở dữ liệu lưu trữ vai trò
        const userRole = results[0].role; 
        // Tìm thấy người dùng, đăng nhập thành công
        res.json({ success: true, message: 'Đăng nhập thành công', role: userRole });
      } else {
        // Không tìm thấy người dùng, đăng nhập không thành công
        res.json({ success: false, message: 'Đăng nhập thất bại' });
      }
    }
  });
});


// Lắng nghe máy chủ trên cổng 4000
const port = 4000;
app.listen(port, () => {
  console.log(`Máy chủ đang lắng nghe trên cổng ${port}`);
});
