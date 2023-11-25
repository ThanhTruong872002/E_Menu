const connection = require('./db');

function updateTableStatus(tableId, newStatus) {
  return new Promise((resolve, reject) => {
    const updateStatusSql = "UPDATE tableid SET status = ? WHERE table_id = ?";
    connection.query(updateStatusSql, [newStatus, tableId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function createOrder(tableId, showDetailsMenu) {
  try {
    const existingOrder = await checkExistingOrder(tableId);

    let orderId;

    if (existingOrder) {
      orderId = existingOrder.order_id;
    } else {
      const newOrder = await createNewOrder(tableId, 1);
      orderId = newOrder.insertId;
    }

    for (const item of showDetailsMenu) {
      await addOrderDetail(orderId, item.menu_id, item.quantity, item.Price);
    }

    return {
      success: true,
      message: "Order placed successfully",
      order_id: orderId,
    };
  } catch (error) {
    console.error("Error creating or using order:", error);
    throw error;
  }
}

function checkExistingOrder(tableId) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT order_id, status FROM orderid WHERE table_id = ? AND (status = 1 OR status = 2) LIMIT 1";
    connection.query(sql, [tableId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result.length > 0) {
          const orderId = result[0].order_id;
          const status = result[0].status;

          // Kiểm tra nếu status là 2 thì cập nhật thành 1
          if (status === 2) {
            updateOrderStatus(orderId, 1);
          }

          resolve({ order_id: orderId, status: status });
        } else {
          resolve(null);
        }
      }
    });
  });
}

// Thêm hàm cập nhật status của order
function updateOrderStatus(orderId, newStatus) {
  const updateStatusSql = "UPDATE orderid SET status = ? WHERE order_id = ?";
  connection.query(updateStatusSql, [newStatus, orderId], (err, result) => {
    if (err) {
      console.error("Error updating order status:", err);
    }
  });
}


function createNewOrder(tableId, status) {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO orderid (table_id, order_date, status) VALUES (?, NOW(), ?)";
    connection.query(sql, [tableId, status], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function addOrderDetail(orderId, menuId, quantity, price) {
  return new Promise((resolve, reject) => {
    const checkExistingSql = "SELECT * FROM orderdetail WHERE order_id = ? AND menu_item_id = ?";
    connection.query(checkExistingSql, [orderId, menuId], async (checkErr, checkResult) => {
      if (checkErr) {
        reject(checkErr);
        return;
      }

      if (checkResult.length > 0) {
        const existingQuantity = checkResult[0].quantity;
        const updatedQuantity = existingQuantity + quantity;

        const updateSql = "UPDATE orderdetail SET quantity = ? WHERE order_id = ? AND menu_item_id = ?";
        connection.query(updateSql, [updatedQuantity, orderId, menuId], (updateErr, updateResult) => {
          if (updateErr) {
            reject(updateErr);
          } else {
            resolve(updateResult);
          }
        });
      } else {
        const insertSql = "INSERT INTO orderdetail (order_id, menu_item_id, quantity, price, invoice_description) VALUES (?, ?, ?, ?, NULL)";
        connection.query(insertSql, [orderId, menuId, quantity, price], (insertErr, insertResult) => {
          if (insertErr) {
            reject(insertErr);
          } else {
            resolve(insertResult);
          }
        });
      }
    });
  });
}

module.exports = {
  updateTableStatus,
  createOrder,
};
