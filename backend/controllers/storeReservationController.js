const StoreReservationModel = require("../models/storeReservationModel");

class StoreReservationController {
    static storeReservation(req, res) {
      const { reservation_date, status, cus_name, cus_phone, number_of_guests } = req.body;
  
      StoreReservationModel.storeReservation(reservation_date, status, cus_name, cus_phone, number_of_guests, (err, message) => {
        if (err) {
            res.status(500).json({ error: err });
          } else {
            res.json({ success: true, message: message });
          }
      });
    }
}
  
module.exports = StoreReservationController;