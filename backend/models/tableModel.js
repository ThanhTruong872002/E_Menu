const connection = require('./db'); // Assuming you have a database connection file

function getAllTables(callback) {
  const sql = "SELECT * FROM tableid";
  connection.query(sql, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

function deleteTable(tableId, callback) {
  const deleteTableSql = "DELETE FROM tableid WHERE table_id = ?";
  connection.query(deleteTableSql, [tableId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

module.exports = {
  getAllTables,
  deleteTable,
};
