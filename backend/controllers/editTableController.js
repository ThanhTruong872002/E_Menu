const editTableModel = require('../models/editTableModel');

async function getTable(req, res) {
  const tableId = req.params.table_id;

  try {
    const tableData = await editTableModel.getTableById(tableId);
    if (!tableData) {
      return res.status(404).json({
        success: false,
        message: "Table not found with the provided table_id",
      });
    }

    res.status(200).json(tableData);
  } catch (error) {
    console.error("Error fetching table data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching table data",
      error: error.message,
    });
  }
}

async function updateTable(req, res) {
  const tableId = req.params.table_id;
  const updatedTable = req.body;

  try {
    const result = await editTableModel.updateTable(tableId, updatedTable);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Table not found with the provided table_id",
      });
    }

    res.status(200).json({
      success: true,
      message: "Table information updated successfully",
    });
  } catch (error) {
    console.error("Error updating table information:", error);
    res.status(500).json({
      success: false,
      message: "Error updating table information",
      error: error.message,
    });
  }
}

module.exports = {
  getTable,
  updateTable,
};
