const connection = require("./db");

class TransactionModel {
  static getTransactionItems(callback) {
    const sql = `
      SELECT a.trasaction_id, a.account_id, a.amount, a.transaction_date, a.transaction_description, b.type_name
      FROM transactionid a
      INNER JOIN transactiontype b
      ON a.transaction_type = b.type_id
    `;

    connection.query(sql, (err, results) => {
      if (err) {
        callback("Lỗi truy vấn cơ sở dữ liệu", null);
      } else {
        callback(null, results);
      }
    });
  }
}

module.exports = TransactionModel;