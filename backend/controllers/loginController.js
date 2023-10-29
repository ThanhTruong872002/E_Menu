const LoginModel = require('../models/loginModel'); // Import tệp loginModel.js

const LoginController = {
  login: (req, res) => {
    const { username, password } = req.body;
    
    LoginModel.checkLogin(username, password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
      }

      res.json(result);
    });
  },
};

module.exports = LoginController;
