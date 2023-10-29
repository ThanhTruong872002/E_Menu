const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const app = express();
const fs = require("fs");
const LoginController = require('./controllers/loginController');
const StaffController = require('./controllers/staffController');

const imageUploadPath = path.join(__dirname, "images");
if (!fs.existsSync(imageUploadPath)) {
  fs.mkdirSync(imageUploadPath);
}

// Sử dụng middleware cors với tùy chọn để cho phép truy cập từ tên miền frontend
const corsOptions = {
  origin: "http://localhost:3000", // Tên miền frontend
  optionsSuccessStatus: 200, // Mã trạng thái thành công cho tùy chọn preflight
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Kết nối đến cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "emenu",
});

connection.connect(function (err) {
  if (err) {
    console.error("Lỗi kết nối cơ sở dữ liệu:", err);
  } else {
    console.log("Kết nối đến cơ sở dữ liệu thành công");
  }
});

// Middleware kiểm tra xác thực trước khi xử lý bất kỳ tuyến đường bảo mật nào
function requireAuth(req, res, next) {
  if (req.isAuthenticated()) {
    // Nếu người dùng đã đăng nhập, cho phép họ tiếp tục
    next();
  } else {
    // Nếu người dùng chưa đăng nhập, gửi lỗi hoặc chuyển hướng đến trang đăng nhập
    res.status(401).json({ error: "Bạn chưa đăng nhập" });
  }
}

app.post("/api/account", LoginController.login);

app.get("/api/accounts-with-roles", StaffController.getAllStaff);

app.delete("/api/deleteAccount/:username", StaffController.deleteStaff);


// Thiết lập lưu trữ tệp tải lên bằng multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Chọn thư mục lưu trữ tùy theo loại tệp
    if (file.fieldname === "image") {
      cb(null, "uploads/images/");
    } else if (file.fieldname === "otherImage") {
      cb(null, "uploads/images/");
    } else {
      cb(null, "uploads/images/");
    }
  },
  filename: (req, file, cb) => {
    // Tạo tên tệp định danh bằng thời gian và định dạng tệp
    const extension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + uniqueSuffix + extension);
  },
});

const upload = multer({ storage });

app.get("/api/roles", (req, res) => {
  const sql = "SELECT role_id, role_name FROM role";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
    } else {
      res.json({ roles: results });
    }
  });
});

app.post("/api/addStaff", (req, res) => {
  const { account_id, username, password, fullname, role } = req.body;

  // Kiểm tra xem `role` có phải là một số nguyên không
  if (!Number.isInteger(role)) {
    res.status(400).json({ error: "ID của vai trò phải là một số nguyên" });
    return;
  }

  // Thực hiện truy vấn SQL để thêm thông tin nhân viên vào cơ sở dữ liệu
  const sql =
    "INSERT INTO account (account_id, username, password, fullname, role) VALUES (?, ?, ?, ?, ?)";
  connection.query(
    sql,
    [account_id, username, password, fullname, role],
    function (err, results) {
      if (err) {
        res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
      } else {
        res.json({ success: true, message: "Thêm nhân viên thành công" });
      }
    }
  );
});




// API endpoint để kiểm tra username
app.get("/api/checkUsername", (req, res) => {
  const { username } = req.query;

  // Thực hiện truy vấn SQL để kiểm tra username có tồn tại trong cơ sở dữ liệu không
  const sql = "SELECT * FROM account WHERE username = ?";
  connection.query(sql, [username], function (err, results) {
    if (err) {
      res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
    } else {
      if (results.length > 0) {
        res.status(400).json({ error: "Username đã tồn tại" });
      } else {
        res.json({ success: true });
      }
    }
  });
});

// Định nghĩa tuyến đường API để lấy thông tin tài khoản dựa trên username
app.get("/api/getAccount/:username", (req, res) => {
  const username = req.params.username;
  const sql = "SELECT * FROM account WHERE username = ?";
  connection.query(sql, [username], function (err, results) {
    if (err) {
      res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
    } else {
      if (results.length > 0) {
        res.json({ account: results[0] });
      } else {
        res.status(404).json({ error: "Không tìm thấy tài khoản" });
      }
    }
  });
});

