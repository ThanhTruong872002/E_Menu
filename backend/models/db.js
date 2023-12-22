const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "emenuqr-rds.cisxgnlvslix.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "Thanhtruong02",
  database: "emenuqr-rds",
});

connection.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối cơ sở dữ liệu2 :", err);
  } else {
    console.log("Kết nối đến cơ sở dữ liệu thành công 2");
  }
});

module.exports = connection;
