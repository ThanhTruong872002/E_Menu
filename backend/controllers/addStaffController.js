const AddStaffModel = require("../models/addStaffModel");

class AddStaffController {
  static addStaff(req, res) {
    const { account_id, username, password, fullname, role } = req.body;

    if (!Number.isInteger(role)) {
      return res.status(400).json({ error: "ID của vai trò phải là một số nguyên" });
    }

    AddStaffModel.checkUsername(username, (usernameErr, usernameMessage) => {
      if (usernameErr) {
        return res.status(400).json({ error: usernameErr });
      }

      AddStaffModel.addStaff(account_id, username, password, fullname, role, (err, message) => {
        if (err) {
          return res.status(500).json({ error: err });
        } else {
          res.json({ success: true, message: message });
        }
      });
    });
  }

  static getRoles(req, res) {
    AddStaffModel.getRoles((err, results) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json({ roles: results });
      }
    });
  }

  static checkUsername(req, res) {
    const { username } = req.query;

    AddStaffModel.checkUsername(username, (usernameErr, usernameMessage) => {
      if (usernameErr) {
        return res.status(400).json({ error: usernameErr });
      }
      
      res.json({ success: true, message: usernameMessage });
    });
  }
}

module.exports = AddStaffController;
