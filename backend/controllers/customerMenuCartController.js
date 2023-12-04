const customerMenuCartModel = require('../models/customerMenuCartModel');

async function updateTableStatus(req, res) {
  const { tableId, newStatus } = req.body;

  try {
    const result = await customerMenuCartModel.updateTableStatus(tableId, newStatus);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Table not found for updating status",
      });
    }

    res.status(200).json({
      success: true,
      message: "Table status updated successfully",
    });
  } catch (error) {
    console.error("Error updating table status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating table status",
      error: error.message,
    });
  }
}

async function createOrder(req, res) {
  const { tableId, showDetailsMenu } = req.body;

  try {
    const orderResult = await customerMenuCartModel.createOrder(tableId, showDetailsMenu);
    res.status(200).json(orderResult);
  } catch (error) {
    console.error("Error creating or using order:", error);
    res.status(500).json({
      success: false,
      message: "Error creating or using order",
      error: error.message,
    });
  }
}

module.exports = {
  updateTableStatus,
  createOrder,
};
