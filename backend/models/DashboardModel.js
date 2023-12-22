const queryAsync = require('./db');

async function getOrderStatus(tableId) {
    const sql = "SELECT order_id, status, order_date FROM orderid WHERE table_id = ? AND (status = 1 OR status = 2)";
    return await queryAsync(sql, [tableId]);
  }

module.exports = {
    getOrderStatus,
};