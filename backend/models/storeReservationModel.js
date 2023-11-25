const connection = require("./db");

class StoreReservationModel {
    static storeReservation(reservation_date, status, cus_name, cus_phone, number_of_guests, callback) {
      const sql =
        "INSERT INTO reservation (reservation_date, status, cus_name, cus_phone, number_of_guests) VALUES (?, ?, ?, ?, ?)";
        connection.query(
            sql,
            [reservation_date, status, cus_name, cus_phone, number_of_guests],
            function (err, results) {
                if (err) {
                    callback("Lỗi truy vấn cơ sở dữ liệu", null);
                } else {
                    callback(null, "Thông tin đặt bàn đã được lưu trữ thành công");
                }
            }
        );
    }
}
  
module.exports = StoreReservationModel;