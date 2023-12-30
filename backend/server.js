const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const fs = require("fs");
const util = require("util");

const LoginController = require("./controllers/loginController");
const StaffController = require("./controllers/staffController");
const AddStaffController = require("./controllers/addStaffController");
const EditStaffController = require("./controllers/editStaffController");
const MenuController = require("./controllers/menuController");
const AddMenuController = require("./controllers/addMenuController");
const EditMenuController = require("./controllers/editMenuController");
const TablesController = require("./controllers/tableController");
const locationController = require("./controllers/locationController");
const editTableController = require("./controllers/editTableController");
const customerMenuCartController = require("./controllers/customerMenuCartController");
const bookTableController = require("./controllers/bookTableController");
const dashboardController = require("./controllers/DashboardController");
const transactionController = require("./controllers/transactionController");
const TransactionController = require("./controllers/transactionController");

const imageUploadPath = path.join(__dirname, "images");
if (!fs.existsSync(imageUploadPath)) {
  fs.mkdirSync(imageUploadPath);
}

// const corsOptions = {
//   origin: ["https://www.auto360danang.com"],
//   // optionsSuccessStatus: 200,
//   // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   // allowedHeaders: "Content-Type,Authorization",
// };

app.use(express.json());

app.use((req, res, next) => {
  next();
});
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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

function requireAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: "Bạn chưa đăng nhập" });
  }
}

// Định nghĩa lưu trữ tệp tải lên bằng multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads", "images");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    cb(null, `image${uniqueSuffix}${extension}`);
  },
});

const upload = multer({ storage });
// const appDomain = "https://e-menu-ihdypnfgx-thanhtruong872002.vercel.app/menu";

const queryAsync = util.promisify(connection.query).bind(connection);

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
app.post(
  "/api/uploadImage",
  upload.single("image"),
  AddMenuController.uploadImage
);
app.post("/api/addDish", AddMenuController.addDish);
app.get("/api/types", AddMenuController.getTypes);

//editMenu page
app.get("/api/menu/:menu_id", EditMenuController.getDish);
app.put("/api/editDish/:menu_id", EditMenuController.updateDish);

//table page
app.get("/api/tables", TablesController.getAllTables);
app.delete("/api/tables/:table_id", TablesController.deleteTable);

//transaction
app.get("/api/transactions", TransactionController.getTransactionItems);

//addTable page
app.get("/api/locations", locationController.getLocations);
app.post("/api/tables", async (req, res) => {
  const { table_name, seat_capacity, location, status } = req.body;
  // Tạo một bàn mới trong cơ sở dữ liệu (bạn cần có một hàm để thực hiện thao tác này)
  try {
    const result = await createNewTable(
      table_name,
      seat_capacity,
      location,
      status
    );
    if (!result) {
      return res.status(500).json({
        success: false,
        message: "Lỗi khi tạo bàn trong cơ sở dữ liệu",
      });
    }

    const tableId = result.insertId;

    // Tạo đường dẫn URL (QR code) từ ID bàn
    const qrCode = `https://e-menu-khaki.vercel.app/customer/menuqr/${tableId}`;

    // Cập nhật bàn với mã QR code mới được tạo
    const updateQrCodeSql = "UPDATE tableid SET qr_code = ? WHERE table_id = ?";
    connection.query(
      updateQrCodeSql,
      [qrCode, tableId],
      (updateErr, updateResult) => {
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
    const sql =
      "INSERT INTO tableid (table_name, seat_capacity, location, status) VALUES (?, ?, ?, ?)";
    connection.query(
      sql,
      [table_name, seat_capacity, location, status],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

//editTable page
app.get("/api/tables/:table_id", editTableController.getTable);
app.put("/api/tables/:table_id", editTableController.updateTable);

//customerMenuCart page
app.put("/api/updateTableStatus", customerMenuCartController.updateTableStatus);
app.post("/api/createOrder", customerMenuCartController.createOrder);

//BookTable
app.post("/api/createReservation", bookTableController.createReservation);

//Staff
app.get("/api/orders/:table_id", async (req, res) => {
  try {
    const tableId = req.params.table_id;

    // Kiểm tra xem tableId có phải là một số không
    if (isNaN(tableId)) {
      return res.status(400).json({
        success: false,
        message: "table_id phải là một số",
      });
    }

    // Thực hiện truy vấn để kiểm tra bảng orderid với Table_id và status
    const sql =
      "SELECT order_id, status, order_date FROM orderid WHERE table_id = ? AND (status = 1 OR status = 2)";
    const result = await queryAsync(sql, [tableId]);

    // Kiểm tra xem có bảng orderid nào tương ứng hay không
    if (result.length === 0) {
      console.log(`Bàn đang rảnh, không có order_id tương ứng.`);
      return res.status(200).json({
        success: true,
        message: "Bàn đang rảnh, không có order_id tương ứng",
      });
    }
    const ordersData = result.map((order) => ({
      order_id: order.order_id,
      status: order.status,
      order_date: order.order_date,
    }));
    // Trả về danh sách order_id và status
    res.status(200).json({
      success: true,
      data: ordersData,
    });
  } catch (error) {
    console.error("Error checking order status:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi kiểm tra trạng thái đơn đặt hàng",
      error: error.message,
    });
  }
});

app.get("/api/orderdetails/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Kiểm tra xem orderId có phải là một số không
    if (isNaN(orderId)) {
      return res.status(400).json({
        success: false,
        message: "order_id phải là một số",
      });
    }

    // Thực hiện truy vấn để lấy chi tiết đơn hàng từ bảng orderdetail
    const sql = "SELECT * FROM orderdetail WHERE order_id = ?";
    const result = await queryAsync(sql, [orderId]);

    // Kiểm tra xem có chi tiết đơn hàng nào tương ứng hay không
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy chi tiết đơn hàng",
      });
    }

    // Trả về danh sách chi tiết đơn hàng
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error getting order details:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy chi tiết đơn hàng",
      error: error.message,
    });
  }
});