app.put("/api/updateAccount/:username", (req, res) => {
  const username = req.params.username;
  const { password, fullname, role } = req.body;
  // Thực hiện truy vấn SQL để cập nhật thông tin tài khoản
  const sql =
    "UPDATE account SET password = ?, fullname = ?, role = ? WHERE username = ?";
  connection.query(
    sql,
    [password, fullname, role, username],
    function (err, result) {
      if (err) {
        res.status(500).json({ error: "Lỗi khi cập nhật tài khoản" });
      } else {
        res.json({ success: true, message: "Cập nhật tài khoản thành công" });
      }
    }
  );
});

app.get("/api/menu", (req, res) => {
  const sql = `
    SELECT menu.menu_item_name, menu.Description, menu.Price, menu.Image, foodcategor.category_name
    FROM menu
    INNER JOIN foodCategor ON menu.category_id = foodcategor.category_id
  `;

  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
    } else {
      res.json(results);
    }
  });
});

// Định nghĩa tuyến đường API để lấy danh sách các loại
app.get("/api/types", (req, res) => {
  const sql = "SELECT * FROM foodcategor";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
    } else {
      res.json(results);
    }
  });
});

app.post("/api/uploadImage", upload.single("image"), (req, res) => {
  const imageName = req.file.filename; // Lấy tên tệp ảnh từ req.file

  // Tạo URL cho ảnh
  const imageURL = `/images/${imageName}`; // Tạo URL dưới dạng /images/tên-ảnh

  // Trả về URL của ảnh trong phản hồi
  res.json({ imageURL });
});

// Định nghĩa tuyến đường API để thêm món ăn
app.post("/api/addDish", (req, res) => {
  const {
    menu_item_name,
    Description,
    Price,
    category_id,
    image: imageFileName,
  } = req.body;

  // Thêm thông tin món ăn và tên tệp ảnh vào cơ sở dữ liệu
  const sql =
    "INSERT INTO menu (menu_item_name, Description, Price, category_id, Image) VALUES (?, ?, ?, ?, ?)";
  connection.query(
    sql,
    [menu_item_name, Description, Price, category_id, imageFileName],
    function (err, result) {
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
});

app.post("/api/uploadImage", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng tải lên một tệp ảnh",
    });
  }

  // Đường dẫn đến tệp ảnh đã tải lên
  const imagePath = req.file.path;

  // Trả về URL hoặc thông tin về tệp ảnh đã tải lên
  res.status(200).json({
    success: true,
    message: "Tải ảnh lên thành công",
    imageURL: imagePath,
  });
});

app.get("/api/locations", (req, res) => {
  const sql = "SELECT location_id, location_name FROM locationtable";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
});

const appDomain = "http://localhost:3000/menu";

// Định nghĩa tuyến đường API để thêm bàn
app.post("/api/tables", (req, res) => {
  const { table_name, seat_capacity, location, status } = req.body;

  // Thực hiện truy vấn SQL để thêm thông tin bàn vào cơ sở dữ liệu
  const sql =
    "INSERT INTO tableid (table_name, seat_capacity, location, status) VALUES (?, ?, ?, ?)";
  connection.query(
    sql,
    [table_name, seat_capacity, location, status],
    function (err, result) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Lỗi khi thêm bàn vào cơ sở dữ liệu",
          error: err.message,
        });
      }

      // Trả về thông tin bàn và table_id
      const tableId = result.insertId;

      // Tạo mã QR code từ table_id
      const qrCode = `http://localhost:3000/menu/tables/${tableId}`;

      // Cập nhật cơ sở dữ liệu với mã QR code
      const updateQrCodeSql =
        "UPDATE tableid SET qr_code = ? WHERE table_id = ?";
      connection.query(
        updateQrCodeSql,
        [qrCode, tableId],
        function (updateErr, updateResult) {
          if (updateErr) {
            return res.status(500).json({
              success: false,
              message: "Lỗi khi cập nhật mã QR code",
              error: updateErr.message,
            });
          }

          res.status(200).json({
            success: true,
            message: "Thêm bàn thành công",
            table_id: tableId,
            qr_code: qrCode,
          });
        }
      );
    }
  );
});

// Bảo vệ tuyến đường /admin bằng middleware requireAuth
app.get("/admin", requireAuth, (req, res) => {
  // Xử lý trang quản trị ở đây
});

// Lắng nghe máy chủ trên cổng 4000
const port = 4000;
app.listen(port, () => {
  console.log(`Máy chủ đang lắng nghe trên cổng ${port}`);
});
