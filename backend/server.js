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
const EditMenuController = require("./controllers/editMenuController");
const TablesController = require('./controllers/tableController');
const locationController = require('./controllers/locationController');

const imageUploadPath = path.join(__dirname, "images");
if (!fs.existsSync(imageUploadPath)) {
  fs.mkdirSync(imageUploadPath);
}

// Sử dụng middleware cors với tùy chọn để cho phép truy cập từ tên miền frontend
const corsOptions = {
  origin: ["http://localhost:3000", "http://192.168.1.7:3000"], // Tên miền frontend
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
const appDomain = "http://localhost:3000/menu";

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

//editMenu page
app.get("/api/menu/:menu_id", EditMenuController.getDish);
app.put("/api/editDish/:menu_id", EditMenuController.updateDish);

//table page
app.get("/api/tables", TablesController.getAllTables);
app.delete("/api/tables/:table_id", TablesController.deleteTable);

//addTable page
app.get("/api/locations", locationController.getLocations);
app.post("/api/tables", async (req, res) => {
  const { table_name, seat_capacity, location, status } = req.body;

  // Tạo một bàn mới trong cơ sở dữ liệu (bạn cần có một hàm để thực hiện thao tác này)
  try {
    const result = await createNewTable(table_name, seat_capacity, location, status);
    if (!result) {
      return res.status(500).json({
        success: false,
        message: "Lỗi khi tạo bàn trong cơ sở dữ liệu",
      });
    }

    const tableId = result.insertId;

    // Tạo đường dẫn URL (QR code) từ ID bàn
    const qrCode = `http://localhost:3000/customer/menuqr/${tableId}`;

    // Cập nhật bàn với mã QR code mới được tạo
    const updateQrCodeSql =
      "UPDATE tableid SET qr_code = ? WHERE table_id = ?";
    connection.query(updateQrCodeSql, [qrCode, tableId], (updateErr, updateResult) => {
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
    });
  } catch (error) {
    console.error("Error adding the table:", error);
    // eslint-disable-next-line no-undef
    message.error("Failed to add the table.");
    res.status(500).json({
      success: false,
      message: "Lỗi khi thêm bàn",
      error: error.message,
    });
  }
});

// Hàm để tạo bàn mới
async function createNewTable(table_name, seat_capacity, location, status) {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO tableid (table_name, seat_capacity, location, status) VALUES (?, ?, ?, ?)";
    connection.query(sql, [table_name, seat_capacity, location, status], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}


// Add this new route to fetch table data by ID
app.get("/api/tables/:table_id", (req, res) => {
  const tableId = req.params.table_id;
  console.log("Received table_id:", tableId);

  // Use a SQL query to get the table data with the specified table_id
  const getTableSql = "SELECT * FROM tableid WHERE table_id = ?";

  connection.query(getTableSql, [tableId], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error fetching table data",
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Table not found with the provided table_id",
      });
    }

    const tableData = result[0];
    res.status(200).json(tableData);
  });
});


app.put("/api/tables/:table_id", async (req, res) => {
  const tableId = req.params.table_id;
  const updatedTable = req.body;

  const updateData = {
    table_name: updatedTable.table_name,
    seat_capacity: updatedTable.seat_capacity,
    location: updatedTable.location,
  };

  const updateTableSql = "UPDATE tableid SET ? WHERE table_id = ?";

  connection.query(updateTableSql, [updateData, tableId], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error updating table information",
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Table not found with the provided table_id",
      });
    }

    res.status(200).json({
      success: true,
      message: "Table information updated successfully",
    });
  });
});

// Bảo vệ tuyến đường /admin bằng middleware requireAuth
app.get("/admin", requireAuth, (req, res) => {
  // Xử lý trang quản trị ở đây
});

// Lắng nghe máy chủ trên cổng 4000
const port = 4000;
const host = "0.0.0.0";
app.listen(port, host, () => {
  console.log(`Máy chủ đang lắng nghe trên cổng ${port}`);
});
