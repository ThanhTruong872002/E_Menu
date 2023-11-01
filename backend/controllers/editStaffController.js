const EditStaffModel = require("../models/editStaffModel");

class EditStaffController {
  static getAccount(req, res) {
    const username = req.params.username;
    EditStaffModel.getAccount(username, (err, results) => {
      if (err) {
        res.status(500).json({ error: err });
      } else if (results) {
        res.json({ account: results });
      } else {
        res.status(404).json({ error: "Không tìm thấy tài khoản" });
      }
    });
  }

  static updateAccount(req, res) {
    const username = req.params.username;
    const { password, fullname, role } = req.body;
    EditStaffModel.updateAccount(username, password, fullname, role, (err, message) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json({ success: true, message: message });
      }
    });
  }
}

module.exports = EditStaffController;
