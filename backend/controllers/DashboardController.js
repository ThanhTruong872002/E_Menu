const dashboardModel = require('../models/DashboardModel');

async function getOrderStatusController(req, res) {
  try {
    const tableId = req.params.table_id;

    if (isNaN(tableId)) {
      return res.status(400).json({
        success: false,
        message: "table_id phải là một số",
      });
    }

    const result = await dashboardModel.getOrderStatus(tableId);

    if (result.length === 0) {
      console.log(`Bàn đang rảnh, không có order_id tương ứng.`);
      return res.status(200).json({
        success: true,
        message: "Bàn đang rảnh, không có order_id tương ứng",
      });
    }

    const ordersData = result.map((order) => ({ order_id: order.order_id, status: order.status, order_date: order.order_date}));

    res.status(200).json({
      success: true,
      data: ordersData,
    });
  } catch (error) {
    console.error("Error checking order status:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi kiểm tra trạng thái đơn đặt hàng",
      error: error.message,
    });
  }
}

module.exports = {
  getOrderStatusController,
};