// Add this endpoint at the end of your file
app.put("/api/updateorderstatus/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const newStatus = req.body.status;

    // Kiểm tra xem orderId có phải là một số không
    if (isNaN(orderId)) {
      return res.status(400).json({
        success: false,
        message: "order_id phải là một số",
      });
    }

    // Kiểm tra xem newStatus có phải là một số không
    if (isNaN(newStatus)) {
      return res.status(400).json({
        success: false,
        message: "status phải là một số",
      });
    }

    // Thực hiện truy vấn để cập nhật trạng thái đơn hàng trong bảng orderid
    const updateOrderStatusSql =
      "UPDATE orderid SET status = ? WHERE order_id = ?";
    await queryAsync(updateOrderStatusSql, [newStatus, orderId]);

    // Trả về thông báo thành công
    res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái đơn hàng thành công",
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật trạng thái đơn hàng",
      error: error.message,
    });
  }
});

// Delete a specific menu item from order details
app.delete("/api/orderdetails/:orderId/:menuItemId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const menuItemId = req.params.menuItemId;

    // Validate orderId and menuItemId to ensure they are numbers
    if (isNaN(orderId) || isNaN(menuItemId)) {
      return res.status(400).json({
        success: false,
        message: "orderId and menuItemId must be numbers",
      });
    }

    // Check if the order exists
    const orderExistQuery = "SELECT * FROM orderid WHERE order_id = ?";
    const orderExistResult = await queryAsync(orderExistQuery, [orderId]);

    if (orderExistResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Delete the menu item from order details
    const deleteMenuItemQuery =
      "DELETE FROM orderdetail WHERE order_id = ? AND menu_item_id = ?";
    await queryAsync(deleteMenuItemQuery, [orderId, menuItemId]);

    res.status(200).json({
      success: true,
      message: "Menu item removed from order details successfully",
    });
  } catch (error) {
    console.error("Error removing menu item from order details:", error);
    res.status(500).json({
      success: false,
      message: "Error removing menu item from order details",
      error: error.message,
    });
  }
});

// Update quantity in orderdetail table
app.put("/api/updatequantity/:orderDetailId", async (req, res) => {
  try {
    const orderDetailId = req.params.orderDetailId;
    const newQuantity = req.body.quantity;

    // Validate orderDetailId and newQuantity to ensure they are numbers
    if (isNaN(orderDetailId) || isNaN(newQuantity)) {
      return res.status(400).json({
        success: false,
        message: "orderDetailId and quantity must be numbers",
      });
    }

    // Check if the order detail exists
    const orderDetailExistQuery =
      "SELECT * FROM orderdetail WHERE order_detail_id = ?";
    const orderDetailExistResult = await queryAsync(orderDetailExistQuery, [
      orderDetailId,
    ]);

    if (orderDetailExistResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order detail not found",
      });
    }

    // Update the quantity in orderdetail table
    const updateQuantityQuery =
      "UPDATE orderdetail SET quantity = ? WHERE order_detail_id = ?";
    await queryAsync(updateQuantityQuery, [newQuantity, orderDetailId]);

    res.status(200).json({
      success: true,
      message: "Quantity updated successfully",
    });
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).json({
      success: false,
      message: "Error updating quantity",
      error: error.message,
    });
  }
});

app.get("/api/transactiontypes", async (req, res) => {
  try {
    const transactionTypes = await getTransactionTypes();
    res.status(200).json({
      success: true,
      data: transactionTypes,
    });
  } catch (error) {
    console.error("Error fetching transaction types:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching transaction types",
      error: error.message,
    });
  }
});

