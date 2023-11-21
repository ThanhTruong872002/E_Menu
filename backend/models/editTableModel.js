const connection = require('./db');

function getTableById(tableId) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tableid WHERE table_id = ?";
    connection.query(sql, [tableId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
}

function updateTable(tableId, updatedTable) {
  return new Promise((resolve, reject) => {
    const updateData = {
      table_name: updatedTable.table_name,
      seat_capacity: updatedTable.seat_capacity,
      location: updatedTable.location,
    };

    const sql = "UPDATE tableid SET ? WHERE table_id = ?";
    connection.query(sql, [updateData, tableId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  getTableById,
  updateTable,
};
