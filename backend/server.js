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
const AddStaffController = require('./controllers/addStaffController');
const EditStaffController = require("./controllers/editStaffController");
const MenuController = require("./controllers/menuController");
const AddMenuController = require("./controllers/addMenuController");

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

// Định nghĩa lưu trữ tệp tải lên bằng multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    cb(null, `image${uniqueSuffix}${extension}`);
  },
});

const upload = multer({ storage });

//Login page
app.post("/api/account", LoginController.login);

//Staff page
app.get("/api/accounts-with-roles", StaffController.getAllStaff);
app.delete("/api/deleteAccount/:username", StaffController.deleteStaff);

//addStaff page
// Tuyến đường API để thêm nhân viên
app.post("/api/addStaff", AddStaffController.addStaff);

// Tuyến đường API để kiểm tra username
app.get("/api/checkUsername", AddStaffController.checkUsername);

// Tuyến đường API để lấy danh sách vai trò
app.get("/api/roles", AddStaffController.getRoles); //dùng cho cả editStaff page

//editStaff page
app.get("/api/getAccount/:username", EditStaffController.getAccount);
app.put("/api/updateAccount/:username", EditStaffController.updateAccount);

//menu Page
app.get("/api/menu", MenuController.getMenuItems);
app.delete("/api/deleteDish/:id", MenuController.deleteDish);

//addMenu page 
app.post("/api/uploadImage", upload.single("image"), AddMenuController.uploadImage);
app.post("/api/addDish", AddMenuController.addDish);
app.get("/api/types", AddMenuController.getTypes);


app.get("/api/menu/:menu_id", (req, res) => {
  const dishId = req.params.menu_id; // Lấy menu_id từ tham số URL

  // Sử dụng câu lệnh SQL để lấy thông tin món ăn dựa trên menu_id
  const sql = "SELECT * FROM menu WHERE menu_id = ?";

  connection.query(sql, [dishId], (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Lỗi truy vấn cơ sở dữ liệu",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        error: "Không tìm thấy món ăn với menu_id cung cấp",
      });
    }

    const dishData = result[0];
    res.status(200).json(dishData);
  });
});


app.put("/api/editDish/:menu_id", (req, res) => {
  const menuId = req.params.menu_id; // Lấy menu_id từ tham số URL
  const updatedMenu = req.body; // Dữ liệu cần cập nhật từ yêu cầu PUT

  // Tạo một đối tượng chứa dữ liệu cần cập nhật
  const updatedData = {
    menu_item_name: updatedMenu.menu_item_name,
    Description: updatedMenu.Description,
    Price: updatedMenu.Price,
    category_id: updatedMenu.category_id,
  };

  // Sử dụng câu lệnh SQL để cập nhật thông tin món ăn dựa trên menu_id
  const sql = "UPDATE menu SET ? WHERE menu_id = ?";

  connection.query(sql, [updatedData, menuId], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Lỗi khi cập nhật thông tin món ăn",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy món ăn với menu_id cung cấp",
      });
    }

    // Trả về thông báo cập nhật thành công nếu không có lỗi
    res.status(200).json({
      success: true,
      message: "Cập nhật thông tin món ăn thành công",
    });
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

app.get("/api/tables", (req, res) => {
  // Query to fetch data from the tableid table
  const sql = "SELECT * from tableid";

  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
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
