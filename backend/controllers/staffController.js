const StaffModel = require('../models/staffModel');

class StaffController {
  // Phương thức để lấy danh sách nhân viên
  static getAllStaff(req, res) {
    StaffModel.getAllStaff((err, results) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json({ staff: results });
      }
    });
  }

  // Phương thức để xóa tài khoản nhân viên
  static deleteStaff(req, res) {
    const username = req.params.username;
    StaffModel.deleteStaff(username, (err, message) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json({ success: true, message: message });
      }
    });
  }
}

module.exports = StaffController;
