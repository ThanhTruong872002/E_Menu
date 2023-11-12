const TableModel = require('../models/tableModel');

function getAllTables(req, res) {
  TableModel.getAllTables((err, tables) => {
    if (err) {
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(tables);
    }
  });
}

function deleteTable(req, res) {
  const tableId = req.params.table_id;

  TableModel.deleteTable(tableId, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Error deleting the table",
        error: err.message,
      });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({
          success: false,
          message: "Table not found with the provided table_id",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Table deleted successfully",
        });
      }
    }
  });
}

module.exports = {
  getAllTables,
  deleteTable,
};