// Điểm cuối để xử lý giao dịch
app.post("/api/transactions", async (req, res) => {
  try {
    // Trích xuất dữ liệu giao dịch từ phần thân yêu cầu
    const {
      account_id,
      transaction_type,
      amount,
      transaction_date,
      transaction_description,
    } = req.body;

    // Xác nhận rằng các trường bắt buộc đã được điền
    if (
      !account_id ||
      !transaction_type ||
      !amount ||
      !transaction_date ||
      !transaction_description
    ) {
      return res.status(400).json({
        success: false,
        message: "Thiếu các trường bắt buộc cho giao dịch",
      });
    }

    // Lưu trữ dữ liệu giao dịch trong cơ sở dữ liệu cục bộ (thay thế bằng logic của bạn)
    const saveTransactionSql =
      "INSERT INTO transactionid (account_id, transaction_type, amount, transaction_date, transaction_description) VALUES (?, ?, ?, ?, ?)";
    await queryAsync(saveTransactionSql, [
      account_id,
      transaction_type,
      amount,
      transaction_date,
      transaction_description,
    ]);

    // Bạn cũng có thể thực hiện các logic bổ sung ở đây nếu cần

    // Trả về thành công
    res.status(200).json({
      success: true,
      message: "Dữ liệu giao dịch đã được xử lý thành công",
    });
  } catch (error) {
    console.error("Lỗi khi xử lý giao dịch:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi xử lý giao dịch",
      error: error.message,
    });
  }
});

// Hàm để lấy danh sách các loại giao dịch từ cơ sở dữ liệu
async function getTransactionTypes() {
  const sql = "SELECT type_id, type_name FROM transactiontype";
  const result = await queryAsync(sql);
  return result;
}

// Xóa chi tiết đơn hàng dựa trên orderId
app.delete("/api/orderdetails/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Kiểm tra xem orderId có phải là một số không
    if (isNaN(orderId)) {
      return res.status(400).json({
        success: false,
        message: "orderId phải là một số",
      });
    }

    // Thực hiện truy vấn để xóa chi tiết đơn hàng từ bảng orderdetail
    const deleteOrderDetailsSql = "DELETE FROM orderdetail WHERE order_id = ?";
    const result = await queryAsync(deleteOrderDetailsSql, [orderId]);

    // Kiểm tra xem có chi tiết đơn hàng nào bị xóa hay không
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy chi tiết đơn hàng để xóa",
      });
    }

    // Trả về thông báo thành công
    res.status(200).json({
      success: true,
      message: "Xóa chi tiết đơn hàng thành công",
    });
  } catch (error) {
    console.error("Lỗi khi xóa chi tiết đơn hàng:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa chi tiết đơn hàng",
      error: error.message,
    });
  }
});

// Xóa đơn hàng dựa trên orderId
app.delete("/api/orders/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Kiểm tra xem orderId có phải là một số không
    if (isNaN(orderId)) {
      return res.status(400).json({
        success: false,
        message: "orderId phải là một số",
      });
    }

    // Thực hiện truy vấn để xóa đơn hàng từ bảng orderid
    const deleteOrderSql = "DELETE FROM orderid WHERE order_id = ?";
    const result = await queryAsync(deleteOrderSql, [orderId]);

    // Kiểm tra xem có đơn hàng nào bị xóa hay không
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng để xóa",
      });
    }

    // Trả về thông báo thành công
    res.status(200).json({
      success: true,
      message: "Xóa đơn hàng thành công",
    });
  } catch (error) {
    console.error("Lỗi khi xóa đơn hàng:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa đơn hàng",
      error: error.message,
    });
  }
});

// Cập nhật trạng thái của bàn dựa trên tableId
app.put("/api/tablesStaff/:tableId", async (req, res) => {
  try {
    const tableId = req.params.tableId;
    const { status } = req.body;

    // Kiểm tra xem tableId có phải là một số không
    if (isNaN(tableId)) {
      return res.status(400).json({
        success: false,
        message: "tableId phải là một số",
      });
    }

    // Kiểm tra xem status có phải là một số không
    if (isNaN(status)) {
      return res.status(400).json({
        success: false,
        message: "status phải là một số",
      });
    }

    // Thực hiện truy vấn để cập nhật trạng thái của bàn trong bảng tableid
    const updateTableStatusSql =
      "UPDATE tableid SET status = ? WHERE table_id = ?";
    const result = await queryAsync(updateTableStatusSql, [status, tableId]);

    // Kiểm tra xem có bàn nào được cập nhật hay không
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thông tin bàn để cập nhật",
      });
    }

    // Trả về thông báo thành công
    res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái bàn thành công",
    });
  } catch (error) {
    console.error("Error updating table status:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật trạng thái bàn",
      error: error.message,
    });
  }
});

// Get Data Account
app.get("/api/accounts", async (req, res) => {
  try {
    const sql = "SELECT * FROM account";
    const accounts = await queryAsync(sql);

    res.status(200).json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({
      message: "Error fetching accounts",
      error: error.message,
    });
  }
});

// Bảo vệ tuyến đường /admin bằng middleware requireAuth
app.get("/admin", requireAuth, (req, res) => {
  // Xử lý trang quản trị ở đây
});

const port = 4000;
app.listen(port, () => {
  console.log(`Máy chủ đang lắng nghe trên cổng ${port}`);
});
