const TransactionModel = require("../models/transactionModel");

class TransactionController {
  static getTransactionItems(req, res) {
    TransactionModel.getTransactionItems((err, results) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json(results);
      }
    });
  }
}

module.exports = TransactionController;